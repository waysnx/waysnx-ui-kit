/**
 * @file engines/LayoutEngine.ts
 * Computes x/y positions for all nodes based on layout direction.
 */

import type { VisNode, VisEdge, LayoutConfig, LayoutNode, LayoutResult } from '../types';
import {
  DEFAULT_NODE_WIDTH,
  DEFAULT_NODE_HEIGHT,
  DEFAULT_NODE_GAP_X,
  DEFAULT_NODE_GAP_Y,
} from '../constants';
import { buildTree } from '../utils/treeUtils';

export class LayoutEngine {
  private config: Required<LayoutConfig>;

  constructor(config?: Partial<LayoutConfig>) {
    this.config = {
      direction: config?.direction ?? 'top-down',
      nodeGapX: config?.nodeGapX ?? DEFAULT_NODE_GAP_X,
      nodeGapY: config?.nodeGapY ?? DEFAULT_NODE_GAP_Y,
      nodeWidth: config?.nodeWidth ?? DEFAULT_NODE_WIDTH,
      nodeHeight: config?.nodeHeight ?? DEFAULT_NODE_HEIGHT,
    };
  }

  /**
   * Compute layout positions for a flat node list.
   */
  compute(flatNodes: VisNode[], edges: VisEdge[] = []): LayoutResult {
    switch (this.config.direction) {
      case 'top-down':
        return this.computeTopDown(flatNodes, edges);
      case 'left-right':
        return this.computeLeftRight(flatNodes, edges);
      case 'radial':
        return this.computeRadial(flatNodes, edges);
      case 'compact':
        return this.computeCompact(flatNodes, edges);
      default:
        return this.computeTopDown(flatNodes, edges);
    }
  }

  // ─── Top-Down (Reingold–Tilford inspired) ──────────────────────────────────

  private computeTopDown(flatNodes: VisNode[], edges: VisEdge[]): LayoutResult {
    const { nodeWidth, nodeHeight, nodeGapX, nodeGapY } = this.config;
    const layoutNodes: LayoutNode[] = [];
    let maxX = 0;
    let maxY = 0;

    // Build tree structure
    const roots = buildTree(flatNodes);

    // Assign depths
    const depthMap = new Map<string, number>();
    const assignDepth = (node: VisNode, depth: number) => {
      depthMap.set(node.id, depth);
      if (node.children) {
        for (const child of node.children) assignDepth(child, depth + 1);
      }
    };
    for (const root of roots) assignDepth(root, 0);

    // Compute subtree widths bottom-up
    const subtreeWidth = new Map<string, number>();
    const computeSubtreeWidth = (node: VisNode): number => {
      if (!node.children || node.children.length === 0) {
        subtreeWidth.set(node.id, nodeWidth);
        return nodeWidth;
      }
      const childrenWidth = node.children.reduce(
        (sum, child, idx) =>
          sum +
          computeSubtreeWidth(child) +
          (idx < node.children!.length - 1 ? nodeGapX : 0),
        0
      );
      const width = Math.max(nodeWidth, childrenWidth);
      subtreeWidth.set(node.id, width);
      return width;
    };
    for (const root of roots) computeSubtreeWidth(root);

    // Assign x/y positions top-down
    const assignPositions = (node: VisNode, x: number, y: number) => {
      const depth = depthMap.get(node.id) ?? 0;
      const flatNode = flatNodes.find((n) => n.id === node.id)!;

      const layoutNode: LayoutNode = {
        ...flatNode,
        x,
        y,
        width: nodeWidth,
        height: nodeHeight,
        depth,
      };
      layoutNodes.push(layoutNode);

      maxX = Math.max(maxX, x + nodeWidth);
      maxY = Math.max(maxY, y + nodeHeight);

      if (node.children && node.children.length > 0) {
        const totalChildrenWidth = node.children.reduce(
          (sum, child, idx) =>
            sum +
            (subtreeWidth.get(child.id) ?? nodeWidth) +
            (idx < node.children!.length - 1 ? nodeGapX : 0),
          0
        );
        let childX = x + nodeWidth / 2 - totalChildrenWidth / 2;
        const childY = y + nodeHeight + nodeGapY;

        for (const child of node.children) {
          const childWidth = subtreeWidth.get(child.id) ?? nodeWidth;
          assignPositions(child, childX + childWidth / 2 - nodeWidth / 2, childY);
          childX += childWidth + nodeGapX;
        }
      }
    };

    let rootX = 0;
    for (const root of roots) {
      const rw = subtreeWidth.get(root.id) ?? nodeWidth;
      assignPositions(root, rootX, 0);
      rootX += rw + nodeGapX * 2;
    }

    return {
      nodes: layoutNodes,
      edges: this.buildEdges(layoutNodes, edges),
      totalWidth: maxX,
      totalHeight: maxY,
    };
  }

  // ─── Left-Right ────────────────────────────────────────────────────────────

  private computeLeftRight(flatNodes: VisNode[], edges: VisEdge[]): LayoutResult {
    const { nodeWidth, nodeHeight, nodeGapX, nodeGapY } = this.config;
    const layoutNodes: LayoutNode[] = [];
    let maxX = 0;
    let maxY = 0;

    const roots = buildTree(flatNodes);
    const depthMap = new Map<string, number>();
    const assignDepth = (node: VisNode, depth: number) => {
      depthMap.set(node.id, depth);
      if (node.children) {
        for (const child of node.children) assignDepth(child, depth + 1);
      }
    };
    for (const root of roots) assignDepth(root, 0);

    // Subtree height (in left-right, height is the constraint axis)
    const subtreeHeight = new Map<string, number>();
    const computeSubtreeHeight = (node: VisNode): number => {
      if (!node.children || node.children.length === 0) {
        subtreeHeight.set(node.id, nodeHeight);
        return nodeHeight;
      }
      const total = node.children.reduce(
        (sum, child, idx) =>
          sum +
          computeSubtreeHeight(child) +
          (idx < node.children!.length - 1 ? nodeGapY : 0),
        0
      );
      subtreeHeight.set(node.id, total);
      return total;
    };
    for (const root of roots) computeSubtreeHeight(root);

    const assignPositions = (node: VisNode, x: number, y: number) => {
      const depth = depthMap.get(node.id) ?? 0;
      const flatNode = flatNodes.find((n) => n.id === node.id)!;

      const layoutNode: LayoutNode = {
        ...flatNode,
        x,
        y,
        width: nodeWidth,
        height: nodeHeight,
        depth,
      };
      layoutNodes.push(layoutNode);

      maxX = Math.max(maxX, x + nodeWidth);
      maxY = Math.max(maxY, y + nodeHeight);

      if (node.children && node.children.length > 0) {
        const totalH = subtreeHeight.get(node.id) ?? nodeHeight;
        let childY = y + nodeHeight / 2 - totalH / 2;
        const childX = x + nodeWidth + nodeGapX;

        for (const child of node.children) {
          const childH = subtreeHeight.get(child.id) ?? nodeHeight;
          assignPositions(child, childX, childY + childH / 2 - nodeHeight / 2);
          childY += childH + nodeGapY;
        }
      }
    };

    let rootY = 0;
    for (const root of roots) {
      const rh = subtreeHeight.get(root.id) ?? nodeHeight;
      assignPositions(root, 0, rootY);
      rootY += rh + nodeGapY * 2;
    }

    return {
      nodes: layoutNodes,
      edges: this.buildEdges(layoutNodes, edges),
      totalWidth: maxX,
      totalHeight: maxY,
    };
  }

  // ─── Radial ────────────────────────────────────────────────────────────────

  private computeRadial(flatNodes: VisNode[], edges: VisEdge[]): LayoutResult {
    const { nodeWidth, nodeHeight, nodeGapY } = this.config;
    const layoutNodes: LayoutNode[] = [];
    let maxX = 0;
    let maxY = 0;
    const roots = buildTree(flatNodes);

    const levelRadius = nodeHeight + nodeGapY;

    const assignPositions = (
      node: VisNode,
      depth: number,
      angleStart: number,
      angleEnd: number,
      cx: number,
      cy: number
    ) => {
      const angle = (angleStart + angleEnd) / 2;
      const radius = depth * levelRadius * 2.5;
      const x = depth === 0 ? cx - nodeWidth / 2 : cx + radius * Math.cos(angle) - nodeWidth / 2;
      const y = depth === 0 ? cy - nodeHeight / 2 : cy + radius * Math.sin(angle) - nodeHeight / 2;

      const flatNode = flatNodes.find((n) => n.id === node.id)!;
      layoutNodes.push({ ...flatNode, x, y, width: nodeWidth, height: nodeHeight, depth });

      maxX = Math.max(maxX, x + nodeWidth);
      maxY = Math.max(maxY, y + nodeHeight);

      if (node.children && node.children.length > 0) {
        const sliceSize = (angleEnd - angleStart) / node.children.length;
        node.children.forEach((child, idx) => {
          assignPositions(
            child,
            depth + 1,
            angleStart + idx * sliceSize,
            angleStart + (idx + 1) * sliceSize,
            cx,
            cy
          );
        });
      }
    };

    const centerX = 600;
    const centerY = 400;
    for (const root of roots) {
      assignPositions(root, 0, 0, Math.PI * 2, centerX, centerY);
    }

    return {
      nodes: layoutNodes,
      edges: this.buildEdges(layoutNodes, edges),
      totalWidth: maxX,
      totalHeight: maxY,
    };
  }

  // ─── Compact ───────────────────────────────────────────────────────────────

  private computeCompact(flatNodes: VisNode[], edges: VisEdge[]): LayoutResult {
    const { nodeWidth, nodeHeight, nodeGapX, nodeGapY } = this.config;
    const compactGapX = nodeGapX / 2;
    const compactGapY = nodeGapY / 2;
    const layoutNodes: LayoutNode[] = [];
    let col = 0;
    let row = 0;
    const cols = Math.ceil(Math.sqrt(flatNodes.length));

    for (const node of flatNodes) {
      const x = col * (nodeWidth + compactGapX);
      const y = row * (nodeHeight + compactGapY);
      layoutNodes.push({ ...node, x, y, width: nodeWidth, height: nodeHeight, depth: 0 });
      col++;
      if (col >= cols) { col = 0; row++; }
    }

    return {
      nodes: layoutNodes,
      edges: this.buildEdges(layoutNodes, edges),
      totalWidth: cols * (nodeWidth + compactGapX),
      totalHeight: (row + 1) * (nodeHeight + compactGapY),
    };
  }

  // ─── Edge builder ──────────────────────────────────────────────────────────

  private buildEdges(layoutNodes: LayoutNode[], existingEdges: VisEdge[]): VisEdge[] {
    // Auto-generate parent→child edges from node structure
    const autoEdges: VisEdge[] = layoutNodes
      .filter((n) => n.parentId)
      .map((n) => ({
        id: `${n.parentId}--${n.id}`,
        sourceId: n.parentId!,
        targetId: n.id,
        type: 'elbow' as const,
      }));

    // Merge with any explicit edges provided
    const merged = [...autoEdges];
    for (const e of existingEdges) {
      if (!merged.find((m) => m.id === e.id)) {
        merged.push(e);
      }
    }

    return merged;
  }

  /** Update config */
  updateConfig(config: Partial<LayoutConfig>): void {
    this.config = { ...this.config, ...config };
  }
}

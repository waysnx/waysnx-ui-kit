/**
 * @file utils/treeUtils.ts
 * Tree/graph data manipulation utilities
 */

import type { VisNode } from '../types';

/**
 * Build a tree from a flat array of nodes using parentId references.
 */
export function buildTree(nodes: VisNode[]): VisNode[] {
  const map = new Map<string, VisNode & { children: VisNode[] }>();

  // First pass: create a map of all nodes with empty children arrays
  for (const node of nodes) {
    map.set(node.id, { ...node, children: [] });
  }

  const roots: VisNode[] = [];

  // Second pass: assign children to parents
  for (const node of map.values()) {
    if (node.parentId) {
      const parent = map.get(node.parentId);
      if (parent) {
        parent.children!.push(node);
      }
    } else {
      roots.push(node);
    }
  }

  return roots;
}

/**
 * Flatten a nested tree into a flat array.
 */
export function flattenTree(nodes: VisNode[]): VisNode[] {
  const result: VisNode[] = [];

  function traverse(node: VisNode): void {
    result.push(node);
    if (node.children) {
      for (const child of node.children) {
        traverse(child);
      }
    }
  }

  for (const node of nodes) {
    traverse(node);
  }

  return result;
}

/**
 * Find a node by id in a flat array.
 */
export function findNodeById(nodes: VisNode[], id: string): VisNode | undefined {
  return nodes.find((n) => n.id === id);
}

/**
 * Get all descendant ids of a node.
 */
export function getDescendantIds(nodes: VisNode[], nodeId: string): string[] {
  const descendants: string[] = [];

  function traverse(id: string): void {
    const children = nodes.filter((n) => n.parentId === id);
    for (const child of children) {
      descendants.push(child.id);
      traverse(child.id);
    }
  }

  traverse(nodeId);
  return descendants;
}

/**
 * Get all ancestor ids of a node (from root to direct parent).
 */
export function getAncestorIds(nodes: VisNode[], nodeId: string): string[] {
  const ancestors: string[] = [];
  let current = nodes.find((n) => n.id === nodeId);

  while (current?.parentId) {
    ancestors.unshift(current.parentId);
    current = nodes.find((n) => n.id === current!.parentId);
  }

  return ancestors;
}

/**
 * Get the depth of a node (0 = root).
 */
export function getNodeDepth(nodes: VisNode[], nodeId: string): number {
  return getAncestorIds(nodes, nodeId).length;
}

/**
 * Reparent a node: move it under a new parent.
 * Returns a new flat array with updated parentIds.
 */
export function reparentNode(
  nodes: VisNode[],
  nodeId: string,
  newParentId: string | null
): VisNode[] {
  return nodes.map((n) =>
    n.id === nodeId ? { ...n, parentId: newParentId ?? undefined } : n
  );
}

/**
 * Toggle expand/collapse on a node.
 */
export function toggleNodeExpanded(nodes: VisNode[], nodeId: string): VisNode[] {
  return nodes.map((n) =>
    n.id === nodeId ? { ...n, expanded: !n.expanded } : n
  );
}

/**
 * Expand all nodes.
 */
export function expandAll(nodes: VisNode[]): VisNode[] {
  return nodes.map((n) => ({ ...n, expanded: true }));
}

/**
 * Collapse all nodes.
 */
export function collapseAll(nodes: VisNode[]): VisNode[] {
  return nodes.map((n) => ({ ...n, expanded: false }));
}

/**
 * Get the visible nodes given the current expanded state.
 * A node is visible if all its ancestors are expanded (or it is the root).
 */
export function getVisibleNodes(nodes: VisNode[]): VisNode[] {
  const visibleIds = new Set<string>();
  const rootNodes = nodes.filter((n) => !n.parentId);

  function traverse(node: VisNode): void {
    visibleIds.add(node.id);
    if (node.expanded !== false) {
      const children = nodes.filter((n) => n.parentId === node.id);
      for (const child of children) {
        traverse(child);
      }
    }
  }

  for (const root of rootNodes) {
    traverse(root);
  }

  return nodes.filter((n) => visibleIds.has(n.id));
}

/**
 * Search nodes by query string (checks label, subtitle, data fields).
 */
export function searchNodes(nodes: VisNode[], query: string): VisNode[] {
  if (!query.trim()) return [];
  const q = query.toLowerCase();
  return nodes.filter(
    (n) =>
      n.label.toLowerCase().includes(q) ||
      n.subtitle?.toLowerCase().includes(q)
  );
}

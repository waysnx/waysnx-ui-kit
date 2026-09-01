/**
 * @file components/Connector/Connector.tsx
 * SVG connector/edge between two nodes.
 * Supports straight, curved, elbow, and step routing.
 */

import type { LayoutNode, VisEdge } from '../../types';

export interface ConnectorProps {
  edge: VisEdge;
  sourceNode: LayoutNode;
  targetNode: LayoutNode;
  isSelected?: boolean;
  onClick?: (edgeId: string) => void;
}

function getElbowPath(source: LayoutNode, target: LayoutNode): string {
  const sx = source.x + source.width / 2;
  const sy = source.y + source.height;
  const tx = target.x + target.width / 2;
  const ty = target.y;
  const midY = (sy + ty) / 2;

  return `M ${sx} ${sy} L ${sx} ${midY} L ${tx} ${midY} L ${tx} ${ty}`;
}

function getCurvedPath(source: LayoutNode, target: LayoutNode): string {
  const sx = source.x + source.width / 2;
  const sy = source.y + source.height;
  const tx = target.x + target.width / 2;
  const ty = target.y;
  const cy = (sy + ty) / 2;

  return `M ${sx} ${sy} C ${sx} ${cy}, ${tx} ${cy}, ${tx} ${ty}`;
}

function getStraightPath(source: LayoutNode, target: LayoutNode): string {
  const sx = source.x + source.width / 2;
  const sy = source.y + source.height;
  const tx = target.x + target.width / 2;
  const ty = target.y;
  return `M ${sx} ${sy} L ${tx} ${ty}`;
}

function getStepPath(source: LayoutNode, target: LayoutNode): string {
  const sx = source.x + source.width / 2;
  const sy = source.y + source.height;
  const tx = target.x + target.width / 2;
  const ty = target.y;
  const midY = sy + 20;

  return `M ${sx} ${sy} L ${sx} ${midY} L ${tx} ${midY} L ${tx} ${ty}`;
}

export function Connector({
  edge,
  sourceNode,
  targetNode,
  isSelected = false,
  onClick,
}: ConnectorProps) {
  let path: string;

  switch (edge.type) {
    case 'curved':
      path = getCurvedPath(sourceNode, targetNode);
      break;
    case 'straight':
      path = getStraightPath(sourceNode, targetNode);
      break;
    case 'step':
      path = getStepPath(sourceNode, targetNode);
      break;
    case 'elbow':
    default:
      path = getElbowPath(sourceNode, targetNode);
  }

  return (
    <path
      d={path}
      className={`wx-vis-edge${isSelected ? ' wx-vis-edge--selected' : ''}`}
      style={edge.style}
      onClick={onClick ? () => onClick(edge.id) : undefined}
      aria-hidden="true"
      data-edge-id={edge.id}
    />
  );
}

export default Connector;

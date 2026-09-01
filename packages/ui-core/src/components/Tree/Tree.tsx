import React, { useState } from 'react';
import './Tree.css';

export interface TreeNode {
  value: string | number;
  name: string;
  checked?: boolean;
  options?: TreeNode[];
}

export interface TreeProps {
  data: TreeNode[];
  onChange?: (data: TreeNode[]) => void;
  label?: string;
  className?: string;
  ariaLabel?: string;
  testId?: string;
}

interface TreeNodeItemProps {
  node: TreeNode;
  level: number;
  onToggle: (nodeValue: string | number, checked: boolean) => void;
  isLast: boolean;
}

function TreeNodeItem({ node, level, onToggle, isLast }: TreeNodeItemProps) {
  const [expanded, setExpanded] = useState(true);
  const hasChildren = node.options && node.options.length > 0;
  const nodeId = `tree-node-${node.value}`;

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onToggle(node.value, e.target.checked);
  };

  const handleToggleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <div className="wx-tree-node">
      <div className="wx-tree-node-content">
        {hasChildren && (
          <button
            type="button"
            className="wx-tree-expand-btn"
            onClick={handleToggleExpand}
            aria-expanded={expanded}
            aria-label={`${expanded ? 'Collapse' : 'Expand'} ${node.name}`}
            aria-controls={`${nodeId}-children`}
          >
            {expanded ? '▼' : '▶'}
          </button>
        )}
        <input
          type="checkbox"
          id={nodeId}
          checked={node.checked || false}
          onChange={handleCheckboxChange}
          className="wx-tree-checkbox"
          aria-label={node.name}
        />
        <label htmlFor={nodeId} className="wx-tree-label">{node.name}</label>
      </div>

      {hasChildren && expanded && (
        <ul
          id={`${nodeId}-children`}
          className={`wx-tree-children ${isLast ? 'wx-tree-last-level' : ''}`}
          role="group"
        >
          {node.options!.map((child, index) => (
            <li key={child.value} role="treeitem">
              <TreeNodeItem
                node={child}
                level={level + 1}
                onToggle={onToggle}
                isLast={!child.options || child.options.length === 0}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export function Tree({ data, onChange, label, className, ariaLabel, testId }: TreeProps) {
  const [treeData, setTreeData] = useState<TreeNode[]>(data);

  const toggleNode = (nodeValue: string | number, checked: boolean) => {
    const updateNode = (nodes: TreeNode[]): TreeNode[] => {
      return nodes.map((node) => {
        if (node.value === nodeValue) {
          const updatedNode = { ...node, checked };
          if (updatedNode.options) {
            updatedNode.options = updateChildren(updatedNode.options, checked);
          }
          return updatedNode;
        }
        if (node.options) {
          return { ...node, options: updateNode(node.options) };
        }
        return node;
      });
    };

    const updateChildren = (children: TreeNode[], checked: boolean): TreeNode[] => {
      return children.map((child) => ({
        ...child,
        checked,
        options: child.options ? updateChildren(child.options, checked) : undefined,
      }));
    };

    const newData = updateNode(treeData);
    setTreeData(newData);
    onChange?.(newData);
  };

  const checkIfLastLevel = (node: TreeNode): boolean => {
    if (!node.options || node.options.length === 0) return false;
    return node.options.every((child) => !child.options || child.options.length === 0);
  };

  return (
    <div className={`wx-tree-wrapper ${className || ''}`} data-testid={testId}>
      {label && <div className="wx-tree-label-header" role="heading" aria-level={2}>{label}</div>}
      <ul className="wx-tree" role="tree" aria-label={ariaLabel || label}>
        {treeData.map((node) => (
          <li key={node.value} role="treeitem">
            <TreeNodeItem
              node={node}
              level={0}
              onToggle={toggleNode}
              isLast={checkIfLastLevel(node)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

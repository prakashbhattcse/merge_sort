import React from "react";

// Define the interface for TreeNode properties
interface TreeNodeProps {
  left?: TreeNodeProps;
  right?: TreeNodeProps;
  result: number[];
  initialArray?: number[];
}

// TreeNode component to visualize the merge sort process
const TreeNode: React.FC<TreeNodeProps> = ({
  left,
  right,
  result,
  initialArray,
}) => (
  <div className="tree-node">
    {initialArray && (
      <div className="tree-initial">{initialArray.join(", ")}</div>
    )}
    <div className="tree-branch">
      {left && <TreeNode {...left} />}
      {right && <TreeNode {...right} />}
    </div>
    <div className="tree-result">{result.join(", ")}</div>
  </div>
);

export default TreeNode;
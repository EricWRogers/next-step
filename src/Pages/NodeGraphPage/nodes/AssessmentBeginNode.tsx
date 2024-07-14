import type { Node, NodeProps } from "@xyflow/react";
import { Handle, Position } from "@xyflow/react";

export type AssessmentBeginNodeData = {
  label?: string;
};

export type AssessmentBeginNode = Node<AssessmentBeginNodeData>;

export default function AssessmentBeginNode({
  positionAbsoluteX,
  positionAbsoluteY,
  data,
}: NodeProps<AssessmentBeginNode>) {
  const x = `${Math.round(positionAbsoluteX)}px`;
  const y = `${Math.round(positionAbsoluteY)}px`;

  return (
    <div className="react-flow__node-default">
      {data.label && <div>{data.label}</div>}

      <Handle type="source" position={Position.Right} />
    </div>
  );
}
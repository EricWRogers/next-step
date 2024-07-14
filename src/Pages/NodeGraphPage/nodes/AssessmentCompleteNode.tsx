import type { Node, NodeProps } from "@xyflow/react";
import { Handle, Position } from "@xyflow/react";

export type AssessmentCompleteNodeData = {
  label?: string;
};

export type AssessmentCompleteNode = Node<AssessmentCompleteNodeData>;

export default function AssessmentCompleteNode({
  data,
}: NodeProps<AssessmentCompleteNode>) {
  return (
    <div className="react-flow__node-default">
      {data.label && <div>{data.label}</div>}

      <Handle type="target" position={Position.Left}/>
    </div>
  );
}
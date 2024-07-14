import { useState } from 'react';
import type { Node, NodeProps } from "@xyflow/react";
import { Handle, Position } from "@xyflow/react";

export type TrueFalseQuestionNodeData = {
  label?: string;
};

export type TrueFalseQuestionNode = Node<TrueFalseQuestionNodeData>;

export default function TrueFalseQuestionNode({
  data,
}: NodeProps<TrueFalseQuestionNode>) {
    const [dimensions, setDimensions] = useState({ width: 20, height: 20 });

    const positionHandle = (index: number) => {
        if (index === 1 || index === 2) {
            return (dimensions.height / 3) * index
        } else if (index === 3) {
            return 0
        } else if (index === 4) {
            return dimensions.height
        }
    }

  return (
    <div className="react-flow__node-default">
      {data.label && <div>{data.label}</div>}

      <Handle type="target" position={Position.Left}/>

      <Handle
            id="1"
            key={1}
            type="source"
            position={Position.Right}
            aria-label='true'
        />
        <Handle
            id="2"
            key={2}
            type="source"
            position={Position.Right}
            style={{ top: positionHandle(1) }}
            aria-label='false'
        />
    </div>
  );
}

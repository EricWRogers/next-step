// src/DiagramExample.tsx
import React from 'react';
import Diagram, { useSchema } from 'beautiful-react-diagrams';
import 'beautiful-react-diagrams/styles.css';
import { DiagramSchema } from 'beautiful-react-diagrams/@types/DiagramSchema';
import Button from 'beautiful-react-ui/@types/Button';

const DiagramExample: React.FC = () => {
  // define the initial schema
  const initialSchema: any = {
    nodes: [
      {
        id: 'node-1',
        content: 'Begin',
        coordinates: [150, 60],
        outputs: [{ id: 'port-1', alignment: 'right' }],
      },
      {
        id: 'node-2',
        content: 'End',
        coordinates: [350, 60],
        inputs: [{ id: 'port-2', alignment: 'right' }],
      },
    ],
    links: [
      { input: 'port-2', output: 'port-1' },
    ],
  };

  const [schema, { onChange, addNode, removeNode }] = useSchema(initialSchema);

  const addNewNode = (inputCount: number, outputCount: number) => {
    const newInputs = Array.from({ length: inputCount }, () => ({ id: `port-${Math.random()}` }));
    const newOutputs = Array.from({ length: outputCount }, () => ({ id: `port-${Math.random()}` }));

    const nextNode: any = {
      id: `node-${schema.nodes.length + 1}`,
      content: `Node ${schema.nodes.length + 1}`,
      coordinates: [
        schema.nodes[schema.nodes.length - 1].coordinates[0] + 100,
        schema.nodes[schema.nodes.length - 1].coordinates[1],
      ],
      inputs: newInputs,
      outputs: newOutputs,
    };

    addNode(nextNode);
  };

  return (
    <div style={{ height: '22.5rem' }}>
      <button color="primary" onClick={() => addNewNode(1, 4)}>Add Multi Choice</button>
      <button color="primary" onClick={() => addNewNode(1, 2)}>Add True & False</button>
      <Diagram schema={schema} onChange={onChange} />
    </div>
  );
};

export default DiagramExample;

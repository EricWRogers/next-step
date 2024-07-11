// src/DiagramExample.tsx
import React from 'react';
import Diagram, { useSchema } from 'beautiful-react-diagrams';
import 'beautiful-react-diagrams/styles.css';
import { DiagramSchema } from 'beautiful-react-diagrams/@types/DiagramSchema';
import Button from 'beautiful-react-ui/@types/Button';

const DiagramExample: React.FC = () => {
  // define the initial schema
  const initialSchema: DiagramSchema<unknown> = {
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

  const CustomNode = (props : any) => {
    const { inputs } = props;

    console.log(props);
    
    return (
      <div style={{ background: '#717EC3', borderRadius: '10px' }}>
        <div style={{ padding: '10px', color: 'white'  }}>
          Custom Node
        </div>
        <div style={{marginTop: '20px'}}>
          {inputs.map((port : any) => React.cloneElement(port, {
            style: { width: '50px', height: '25px', background: '#1B263B' }
          }))}
        </div>
      </div>
    );
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

    console.log(schema.nodes);
  };

  const addTrueAndFalseNode = () => {
    const nextNode: any = {
      id: `node-${schema.nodes.length + 1}`,
      content: `Node ${schema.nodes.length + 1}`,
      coordinates: [
        schema.nodes[schema.nodes.length - 1].coordinates[0] + 100,
        schema.nodes[schema.nodes.length - 1].coordinates[1],
      ],
      render: CustomNode,
      inputs: [ { id: `port-${Math.random()}` } ],
      outputs: [
        { id: `port-${Math.random()}` },
        { id: `port-${Math.random()}` },
      ],
    };

    addNode(nextNode);
  };

  return (
    <div style={{ height: '22.5rem' }}>
      <button color="primary" onClick={() => addNewNode(1, 4)}>Add Multi Choice</button>
      <button color="primary" onClick={() => addTrueAndFalseNode()}>Add True & False</button>
      <Diagram schema={schema} onChange={onChange} />
    </div>
  );
};

export default DiagramExample;

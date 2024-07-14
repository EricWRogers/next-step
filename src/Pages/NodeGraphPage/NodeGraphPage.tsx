import { useCallback } from "react";
import {
  Background,
  Controls,
  MiniMap,
  ReactFlow,
  addEdge,
  useNodesState,
  useEdgesState,
  type OnConnect,
  type Node,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";

import { nodeTypes, type CustomNodeType } from "./nodes";
import { initialEdges, edgeTypes, type CustomEdgeType } from "./edges";
 
const initialNodes = [
  {
      id: "a",
      type: "assessment-begin",
      position: { x: 0, y: 0 },
      data: { label: "Assessment Begin" },
  },
  {
      id: "b",
      type: "assessment-complete",
      position: { x: 200, y: 0 },
      data: { label: "Assessment Complete" },
  },
  {
      id: "c",
      type: "true-false-question",
      position: { x: 100, y: 100 },
      data: { label: "TF Question" },
  },
] satisfies Node[];

function DiagramExample() {
  const [nodes, , onNodesChange] = useNodesState<CustomNodeType>(initialNodes);
  const [edges, setEdges, onEdgesChange] =
    useEdgesState<CustomEdgeType>(initialEdges);
  const onConnect: OnConnect = useCallback(
    (connection) => setEdges((edges) => addEdge(connection, edges)),
    [setEdges]
  );
 
  return (
    <ReactFlow<CustomNodeType, CustomEdgeType>
      nodes={nodes}
      nodeTypes={nodeTypes}
      onNodesChange={onNodesChange}
      edges={edges}
      edgeTypes={edgeTypes}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      fitView
    >
      <Background />
      <MiniMap />
      <Controls />
    </ReactFlow>
  );
}

export default DiagramExample;
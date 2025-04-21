// src/components/Diagram.jsx
import ReactFlow, { Background, Controls } from 'reactflow';
import 'reactflow/dist/style.css';
import { Icon } from '@iconify/react';

function Diagram({ architecture }) {
  const { nodes: rawNodes, edges: rawEdges } = architecture;

  
  // Convert nodes from DSL format to React Flow format
  const nodes = Object.values(rawNodes).map((node, index) => ({
    id: node.id,
    type: 'default',
    data: {
      label: (
        <div className="flex flex-col items-center text-xs text-center">
          {node.icon && <Icon icon={node.icon} width={24} height={24} />}
          <div className="mt-1">{node.label || node.id}</div>
        </div>
      ),
    },
    position: { x: 150 * index, y: 100 * index }, // temporary layout
    style: {
      background: node.color || '#ffffff',
      borderRadius: 8,
      padding: 10,
      border: '1px solid #ccc',
      width: 120,
    },
  }));

  const edges = rawEdges.map((edge, i) => ({
    id: `e${i}`,
    source: edge.from,
    target: edge.to,
    type: 'smoothstep',
    animated: true,
  }));

  return (
    <div style={{ height: '90vh' }}>
      <ReactFlow nodes={nodes} edges={edges} fitView>
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}

export default Diagram;

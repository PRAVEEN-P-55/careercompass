import { useCallback } from 'react';
import ReactFlow, { Background, Controls, MiniMap, useNodesState, useEdgesState } from 'react-flow-renderer';

const initialNodes = [
  { id: '1', data: { label: 'B.Sc Computer Science' }, position: { x: 300, y: 50 }, style: { background: '#f8fafc', border: '2px solid #3b82f6', borderRadius: '8px', padding: '10px', fontWeight: 'bold' } },
  { id: '2', data: { label: 'Software Engineer' }, position: { x: 100, y: 150 }, style: { background: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px' } },
  { id: '3', data: { label: 'AI Engineer' }, position: { x: 500, y: 150 }, style: { background: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px' } },
  { id: '4', data: { label: 'Data Analyst' }, position: { x: 300, y: 200 }, style: { background: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px' } },
  { id: '5', data: { label: 'Cyber Security Analyst' }, position: { x: 50, y: 250 }, style: { background: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px' } },
  { id: '6', data: { label: 'Web Developer' }, position: { x: 550, y: 250 }, style: { background: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px' } },
];

const initialEdges = [
  { id: 'e1-2', source: '1', target: '2', animated: true, style: { stroke: '#94a3b8' } },
  { id: 'e1-3', source: '1', target: '3', animated: true, style: { stroke: '#94a3b8' } },
  { id: 'e1-4', source: '1', target: '4', animated: true, style: { stroke: '#94a3b8' } },
  { id: 'e2-5', source: '2', target: '5', style: { stroke: '#94a3b8' } },
  { id: 'e3-6', source: '3', target: '6', style: { stroke: '#94a3b8' } },
];

export function CareerMindMapPage() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  return (
    <div className="space-y-4 h-full flex flex-col">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Career Mind Map</h2>
        <p className="text-muted-foreground">Explore possible career branches after your course.</p>
      </div>

      <div className="flex-1 bg-card border rounded-xl shadow-sm min-h-[600px] overflow-hidden">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          fitView
        >
          <Background color="#f1f5f9" gap={16} />
          <Controls />
          <MiniMap />
        </ReactFlow>
      </div>
    </div>
  );
}

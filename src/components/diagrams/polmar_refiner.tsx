import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import {
  ReactFlow, useNodesState, useEdgesState,
  type Edge, MarkerType, Position, Background, Controls,
} from '@xyflow/react'

const baseStyle = { padding: '15px', borderRadius: '4px', border: '2px solid', textAlign: 'center' as const, fontSize: '13px', width: 220, color: '#000' }

const styles = {
  gray:   { ...baseStyle, background: '#f8f9fa', borderColor: '#6c757d' },
  blue:   { ...baseStyle, background: '#cce5ff', borderColor: '#0d6efd' },
  purple: { ...baseStyle, background: '#e2d4f0', borderColor: '#6f42c1' },
  orange: { ...baseStyle, background: '#ffe4b5', borderColor: '#fd7e14' },
  concat: { ...baseStyle, background: '#f8f9fa', borderColor: '#adb5bd', width: 60, height: 410, display: 'flex', alignItems: 'center', justifyContent: 'center', writingMode: 'vertical-rl' as const, letterSpacing: '4px', fontSize: '16px', fontWeight: 'bold' },
  green:  { ...baseStyle, background: '#d4edda', borderColor: '#28a745', width: 160, height: 350, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', fontWeight: 'bold' },
  white:  { ...baseStyle, background: '#ffffff', borderColor: '#000000', display: 'flex', alignItems: 'center', justifyContent: 'center', height: 120 },
}

const edgeOpts = { type: 'step', animated: true, markerEnd: { type: MarkerType.ArrowClosed, color: '#a9b0b7' }, style: { stroke: '#a9b0b7', strokeWidth: 2 } }

const initialEdges: Edge[] = [
  { id: 'e1', source: 'in1',     target: 'concat',  ...edgeOpts },
  { id: 'e2', source: 'in2',     target: 'concat',  ...edgeOpts },
  { id: 'e3', source: 'in3',     target: 'concat',  ...edgeOpts },
  { id: 'e4', source: 'in4',     target: 'concat',  ...edgeOpts },
  { id: 'e5', source: 'concat',  target: 'refiner', ...edgeOpts },
  { id: 'e6', source: 'refiner', target: 'out',     ...edgeOpts },
]

export default function DiagramRefiner() {
  const { t } = useTranslation()
  const n = (k: string) => t(`polmar.arch.nodes.${k}`)

  const makeLabel = (title: string, sub: string, opt: string) => (
    <div>
      <strong>{title}</strong><br />
      <span style={{ fontSize: '11px' }}>{sub}</span><br />
      <small style={{ color: '#666' }}>• {opt}</small>
    </div>
  )

  const nodes = useMemo(() => [
    { id: 'in1',     position: { x: 50,  y: 50  }, data: { label: makeLabel('Base',    n('baseImg'),   n('required'))   }, style: styles.gray,   sourcePosition: Position.Right },
    { id: 'in2',     position: { x: 50,  y: 150 }, data: { label: makeLabel('CircNet', n('circnetImg'),n('optional'))   }, style: styles.blue,   sourcePosition: Position.Right },
    { id: 'in3',     position: { x: 50,  y: 250 }, data: { label: makeLabel('SEG',     n('segMask'),   n('optional'))   }, style: styles.purple, sourcePosition: Position.Right },
    { id: 'in4',     position: { x: 50,  y: 350 }, data: { label: makeLabel('NMAR',    n('nmarImg'),   n('optional'))   }, style: styles.orange, sourcePosition: Position.Right },
    { id: 'concat',  position: { x: 350, y: 50  }, data: { label: n('concat') },        style: styles.concat, targetPosition: Position.Left, sourcePosition: Position.Right },
    { id: 'refiner', position: { x: 480, y: 80  }, data: { label: 'Refiner\nU-Net 2D' },style: styles.green,  targetPosition: Position.Left, sourcePosition: Position.Right },
    { id: 'out',     position: { x: 720, y: 195 }, data: { label: n('outputImg') },     style: styles.white,  targetPosition: Position.Left },
  // eslint-disable-next-line react-hooks/exhaustive-deps
  ], [t])

  const [nodeState, , onNodesChange] = useNodesState(nodes)
  const [edges, , onEdgesChange]     = useEdgesState(initialEdges)

  return (
    <div style={{ width: '100%', height: '560px' }}>
      <ReactFlow
        nodes={nodeState} edges={edges}
        onNodesChange={onNodesChange} onEdgesChange={onEdgesChange}
        nodesDraggable={false} nodesConnectable={false} elementsSelectable={false}
        panOnDrag={false} zoomOnScroll={false} zoomOnPinch={false} zoomOnDoubleClick={false}
        proOptions={{ hideAttribution: true }}
        fitView style={{ background: '#0a1424' }}
      >
        <Background color="#1e3a5f" gap={20} size={1.5} />
        <Controls showInteractive={false} style={{ background: '#dbeafe', borderRadius: '8px' }} />
      </ReactFlow>
    </div>
  )
}

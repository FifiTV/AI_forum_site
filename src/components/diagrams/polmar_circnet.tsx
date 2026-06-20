import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import {
  ReactFlow, useNodesState, useEdgesState,
  type Edge, MarkerType, Position, Background, Controls,
} from '@xyflow/react'

const baseStyle = { borderRadius: '6px', border: '2px solid', color: '#000', fontSize: '13px', textAlign: 'center' as const }

const styles = {
  whiteTitle: { ...baseStyle, background: '#fff', borderColor: '#000', padding: '10px 20px', fontWeight: 'bold' },
  blueBox:    { ...baseStyle, background: '#e7f1ff', borderColor: '#0d6efd', width: 400, padding: '15px' },
  greenBox:   { ...baseStyle, background: '#d1e7dd', borderColor: '#198754', width: 400, padding: '15px' },
}

const InnerConv = ({ title }: { title: string }) => (
  <div style={{ background: '#a3cfbb', border: '1px solid #198754', padding: '8px', borderRadius: '4px', fontWeight: 'bold', fontSize: '11px', color: '#0f5132' }}>
    {title}
  </div>
)

const edgeOpts = { animated: true, markerEnd: { type: MarkerType.ArrowClosed, color: '#a9b0b7' }, style: { stroke: '#a9b0b7', strokeWidth: 2 } }

const initialEdges: Edge[] = [
  { id: 'e1', source: 'in',  target: 'rp',  ...edgeOpts },
  { id: 'e2', source: 'rp',  target: 'au',  label: '[128, 1024]', labelStyle: { fill: '#93c5fd', fontWeight: 'bold', fontSize: 11 }, labelBgStyle: { fill: '#1e3a5f', fillOpacity: 1 }, labelBgPadding: [4, 6] as [number, number], labelBgBorderRadius: 4, ...edgeOpts },
  { id: 'e3', source: 'au',  target: 'out', label: '[1024, 512]', labelStyle: { fill: '#93c5fd', fontWeight: 'bold', fontSize: 11 }, labelBgStyle: { fill: '#1e3a5f', fillOpacity: 1 }, labelBgPadding: [4, 6] as [number, number], labelBgBorderRadius: 4, ...edgeOpts },
]

export default function DiagramCircNet() {
  const { t } = useTranslation()
  const n = (k: string) => t(`polmar.arch.nodes.${k}`)

  const nodes = useMemo(() => {
    const RadiusProjectorLabel = (
      <div>
        <h4 style={{ color: '#0d6efd', margin: '0 0 5px 0' }}>CircNet — RadiusProjector</h4>
        <i style={{ fontSize: '11px', color: '#555' }}>{n('mlpDesc')}</i>
        <hr style={{ borderColor: '#b6d4fe', margin: '10px 0' }} />
        <div>flatten: [2, 512] → [1024]</div><br />
        <div>Linear(1024 → 256) + LayerNorm + ReLU</div><br />
        <div>Linear(256 → F) + LayerNorm + ReLU</div><br />
        <div style={{ color: '#0d6efd', fontWeight: 'bold' }}>F = 128 (radius_features)<br />{n('rpOut')}: [128, 1024]</div>
      </div>
    )

    const AngleUNetLabel = (
      <div>
        <h4 style={{ color: '#198754', margin: '0 0 5px 0' }}>AngleUNet1D</h4>
        <i style={{ fontSize: '11px', color: '#555' }}>{n('unetDesc')}</i>
        <hr style={{ borderColor: '#a3cfbb', margin: '10px 0' }} />
        <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', marginBottom: '15px' }}>
          <span style={{ fontSize: '11px', fontWeight: 'bold', color: '#198754' }}>{n('encoder')}:</span>
          <InnerConv title="Conv1D 128 ch" /> → <InnerConv title="Conv1D 256 ch" /> → <InnerConv title="Conv1D 512 ch" />
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '15px', paddingRight: '20px' }}>
          <InnerConv title="BN 1024 ch (Bottleneck)" />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', marginBottom: '15px' }}>
          <span style={{ fontSize: '11px', fontWeight: 'bold', color: '#198754' }}>{n('decoder')}:</span>
          <InnerConv title="Conv1D 128 ch" /> ← <InnerConv title="Conv1D 256 ch" /> ← <InnerConv title="Conv1D 512 ch" />
        </div>
        <hr style={{ borderColor: '#a3cfbb', margin: '10px 0' }} />
        <div style={{ color: '#198754', fontWeight: 'bold' }}>
          {n('head')}: Conv1D(128, 512, 1) → Softplus<br />
          {n('auOut')}: [1024, 512]
        </div>
      </div>
    )

    return [
      { id: 'in',  position: { x: 100, y: 50  }, data: { label: `${n('input')}: [2, 1024, 512]` },                style: styles.whiteTitle, sourcePosition: Position.Bottom },
      { id: 'rp',  position: { x: 0,   y: 150 }, data: { label: RadiusProjectorLabel },                          style: styles.blueBox,    sourcePosition: Position.Bottom, targetPosition: Position.Top },
      { id: 'au',  position: { x: 0,   y: 480 }, data: { label: AngleUNetLabel },                                style: styles.greenBox,   sourcePosition: Position.Bottom, targetPosition: Position.Top },
      { id: 'out', position: { x: 75,  y: 880 }, data: { label: `${n('outputImg')}: c(θ,r) ≥ 0  [1024, 512]` }, style: styles.whiteTitle, targetPosition: Position.Top },
    ]
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [t])

  const [nodeState, , onNodesChange] = useNodesState(nodes)
  const [edges, , onEdgesChange]     = useEdgesState(initialEdges)

  return (
    <div style={{ width: '100%', height: '960px' }}>
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

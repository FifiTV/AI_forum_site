import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import {
  ReactFlow, useNodesState, useEdgesState,
  type Edge, MarkerType, Position, Background, Controls,
} from '@xyflow/react'

const base = { borderRadius: '8px', border: '2px solid', textAlign: 'center' as const, fontSize: '12px', color: '#000', padding: '10px 14px' }

const styles = {
  input:  { ...base, background: '#f1f5f9', borderColor: '#94a3b8', width: 160 },
  ec:     { ...base, background: '#dbeafe', borderColor: '#2563eb', width: 200, fontWeight: 'bold' },
  ea:     { ...base, background: '#ede9fe', borderColor: '#7c3aed', width: 200, fontWeight: 'bold' },
  sample: { ...base, background: '#f5f3ff', borderColor: '#8b5cf6', width: 180 },
  ga:     { ...base, background: '#d1fae5', borderColor: '#059669', width: 220, fontWeight: 'bold', fontSize: '13px' },
  da:     { ...base, background: '#fff7ed', borderColor: '#ea580c', width: 200, color: '#7c2d12' },
  output: { ...base, background: '#ffffff', borderColor: '#1e293b', width: 200, fontWeight: 'bold' },
}

const arrow      = { markerEnd: { type: MarkerType.ArrowClosed, color: '#94a3b8' }, style: { stroke: '#94a3b8', strokeWidth: 2 } }
const arrowBlue  = { markerEnd: { type: MarkerType.ArrowClosed, color: '#3b82f6' }, style: { stroke: '#3b82f6', strokeWidth: 2 } }
const arrowPurple= { markerEnd: { type: MarkerType.ArrowClosed, color: '#8b5cf6' }, style: { stroke: '#8b5cf6', strokeWidth: 2 } }
const arrowOrange= { markerEnd: { type: MarkerType.ArrowClosed, color: '#ea580c' }, style: { stroke: '#ea580c', strokeWidth: 2, strokeDasharray: '6,4' } }

const lbl = (text: string, color: string, bg: string) => ({
  labelStyle: { fill: color, fontSize: 10, fontWeight: 600 },
  labelBgStyle: { fill: bg, fillOpacity: 1 },
  labelBgPadding: [3, 5] as [number, number],
  labelBgBorderRadius: 3,
  label: text,
})

export default function DiagramMAGGNet() {
  const { t } = useTranslation()
  const n = (k: string) => t(`magnet.arch.nodes.${k}`)

  const nodes = useMemo(() => [
    { id: 'clean',    position: { x: 20,  y: 30  }, data: { label: n('cleanCT')    }, style: styles.input,  sourcePosition: Position.Bottom },
    { id: 'guidance', position: { x: 220, y: 30  }, data: { label: n('guidanceMap')}, style: styles.input,  sourcePosition: Position.Bottom },
    { id: 'phantom',  position: { x: 560, y: 30  }, data: { label: n('phantom')    }, style: styles.input,  sourcePosition: Position.Bottom },
    { id: 'ec',       position: { x: 90,  y: 190 }, data: { label: n('ec')         }, style: styles.ec,     sourcePosition: Position.Bottom, targetPosition: Position.Top },
    { id: 'ea',       position: { x: 520, y: 190 }, data: { label: n('ea')         }, style: styles.ea,     sourcePosition: Position.Bottom, targetPosition: Position.Top },
    { id: 'sample',   position: { x: 530, y: 360 }, data: { label: n('sample')     }, style: styles.sample, sourcePosition: Position.Left,   targetPosition: Position.Top },
    { id: 'ga',       position: { x: 240, y: 480 }, data: { label: n('ga')         }, style: styles.ga,     sourcePosition: Position.Bottom, targetPosition: Position.Top },
    { id: 'output',   position: { x: 255, y: 640 }, data: { label: n('outputCT')   }, style: styles.output, sourcePosition: Position.Bottom, targetPosition: Position.Top },
    { id: 'da',       position: { x: 255, y: 780 }, data: { label: n('da')         }, style: styles.da,     targetPosition: Position.Top },
  // eslint-disable-next-line react-hooks/exhaustive-deps
  ], [t])

  const e = (k: string) => t(`magnet.arch.edges.${k}`)

  const edges = useMemo((): Edge[] => [
    { id: 'e1', source: 'clean',   target: 'ec',     animated: true,  ...arrow },
    { id: 'e2', source: 'guidance',target: 'ec',     animated: true,  ...arrow },
    { id: 'e3', source: 'phantom', target: 'ea',     animated: true,  ...arrow },
    { id: 'e4', source: 'ec',      target: 'ga',     animated: true,  ...arrowBlue,   ...lbl(e('contentCode'), '#93c5fd', '#1e3a5f') },
    { id: 'e5', source: 'ea',      target: 'sample', animated: true,  ...arrowPurple, ...lbl('μ, σ', '#c4b5fd', '#2e1065') },
    { id: 'e6', source: 'sample',  target: 'ga',     animated: true,  ...arrowPurple, ...lbl(e('artifactCode'), '#c4b5fd', '#2e1065') },
    { id: 'e7', source: 'ga',      target: 'output', animated: true,  ...arrow },
    { id: 'e8', source: 'output',  target: 'da',     animated: false, ...arrowOrange, ...lbl(e('trainingOnly'), '#fdba74', '#431407') },
  // eslint-disable-next-line react-hooks/exhaustive-deps
  ], [t])

  const [nodeState, , onNodesChange] = useNodesState(nodes)
  const [edgeState, , onEdgesChange] = useEdgesState(edges)

  return (
    <div style={{ width: '100%', height: '900px' }}>
      <ReactFlow
        nodes={nodeState} edges={edgeState}
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

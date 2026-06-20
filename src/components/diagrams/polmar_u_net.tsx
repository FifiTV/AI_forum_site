import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import {
  ReactFlow, useNodesState, useEdgesState,
  type Edge, MarkerType, Position, Background, Controls,
} from '@xyflow/react'

const baseStyle = { padding: '12px', borderRadius: '8px', border: '2px solid', fontWeight: 'bold', textAlign: 'center' as const, fontSize: '12px', width: 180, color: '#000' }

const styles = {
  gray:   { ...baseStyle, background: '#f8f9fa', borderColor: '#adb5bd' },
  blue:   { ...baseStyle, background: '#e7f1ff', borderColor: '#0d6efd' },
  green:  { ...baseStyle, background: '#d1e7dd', borderColor: '#198754' },
  orange: { ...baseStyle, background: '#ffe8cc', borderColor: '#fd7e14' },
  yellow: { ...baseStyle, background: '#fff3cd', borderColor: '#ffc107' },
}

const arrow     = { markerEnd: { type: MarkerType.ArrowClosed, color: '#a9b0b7' }, style: { stroke: '#a9b0b7', strokeWidth: 2 } }
const arrowSkip = { markerEnd: { type: MarkerType.ArrowClosed, color: '#9b59b6' }, style: { stroke: '#9b59b6', strokeWidth: 2, strokeDasharray: '5,5' } }

const lblPool = { label: 'MaxPool 2×2',    labelStyle: { fill: '#93c5fd', fontSize: 11, fontWeight: 600 }, labelBgStyle: { fill: '#1e3a5f', fillOpacity: 1 }, labelBgPadding: [4, 6] as [number, number], labelBgBorderRadius: 4 }
const lblUp   = { label: 'ConvTranspose2d', labelStyle: { fill: '#fed7aa', fontSize: 11, fontWeight: 600 }, labelBgStyle: { fill: '#431407', fillOpacity: 1 }, labelBgPadding: [4, 6] as [number, number], labelBgBorderRadius: 4 }

const initialEdges: Edge[] = [
  { id: 'e-in', source: 'in',    target: 'enc1',  animated: true, ...arrow },
  { id: 'e-d1', source: 'enc1',  target: 'enc2',  animated: true, ...arrow, ...lblPool },
  { id: 'e-d2', source: 'enc2',  target: 'enc3',  animated: true, ...arrow, ...lblPool },
  { id: 'e-d3', source: 'enc3',  target: 'enc4',  type: 'step', animated: true, ...arrow, ...lblPool },
  { id: 'e-u1', source: 'enc4',  target: 'dec3',  type: 'step', animated: true, ...arrow, ...lblUp },
  { id: 'e-u2', source: 'dec3',  target: 'dec2',  animated: true, ...arrow, ...lblUp },
  { id: 'e-u3', source: 'dec2',  target: 'dec1',  animated: true, ...arrow, ...lblUp },
  { id: 'e-u4', source: 'dec1',  target: 'conv1', animated: true, ...arrow },
  { id: 'e-u5', source: 'conv1', target: 'out',   animated: true, ...arrow },
  { id: 's1',   source: 'enc1',  target: 'dec1',  animated: true, ...arrowSkip },
  { id: 's2',   source: 'enc2',  target: 'dec2',  animated: true, ...arrowSkip },
  { id: 's3',   source: 'enc3',  target: 'dec3',  animated: true, ...arrowSkip },
]

export default function DiagramUNet() {
  const { t } = useTranslation()
  const n = (k: string) => t(`polmar.arch.nodes.${k}`)

  const nodes = useMemo(() => [
    { id: 'in',    position: { x: 50,  y: 50   }, data: { label: `${n('input')}\n[C × 512 × 512]` },                            style: styles.gray,   sourcePosition: Position.Bottom },
    { id: 'enc1',  position: { x: 50,  y: 180  }, data: { label: 'enc1 · ConvBlock ×2\n128 f [512 × 512]' },                     style: styles.blue,   sourcePosition: Position.Bottom, targetPosition: Position.Top },
    { id: 'enc2',  position: { x: 50,  y: 310  }, data: { label: 'enc2 · ConvBlock ×2\n256 f [256 × 256]' },                     style: styles.blue,   sourcePosition: Position.Bottom, targetPosition: Position.Top },
    { id: 'enc3',  position: { x: 50,  y: 440  }, data: { label: 'enc3 · ConvBlock ×2\n512 f [128 × 128]' },                     style: styles.blue,   sourcePosition: Position.Bottom, targetPosition: Position.Top },
    { id: 'enc4',  position: { x: 300, y: 570  }, data: { label: `enc4 · ConvBlock ×2\n(bottleneck)\n1024 f [64 × 64]` },        style: styles.green,  sourcePosition: Position.Right, targetPosition: Position.Left },
    { id: 'dec3',  position: { x: 550, y: 440  }, data: { label: 'dec3 · UpConv\n+ ConvBlock ×2\n512 f [128 × 128]' },           style: styles.orange, sourcePosition: Position.Top, targetPosition: Position.Bottom },
    { id: 'dec2',  position: { x: 550, y: 310  }, data: { label: 'dec2 · UpConv\n+ ConvBlock ×2\n256 f [256 × 256]' },           style: styles.orange, sourcePosition: Position.Top, targetPosition: Position.Bottom },
    { id: 'dec1',  position: { x: 550, y: 180  }, data: { label: 'dec1 · UpConv\n+ ConvBlock ×2\n128 f [512 × 512]' },           style: styles.orange, sourcePosition: Position.Top, targetPosition: Position.Bottom },
    { id: 'conv1', position: { x: 550, y: 50   }, data: { label: 'Conv 1×1 → δ(x,y)\n[1 × 512 × 512]' },                        style: styles.yellow, sourcePosition: Position.Top, targetPosition: Position.Bottom },
    { id: 'out',   position: { x: 550, y: -80  }, data: { label: `Î = I_prior + (1-M)·δ\n${n('hardPaste')}` },                  style: styles.yellow, sourcePosition: Position.Top, targetPosition: Position.Bottom },
  // eslint-disable-next-line react-hooks/exhaustive-deps
  ], [t])

  const [nodeState, , onNodesChange] = useNodesState(nodes)
  const [edges, , onEdgesChange]     = useEdgesState(initialEdges)

  return (
    <div style={{ width: '100%', height: '760px' }}>
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

import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import {
  ReactFlow,
  useNodesState,
  useEdgesState,
  type Edge,
  MarkerType,
  Handle,
  Position,
  Background,
  Controls,
} from '@xyflow/react'

const baseStyle = {
  padding: '10px 15px',
  borderRadius: '8px',
  border: '2px solid',
  fontWeight: 'bold',
  textAlign: 'center' as const,
  color: '#1a2e1a',
  width: 160,
  fontSize: '13px',
}

const styles = {
  green:  { ...baseStyle, background: '#d4edda', borderColor: '#28a745' },
  orange: { ...baseStyle, background: '#ffe8cc', borderColor: '#fd7e14' },
  blue:   { ...baseStyle, background: '#cce5ff', borderColor: '#007bff', width: 220, padding: '20px' },
  gray:   { ...baseStyle, background: '#dde8dd', borderColor: '#4a7c59', width: 200 },
  yellow: { ...baseStyle, background: '#fff3cd', borderColor: '#ffc107', width: 120, borderRadius: '15px' },
  white:  { ...baseStyle, background: '#f0f7f0', borderColor: '#2d6a4f' },
}

const DiamondNode = ({ data }: { data: { label: string } }) => (
  <div style={{
    width: 100, height: 100, background: '#b7e4c7', border: '2px solid #40916c',
    transform: 'rotate(45deg)', display: 'flex', alignItems: 'center', justifyContent: 'center',
    borderRadius: '4px',
  }}>
    <div style={{ transform: 'rotate(-45deg)', fontWeight: 'bold', textAlign: 'center', fontSize: '12px', color: '#1b4332' }}>
      {data.label}
    </div>
    <Handle type="target" position={Position.Left} style={{ left: -5, top: '50%', transform: 'rotate(-45deg)' }} />
    <Handle type="source" position={Position.Bottom} style={{ left: '50%', bottom: -5, transform: 'rotate(-45deg)' }} />
  </div>
)

const nodeTypes = { diamond: DiamondNode }

const edgeBase = {
  type: 'smoothstep',
  animated: true,
  style: { stroke: '#52b788', strokeWidth: 2 },
  markerEnd: { type: MarkerType.ArrowClosed, color: '#52b788' },
}

export default function GVLDiagram() {
  const { t } = useTranslation()
  const n = (key: string) => t(`gvl.diagram.nodes.${key}`)
  const e = (key: string) => t(`gvl.diagram.edges.${key}`)

  const initialNodes = useMemo(() => [
    { id: 'ierr',       position: { x: 50,  y: 50  }, data: { label: 'I_error' },    style: styles.green },
    { id: 'iclean',     position: { x: 50,  y: 150 }, data: { label: 'I_clean' },    style: styles.green },
    { id: 'ytarget',    position: { x: 50,  y: 250 }, data: { label: n('ytarget') }, style: styles.orange },
    { id: 'yi',         position: { x: 50,  y: 550 }, data: { label: n('yi') },      style: styles.orange },
    { id: 'noise_proc', position: { x: 350, y: 50  }, data: { label: n('noise_proc') }, style: styles.gray },
    { id: 'unet',       position: { x: 340, y: 220 }, data: { label: n('unet') },    style: styles.blue },
    { id: 'time',       position: { x: 390, y: 350 }, data: { label: n('time') },    style: styles.yellow },
    { id: 'true_noise', position: { x: 650, y: 50  }, data: { label: n('true_noise') }, style: styles.white },
    { id: 'pred_noise', position: { x: 650, y: 230 }, data: { label: n('pred_noise') }, style: styles.white },
    { id: 'mse',        position: { x: 900, y: 140 }, data: { label: n('mse') },     style: styles.white },
    { id: 'gauss',      position: { x: 620, y: 535 }, data: { label: n('gauss') },   style: styles.gray },
    { id: 'sigma',      position: { x: 660, y: 450 }, data: { label: n('sigma') },   style: styles.yellow },
    { id: 'weight',     position: { x: 900, y: 550 }, data: { label: n('weight') },  style: styles.orange },
    { id: 'vicinal', type: 'diamond', position: { x: 1150, y: 320 }, data: { label: n('vicinal') } },
  ], [t])  // eslint-disable-line react-hooks/exhaustive-deps

  const initialEdges: Edge[] = useMemo(() => [
    { id: 'e1',  source: 'ierr',       target: 'noise_proc',  ...edgeBase },
    { id: 'e2',  source: 'iclean',     target: 'unet',        ...edgeBase },
    { id: 'e3',  source: 'ytarget',    target: 'unet',        ...edgeBase },
    { id: 'e4',  source: 'ytarget',    target: 'gauss',       ...edgeBase },
    { id: 'e5',  source: 'yi',         target: 'gauss',       ...edgeBase },
    { id: 'e6',  source: 'time',       target: 'unet',        ...edgeBase },
    { id: 'e7',  source: 'sigma',      target: 'gauss',       ...edgeBase },
    {
      id: 'e8', source: 'noise_proc', target: 'unet',
      label: e('noisyImage'),
      labelStyle: { fill: '#d8f3dc', fontWeight: 'bold', fontSize: '12px' },
      labelBgStyle: { fill: '#1b4332', fillOpacity: 0.7 },
      ...edgeBase,
    },
    { id: 'e9',  source: 'noise_proc', target: 'true_noise',  ...edgeBase },
    { id: 'e10', source: 'unet',       target: 'pred_noise',  ...edgeBase },
    { id: 'e11', source: 'true_noise', target: 'mse',         ...edgeBase },
    { id: 'e12', source: 'pred_noise', target: 'mse',         ...edgeBase },
    { id: 'e13', source: 'gauss',      target: 'weight',      ...edgeBase },
    { id: 'e14', source: 'mse',        target: 'vicinal',     ...edgeBase },
    { id: 'e15', source: 'weight',     target: 'vicinal',     ...edgeBase },
    {
      id: 'e16', source: 'vicinal', target: 'unet',
      type: 'smoothstep', animated: true,
      label: e('backprop'),
      labelStyle: { fill: '#ff6b6b', fontWeight: 'bold', fontSize: '12px' },
      labelBgStyle: { fill: '#1b0a0a', fillOpacity: 0.6 },
      style: { stroke: '#ff6b6b', strokeWidth: 2, strokeDasharray: '5,5' },
      markerEnd: { type: MarkerType.ArrowClosed, color: '#ff6b6b' },
    },
  ], [t])  // eslint-disable-line react-hooks/exhaustive-deps

  const [nodes, , onNodesChange] = useNodesState(initialNodes)
  const [edges, , onEdgesChange] = useEdgesState(initialEdges)

  return (
    <div className="rounded-xl overflow-hidden border border-green-800 shadow-2xl" style={{ height: '560px' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        nodesDraggable={false}
        nodesConnectable={false}
        elementsSelectable={false}
        proOptions={{ hideAttribution: true }}
        fitView
        style={{ background: '#0a1f14' }}
      >
        <Background color="#1a3d22" gap={20} size={1.5} />
        <Controls showInteractive={false} style={{ background: '#d8f3dc', borderRadius: '8px' }} />
      </ReactFlow>
    </div>
  )
}

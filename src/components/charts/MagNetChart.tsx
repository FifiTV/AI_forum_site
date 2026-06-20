import { useTranslation } from 'react-i18next'
import {
  BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, ReferenceLine,
  ResponsiveContainer, LabelList,
} from 'recharts'
import { Formula } from '../Formula'

const PURPLE = '#7c3aed'

export function MagNetChart() {
  const { t } = useTranslation()
  const c = (k: string) => t(`magnet.charts.${k}`)

  const data = [
    { name: c('clean'),   gcm: 0.6901 },
    { name: c('maggnet'), gcm: 0.5853 },
    { name: c('random'),  gcm: 0.3856 },
  ]

  const barColors = ['#94a3b8', PURPLE, '#f87171']

  return (
    <div className="flex flex-col gap-8 mt-2">
      {/* GCM Bar Chart */}
      <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
        <h3 className="text-base font-semibold text-gray-700 mb-1">{c('gcmTitle')}</h3>
        <p className="text-xs text-gray-400 mb-5">{c('gcmDesc')}</p>
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={data} barCategoryGap="35%" margin={{ top: 22, right: 20, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="name" tick={{ fontSize: 13 }} />
            <YAxis tick={{ fontSize: 12 }} domain={[0, 0.8]} />
            <ReferenceLine y={0.6901} stroke="#94a3b8" strokeDasharray="4 4"
              label={{ value: c('clean'), position: 'right', fontSize: 11 }} />
            <Bar dataKey="gcm" name="GCM" radius={[4, 4, 0, 0]}>
              {data.map((_, i) => <Cell key={i} fill={barColors[i]} />)}
              <LabelList dataKey="gcm" position="insideTop"
                style={{ fontSize: 11, fill: '#fff', fontWeight: 600 }}
                formatter={(v: unknown) => (v as number).toFixed(4)} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
        <p className="text-xs text-gray-400 mt-2 text-center">{c('lowerNote')}</p>
      </div>

      {/* GCM Formula */}
      <div className="bg-gray-950 rounded-xl p-6 border border-purple-900 shadow-inner">
        <p className="text-purple-400 text-xs font-mono uppercase tracking-widest mb-4">
          {t('magnet.arch.formula.label')}
        </p>
        <div className="flex justify-center overflow-x-auto py-2">
          <Formula
            latex="\text{GCM} = \cos(\nabla I_z,\,\nabla I_{z+1}) = \dfrac{\nabla I_z \cdot \nabla I_{z+1}}{\lVert\nabla I_z\rVert\,\lVert\nabla I_{z+1}\rVert + \varepsilon}"
            className="text-white"
          />
        </div>
        <p className="text-gray-400 text-sm mt-4 text-center">
          {t('magnet.arch.formula.description')}
        </p>
      </div>
    </div>
  )
}

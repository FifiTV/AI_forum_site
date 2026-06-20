import { useTranslation } from 'react-i18next'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend,
  ResponsiveContainer, ReferenceLine, LabelList,
} from 'recharts'
import { PolarTransformViz } from './PolarTransformViz'

const BLUE   = '#3b82f6'
const INDIGO = '#6366f1'

function ChartCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
      <h3 className="text-base font-semibold text-gray-700 mb-5">{title}</h3>
      {children}
    </div>
  )
}

export function PolMarCharts() {
  const { t } = useTranslation()
  const pl = t('polmar.charts', { returnObjects: true }) as Record<string, string>

  const circnetData = [
    { name: pl.mae,  Baseline: 46.82, CircNet: 42.59 },
    { name: pl.rmse, Baseline: 87.73, CircNet: 74.49 },
  ]

  const aapData = [
    { name: 'Baseline',          mae: 46.82 },
    { name: 'CircNet',           mae: 42.59 },
    { name: 'Base',              mae: 18.07 },
    { name: 'Base+NMAR',         mae: 18.02 },
    { name: 'Base+CircNet',      mae: 17.84 },
    { name: 'Base+NMAR+CircNet', mae: 17.85 },
  ]

  const jitterData = [
    { name: 'Baseline',          mae: 39.94 },
    { name: 'Base',              mae: 17.73 },
    { name: 'Base+CircNet',      mae: 16.30 },
    { name: 'Base+SEG',          mae: 18.16 },
    { name: 'Base+NMAR',         mae: 19.11 },
    { name: 'Base+NMAR+SEG',     mae: 17.89 },
    { name: 'Base+CircNet+SEG',  mae: 17.66 },
  ]

  return (
    <div className="flex flex-col gap-8 mt-2">
      {/* Polar transform visualization */}
      <PolarTransformViz />

      {/* Chart 1: CircNet standalone */}
      <ChartCard title={pl.circnetTitle}>
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={circnetData} barCategoryGap="35%" margin={{ top: 20, right: 20, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="name" tick={{ fontSize: 13 }} />
            <YAxis tick={{ fontSize: 12 }} />

            <Legend />
            <Bar dataKey="Baseline" fill="#94a3b8" radius={[4, 4, 0, 0]}>
              <LabelList dataKey="Baseline" position="insideTop" style={{ fontSize: 11, fill: '#fff', fontWeight: 600 }} formatter={(v) => (v as number).toFixed(2)} />
            </Bar>
            <Bar dataKey="CircNet" fill={BLUE} radius={[4, 4, 0, 0]}>
              <LabelList dataKey="CircNet" position="insideTop" style={{ fontSize: 11, fill: '#fff', fontWeight: 600 }} formatter={(v) => (v as number).toFixed(2)} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
        <p className="text-xs text-gray-400 mt-2 text-center">{pl.lowerIsBetter}</p>
      </ChartCard>

      {/* Chart 2: MAE on AAPM */}
      <ChartCard title={pl.aapTitle}>
        <ResponsiveContainer width="100%" height={290}>
          <BarChart data={aapData} barCategoryGap="30%" margin={{ top: 22, right: 40, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="name" tick={{ fontSize: 11 }} angle={-20} textAnchor="end" height={48} />
            <YAxis tick={{ fontSize: 12 }} label={{ value: 'MAE [HU]', angle: -90, position: 'insideLeft', offset: 10, fontSize: 12 }} />

            <ReferenceLine y={18.07} stroke="#94a3b8" strokeDasharray="4 4" label={{ value: 'Base', position: 'right', fontSize: 11 }} />
            <Bar dataKey="mae" name="MAE" fill={BLUE} radius={[4, 4, 0, 0]}>
              <LabelList dataKey="mae" position="insideTop" style={{ fontSize: 10, fill: '#fff', fontWeight: 600 }} formatter={(v) => (v as number).toFixed(2)} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
        <p className="text-xs text-gray-400 mt-2 text-center">{pl.lowerIsBetter}</p>
      </ChartCard>

      {/* Chart 3: MAE on Jitter */}
      <ChartCard title={pl.jitterTitle}>
        <ResponsiveContainer width="100%" height={290}>
          <BarChart data={jitterData} barCategoryGap="30%" margin={{ top: 22, right: 40, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="name" tick={{ fontSize: 11 }} angle={-20} textAnchor="end" height={48} />
            <YAxis tick={{ fontSize: 12 }} label={{ value: 'MAE [HU]', angle: -90, position: 'insideLeft', offset: 10, fontSize: 12 }} />

            <ReferenceLine y={17.73} stroke="#94a3b8" strokeDasharray="4 4" label={{ value: 'Base', position: 'right', fontSize: 11 }} />
            <Bar dataKey="mae" name="MAE" fill={INDIGO} radius={[4, 4, 0, 0]}>
              <LabelList dataKey="mae" position="insideTop" style={{ fontSize: 10, fill: '#fff', fontWeight: 600 }} formatter={(v) => (v as number).toFixed(2)} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
        <p className="text-xs text-gray-400 mt-2 text-center">{pl.lowerIsBetter}</p>
      </ChartCard>
    </div>
  )
}

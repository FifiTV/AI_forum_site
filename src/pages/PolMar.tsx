import { ApproachPage } from '../components/ApproachPage'
import { PolMarCharts } from '../components/charts/PolMarCharts'
import { PolMarArchitecture } from '../components/PolMarArchitecture'

const BASE = import.meta.env.BASE_URL

function PolMarExtra() {
  return (
    <div className="flex flex-col gap-8">
      <div className="rounded-xl overflow-hidden border border-blue-900 shadow-lg">
        <img
          src={`${BASE}imgs/polmar/quality.png`}
          alt="PolMAR quality comparison"
          className="w-full block"
        />
      </div>
      <PolMarCharts />
    </div>
  )
}

export function PolMar() {
  return (
    <ApproachPage
      ns="polmar"
      accentFrom="from-blue-600"
      accentTo="to-blue-900"
      extraContent={<PolMarExtra />}
      architectureContent={<PolMarArchitecture />}
    />
  )
}

import { ApproachPage } from '../components/ApproachPage'
import { PolMarCharts } from '../components/charts/PolMarCharts'
import { PolMarArchitecture } from '../components/PolMarArchitecture'

export function PolMar() {
  return (
    <ApproachPage
      ns="polmar"
      accentFrom="from-blue-600"
      accentTo="to-blue-900"
      extraContent={<PolMarCharts />}
      architectureContent={<PolMarArchitecture />}
    />
  )
}

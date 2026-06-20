import { ApproachPage } from '../components/ApproachPage'
import { MagNetChart } from '../components/charts/MagNetChart'
import { MagNetArchitecture } from '../components/MagNetArchitecture'

export function MAGNet() {
  return (
    <ApproachPage
      ns="magnet"
      accentFrom="from-purple-600"
      accentTo="to-purple-900"
      extraContent={<MagNetChart />}
      architectureContent={<MagNetArchitecture />}
    />
  )
}

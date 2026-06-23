import { ApproachPage } from '../components/ApproachPage'
import { MagNetChart } from '../components/charts/MagNetChart'
import { MagNetArchitecture } from '../components/MagNetArchitecture'

const BASE = import.meta.env.BASE_URL

function MagNetExtra() {
  return (
    <div className="flex flex-col gap-8">
      <div className="rounded-xl overflow-hidden border border-purple-900 shadow-lg">
        <img
          src={`${BASE}imgs/maggnet/maggnet.png`}
          alt="MAGGNet example output"
          className="w-full block"
        />
      </div>
      <MagNetChart />
    </div>
  )
}

export function MAGNet() {
  return (
    <ApproachPage
      ns="magnet"
      accentFrom="from-purple-600"
      accentTo="to-purple-900"
      extraContent={<MagNetExtra />}
      architectureContent={<MagNetArchitecture />}
    />
  )
}

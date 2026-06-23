import { useTranslation } from 'react-i18next'
import { ApproachPage } from '../components/ApproachPage'
import GVLDiagram from '../components/diagrams/gvl'
import { Formula } from '../components/Formula'

const BASE = import.meta.env.BASE_URL

function GVLArchitecture() {
  const { t, i18n } = useTranslation()

  return (
    <div className="flex flex-col gap-6">
      <GVLDiagram key={i18n.language} />

      <div className="bg-gray-950 rounded-xl p-6 border border-green-900 shadow-inner">
        <p className="text-green-400 text-xs font-mono uppercase tracking-widest mb-4">
          {t('gvl.diagram.formula.label')}
        </p>
        <div className="flex justify-center overflow-x-auto py-2">
          <Formula
            latex="w_i = \exp\!\left(-\frac{\|y_i - y_{\text{target}}\|^2}{2\sigma^2}\right)"
            className="text-white"
          />
        </div>
        <p className="text-gray-400 text-sm mt-4 text-center">
          {t('gvl.diagram.formula.description', {
            yi: 'yᵢ',
            ytarget: 'y_target',
            sigma: 'σ',
          })}
        </p>
      </div>
    </div>
  )
}

export function GaussianVicinalLoss() {
  return (
    <ApproachPage
      ns="gvl"
      accentFrom="from-green-600"
      accentTo="to-green-900"
      extraContent={
        <div className="rounded-xl overflow-hidden border border-green-900 shadow-lg">
          <img
            src={`${BASE}imgs/gvl/gauss.png`}
            alt="Gaussian Vicinal Loss example"
            className="w-full block"
          />
        </div>
      }
      architectureContent={<GVLArchitecture />}
    />
  )
}

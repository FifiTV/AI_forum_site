import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import DiagramRefiner from './diagrams/polmar_refiner'
import DiagramUNet from './diagrams/polmar_u_net'
import DiagramCircNet from './diagrams/polmar_circnet'

const TABS = ['refiner', 'unet', 'circnet'] as const
type Tab = typeof TABS[number]

export function PolMarArchitecture() {
  const [active, setActive] = useState<Tab>('refiner')
  const { t, i18n } = useTranslation()

  const descriptions: Record<Tab, string> = {
    refiner: t('polmar.arch.refinerDesc'),
    unet:    t('polmar.arch.unetDesc'),
    circnet: t('polmar.arch.circnetDesc'),
  }

  return (
    <section className="mt-10 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto pb-12">
      {/* Tab bar */}
      <div className="flex gap-2 mb-3 flex-wrap">
        {TABS.map(tab => (
          <button
            key={tab}
            onClick={() => setActive(tab)}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors border ${
              active === tab
                ? 'bg-blue-600 text-white border-blue-600 shadow'
                : 'bg-white text-gray-600 border-gray-200 hover:border-blue-400 hover:text-blue-600'
            }`}
          >
            {t(`polmar.arch.${tab}`)}
          </button>
        ))}
      </div>

      <p className="text-gray-500 text-sm mb-4">{descriptions[active]}</p>

      {/* Diagram container — key forces remount on language change */}
      <div className="rounded-xl overflow-hidden border border-blue-900 shadow-2xl">
        {active === 'refiner' && <DiagramRefiner key={`refiner-${i18n.language}`} />}
        {active === 'unet'    && <DiagramUNet    key={`unet-${i18n.language}`} />}
        {active === 'circnet' && <DiagramCircNet key={`circnet-${i18n.language}`} />}
      </div>
    </section>
  )
}

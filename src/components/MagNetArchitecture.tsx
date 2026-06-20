import { useTranslation } from 'react-i18next'
import DiagramMAGGNet from './diagrams/magnet'

export function MagNetArchitecture() {
  const { t, i18n } = useTranslation()

  return (
    <section className="mt-10 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto pb-12">
      <p className="text-gray-500 text-sm mb-4">{t('magnet.arch.title')}</p>
      <div className="rounded-xl overflow-hidden border border-purple-900 shadow-2xl">
        <DiagramMAGGNet key={i18n.language} />
      </div>
    </section>
  )
}

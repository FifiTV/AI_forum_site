import { useTranslation } from 'react-i18next'

interface ApproachPageProps {
  ns: 'polmar' | 'magnet' | 'gvl'
  accentFrom: string
  accentTo: string
}

export function ApproachPage({ ns, accentFrom, accentTo }: ApproachPageProps) {
  const { t } = useTranslation()

  const sections = ['overview', 'method', 'results', 'architecture'] as const

  return (
    <div>
      {/* Header */}
      <section className={`bg-gradient-to-br ${accentFrom} ${accentTo} text-white py-16 px-4`}>
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-3">
            {t(`${ns}.title`)}
          </h1>
          <p className="text-xl font-light opacity-90">{t(`${ns}.subtitle`)}</p>
        </div>
      </section>

      {/* Sections */}
      <div className="max-w-4xl mx-auto px-4 py-14 flex flex-col gap-12">
        {sections.map((section) => (
          <section key={section}>
            <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">
              {t(`${ns}.sections.${section}.heading`)}
            </h2>
            <p className="text-gray-600 leading-relaxed">
              {t(`${ns}.sections.${section}.body`)}
            </p>
          </section>
        ))}
      </div>
    </div>
  )
}

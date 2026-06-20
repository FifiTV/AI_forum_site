import { type ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { MarkdownContent } from './MarkdownContent'

interface ApproachPageProps {
  ns: 'polmar' | 'magnet' | 'gvl'
  accentFrom: string
  accentTo: string
  architectureContent?: ReactNode
}

export function ApproachPage({ ns, accentFrom, accentTo, architectureContent }: ApproachPageProps) {
  const { t } = useTranslation()

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

      {/* Markdown content */}
      <div className="max-w-4xl mx-auto px-4 py-14">
        <MarkdownContent page={ns} />

        {/* Architecture section */}
        {architectureContent && (
          <div className="mt-10">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">
              {t(`${ns}.sections.architecture.heading`)}
            </h2>
            {architectureContent}
          </div>
        )}
      </div>
    </div>
  )
}

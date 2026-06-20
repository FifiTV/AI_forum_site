import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { ImageCompareSlider } from '../components/ImageCompareSlider'

const APPROACHES = [
  { key: 'polmar', to: '/polmar', color: 'from-blue-500 to-blue-700',   border: 'border-blue-100'   },
  { key: 'magnet', to: '/magnet', color: 'from-purple-500 to-purple-700', border: 'border-purple-100' },
  { key: 'gvl',   to: '/gvl',   color: 'from-green-500 to-green-700',   border: 'border-green-100'  },
] as const

export function Home() {
  const { t } = useTranslation()
  const BASE = import.meta.env.BASE_URL

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-700 to-blue-900 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <img
            src={`${BASE}imgs/smartudl.png`}
            alt="SmartUDL"
            className="h-24 w-auto mx-auto mb-6 drop-shadow-lg"
          />
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 leading-tight">
            {t('home.title')}
          </h1>
          <p className="text-xl sm:text-2xl font-light text-blue-100 mb-4">
            {t('home.subtitle')}
          </p>
          <p className="text-base text-blue-200 max-w-2xl mx-auto leading-relaxed">
            {t('home.description')}
          </p>
        </div>
      </section>

      {/* Image comparison slider */}
      <section className="bg-gray-950 py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-3">
            {t('home.slider.title')}
          </h2>
          <p className="text-gray-400 text-center mb-10 max-w-lg mx-auto leading-relaxed">
            {t('home.slider.caption')}
          </p>
          <div className="max-w-md mx-auto">
            <ImageCompareSlider
              leftSrc={`${BASE}imgs/home/artifact.png`}
              rightSrc={`${BASE}imgs/home/clear.png`}
              leftLabel={t('home.slider.artifact')}
              rightLabel={t('home.slider.clean')}
            />
          </div>
        </div>
      </section>

      {/* Approach cards */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">
          {t('home.approachesTitle')}
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {APPROACHES.map(({ key, to, color, border }) => (
            <div
              key={key}
              className={`bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow overflow-hidden flex flex-col border ${border}`}
            >
              <div className={`bg-gradient-to-r ${color} h-1.5`} />
              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  {t(`home.${key}.title`)}
                </h3>
                <p className="text-gray-600 text-sm flex-1 leading-relaxed">
                  {t(`home.${key}.description`)}
                </p>
                <Link
                  to={to}
                  className={`mt-6 inline-block text-center bg-gradient-to-r ${color} text-white text-sm font-semibold px-5 py-2.5 rounded-lg hover:opacity-90 transition-opacity`}
                >
                  {t(`home.${key}.learnMore`)} →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

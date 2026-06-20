import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

export function Home() {
  const { t } = useTranslation()

  const approaches = [
    {
      key: 'polmar',
      to: '/polmar',
      color: 'from-blue-500 to-blue-700',
      icon: '🔵',
    },
    {
      key: 'magnet',
      to: '/magnet',
      color: 'from-purple-500 to-purple-700',
      icon: '🟣',
    },
    {
      key: 'gvl',
      to: '/gvl',
      color: 'from-green-500 to-green-700',
      icon: '🟢',
    },
  ] as const

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-700 to-blue-900 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <img
            src="/AI_forum_site/imgs/smartudl.png"
            alt="SmartUDL"
            className="h-24 w-auto mx-auto mb-6 drop-shadow-lg"
          />
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 leading-tight">
            {t('home.title')}
          </h1>
          <p className="text-xl sm:text-2xl font-light text-blue-100 mb-6">
            {t('home.subtitle')}
          </p>
          <p className="text-base text-blue-200 max-w-2xl mx-auto">
            {t('home.description')}
          </p>
        </div>
      </section>

      {/* Cards */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">
          {t('home.approachesTitle')}
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {approaches.map(({ key, to, color }) => (
            <div
              key={key}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow overflow-hidden flex flex-col"
            >
              <div className={`bg-gradient-to-br ${color} h-2`} />
              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  {t(`home.${key}.title`)}
                </h3>
                <p className="text-gray-600 text-sm flex-1">
                  {t(`home.${key}.description`)}
                </p>
                <Link
                  to={to}
                  className={`mt-5 inline-block text-center bg-gradient-to-r ${color} text-white text-sm font-semibold px-5 py-2.5 rounded-lg hover:opacity-90 transition-opacity`}
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

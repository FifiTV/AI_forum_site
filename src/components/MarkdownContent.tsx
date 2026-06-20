import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

interface MarkdownContentProps {
  page: 'gvl' | 'polmar' | 'magnet'
}

export function MarkdownContent({ page }: MarkdownContentProps) {
  const { i18n } = useTranslation()
  const [content, setContent] = useState<string>('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const lang = i18n.language === 'pl' ? 'pl' : 'en'
    const url = `${import.meta.env.BASE_URL}content/${page}/${lang}.md`

    setLoading(true)
    fetch(url)
      .then((r) => r.text())
      .then((text) => { setContent(text); setLoading(false) })
      .catch(() => { setContent(''); setLoading(false) })
  }, [page, i18n.language])

  if (loading) {
    return <div className="animate-pulse h-48 bg-gray-100 rounded-lg" />
  }

  return (
    <Markdown
      remarkPlugins={[remarkGfm]}
      components={{
        h2: ({ children }) => (
          <h2 className="text-2xl font-bold text-gray-800 mt-10 mb-4 border-b pb-2 first:mt-0">
            {children}
          </h2>
        ),
        p: ({ children }) => (
          <p className="text-gray-600 leading-relaxed mb-4">{children}</p>
        ),
        ul: ({ children }) => (
          <ul className="list-disc list-inside text-gray-600 mb-4 space-y-1">{children}</ul>
        ),
        li: ({ children }) => <li>{children}</li>,
        strong: ({ children }) => (
          <strong className="font-semibold text-gray-800">{children}</strong>
        ),
        table: ({ children }) => (
          <div className="overflow-x-auto my-6">
            <table className="w-full text-sm border-collapse">{children}</table>
          </div>
        ),
        thead: ({ children }) => (
          <thead className="bg-gray-100 text-gray-700">{children}</thead>
        ),
        th: ({ children }) => (
          <th className="px-4 py-3 text-left font-semibold border border-gray-200 whitespace-nowrap">
            {children}
          </th>
        ),
        tbody: ({ children }) => (
          <tbody className="divide-y divide-gray-100">{children}</tbody>
        ),
        tr: ({ children }) => (
          <tr className="hover:bg-gray-50 transition-colors">{children}</tr>
        ),
        td: ({ children }) => (
          <td className="px-4 py-3 text-gray-600 border border-gray-200">{children}</td>
        ),
      }}
    >
      {content}
    </Markdown>
  )
}

import { useTranslation } from 'react-i18next'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

interface MarkdownContentProps {
  page: 'gvl' | 'polmar' | 'magnet'
}

export function MarkdownContent({ page }: MarkdownContentProps) {
  const { t } = useTranslation()
  const content = t(`${page}.text`)

  return (
    <Markdown
      remarkPlugins={[remarkGfm]}
      components={{
        h2: ({ children }) => (
          <h2 className="text-2xl font-bold text-gray-800 mt-10 mb-4 border-b pb-2 first:mt-0">
            {children}
          </h2>
        ),
        h3: ({ children }) => (
          <h3 className="text-lg font-semibold text-gray-700 mt-6 mb-3">
            {children}
          </h3>
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

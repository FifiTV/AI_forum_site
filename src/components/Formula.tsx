import katex from 'katex'
import 'katex/dist/katex.min.css'

interface FormulaProps {
  latex: string
  display?: boolean
  className?: string
}

export function Formula({ latex, display = true, className = '' }: FormulaProps) {
  const html = katex.renderToString(latex, { throwOnError: false, displayMode: display })
  return (
    <span
      className={className}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}

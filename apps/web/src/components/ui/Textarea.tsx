import { type TextareaHTMLAttributes, forwardRef } from 'react'

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string
  error?: string
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, id, className = '', ...props }, ref) => {
    const textareaId = id ?? label.toLowerCase().replace(/\s+/g, '-')

    return (
      <div className="space-y-2">
        <label htmlFor={textareaId} className="block text-sm font-medium text-plum">
          {label}
        </label>
        <textarea
          ref={ref}
          id={textareaId}
          rows={4}
          className={`w-full resize-none rounded-xl border border-blush bg-white/80 px-4 py-3 text-charcoal placeholder:text-charcoal/40 transition-colors focus:border-rose-deep focus:outline-none focus:ring-2 focus:ring-rose-deep/20 ${error ? 'border-red-400' : ''} ${className}`}
          {...props}
        />
        {error && <p className="text-sm text-red-500">{error}</p>}
      </div>
    )
  },
)

Textarea.displayName = 'Textarea'

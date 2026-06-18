import { type InputHTMLAttributes, forwardRef } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, id, className = '', ...props }, ref) => {
    const inputId = id ?? label.toLowerCase().replace(/\s+/g, '-')

    return (
      <div className="space-y-2">
        <label htmlFor={inputId} className="block text-sm font-medium text-plum">
          {label}
        </label>
        <input
          ref={ref}
          id={inputId}
          className={`w-full rounded-xl border border-blush bg-white/80 px-4 py-3 text-charcoal placeholder:text-charcoal/40 transition-colors focus:border-rose-deep focus:outline-none focus:ring-2 focus:ring-rose-deep/20 ${error ? 'border-red-400' : ''} ${className}`}
          {...props}
        />
        {error && <p className="text-sm text-red-500">{error}</p>}
      </div>
    )
  },
)

Input.displayName = 'Input'

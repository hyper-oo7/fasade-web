import { type SelectHTMLAttributes, forwardRef } from 'react'

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string
  options: readonly string[]
  placeholder?: string
  error?: string
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, options, placeholder = 'Select an option', error, id, className = '', ...props }, ref) => {
    const selectId = id ?? label.toLowerCase().replace(/\s+/g, '-')

    return (
      <div className="space-y-2">
        <label htmlFor={selectId} className="block text-sm font-medium text-plum">
          {label}
        </label>
        <select
          ref={ref}
          id={selectId}
          className={`w-full appearance-none rounded-xl border border-blush bg-white/80 px-4 py-3 text-charcoal transition-colors focus:border-rose-deep focus:outline-none focus:ring-2 focus:ring-rose-deep/20 ${error ? 'border-red-400' : ''} ${className}`}
          {...props}
        >
          <option value="">{placeholder}</option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        {error && <p className="text-sm text-red-500">{error}</p>}
      </div>
    )
  },
)

Select.displayName = 'Select'

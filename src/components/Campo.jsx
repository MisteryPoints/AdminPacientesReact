import { CircleAlert } from 'lucide-react'

const Campo = ({
  id,
  etiqueta,
  icono: Icono,
  error,
  ayuda,
  className = '',
  as: Control = 'input',
  ...props
}) => {
  const descripcion = error ? `${id}-error` : ayuda ? `${id}-ayuda` : undefined

  return (
    <div>
      <label
        htmlFor={id}
        className="mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-300"
      >
        {etiqueta}
      </label>
      <div className="relative">
        {Icono && (
          <Icono
            className="pointer-events-none absolute top-3 left-3 size-4 text-zinc-400"
            aria-hidden
          />
        )}
        <Control
          id={id}
          name={id}
          aria-invalid={Boolean(error)}
          aria-describedby={descripcion}
          className={`w-full rounded-xl border bg-white px-3 py-2.5 text-sm shadow-xs transition outline-none placeholder:text-zinc-400 focus:ring-4 dark:bg-zinc-950 ${
            Icono ? 'pl-10' : ''
          } ${
            error
              ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-500/15 dark:border-rose-500/60'
              : 'border-zinc-200 focus:border-indigo-500 focus:ring-indigo-500/15 dark:border-zinc-800'
          } ${className}`}
          {...props}
        />
      </div>
      {error ? (
        <p
          id={`${id}-error`}
          className="mt-1.5 flex items-center gap-1.5 text-xs text-rose-600 dark:text-rose-400"
        >
          <CircleAlert className="size-3.5 shrink-0" aria-hidden />
          {error}
        </p>
      ) : (
        ayuda && (
          <p
            id={`${id}-ayuda`}
            className="mt-1.5 text-right text-xs text-zinc-400 tabular-nums"
          >
            {ayuda}
          </p>
        )
      )}
    </div>
  )
}

export default Campo

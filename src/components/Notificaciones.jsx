import { CircleCheck, Trash2, X } from 'lucide-react'

const TONOS = {
  exito: { icono: CircleCheck, clase: 'text-emerald-500' },
  peligro: { icono: Trash2, clase: 'text-rose-500' },
}

const Notificaciones = ({ toasts, onCerrar }) => (
  <div
    aria-live="polite"
    className="pointer-events-none fixed inset-x-4 bottom-4 z-50 flex flex-col items-center gap-2 sm:inset-x-auto sm:right-6 sm:bottom-6 sm:items-end"
  >
    {toasts.map(({ id, mensaje, tono, accion }) => {
      const { icono: Icono, clase } = TONOS[tono]
      return (
        <div
          key={id}
          role="status"
          className="pointer-events-auto flex w-full max-w-sm animate-slide-up items-center gap-3 rounded-xl border border-zinc-200 bg-white py-3 pr-2 pl-4 text-sm shadow-xl shadow-zinc-900/10 dark:border-zinc-800 dark:bg-zinc-900 dark:shadow-black/40"
        >
          <Icono className={`size-5 shrink-0 ${clase}`} aria-hidden />
          <p className="flex-1">{mensaje}</p>
          {accion && (
            <button
              type="button"
              onClick={() => {
                accion.alHacerClick()
                onCerrar(id)
              }}
              className="cursor-pointer rounded-lg px-2.5 py-1 font-medium text-indigo-600 transition hover:bg-indigo-500/10 dark:text-indigo-400"
            >
              {accion.etiqueta}
            </button>
          )}
          <button
            type="button"
            onClick={() => onCerrar(id)}
            aria-label="Cerrar notificación"
            className="grid size-7 cursor-pointer place-items-center rounded-lg text-zinc-400 transition hover:bg-zinc-100 hover:text-zinc-600 dark:hover:bg-zinc-800 dark:hover:text-zinc-200"
          >
            <X className="size-4" />
          </button>
        </div>
      )
    })}
  </div>
)

export default Notificaciones

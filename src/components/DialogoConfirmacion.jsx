import { useEffect, useRef } from 'react'
import { TriangleAlert } from 'lucide-react'

const DialogoConfirmacion = ({ paciente, onConfirmar, onCancelar }) => {
  const dialogoRef = useRef(null)

  // Sincroniza el <dialog> nativo (foco atrapado y Escape incluidos)
  useEffect(() => {
    const dialogo = dialogoRef.current
    if (paciente && !dialogo.open) dialogo.showModal()
    if (!paciente && dialogo.open) dialogo.close()
  }, [paciente])

  return (
    <dialog
      ref={dialogoRef}
      onClose={onCancelar}
      onClick={(e) => e.target === dialogoRef.current && onCancelar()}
      aria-labelledby="titulo-dialogo"
      className="m-auto w-[calc(100%-2rem)] max-w-md rounded-2xl border border-zinc-200 bg-white p-0 text-zinc-900 shadow-2xl backdrop:bg-zinc-950/50 backdrop:backdrop-blur-sm open:animate-slide-up dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100"
    >
      <div className="p-6">
        <div className="flex gap-4">
          <span className="grid size-11 shrink-0 place-items-center rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-400">
            <TriangleAlert className="size-5" aria-hidden />
          </span>
          <div>
            <h2 id="titulo-dialogo" className="font-semibold tracking-tight">
              ¿Eliminar a {paciente?.nombre}?
            </h2>
            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
              Se eliminará el registro del paciente. Podrás deshacerlo durante
              unos segundos.
            </p>
          </div>
        </div>
        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onCancelar}
            autoFocus
            className="cursor-pointer rounded-xl border border-zinc-200 px-4 py-2 text-sm font-medium transition hover:bg-zinc-100 focus-visible:ring-4 focus-visible:ring-zinc-500/20 focus-visible:outline-none dark:border-zinc-700 dark:hover:bg-zinc-800"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={onConfirmar}
            className="cursor-pointer rounded-xl bg-rose-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-rose-700 focus-visible:ring-4 focus-visible:ring-rose-500/30 focus-visible:outline-none"
          >
            Eliminar
          </button>
        </div>
      </div>
    </dialog>
  )
}

export default DialogoConfirmacion

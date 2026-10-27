import { Calendar, Mail, Pencil, Trash2 } from 'lucide-react'
import { diasHasta, fechaRelativa, formatearFecha } from '../utils/fechas'

const AVATARES = [
  'from-indigo-500 to-violet-500',
  'from-sky-500 to-cyan-500',
  'from-emerald-500 to-teal-500',
  'from-amber-500 to-orange-500',
  'from-rose-500 to-pink-500',
]

// Color estable por nombre para que cada mascota mantenga su avatar
const colorAvatar = (nombre) =>
  AVATARES[
    [...nombre].reduce((suma, letra) => suma + letra.charCodeAt(0), 0) %
      AVATARES.length
  ]

const estado = (fecha) => {
  const dias = diasHasta(fecha)
  if (dias === 0)
    return {
      texto: 'Hoy',
      clase: 'bg-amber-500/10 text-amber-700 dark:text-amber-400',
    }
  if (dias > 0)
    return {
      texto: 'Próxima',
      clase: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400',
    }
  return {
    texto: 'Completada',
    clase: 'bg-zinc-500/10 text-zinc-600 dark:text-zinc-400',
  }
}

const botonIcono =
  'grid size-9 cursor-pointer place-items-center rounded-lg text-zinc-500 transition focus-visible:ring-4 focus-visible:outline-none dark:text-zinc-400'

const Paciente = ({ paciente, activo, onEditar, onEliminar }) => {
  const { nombre, propietario, email, fecha, sintomas } = paciente
  const { texto, clase } = estado(fecha)

  return (
    <article
      className={`group flex animate-slide-up flex-col rounded-2xl border bg-white p-5 shadow-xs transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-zinc-900/5 dark:bg-zinc-900 dark:hover:shadow-black/30 ${
        activo
          ? 'border-indigo-400 ring-4 ring-indigo-500/10 dark:border-indigo-500/60'
          : 'border-zinc-200 dark:border-zinc-800'
      }`}
    >
      <div className="flex items-start gap-3">
        <span
          className={`grid size-11 shrink-0 place-items-center rounded-xl bg-linear-to-br text-lg font-semibold text-white ${colorAvatar(nombre)}`}
          aria-hidden
        >
          {nombre.charAt(0).toUpperCase()}
        </span>
        <div className="min-w-0 flex-1">
          <h3 className="truncate font-semibold tracking-tight">{nombre}</h3>
          <p className="truncate text-sm text-zinc-500 dark:text-zinc-400">
            de {propietario}
          </p>
        </div>
        <span
          className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-medium ${clase}`}
        >
          {texto}
        </span>
      </div>

      <dl className="mt-4 space-y-2 text-sm">
        <div className="flex items-center gap-2 text-zinc-600 dark:text-zinc-300">
          <dt>
            <Mail className="size-4 text-zinc-400" aria-label="Email" />
          </dt>
          <dd className="min-w-0 truncate">
            <a
              href={`mailto:${email}`}
              className="hover:text-indigo-600 hover:underline dark:hover:text-indigo-400"
            >
              {email}
            </a>
          </dd>
        </div>
        <div className="flex items-center gap-2 text-zinc-600 dark:text-zinc-300">
          <dt>
            <Calendar
              className="size-4 text-zinc-400"
              aria-label="Fecha de alta"
            />
          </dt>
          <dd>
            <time dateTime={fecha}>{formatearFecha(fecha)}</time>
            <span className="text-zinc-400"> · {fechaRelativa(fecha)}</span>
          </dd>
        </div>
      </dl>

      <p className="mt-4 line-clamp-3 flex-1 rounded-xl bg-zinc-50 p-3 text-sm text-zinc-600 dark:bg-zinc-950/60 dark:text-zinc-400">
        {sintomas}
      </p>

      <div className="mt-4 flex justify-end gap-1 border-t border-zinc-100 pt-3 dark:border-zinc-800">
        <button
          type="button"
          onClick={() => onEditar(paciente)}
          aria-label={`Editar a ${nombre}`}
          title="Editar"
          className={`${botonIcono} hover:bg-indigo-500/10 hover:text-indigo-600 focus-visible:ring-indigo-500/20 dark:hover:text-indigo-400`}
        >
          <Pencil className="size-4" />
        </button>
        <button
          type="button"
          onClick={() => onEliminar(paciente)}
          aria-label={`Eliminar a ${nombre}`}
          title="Eliminar"
          className={`${botonIcono} hover:bg-rose-500/10 hover:text-rose-600 focus-visible:ring-rose-500/20 dark:hover:text-rose-400`}
        >
          <Trash2 className="size-4" />
        </button>
      </div>
    </article>
  )
}

export default Paciente

import { CalendarCheck, CalendarClock, Contact, PawPrint } from 'lucide-react'
import { diasHasta, esEsteMes } from '../utils/fechas'

const Estadisticas = ({ pacientes }) => {
  const tarjetas = [
    {
      etiqueta: 'Pacientes',
      valor: pacientes.length,
      icono: PawPrint,
      color: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400',
    },
    {
      etiqueta: 'Próximas altas',
      valor: pacientes.filter((p) => diasHasta(p.fecha) >= 0).length,
      icono: CalendarClock,
      color: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
    },
    {
      etiqueta: 'Altas este mes',
      valor: pacientes.filter((p) => esEsteMes(p.fecha)).length,
      icono: CalendarCheck,
      color: 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
    },
    {
      etiqueta: 'Propietarios',
      valor: new Set(pacientes.map((p) => p.email.toLowerCase())).size,
      icono: Contact,
      color: 'bg-sky-500/10 text-sky-600 dark:text-sky-400',
    },
  ]

  return (
    <dl className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {tarjetas.map(({ etiqueta, valor, icono: Icono, color }) => (
        <div
          key={etiqueta}
          className="flex items-center gap-4 rounded-2xl border border-zinc-200 bg-white p-4 shadow-xs sm:p-5 dark:border-zinc-800 dark:bg-zinc-900"
        >
          <span
            className={`hidden size-11 shrink-0 place-items-center rounded-xl sm:grid ${color}`}
          >
            <Icono className="size-5" aria-hidden />
          </span>
          <div className="flex flex-col-reverse">
            <dt className="text-sm text-zinc-500 dark:text-zinc-400">
              {etiqueta}
            </dt>
            <dd className="text-2xl font-semibold tracking-tight tabular-nums">
              {valor}
            </dd>
          </div>
        </div>
      ))}
    </dl>
  )
}

export default Estadisticas

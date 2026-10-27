import { useEffect, useRef, useState } from 'react'
import { PawPrint, Search, SearchX, Sparkles } from 'lucide-react'
import Paciente from './Paciente'
import { diasHasta } from '../utils/fechas'

const FILTROS = {
  todos: { etiqueta: 'Todos', cumple: () => true },
  proximas: { etiqueta: 'Próximas', cumple: (p) => diasHasta(p.fecha) >= 0 },
  completadas: {
    etiqueta: 'Completadas',
    cumple: (p) => diasHasta(p.fecha) < 0,
  },
}

const ORDENES = {
  'fecha-asc': {
    etiqueta: 'Fecha ascendente',
    comparar: (a, b) => a.fecha.localeCompare(b.fecha),
  },
  'fecha-desc': {
    etiqueta: 'Fecha descendente',
    comparar: (a, b) => b.fecha.localeCompare(a.fecha),
  },
  nombre: {
    etiqueta: 'Nombre (A-Z)',
    comparar: (a, b) => a.nombre.localeCompare(b.nombre, 'es'),
  },
}

// Búsqueda sin distinguir mayúsculas ni acentos
const normalizar = (texto) =>
  texto
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase()

const EstadoVacio = ({ icono: Icono, titulo, descripcion, children }) => (
  <div className="flex animate-fade-in flex-col items-center rounded-2xl border border-dashed border-zinc-300 px-6 py-16 text-center dark:border-zinc-700">
    <span className="grid size-14 place-items-center rounded-2xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
      <Icono className="size-7" aria-hidden />
    </span>
    <h3 className="mt-4 font-semibold tracking-tight">{titulo}</h3>
    <p className="mt-1 max-w-sm text-sm text-zinc-500 dark:text-zinc-400">
      {descripcion}
    </p>
    {children}
  </div>
)

const ListadoPacientes = ({
  pacientes,
  editandoId,
  onEditar,
  onEliminar,
  onCargarDemo,
}) => {
  const [busqueda, setBusqueda] = useState('')
  const [filtro, setFiltro] = useState('todos')
  const [orden, setOrden] = useState('fecha-asc')
  const buscadorRef = useRef(null)

  // Atajo de teclado: "/" enfoca el buscador
  useEffect(() => {
    const handleKeyDown = (e) => {
      const escribiendo = e.target.closest(
        'input, textarea, select, [contenteditable]',
      )
      if (e.key === '/' && !escribiendo) {
        e.preventDefault()
        buscadorRef.current?.focus()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const consulta = normalizar(busqueda.trim())
  const visibles = pacientes
    .filter(FILTROS[filtro].cumple)
    .filter(
      (p) =>
        !consulta ||
        normalizar(
          `${p.nombre} ${p.propietario} ${p.email} ${p.sintomas}`,
        ).includes(consulta),
    )
    .toSorted(ORDENES[orden].comparar)

  const limpiarFiltros = () => {
    setBusqueda('')
    setFiltro('todos')
  }

  return (
    <section aria-labelledby="titulo-listado" className="min-w-0">
      <div className="mb-5 flex items-baseline justify-between gap-4">
        <h2
          id="titulo-listado"
          className="text-xl font-semibold tracking-tight"
        >
          Pacientes
        </h2>
        {pacientes.length > 0 && (
          <p
            className="text-sm text-zinc-500 tabular-nums dark:text-zinc-400"
            aria-live="polite"
          >
            {visibles.length} de {pacientes.length}
          </p>
        )}
      </div>

      {pacientes.length === 0 ? (
        <EstadoVacio
          icono={PawPrint}
          titulo="Aún no hay pacientes"
          descripcion="Registra tu primer paciente con el formulario o carga algunos datos de ejemplo para explorar la aplicación."
        >
          <button
            type="button"
            onClick={onCargarDemo}
            className="mt-6 inline-flex cursor-pointer items-center gap-2 rounded-xl border border-zinc-200 bg-white px-4 py-2.5 text-sm font-medium shadow-xs transition hover:bg-zinc-50 focus-visible:ring-4 focus-visible:ring-indigo-500/20 focus-visible:outline-none dark:border-zinc-700 dark:bg-zinc-900 dark:hover:bg-zinc-800"
          >
            <Sparkles className="size-4 text-indigo-500" aria-hidden />
            Cargar datos de ejemplo
          </button>
        </EstadoVacio>
      ) : (
        <>
          <div className="mb-5 flex flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
              <Search
                className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-zinc-400"
                aria-hidden
              />
              <input
                ref={buscadorRef}
                type="search"
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                placeholder="Buscar por mascota, propietario, email..."
                aria-label="Buscar pacientes"
                className="w-full rounded-xl border border-zinc-200 bg-white py-2.5 pr-10 pl-10 text-sm shadow-xs transition outline-none placeholder:text-zinc-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/15 dark:border-zinc-800 dark:bg-zinc-900"
              />
              <kbd className="pointer-events-none absolute top-1/2 right-3 hidden -translate-y-1/2 rounded-md border border-zinc-200 px-1.5 font-sans text-xs text-zinc-400 sm:block dark:border-zinc-700">
                /
              </kbd>
            </div>
            <select
              value={orden}
              onChange={(e) => setOrden(e.target.value)}
              aria-label="Ordenar pacientes"
              className="cursor-pointer rounded-xl border border-zinc-200 bg-white px-3 py-2.5 text-sm shadow-xs outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/15 dark:border-zinc-800 dark:bg-zinc-900"
            >
              {Object.entries(ORDENES).map(([valor, { etiqueta }]) => (
                <option key={valor} value={valor}>
                  {etiqueta}
                </option>
              ))}
            </select>
          </div>

          <div
            role="group"
            aria-label="Filtrar por estado"
            className="mb-5 inline-flex rounded-xl border border-zinc-200 bg-zinc-100 p-1 dark:border-zinc-800 dark:bg-zinc-900"
          >
            {Object.entries(FILTROS).map(([valor, { etiqueta, cumple }]) => (
              <button
                key={valor}
                type="button"
                onClick={() => setFiltro(valor)}
                aria-pressed={filtro === valor}
                className={`cursor-pointer rounded-lg px-3 py-1.5 text-sm font-medium transition focus-visible:ring-4 focus-visible:ring-indigo-500/20 focus-visible:outline-none ${
                  filtro === valor
                    ? 'bg-white text-zinc-900 shadow-xs dark:bg-zinc-800 dark:text-zinc-100'
                    : 'text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100'
                }`}
              >
                {etiqueta}
                <span className="ml-1.5 text-xs text-zinc-400 tabular-nums">
                  {pacientes.filter(cumple).length}
                </span>
              </button>
            ))}
          </div>

          {visibles.length === 0 ? (
            <EstadoVacio
              icono={SearchX}
              titulo="Sin resultados"
              descripcion="Ningún paciente coincide con la búsqueda o el filtro seleccionado."
            >
              <button
                type="button"
                onClick={limpiarFiltros}
                className="mt-4 cursor-pointer text-sm font-medium text-indigo-600 hover:underline dark:text-indigo-400"
              >
                Limpiar filtros
              </button>
            </EstadoVacio>
          ) : (
            <div className="grid gap-4 xl:grid-cols-2">
              {visibles.map((paciente) => (
                <Paciente
                  key={paciente.id}
                  paciente={paciente}
                  activo={paciente.id === editandoId}
                  onEditar={onEditar}
                  onEliminar={onEliminar}
                />
              ))}
            </div>
          )}
        </>
      )}
    </section>
  )
}

export default ListadoPacientes

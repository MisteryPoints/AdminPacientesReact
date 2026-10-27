import { useState } from 'react'
import Header from './components/Header'
import Estadisticas from './components/Estadisticas'
import Formulario from './components/Formulario'
import ListadoPacientes from './components/ListadoPacientes'
import DialogoConfirmacion from './components/DialogoConfirmacion'
import Notificaciones from './components/Notificaciones'
import Footer from './components/Footer'
import { useLocalStorage } from './hooks/useLocalStorage'
import { useTheme } from './hooks/useTheme'
import { useToasts } from './hooks/useToasts'
import { crearPacientesDemo } from './data/pacientesDemo'

function App() {
  const [pacientes, setPacientes] = useLocalStorage('pacientes', [])
  const [editando, setEditando] = useState(null)
  const [porEliminar, setPorEliminar] = useState(null)
  const [tema, alternarTema] = useTheme()
  const { toasts, notificar, cerrar } = useToasts()

  const editarPaciente = (paciente) => {
    setEditando(paciente)
    // En móvil el formulario queda arriba: lo llevamos a la vista
    document
      .getElementById('formulario')
      ?.scrollIntoView({ behavior: 'smooth' })
  }

  const guardarPaciente = (paciente) => {
    const existe = pacientes.some(({ id }) => id === paciente.id)
    setPacientes((actuales) =>
      existe
        ? actuales.map((p) => (p.id === paciente.id ? paciente : p))
        : [...actuales, paciente],
    )
    setEditando(null)
    notificar(
      existe ? `${paciente.nombre} actualizado` : `${paciente.nombre} agregado`,
    )
  }

  const confirmarEliminacion = () => {
    const paciente = porEliminar
    const indice = pacientes.findIndex(({ id }) => id === paciente.id)

    setPacientes((actuales) => actuales.filter(({ id }) => id !== paciente.id))
    if (editando?.id === paciente.id) setEditando(null)
    setPorEliminar(null)

    notificar(`${paciente.nombre} eliminado`, {
      tono: 'peligro',
      accion: {
        etiqueta: 'Deshacer',
        alHacerClick: () =>
          setPacientes((actuales) => actuales.toSpliced(indice, 0, paciente)),
      },
    })
  }

  const cargarDemo = () => {
    setPacientes(crearPacientesDemo())
    notificar('Datos de ejemplo cargados')
  }

  return (
    <div className="relative isolate min-h-screen overflow-x-clip">
      {/* Resplandor decorativo de fondo */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -top-40 -z-10 mx-auto h-96 max-w-4xl rounded-full bg-linear-to-r from-indigo-400/30 via-violet-400/20 to-sky-400/30 blur-3xl dark:from-indigo-600/20 dark:via-violet-600/10 dark:to-sky-600/20"
      />

      <Header tema={tema} onAlternarTema={alternarTema} />

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="animate-fade-in py-10 sm:py-14">
          <p className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700 dark:border-indigo-500/30 dark:bg-indigo-500/10 dark:text-indigo-300">
            <span className="size-1.5 rounded-full bg-indigo-500" aria-hidden />
            Panel veterinario
          </p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-balance sm:text-5xl">
            Seguimiento de pacientes{' '}
            <span className="bg-linear-to-r from-indigo-500 to-violet-500 bg-clip-text text-transparent">
              veterinaria
            </span>
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-pretty text-zinc-600 dark:text-zinc-400">
            Registra mascotas, gestiona sus altas y mantén el contacto con sus
            propietarios desde un único lugar.
          </p>
        </div>

        <Estadisticas pacientes={pacientes} />

        <div className="mt-8 grid items-start gap-8 lg:grid-cols-[minmax(0,24rem)_minmax(0,1fr)]">
          <div id="formulario" className="scroll-mt-24 lg:sticky lg:top-24">
            {/* La key reinicia el formulario al cambiar de paciente */}
            <Formulario
              key={editando?.id ?? 'nuevo'}
              paciente={editando}
              onGuardar={guardarPaciente}
              onCancelar={() => setEditando(null)}
            />
          </div>
          <ListadoPacientes
            pacientes={pacientes}
            editandoId={editando?.id}
            onEditar={editarPaciente}
            onEliminar={setPorEliminar}
            onCargarDemo={cargarDemo}
          />
        </div>
      </main>

      <Footer />

      <DialogoConfirmacion
        paciente={porEliminar}
        onConfirmar={confirmarEliminacion}
        onCancelar={() => setPorEliminar(null)}
      />
      <Notificaciones toasts={toasts} onCerrar={cerrar} />
    </div>
  )
}

export default App

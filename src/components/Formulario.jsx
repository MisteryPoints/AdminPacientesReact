import { useState } from 'react'
import {
  Calendar,
  Mail,
  PawPrint,
  Pencil,
  Plus,
  Save,
  User,
} from 'lucide-react'
import Campo from './Campo'

const PACIENTE_VACIO = {
  nombre: '',
  propietario: '',
  email: '',
  fecha: '',
  sintomas: '',
}

const MAX_SINTOMAS = 500
const EMAIL_VALIDO = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const validar = ({ nombre, propietario, email, fecha, sintomas }) => {
  const errores = {}
  if (!nombre.trim()) errores.nombre = 'Indica el nombre de la mascota'
  if (!propietario.trim())
    errores.propietario = 'Indica el nombre del propietario'
  if (!email.trim()) errores.email = 'Indica un email de contacto'
  else if (!EMAIL_VALIDO.test(email.trim()))
    errores.email = 'El email no es válido'
  if (!fecha) errores.fecha = 'Selecciona la fecha de alta'
  if (!sintomas.trim()) errores.sintomas = 'Describe los síntomas'
  return errores
}

const Formulario = ({ paciente, onGuardar, onCancelar }) => {
  const editando = Boolean(paciente)
  const [datos, setDatos] = useState(() => ({ ...PACIENTE_VACIO, ...paciente }))
  const [tocados, setTocados] = useState({})

  const errores = validar(datos)

  const handleChange = (e) => {
    const { name, value } = e.target
    setDatos((actuales) => ({ ...actuales, [name]: value }))
  }

  const handleBlur = (e) => {
    const { name } = e.target
    setTocados((actuales) => ({ ...actuales, [name]: true }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const camposConError = Object.keys(errores)
    if (camposConError.length > 0) {
      setTocados(
        Object.fromEntries(Object.keys(PACIENTE_VACIO).map((c) => [c, true])),
      )
      document.getElementById(camposConError[0])?.focus()
      return
    }

    const limpio = Object.fromEntries(
      Object.keys(PACIENTE_VACIO).map((campo) => [campo, datos[campo].trim()]),
    )
    onGuardar({ ...limpio, id: datos.id ?? crypto.randomUUID() })
    setDatos(PACIENTE_VACIO)
    setTocados({})
  }

  // Props comunes de cada campo controlado
  const campo = (id) => ({
    id,
    value: datos[id],
    error: tocados[id] ? errores[id] : undefined,
    onChange: handleChange,
    onBlur: handleBlur,
  })

  return (
    <section
      aria-labelledby="titulo-formulario"
      className={`rounded-2xl border bg-white p-6 shadow-xs transition dark:bg-zinc-900 ${
        editando
          ? 'border-indigo-300 ring-4 ring-indigo-500/10 dark:border-indigo-500/50'
          : 'border-zinc-200 dark:border-zinc-800'
      }`}
    >
      <div className="mb-6 flex items-center gap-3">
        <span className="grid size-10 place-items-center rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
          {editando ? (
            <Pencil className="size-5" aria-hidden />
          ) : (
            <Plus className="size-5" aria-hidden />
          )}
        </span>
        <div className="min-w-0">
          <h2 id="titulo-formulario" className="font-semibold tracking-tight">
            {editando ? 'Editar paciente' : 'Nuevo paciente'}
          </h2>
          <p className="truncate text-sm text-zinc-500 dark:text-zinc-400">
            {editando
              ? `Actualizando a ${paciente.nombre}`
              : 'Registra una mascota y su alta'}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        <Campo
          {...campo('nombre')}
          etiqueta="Mascota"
          icono={PawPrint}
          placeholder="Ej. Luna"
          autoComplete="off"
        />
        <Campo
          {...campo('propietario')}
          etiqueta="Propietario"
          icono={User}
          placeholder="Ej. María González"
          autoComplete="off"
        />
        <Campo
          {...campo('email')}
          type="email"
          etiqueta="Email"
          icono={Mail}
          placeholder="propietario@correo.com"
          autoComplete="off"
        />
        <Campo
          {...campo('fecha')}
          type="date"
          etiqueta="Fecha de alta"
          icono={Calendar}
        />
        <Campo
          {...campo('sintomas')}
          as="textarea"
          rows={4}
          maxLength={MAX_SINTOMAS}
          etiqueta="Síntomas"
          placeholder="Describe los síntomas que presenta..."
          ayuda={`${datos.sintomas.length}/${MAX_SINTOMAS}`}
          className="resize-none"
        />

        <div className="flex gap-3 pt-2">
          {editando && (
            <button
              type="button"
              onClick={onCancelar}
              className="flex-1 cursor-pointer rounded-xl border border-zinc-200 px-4 py-2.5 text-sm font-medium transition hover:bg-zinc-100 focus-visible:ring-4 focus-visible:ring-zinc-500/20 focus-visible:outline-none dark:border-zinc-700 dark:hover:bg-zinc-800"
            >
              Cancelar
            </button>
          )}
          <button
            type="submit"
            className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl bg-linear-to-br from-indigo-500 to-violet-600 px-4 py-2.5 text-sm font-medium text-white shadow-lg shadow-indigo-500/25 transition hover:brightness-110 focus-visible:ring-4 focus-visible:ring-indigo-500/30 focus-visible:outline-none active:scale-[0.98]"
          >
            {editando ? (
              <Save className="size-4" aria-hidden />
            ) : (
              <Plus className="size-4" aria-hidden />
            )}
            {editando ? 'Guardar cambios' : 'Agregar paciente'}
          </button>
        </div>
      </form>
    </section>
  )
}

export default Formulario

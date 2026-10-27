import { useCallback, useState } from 'react'

const DURACION = 5000

export function useToasts() {
  const [toasts, setToasts] = useState([])

  const cerrar = useCallback((id) => {
    setToasts((actuales) => actuales.filter((t) => t.id !== id))
  }, [])

  const notificar = useCallback(
    (mensaje, { tono = 'exito', accion } = {}) => {
      const id = crypto.randomUUID()
      setToasts((actuales) => [...actuales, { id, mensaje, tono, accion }])
      setTimeout(() => cerrar(id), DURACION)
    },
    [cerrar],
  )

  return { toasts, notificar, cerrar }
}

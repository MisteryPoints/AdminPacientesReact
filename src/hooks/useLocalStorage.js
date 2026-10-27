import { useEffect, useState } from 'react'

const leer = (key, inicial) => {
  try {
    const guardado = localStorage.getItem(key)
    if (guardado !== null) return JSON.parse(guardado)
  } catch {
    // Datos corruptos o storage bloqueado: usamos el valor inicial
  }
  return typeof inicial === 'function' ? inicial() : inicial
}

export function useLocalStorage(key, inicial) {
  const [valor, setValor] = useState(() => leer(key, inicial))

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(valor))
    } catch {
      // Storage lleno o bloqueado: la app sigue funcionando en memoria
    }
  }, [key, valor])

  return [valor, setValor]
}

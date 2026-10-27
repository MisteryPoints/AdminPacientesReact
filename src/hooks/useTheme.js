import { useEffect } from 'react'
import { useLocalStorage } from './useLocalStorage'

const temaDelSistema = () =>
  window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'

export function useTheme() {
  const [tema, setTema] = useLocalStorage('tema', temaDelSistema)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', tema === 'dark')
  }, [tema])

  const alternarTema = () => setTema((t) => (t === 'dark' ? 'light' : 'dark'))

  return [tema, alternarTema]
}

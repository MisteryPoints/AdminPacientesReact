const MS_POR_DIA = 86_400_000

const formatoFecha = new Intl.DateTimeFormat('es', { dateStyle: 'medium' })
const formatoRelativo = new Intl.RelativeTimeFormat('es', { numeric: 'auto' })

// Las fechas se guardan como YYYY-MM-DD; las interpretamos en hora local
const aFecha = (iso) => new Date(`${iso}T00:00`)

export const hoyISO = () => new Date().toLocaleDateString('en-CA')

export const sumarDias = (dias) => {
  const fecha = new Date()
  fecha.setDate(fecha.getDate() + dias)
  return fecha.toLocaleDateString('en-CA')
}

export const diasHasta = (iso) =>
  Math.round((aFecha(iso) - aFecha(hoyISO())) / MS_POR_DIA)

export const formatearFecha = (iso) => formatoFecha.format(aFecha(iso))

export const fechaRelativa = (iso) => {
  const dias = diasHasta(iso)
  return Math.abs(dias) < 30
    ? formatoRelativo.format(dias, 'day')
    : formatoRelativo.format(Math.round(dias / 30), 'month')
}

export const esEsteMes = (iso) => iso.slice(0, 7) === hoyISO().slice(0, 7)

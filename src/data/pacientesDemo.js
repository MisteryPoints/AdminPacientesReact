import { sumarDias } from '../utils/fechas'

export const crearPacientesDemo = () =>
  [
    {
      nombre: 'Luna',
      propietario: 'María González',
      email: 'maria.gonzalez@example.com',
      fecha: sumarDias(2),
      sintomas: 'Pérdida de apetito y decaimiento desde hace tres días.',
    },
    {
      nombre: 'Rocky',
      propietario: 'Carlos Pérez',
      email: 'carlos.perez@example.com',
      fecha: sumarDias(0),
      sintomas: 'Cojera en la pata trasera izquierda tras un paseo.',
    },
    {
      nombre: 'Michi',
      propietario: 'Lucía Fernández',
      email: 'lucia.fernandez@example.com',
      fecha: sumarDias(-4),
      sintomas: 'Vómitos ocasionales y pelo sin brillo.',
    },
    {
      nombre: 'Thor',
      propietario: 'Andrés Martínez',
      email: 'andres.martinez@example.com',
      fecha: sumarDias(9),
      sintomas: 'Picor intenso en orejas, posible otitis.',
    },
    {
      nombre: 'Nala',
      propietario: 'Sofía Ramírez',
      email: 'sofia.ramirez@example.com',
      fecha: sumarDias(-21),
      sintomas: 'Control post-operatorio de esterilización.',
    },
    {
      nombre: 'Coco',
      propietario: 'María González',
      email: 'maria.gonzalez@example.com',
      fecha: sumarDias(35),
      sintomas: 'Vacunación anual y revisión dental.',
    },
  ].map((paciente) => ({ ...paciente, id: crypto.randomUUID() }))

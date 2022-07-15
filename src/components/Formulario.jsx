import {useState, useEffect} from 'react'
import Error from './Error'

const Formulario = ({pacientes, setPacientes, paciente, setPaciente}) => {
    const [nombre, setNombre] = useState('')
    const [propietario, setPropietario] = useState('')
    const [email, setEmail] = useState('')
    const [fecha, setFecha] = useState('')
    const [sintomas, setSintomas] = useState('')

    const [error,setError] = useState(false)

    useEffect(() => { 
        if(Object.keys(paciente).length > 0){
            setNombre(paciente.nombre)
            setPropietario(paciente.propietario)
            setEmail(paciente.email)
            setFecha(paciente.fecha)
            setSintomas(paciente.sintomas)
        } 
    }, [paciente]) 

    const generarId = () => {
        const random = Math.random().toString(36).substring(2)
        const fecha = Date.now().toString(36)
        return random + fecha
    }

    const handleSubmit = (e) =>{
        e.preventDefault()

        //Validacion del formulario
        if([nombre,propietario,email,fecha,sintomas].includes('')){ 
            setError(true)
            return
        }

        setError(false) 

        //Objeto de Paciente
        const objetoPaciente = {
            nombre,
            propietario,
            email,
            fecha,
            sintomas 
        }

        if(paciente.id){
            //Editando el Registro
            objetoPaciente.id = paciente.id
            const pacientesActualizados = pacientes.map(pacienteState => pacienteState.id === paciente.id ? objetoPaciente : pacienteState)
            
            setPacientes(pacientesActualizados)
            setPaciente({})
        } else {
            //Nuevo Registro
            objetoPaciente.id = generarId()
            setPacientes([...pacientes, objetoPaciente])
        } 

        //Reiniciar el formulario
        setNombre('')
        setPropietario('')
        setEmail('')
        setFecha('')
        setSintomas('')
    }
    
    return (
        <div className="md:w-1/2 lg:w-2/5 mx-5">
            <h2 className="font-black text-3xl text-center">Seguimiento Pacientes</h2>
            <p className="text-lg mt-5 text-center mb-10">
                Añade Pacientes y {''}
                <span className="text-indigo-600 font-bold text-lg">Administralos</span>
            </p>

            <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md py-10 px-5 mb-10 ">
                {error &&   <Error>Todos los campos son Obligatorios</Error>}
                <div className="mb-5">
                    <label htmlFor="mascota"  className="block text-black uppercase font-bold">Nombre Mascota 
                    </label>
                    <input type="text" 
                    id="mascota"
                    className="rounded-md border-2 border-black  bg-grey-100  w-full p-2 mt-2 placeholder-grey-400"
                    placeholder="Nombre de la Mascota" 
                    value={nombre}
                    onChange={(e) => {setNombre(e.target.value)}}
                    />
                </div>

                <div className="mb-5">
                    <label htmlFor="propietario" className="block text-black uppercase font-bold">Nombre Propietario
                    </label>
                    <input type="text" 
                    id="propietario"
                    className="rounded-md border-2 border-black bg-grey-100 w-full p-2 mt-2 placeholder-grey-400"
                    placeholder="Nombre del Propietario" 
                    value={propietario}
                    onChange={(e) => {setPropietario(e.target.value)}}
                    />
                </div>

                <div className="mb-5">
                    <label htmlFor="email" className="block text-black uppercase font-bold">Email
                    </label>
                    <input type="email" 
                    id="email"
                    className="rounded-md border-2 border-black  bg-grey-100 w-full p-2 mt-2 placeholder-grey-400"
                    placeholder="Email Contacto Propietario" 
                    value={email}
                    onChange={(e) => {setEmail(e.target.value)}}
                    />
                </div>

                <div className="mb-5">
                    <label htmlFor="alta" className="inline-block text-black uppercase font-bold">Alta
                    </label>
                    <input type="date" 
                    id="alta"
                    className="rounded-md border-2 border-black bg-grey-100 w-full p-2 mt-2 placeholder-gray-400 transition-all duration-500 bg-gradient-to-br to-grey-800 via-gray from-white bg-size-200 hover:bg-right-bottom"
                    value={fecha}
                    onChange={(e) => {setFecha(e.target.value)}}
                    />
                </div>

                <div className="mb-5">
                    <label htmlFor="sintomas" className="block  text-black uppercase font-bold">Sintomas
                    </label>
                    <textarea className="rounded-md border-2 border-black  bg-grey-100 w-full p-2 mt-2 placeholder-grey-400" id="sintomas" placeholder="Describe los Síntomas"
                    value={sintomas}
                    onChange={(e) => {setSintomas(e.target.value)}}
                    />
                </div>

                <input type="submit" 
                className="w-full rounded-xl p-3 text-white uppercase font-bold  cursor-pointer transition-all duration-500 bg-gradient-to-br to-grey-800 via-black from-indigo-600 bg-size-200 hover:bg-right-bottom" 
                value={ paciente.id ? 'Editar Paciente' : 'Agregar Paciente'}/>
            </form>
        </div>
    )
}

export default Formulario
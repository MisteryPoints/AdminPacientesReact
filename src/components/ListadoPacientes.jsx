import Paciente from "./Paciente"

const ListadoPacientes = ({pacientes, setPaciente, eliminarPaciente}) => {  
    return(
        <div className="md:w-1/2 lg:w-3/5 h-screen md:overflow-y-scroll md:scrollbar-thin  scrollbar-thumb-indigo-500 scrollbar-track-indigo-300">

            {pacientes && pacientes.length ? (
                <>
                    <h2 className="font-black text-3xl text-center">Listado Pacientes</h2>
                    <p className="text-xl mt-5 mb-10 text-center">
                        Aministra tus {''}
                        <span className="text-indigo-600 font-bold">Pacientes y Citas
                        </span>
                    </p>

                    {pacientes.map( paciente => 
                    <Paciente 
                        key= {paciente.id}
                        paciente= {paciente}
                        setPaciente= {setPaciente}
                        eliminarPaciente= {eliminarPaciente}
                    /> 
                    )} 
                </>
            ) : (
                <>
                    <h2 className="font-black text-3xl text-center">No hay Pacientes</h2>
                    <p className="text-xl mt-5 mb-10 text-center">
                        Comienza agregando pacientes {''}
                        <span className="text-indigo-600 font-bold">y apareceran en este lugar
                        </span>
                    </p>
                </>
            )}
        </div>
    )
}

export default ListadoPacientes
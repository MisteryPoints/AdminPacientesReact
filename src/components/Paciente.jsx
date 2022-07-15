const Paciente = ({paciente, setPaciente, eliminarPaciente}) => {
    const { nombre, propietario, email, fecha, sintomas, id } = paciente
     
    const handleEliminar = () => {
        const respuesta = confirm('Deseas eliminar este paciente?')

        if(respuesta){
            eliminarPaciente(id)
        }
    }

    return (
        <div>
            <div className="bg-white rounded-lg shadow-md py-10 px-5 mb-10 mx-5 my-10">
                <p className="font-bold mb-3 text-gray-700 uppercase">Nombre: {''}
                    <span className="font-normal normal-case">{nombre}</span>
                </p>

                <p className="font-bold mb-3 text-gray-700 uppercase">Propietario: {''}
                    <span className="font-normal normal-case">{propietario}</span>
                </p>

                <p className="font-bold mb-3 text-gray-700 uppercase">Email: {''}
                    <span className="font-normal normal-case">{email}</span>
                </p>

                <p className="font-bold mb-3 text-gray-700 uppercase">Fecha Alta: {''}
                    <span className="font-normal normal-case">{fecha}</span>
                </p>

                <p className="font-bold mb-3 text-gray-700 uppercase">Sintomas: {''}
                    <span className="font-normal normal-case">{sintomas}</span>
                </p>

                <div className="flex justify-between mt-10">
                    <button type="button"
                    className="py-2 px-10 w-1/3 mx-16 transition-all duration-500 bg-gradient-to-br to-grey-800 via-grey-900 from-indigo-600 bg-size-200 hover:bg-right-bottom rounded-lg text-white font-bold uppercase"
                    onClick={() => setPaciente(paciente)} //Es necesario el ArrowFunction para que solo se llene cuando se clickea, y no lo haga directamente al crear el Paciente.
                    //Solo en caso de que no tenga los () la funcion no generara callback. Y se podra asignar sin arrowFunction. Pero es necesario porque al llamarla pasaremos el paciente.
                    >Editar</button>
                    <button type="button"
                    className="py-2 px-10 w-1/3 mx-16 transition-all duration-500 bg-gradient-to-br to-grey-800 via-grey-900 from-red-700 bg-size-200 hover:bg-right-bottom rounded-lg text-white font-bold uppercase"
                    onClick={handleEliminar}
                    >Eliminar</button>
                </div>

            </div>
        </div>
    )
}

export default Paciente
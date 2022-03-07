import useContenido from '../../hooks/useContenido'
const Contenido = ({ contenido }) => {

    const { setEdicion, eliminarContenido } = useContenido()
    const { COD_TYPE_CONTENT, NAME_TYPE_CONTENT } = contenido
    return (
        <>
            <tbody>
                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <td class="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {COD_TYPE_CONTENT}
                    </td>
                    <td class="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                        {NAME_TYPE_CONTENT}
                    </td>
                    <td class="py-4 px-6 text-sm font-medium text-right whitespace-nowrap my-1">
                        <button
                            type='button'
                            className="py-2 px-6 bg-green-600 hover:bg-green-700 text-white uppercase font-bold rounded-md mx-2"
                            onClick={() => setEdicion(contenido)}
                        >Editar</button>
                        <button
                            className="py-2 px-6 bg-red-600 hover:bg-red-700 text-white uppercase font-bold rounded-md"
                            onClick={() => eliminarContenido(COD_TYPE_CONTENT)}
                        >Eliminar</button>
                    </td>
                </tr>
            </tbody>

        </>
    )
}

export default Contenido
import { useState, useEffect  } from "react";
import "./../../components/Cards/card.css";
import { useParams } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
// components
import Alerta from "../../components/Alerts/Alerts";
import clienteAxios from "../../config/axios";
import BanneMovieEs from '../../partials/dashboard/BannerSeriesEs';

export default function AddSerieEs() {
    /* ------------------------------------------------- */

    const [cateinfo, setCateInfo] = useState({
        categories: [],
        response: [],
    });

    const handleChange = (e) => {
        // Destructuring
        const { value, checked } = e.target;
        const { categories } = cateinfo;

        // Case 1 : The user checks the box
        if (checked) {
            setCateInfo({
                categories: [...categories, value],
                response: [...categories, value],
            });
        }

        // Case 2  : The user unchecks the box
        else {
            setCateInfo({
                categories: categories.filter((e) => e !== value),
                response: categories.filter((e) => e !== value),
            });
        }
    };

    /* ------------------------------------------------- */

    const { auth } = useAuth()
    const [COD_CONTENIDO, setCOD_CONTENIDO] = useState(`${import.meta.env.VITE_ID_SERIES_ES}`);
    const [CODAUDIO, setCODAUDIO] = useState("");
    const [CODCATEGORY, setCODCATEGORY] = useState("");
    const [CODUSER, setCODUSER] = useState(`${auth.COD}`);
    const [TITLE, setTITLE] = useState("");
    const [TITLE_LATIN, setTITLE_LATIN] = useState("");
    const [BACK, setBACK] = useState("");
    const [POSTER, setPOSTER] = useState("");
    const [YEAR, setYEAR] = useState("");
    const [CLASIF, setCLASIF] = useState("");
    const [COUNTRY, setCOUNTRY] = useState("");
    const [CALIF, setCALIF] = useState("");
    const [DIRECTOR, setDIRECTOR] = useState("");
    const [CAST, setCAST] = useState("");
    const [SYNOPSIS, setSYNOPSIS] = useState("");

    const [selectcategoria, setSelectcategoria] = useState([]);
    const [alerta, setAlerta] = useState({});
    const { COD } = useParams();
    const [selectaudio, setSelectaudio] = useState([]);
    const [editSerieES, setEditSerieES ] = useState([]);

    const mostrarDatos = async () => {
        try {
            const token = localStorage.getItem("token")
            const config = {
                headers: {
                    "content-type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            const resultado = await clienteAxios.get(`/mttvshows/es/${COD}/${import.meta.env.VITE_ID_SERIES_ES}`, config).then((response) => {
                const data = response.data
                setEditSerieES(data)
            })

            const resultadosa = await clienteAxios.get("/cataudio", config).then((response) => {
                const sa = response.data;
                setSelectaudio(sa)
            })

            const resultadoscate = await clienteAxios.get(`/catcategory/type/${import.meta.env.VITE_ID_SERIES_ES}`, config).then((response) => {
                const scate = response.data;
                setSelectcategoria(scate)
            })

            
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        mostrarDatos();
    }, [])

    const llenarDatos = () => {
        (editSerieES.length > 0) ?
            (setCODAUDIO(editSerieES[0].COD_CAT_AUDIO),
                setCODAUDIO(editSerieES[0].COD_CAT_AUDIO),
                setCODCATEGORY(editSerieES[0].COD_CAT_CATEGORY),
                setTITLE(editSerieES[0].TITLE),
                setTITLE_LATIN(editSerieES[0].TITLE_LATIN),
                setBACK(editSerieES[0].BACKGROUND),
                setPOSTER(editSerieES[0].POSTER),
                setYEAR(editSerieES[0].YEAR),
                setCLASIF(editSerieES[0].CLASIFICATION),
                setCOUNTRY(editSerieES[0].COUNTRY),
                setCALIF(editSerieES[0].CALIFICATION),
                setDIRECTOR(editSerieES[0].DIRECTOR),
                setCAST(editSerieES[0].CAST),
                setSYNOPSIS(editSerieES[0].SYNOPSIS)) :
            null
    }

    useEffect(() => {
        llenarDatos();
    }, [editSerieES])

    const llenarDatoCategoria = () => {
        (cateinfo.response.length > 0) ?
            setCODCATEGORY(`${cateinfo.response}`) :
            null
    }
    useEffect(() => {
        llenarDatoCategoria();
    }, [cateinfo.response])

    const handleSubmit = async e => {
        e.preventDefault();
        if ([CODAUDIO, CODCATEGORY, CODUSER, TITLE, TITLE_LATIN, BACK, POSTER, YEAR, CLASIF, COUNTRY, CALIF, DIRECTOR, CAST, SYNOPSIS, COD_CONTENIDO].includes('')) {
            setAlerta({
                msg: "Todos los campos son obligatorios",
                error: true
            })
            return;
        }

        setAlerta({})

        try {
            const token = localStorage.getItem("token")
            const config = {
                headers: {
                    "content-type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            const datos = { CODAUDIO, CODCATEGORY, CODUSER, TITLE, TITLE_LATIN, BACK, POSTER, YEAR, CLASIF, COUNTRY, CALIF, DIRECTOR, CAST, SYNOPSIS, COD_CONTENIDO }
            await clienteAxios.put(`/mttvshows/es/${COD}/${import.meta.env.VITE_ID_SERIES_ES}`, datos, config)
            setAlerta({
                msg: 'Serie ha sido editada Correctamente',
                error: false
            })
    

        } catch (error) {
            setAlerta({
                msg: error.response.data.message,
                error: true
            })
        }

    }
    const { msg } = alerta;
    return (
        <>
            <main>
                <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
                    <BanneMovieEs />
                    <div className="sm:flex sm:justify-between sm:items-center mb-8">
                        <form
                            onSubmit={handleSubmit}
                        >
                            <div className="flex flex-wrap">
                                <div className="w-full lg:w-8/12 px-4">
                                    <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-100 border-0">

                                        <div className="flex-auto px-4 lg:px-10 py-10 pt-0">

                                            <div className="flex flex-wrap pt-4">

                                                <div className="w-full lg:w-6/12 px-4 ">
                                                    <div className="relative w-full mb-3 ">
                                                        <label
                                                            for="title"
                                                            className="block uppercase text-gray-600 text-xs font-bold mb-2 "
                                                        >
                                                            Título Original:
                                                        </label>
                                                        <input
                                                            type="text"
                                                            id="title"
                                                            name="title"
                                                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                                            placeholder="Título Original de la Serie"
                                                            value={TITLE}
                                                            onChange={(e) => setTITLE(e.target.value)}
                                                        />
                                                    </div>
                                                </div>

                                                <div className="w-full lg:w-6/12 px-4">
                                                    <div className="relative w-full mb-3">
                                                        <label
                                                            for="titlelatin"
                                                            className="block uppercase text-gray-600 text-xs font-bold mb-2"
                                                        >
                                                            Título En latino:
                                                        </label>
                                                        <input
                                                            type="text"
                                                            id="titlelatin"
                                                            name="titlelatin"
                                                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                                            placeholder="Título latino de la Serie"
                                                            value={TITLE_LATIN}
                                                            onChange={(e) => setTITLE_LATIN(e.target.value)}
                                                        />
                                                    </div>
                                                </div>

                                                <div className="w-full lg:w-3/12 px-4">
                                                    <div className="relative w-full mb-3">
                                                        <label
                                                            for="year"
                                                            className="block uppercase text-gray-600 text-xs font-bold mb-2"
                                                        >
                                                            Año:
                                                        </label>
                                                        <input
                                                            name="year"
                                                            id="year"
                                                            placeholder="Año de la Serie"
                                                            min={1970}
                                                            max={2030}
                                                            type="number"
                                                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                                            value={YEAR}
                                                            onChange={(e) => setYEAR(e.target.value)}
                                                        />
                                                    </div>
                                                </div>

                                                <div className="w-full lg:w-3/12 px-4">
                                                    <div className="relative w-full mb-3">
                                                        <label
                                                            for="clasificacion"
                                                            className="block uppercase text-gray-600 text-xs font-bold mb-2"
                                                        >
                                                            Clasificacion:
                                                        </label>
                                                        <input
                                                            name="clasificacion"
                                                            id="clasificacion"
                                                            type="text"
                                                            placeholder="Clasificacion de la Serie"
                                                            min={10}
                                                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                                            value={CLASIF}
                                                            onChange={(e) => setCLASIF(e.target.value)}
                                                        />
                                                    </div>
                                                </div>

                                                <div className="w-full lg:w-3/12 px-4">
                                                    <div className="relative w-full mb-3">
                                                        <label
                                                            for="clasificacion"
                                                            className="block uppercase text-gray-600 text-xs font-bold mb-2"
                                                        >
                                                            Calificaion:
                                                        </label>
                                                        <input
                                                            name="calificacion"
                                                            id="calificacion"
                                                            type="text"
                                                            placeholder="Calificacion de la Serie"
                                                            min={10}
                                                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                                            value={CALIF}
                                                            onChange={(e) => setCALIF(e.target.value)}
                                                        />
                                                    </div>
                                                </div>

                                                <div className="w-full lg:w-3/12 px-4">
                                                    <div className="relative w-full mb-3">
                                                        <label
                                                            className="block uppercase text-gray-600 text-xs font-bold mb-2"
                                                        >
                                                            Audio:
                                                        </label>
                                                        <select
                                                            name="audio"
                                                            id="audio"
                                                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                                            value={CODAUDIO}
                                                            onChange={(e) => setCODAUDIO(e.target.value)}
                                                        >
                                                            <option value="">Seleccione</option>
                                                            {selectaudio.map((item) => (
                                                                <option key={item.COD_AUDIO} value={item.COD_AUDIO}>{item.AUDIO}</option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                </div>

                                                <div className="w-full lg:w-12/12 px-4">
                                                    <div className="relative w-full mb-3">
                                                        <label
                                                            for="director"
                                                            className="block uppercase text-gray-600 text-xs font-bold mb-2"
                                                        >
                                                            Director:
                                                        </label>
                                                        <input
                                                            type="text"
                                                            id="director"
                                                            name="director"
                                                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                                            placeholder="Director de la Serie"
                                                            value={DIRECTOR}
                                                            onChange={(e) => setDIRECTOR(e.target.value)}
                                                        />
                                                    </div>
                                                </div>

                                                <div className="w-full lg:w-12/12 px-4">
                                                    <div className="relative w-full mb-3">
                                                        <label
                                                            className="block uppercase text-gray-600 text-xs font-bold mb-2"
                                                            for="reparto"
                                                        >
                                                            Reparto
                                                        </label>
                                                        <textarea
                                                            type="text"
                                                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                                            name="reparto"
                                                            id="reparto"
                                                            placeholder="Reparto de la Serie"
                                                            rows="4"
                                                            value={CAST}
                                                            onChange={(e) => setCAST(e.target.value)}
                                                        ></textarea>
                                                    </div>
                                                </div>

                                                <div className="w-full lg:w-12/12 px-4">
                                                    <div className="relative w-full mb-3">
                                                        <label
                                                            for="pais"
                                                            className="block uppercase text-gray-600 text-xs font-bold mb-2"
                                                        >
                                                            Pais:
                                                        </label>
                                                        <input
                                                            type="text"
                                                            id="pais"
                                                            name="pais"
                                                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                                            placeholder="Pais donde filmo la Serie"
                                                            value={COUNTRY}
                                                            onChange={(e) => setCOUNTRY(e.target.value)}
                                                        />
                                                    </div>
                                                </div>

                                                <div className="w-full lg:w-12/12 px-4">
                                                    <div className="relative w-full mb-3">
                                                        <label
                                                            className="block uppercase text-gray-600 text-xs font-bold mb-2"
                                                            for="sinopsis"
                                                        >
                                                            Sinopsis
                                                        </label>
                                                        <textarea
                                                            type="text"
                                                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                                            name="sinopsis"
                                                            id="sinopsis"
                                                            placeholder="Sinopsis de la Serie"
                                                            rows="4"
                                                            value={SYNOPSIS}
                                                            onChange={(e) => setSYNOPSIS(e.target.value)}
                                                        ></textarea>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex flex-wrap">

                                                {/* checkboxs de generos */}
                                                <div className="relative w-full mb-3">
                                                    <label
                                                        className="block uppercase text-gray-600 text-xs font-bold mb-2"
                                                    >
                                                        Generos:
                                                    </label>
                                                    <input
                                                        type="number"
                                                        id="genero"
                                                        name="genero"
                                                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                                        value={CODCATEGORY}
                                                        style={{
                                                            display: "none"
                                                        }}
                                                        onChange={(e) => setCODCATEGORY(e.target.value)}
                                                    />
                                                    {/*  */}
                                                    <div className="container-fluid top ">
                                                        <div className="form-check m-3">
                                                            {selectcategoria.map((item) => (
                                                                <>
                                                                    <label
                                                                        className="inline-flex items-start p-2"
                                                                        htmlFor={item.COD_CATEGORIA}
                                                                        
                                                                    >
                                                                        <input
                                                                            className="bg-sky-800 w-7 h-7 mr-2"
                                                                            type="checkbox"
                                                                            name="categories"
                                                                            key={item.COD_CATEGORIA}
                                                                            value={item.COD_CATEGORIA}
                                                                            defaultChecked={CODCATEGORY.includes(item.COD_CATEGORIA)}
                                                                            id={item.COD_CATEGORIA}
                                                                            onChange={handleChange}
                                                                        />
                                                                        {item.CATEGORIA}
                                                                    </label>
                                                                </>
                                                            ))}
                                                        </div>
                                                        <input
                                                            type="text"
                                                            name="response"
                                                            value={cateinfo.response}
                                                            id="floatingTextarea2"
                                                            style={{
                                                                display: "none"
                                                            }}
                                                            onChange={handleChange}
                                                        />
                                                    </div>
                                                    {/*  */}
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full lg:w-4/12 px-4">
                                    <div className=" flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg mt-16">
                                        <div>
                                            <div className="relative left0 top0">
                                                <img
                                                    alt="..."
                                                    src={`${BACK}`}
                                                    style={{ minHeight: "300px", maxHeight: "300px", background: "#f3f4f6" }}

                                                />
                                                <img
                                                    alt="..."
                                                    src={`${POSTER}`}
                                                    style={{ minHeight: "200px", minWidth: "130px", maxHeight: "200px", maxWidth: "130px", background: "#e5e7eb" }}
                                                    className="eye absolute" />
                                            </div>

                                            <div className="text-center md:mt-10 mt-20">

                                                <div className="w-full lg:w-12/12 px-4">
                                                    <div className="relative w-full mb-3">
                                                        <label
                                                            className="block uppercase text-gray-600 text-xs font-bold mb-2"
                                                        >
                                                            Imagen de Fondo:
                                                        </label>
                                                        <input
                                                            type="text"
                                                            id="back"
                                                            name="back"
                                                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                                            placeholder="Fondo de la Serie"
                                                            value={BACK}
                                                            onChange={(e) => setBACK(e.target.value)}
                                                        />
                                                    </div>
                                                </div>

                                                <div className="w-full lg:w-12/12 px-4">
                                                    <div className="relative w-full mb-3">
                                                        <label
                                                            className="block uppercase text-gray-600 text-xs font-bold mb-2"
                                                        >
                                                            Imagen de Portada:
                                                        </label>
                                                        <input
                                                            type="text"
                                                            id="front"
                                                            name="front"
                                                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                                            placeholder="Poster de la Serie"
                                                            value={POSTER}
                                                            onChange={(e) => setPOSTER(e.target.value)}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {msg && <Alerta alerta={alerta} />}
                            <div className="">
                                <input type="submit"
                                    value="añadir"
                                    className="cla"
                                    to="#"
                                />
                            </div>
                        </form>
                    </div>
                </div>
            </main>
        </>
    );
}
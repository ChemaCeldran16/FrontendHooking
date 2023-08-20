import React from "react";
import NavBar from '../components/NavBar'
import TarjetaRecomendacion from '../components/TarjetaRecomendacion'
import { useEffect,useState } from "react";
// import {AutocompletarOpcionesPrincipal} from '../components/AutocompletarOpcionesPrincipal'


export default function PaginaPrincipal() {
    const [localData, setLocalData] = useState(null);


    const handleBuscarLocal = () => {
        fetch("http://127.0.0.1:8000/api/localRecomendacion")
          .then((response) => {
            if (response.ok) {
              return response.json();
            } else {
              throw new Error("Error en la respuesta del servidor");
            }
          })
          .then((responseData) => {
            const updatedLocalData = responseData.map((item) => {
              const imagen = item.imagen ? item.imagen : null;
              return {
                nombre: item.nombreLocal,
                valoracion: item.valoracion,
                imagen: imagen,
              };
            });
            setLocalData(updatedLocalData);
          })
          .catch((error) => {
            console.error("Error al realizar la petición:", error);
          });
      };


    useEffect(() => {        
        handleBuscarLocal();
      }, []);

    return (
        <>
            <NavBar />
            <div className="h-screen w-screen bg-fondo bg-cover bg-center flex justify-center items-start pr-64 pt-32  ">
                <div className="flex-col pl-48 w-3/4 bg-tranparent h-full">
                <div className="bg-black bg-opacity-70 px-8 py-6 rounded-lg shadow-md w-1/2">
                <h4 className="font-bold text-large pb-4">Busca tu mejor lugar</h4>
                        <input
                            type="text"
                            placeholder="Ingrese su búsqueda"
                            className="block w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg"
                        />
                        <input
                            type="text"
                            placeholder="Otro campo de búsqueda"
                            className="block w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg"
                        />
                        <input
                            type="text"
                            placeholder="Más campos..."
                            className="block w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg"
                        />
                        <input
                            type="text"
                            placeholder="Más campos..."
                            className="block w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg"
                        />                        
                        <button className="block w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                            Buscar
                        </button>
                    </div>
                    <div id="recomendacion" className="flex flex-col bg-transparent pt-16 w-full "> 
                        <h4 className="font-bold text-large">Prueba nuestras recomendaciones</h4>
                        <div id="localesRecomendacion" className=" flex flex-row justify-between py-4">
                            {localData && localData.map((local, index) => (
                                    <TarjetaRecomendacion
                                        key={index}
                                        nombre={local.nombre}
                                        valoracion={local.valoracion}
                                        imagen={local.imagen}
                                    />
                                ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

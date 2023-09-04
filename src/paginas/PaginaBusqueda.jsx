import React from "react"
import NavBar from "../components/NavBar";
import { useState, useEffect } from "react";
import AutocompletarOpcionesPrincipal from '../components/AutocompletarOpcionesPrincipal';
import DecimalInput from "../components/InputDecimal";
import Mapa from "../components/Mapa";
import ListaLugares from "../components/ListaLugares";
import { Pagination } from "antd";
import Spinner from "../components/Spinner";

const PaginaBusqueda = () => {
  
  const [posibilidadesLocales, setposibilidadesLocales] = useState([]);
  const [posibilidadesDonde, setPosibilidadesDonde] = useState([]);
  const [posibilidadesTipo, setPosibilidadesTipo] = useState([]);
  const [locales, setLocales] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const itemsPerPage = 3;
//   const nombrePueblo = useSelector((state) => state.busqueda.poblacion);
//   const tipoLocal = useSelector((state) => state.busqueda.tipoLugar);
//   const radioKMS = useSelector((state) => state.busqueda.kilometros);
const nombrePueblo = "";
const tipoLocal = "";
const radioKMS = "";
  const obtenerObjetosLocales = async (nombrePueblo, tipoLocal, radioKMS) => {
    try {
      const userData = {
        nombrePueblo,
        tipoLocal,
        radioKMS,
      };
      const respuesta = await fetch("http://127.0.0.1:8000/api/searchlocal", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
  
      if (respuesta.ok) {
        const datos = await respuesta.json();
        // Aquí puedes hacer algo con los datos recibidos, por ejemplo, almacenarlos en el estado local del componente
        setLocales(datos);
        console.log(datos);
      } else {
        throw new Error("Error al obtener los objetos locales");
      }
    } catch (error) {
      console.error(error);
    }finally {
        // Actualiza isLoading a false después de obtener los datos o en caso de error
        setIsLoading(false);
    }
  };
  const cargarLugares = async () => {
    fetch(`http://localhost:8000/api/opcionesLocales`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Error en la respuesta del servidor");
        }
      })
      .then((responseData) => {
        if (Array.isArray(responseData.resultados)) {
          // Transformar responseData.resultados a un array de objetos con las propiedades value y label
          const options = responseData.resultados.map((posibilidad, index) => ({
            value: index,
            label: posibilidad
          }));
          setposibilidadesLocales(options);
        } else {
          console.error("La respuesta del servidor no es un array válido");
        }
      })
      .catch((error) => {
        console.error("Error al realizar la petición:", error);
      });
  };
  const cargarPueblos = async () => {
    fetch(`http://localhost:8000/api/pueblos`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Error en la respuesta del servidor");
        }
      })
      .then((responseData) => {
        if (Array.isArray(responseData.resultados)) {
          // Transformar responseData.resultados a un array de objetos con las propiedades value y label
          const options = responseData.resultados.map((posibilidad, index) => ({
            value: index,
            label: posibilidad
          }));
          setPosibilidadesDonde(options);
        } else {
          console.error("La respuesta del servidor no es un array válido");
        }
      })
      .catch((error) => {
        console.error("Error al realizar la petición:", error);
      });
  };
  const cargarTipos = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/tiposLocal`);
      if (response.ok) {
        const responseData = await response.json();            
        const tiposLocales = responseData.tipos_de_locales;
  
        if (Array.isArray(tiposLocales)) {
          const options = tiposLocales.map((posibilidad, index) => ({
            value: index,
            label: posibilidad
          }));
          setPosibilidadesTipo(options);
        } else {
          console.error("La respuesta del servidor no es un array válido");
        }
      } else {
        throw new Error("Error en la respuesta del servidor");
      }
    } catch (error) {
      console.error("Error al realizar la petición:", error);
    }
  };

  const handleOptionSelected = (selectedOption, inputId) => {
    if (selectedOption != null) {
      if (inputId === "opcionesLocales") {
        setSelectedOptionNombre(selectedOption.label);
      } else if (inputId === "opcionesDonde") {
        setselectedOptionPoblacion(selectedOption.label);
      }
    } else {
      if (inputId === "opcionesLocales") {
        setSelectedOptionNombre(null);
      } else if (inputId === "opcionesDonde") {
        setselectedOptionPoblacion(null);
      }
    }
  };
  const handleOptionSelectedTipo = (selectedOption) => {
    if (selectedOption != null) {
      setSelectedOptionTipo(selectedOption.label);
    } else {
      setSelectedOptionTipo(null);
    }
  };
  const handleLocal = (titulo) => {
    // Function to handle the recommendation click
    // dispatch(cambioLocal(titulo))

    // navigate("/local")


    // Add your logic here
  };


  useEffect(() => {
    // Lógica a ejecutar al cargar la página
    setIsLoading(true);
    cargarLugares();
    cargarPueblos();
    cargarTipos();
    obtenerObjetosLocales(nombrePueblo, tipoLocal, radioKMS);
  }, [nombrePueblo,tipoLocal,radioKMS]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };


//   <ListaLugares locales={locales} currentPage={currentPage} itemsPerPage={itemsPerPage} onClick={handleLocal} />
//             <div id="PaginationContainer">
//               <Pagination
//                 current={currentPage}
//                 pageSize={itemsPerPage}
//                 total={locales.length}
//                 onChange={handlePageChange}
//               />

  return (
    <>
            <NavBar />
            <div className="flex flex-row h-screen w-full bg-orange-300 bg-center  pt-16  ">
            <div className="flex  w-1/2">
                <div className="w-1/3"></div>
                <div className=" flex flex-col    w-2/3  items-center space-y-8 pt-8">
                    <div className="flex-row bg-black bg-opacity-70 px-8 py-6 rounded-lg shadow-md w-8/12 ">
                        <h4 className="font-bold text-large pb-4">Busca tu mejor lugar</h4>
                        <AutocompletarOpcionesPrincipal
                        options={posibilidadesLocales}
                        onOptionSelected={(option) =>
                            handleOptionSelected(option, "opcionesLocales")
                        }
                        labelText='Local'
                        />
                        <AutocompletarOpcionesPrincipal
                        options={posibilidadesTipo}
                        onOptionSelected={handleOptionSelectedTipo} 
                        labelText='Tipo'
                        />
                        <AutocompletarOpcionesPrincipal
                        options={posibilidadesDonde}
                        onOptionSelected={(option) =>
                            handleOptionSelected(option, "opcionesDonde")
                        }
                        labelText='Lugar'
                        />
                        <DecimalInput></DecimalInput>
                        <button className="block w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                            Buscar
                        </button>
                    </div>
                    <div className="pb-12 w-4/5 h-auto">
                        {locales && <Mapa coordenadas={locales} />}
                    </div>
                </div>
            </div>
                <div className="flex  w-1/2">
                    <div className=" w-2/3 ">

                        {isLoading ? (
                            // Muestra un estado de carga mientras isLoading es true
                            <div className=" flex w-full h-full justify-center items-center">
                                <Spinner/>

                             </div>   
                        ) : (
                            // Muestra la lista de lugares cuando isLoading es false
                            <div>
                                <ListaLugares
                                locales={locales}
                                currentPage={currentPage}
                                itemsPerPage={itemsPerPage}
                                onClick={handleLocal}
                                />
                            <div className="flex justify-center">
                            <Pagination
                                current={currentPage}
                                pageSize={itemsPerPage}
                                total={locales.length}
                                onChange={handlePageChange}
                            />
                            </div>
                            </div>
                        )}
                    
                    </div>
                </div>
            </div>
        </>

  );
}

export default PaginaBusqueda
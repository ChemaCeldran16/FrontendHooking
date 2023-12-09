import React from 'react'
import NavBar from '../components/NavBar'
import { useState, useEffect } from 'react'
import AutocompletarOpcionesPrincipal from '../components/AutocompletarOpcionesPrincipal'
import DecimalInput from '../components/InputDecimal'
import Mapa from '../components/Mapa'
import ListaLugares from '../components/ListaLugares'
import { Pagination } from 'antd'
import Spinner from '../components/Spinner'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import {
  cambioTipo,
  cambioPoblacion,
  cambioKilometros,
} from '../redux/searchSlice'
import { cambioNombre } from '../redux/localSlice'
import { useNavigate } from 'react-router-dom'

const PaginaBusquedaMapaDibujado = () => {
  const [posibilidadesLocales, setposibilidadesLocales] = useState([])
  const [posibilidadesDonde, setPosibilidadesDonde] = useState([])
  const [posibilidadesTipo, setPosibilidadesTipo] = useState([])
  const [selectedOptionNombre, setSelectedOptionNombre] = useState('') //Lugar
  const [selectedOptionPoblacion, setselectedOptionPoblacion] = useState('') //Pueblo
  const [selectedOptionTipo, setSelectedOptionTipo] = useState('') //Pueblo
  const [decimalValue, setDecimalValue] = useState('') // Agregamos el estado para el valor decimal
  const [locales, setLocales] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [isLoading, setIsLoading] = useState(true)
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const itemsPerPage = 3
  const radio = useSelector(state => state.busqueda.radio)
  const latitud = useSelector(state => state.busqueda.latitud)
  const longitud = useSelector(state => state.busqueda.longitud)

  const obtenerObjetosLocales = async (radio, longitud, latitud) => {
    const data = {
      longitud: longitud,
      latitud: latitud,
      radio: radio,
    };
    try {
      const response = await fetch('http://localhost:8000/api/mapaDibujo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
  
      if (response.ok) {
        const datos = await response.json()
        // Aquí puedes hacer algo con los datos recibidos, por ejemplo, almacenarlos en el estado local del componente
        setLocales(datos)
        if(datos.length==0){
          navigate("/cargalocal0")
        }      } else {
        console.error('Error en la respuesta del servidor:', response.statusText);
      }
    } catch (error) {
      console.error('Error al realizar la petición:', error);
    } finally {
        // Actualiza isLoading a false después de obtener los datos o en caso de error
        setIsLoading(false)
      }
      
  }
  const cargarLugares = async () => {
    fetch(`http://localhost:8000/api/opcionesLocales`)
      .then(response => {
        if (response.ok) {
          return response.json()
        } else {
          throw new Error('Error en la respuesta del servidor')
        }
      })
      .then(responseData => {
        if (Array.isArray(responseData.resultados)) {
          // Transformar responseData.resultados a un array de objetos con las propiedades value y label
          const options = responseData.resultados.map((posibilidad, index) => ({
            value: index,
            label: posibilidad,
          }))
          setposibilidadesLocales(options)
        } else {
          console.error('La respuesta del servidor no es un array válido')
        }
      })
      .catch(error => {
        console.error('Error al realizar la petición:', error)
      })
  }
  const cargarPueblos = async () => {
    fetch(`http://localhost:8000/api/pueblos`)
      .then(response => {
        if (response.ok) {
          return response.json()
        } else {
          throw new Error('Error en la respuesta del servidor')
        }
      })
      .then(responseData => {
        if (Array.isArray(responseData.resultados)) {
          // Transformar responseData.resultados a un array de objetos con las propiedades value y label
          const options = responseData.resultados.map((posibilidad, index) => ({
            value: index,
            label: posibilidad,
          }))
          setPosibilidadesDonde(options)
        } else {
          console.error('La respuesta del servidor no es un array válido')
        }
      })
      .catch(error => {
        console.error('Error al realizar la petición:', error)
      })
  }
  const cargarTipos = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/tiposLocal`)
      if (response.ok) {
        const responseData = await response.json()
        const tiposLocales = responseData.tipos_de_locales

        if (Array.isArray(tiposLocales)) {
          const options = tiposLocales.map((posibilidad, index) => ({
            value: index,
            label: posibilidad,
          }))
          setPosibilidadesTipo(options)
        } else {
          console.error('La respuesta del servidor no es un array válido')
        }
      } else {
        throw new Error('Error en la respuesta del servidor')
      }
    } catch (error) {
      console.error('Error al realizar la petición:', error)
    }
  }

  const handleOptionSelected = (selectedOption, inputId) => {
    if (selectedOption != null) {
      if (inputId === 'opcionesLocales') {
        setSelectedOptionNombre(selectedOption.label)
      } else if (inputId === 'opcionesDonde') {
        setselectedOptionPoblacion(selectedOption.label)
      }
    } else {
      if (inputId === 'opcionesLocales') {
        setSelectedOptionNombre(null)
      } else if (inputId === 'opcionesDonde') {
        setselectedOptionPoblacion(null)
      }
    }
  }
  const handleOptionSelectedTipo = selectedOption => {
    if (selectedOption != null) {
      setSelectedOptionTipo(selectedOption.label)
    } else {
      setSelectedOptionTipo(null)
    }
  }
  const handleDecimalChange = value => {
    setDecimalValue(value) // Actualizamos el estado con el valor del DecimalInput
  }

  const handleBotonbuscar = async e => {
    // Obtener las opciones seleccionadas de los InputBuscador
    // Suponiendo que tienes las variables "selectedOption", "selectedOptionPoblacion", "selectedOptionTipo" y "decimalValue" definidas en algún lugar
    // Comprobar si selectedOptionPoblacion no es null o en blanco
    if (selectedOptionNombre && selectedOptionNombre.trim() !== '') {
      // Almacenar solo selectedOptionPoblacion en el estado de Redux usando la acción correspondiente
      dispatch(cambioNombre(selectedOptionNombre.trim()))
      // Navegar a "/local"
      navigate('/local')
    } else {
      if (!selectedOptionTipo && !selectedOptionPoblacion && decimalValue) {
        console.error('Error: Debes rellenar los campos correctamente')
      } else {
        // Resto de la lógica de la función handleBotonbuscar
        // ...

        // Almacenar las variables en el estado de Redux usando las acciones correspondientes
        dispatch(cambioTipo(selectedOptionTipo))
        dispatch(cambioPoblacion(selectedOptionPoblacion))
        dispatch(cambioKilometros(decimalValue))
        // Navegar a "/search"
        navigate('/cargaBusqueda')
      }
    }
  }
  const handleLocal = titulo => {
    // Function to handle the recommendation click
    dispatch(cambioNombre(titulo))
    console.log(titulo)
    navigate('/local')

    // Add your logic here
  }
  


  useEffect(() => {
    // Lógica a ejecutar al cargar la página
    setIsLoading(true)
    cargarLugares()
    cargarPueblos()
    cargarTipos()
    obtenerObjetosLocales(radio, longitud, latitud)
  }, [radio, longitud, latitud])

  const handlePageChange = page => {
    setCurrentPage(page)
  }

  return (
    <>
      <NavBar usuario={user} />
      <div className='h-full w-screen flex   bg-fondo bg-cover bg-center  pt-16  sm:flex-col sm:items-center md:flex-row lg:pt-8 xl:pt-8'>
        <div className='flex  w-1/2 sm:w-full lg:pl-16'>
          <div className='w-1/12 hidden 2xl:block '></div>
          <div className=' flex flex-col    w-2/3  items-center space-y-8 pt-8 sm:w-full md:pt-16  lg:w-10/12  2xl:w-9/12'>
            <div className='flex-row bg-azul-oscuro bg-opacity-70 px-8 py-6 rounded-lg shadow-md w-8/12 sm:w-10/12 '>
              <h4 className='text-large pb-4 font-luckiestGuy md:text-xl 2xl:text-2xl text-orange-400'>
                Descubre tu lugar
              </h4>
              <AutocompletarOpcionesPrincipal
                options={posibilidadesLocales}
                onOptionSelected={option =>
                  handleOptionSelected(option, 'opcionesLocales')
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
                onOptionSelected={option =>
                  handleOptionSelected(option, 'opcionesDonde')
                }
                labelText='Lugar'
              />
              <div className='h-16 pb-4'>
                <DecimalInput
                  onChange={handleDecimalChange}
                  labelText={'Kms'}
                ></DecimalInput>
              </div>
              <button
                className='block w-full px-4 py-2 bg-azul-claro text-black font-acme text-xl rounded-lg hover:bg-blue-500 lg:w-8/12 lg:mx-auto'
                onClick={handleBotonbuscar}
              >
                Buscar
              </button>
            </div>
            <div className='md:hidden pb-2'>
              <label className='font-bold text-large '>
                Resultados de tu búsqueda
              </label>
            </div>
            <div className='pb-12 w-4/5 h-auto hidden md:block'>
              {locales && <Mapa coordenadas={locales} />}
            </div>
          </div>
        </div>
        <div className='flex  w-1/2 sm:w-10/12 md:w-11/12 md:pr-4 lg:pr-12 xl:pt-12'>
          <div className=' w-2/3 sm:w-full '>
            {isLoading ? (
              // Muestra un estado de carga mientras isLoading es true
              <div className=' flex w-full h-full justify-center items-center '>
                <Spinner />
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
                {locales.length > itemsPerPage && (
                  <div className='flex justify-center'>
                    <Pagination
                      className='sm:text-md xl:text-lg bg-blanco-gris rounded-2xl bg-opacity-40 '
                      current={currentPage}
                      pageSize={itemsPerPage}
                      total={locales.length}
                      onChange={handlePageChange}
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default PaginaBusquedaMapaDibujado

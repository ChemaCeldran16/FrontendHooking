import React from 'react'
import NavBar from '../components/NavBar'
import TarjetaRecomendacion from '../components/TarjetaRecomendacion'
import { useEffect, useState } from 'react'
import AutocompletarOpcionesPrincipal from '../components/AutocompletarOpcionesPrincipal'
import DecimalInput from '../components/InputDecimal'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { cambioNombre } from '../redux/localSlice'
import {
  cambioTipo,
  cambioPoblacion,
  cambioKilometros,
} from '../redux/searchSlice'

export default function PaginaPrincipal() {
  const [localData, setLocalData] = useState(null)
  const [posibilidadesLocales, setposibilidadesLocales] = useState([])
  const [posibilidadesDonde, setPosibilidadesDonde] = useState([])
  const [posibilidadesTipo, setPosibilidadesTipo] = useState([])
  const [selectedOptionNombre, setSelectedOptionNombre] = useState('') //Lugar
  const [selectedOptionPoblacion, setselectedOptionPoblacion] = useState('') //Pueblo
  const [selectedOptionTipo, setSelectedOptionTipo] = useState('') //Pueblo
  const [decimalValue, setDecimalValue] = useState('') // Agregamos el estado para el valor decimal
  const user = useSelector(state => state.user)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleBuscarLocal = () => {
    fetch('http://127.0.0.1:8000/api/localRecomendacion')
      .then(response => {
        if (response.ok) {
          return response.json()
        } else {
          throw new Error('Error en la respuesta del servidor')
        }
      })
      .then(responseData => {
        const updatedLocalData = responseData.map(item => {
          const imagen = item.imagen ? item.imagen : null
          return {
            nombre: item.nombreLocal,
            valoracion: item.valoracion,
            imagen: imagen,
          }
        })
        setLocalData(updatedLocalData)
      })
      .catch(error => {
        console.error('Error al realizar la petición:', error)
      })
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

  const handleRecomendacion = titulo => {
    // Function to handle the recommendation click
    dispatch(cambioNombre(titulo))

    navigate('/local')

    // Add your logic here
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
        navigate('/search')
      }
    }
  }
  const handleDecimalChange = value => {
    setDecimalValue(value) // Actualizamos el estado con el valor del DecimalInput
  }

  useEffect(() => {
    handleBuscarLocal()
    cargarLugares()
    cargarPueblos()
    cargarTipos()
  }, [])

  return (
    <>
      <NavBar usuario={user} />
      <div className='h-full w-screen bg-fondo bg-opacity-0  bg-cover bg-center flex justify-center items-start  sm:pt-20 md:pt-24 md:h-screen 2xl:bg-right'>
        <div className='flex flex-col   bg-tranparent h-full sm:items-center   md:w-4/4 md:items-start  lg:w-full lg:items-center'>
          <div className='sm:w-10/12 md:w-full   lg:pl-24  xl:pl-40 2xl:pl-56'>
            <div className='bg-azul-oscuro bg-opacity-80 px-8 py-6 rounded-lg shadow-md  sm:w-4/4 md:w-3/5 md:pr  lg:w-2/5 xl:w-5/5 2xl:w-4/12'>
              <h4 className=' text-large pb-4 font-luckiestGuy md:text-xl 2xl:text-2xl text-orange-400'>
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
                className='block w-full md:px-4 py-2 bg-azul-claro text-black font-acme text-xl rounded-lg hover:bg-blue-500 sm:w-8/12 sm:mx-auto  '
                onClick={handleBotonbuscar}
              >
                Buscar
              </button>
            </div>
          </div>

          <div
            id='recomendacion'
            className='flex flex-col bg-transparent pt-16 w-full md:pt-24 lg:w-9/12 lg:pt-8'
          >
            <h4 className=' text-large text-orange-400 sm:pl-12 md:text-xl md:pb-4 font-luckiestGuy 2xl:pl-24 2xl:text-2xl'>
              Nuestras recomendaciones
            </h4>
            <div
              id='localesRecomendacion'
              className='flex flex-row py-4 sm:flex-wrap sm:justify-center sm:space-x-2 md:justify-between xl:flex-nowrap 2xl:justify-center 2xl:space-x-32 '
            >           
              {localData &&
                localData.map((local, index) => (
                  <div
                    key={index}
                    className='mb-4'
                    onClick={() => handleRecomendacion(local.nombre)}
                  >
                    <TarjetaRecomendacion
                      nombre={local.nombre}
                      valoracion={local.valoracion}
                      imagen={local.imagen}
                    />
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

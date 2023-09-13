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
      <div className='h-screen w-screen bg-fondo bg-cover bg-center flex justify-center items-start pr-64 pt-32  '>
        <div className='flex-col pl-48 w-3/4 bg-tranparent h-full'>
          <div className='bg-black bg-opacity-70 px-8 py-6 rounded-lg shadow-md w-1/2'>
            <h4 className='font-bold text-large pb-4'>Busca tu mejor lugar</h4>
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
            <DecimalInput onChange={handleDecimalChange}></DecimalInput>
            <button
              className='block w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600'
              onClick={handleBotonbuscar}
            >
              Buscar
            </button>
          </div>
          <div
            id='recomendacion'
            className='flex flex-col bg-transparent pt-16 w-full '
          >
            <h4 className='font-bold text-large'>
              Prueba nuestras recomendaciones
            </h4>
            <div
              id='localesRecomendacion'
              className=' flex flex-row justify-between py-4'
            >
              {localData &&
                localData.map((local, index) => (
                  <div key={index} onClick={() => handleRecomendacion(local.nombre)}>
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

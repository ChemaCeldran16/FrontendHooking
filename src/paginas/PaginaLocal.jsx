import TablaLocal from '../components/TablaLocal'
import { useEffect, useState } from 'react'
import { Rate } from 'antd'
import { useNavigate } from 'react-router-dom'
import NavBar from '../components/NavBar'
import Mapa from '../components/Mapa'
import AutocompletarOpcionesPrincipal from '../components/AutocompletarOpcionesPrincipal'
import DecimalInput from '../components/InputDecimal'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { cambioNombre } from '../redux/localSlice'
import {
  cambioTipo,
  cambioPoblacion,
  cambioKilometros,
} from '../redux/searchSlice'
import { CarruselImagenes } from '../components/CarruselImagenes' // Ajusta la ruta de importación según tu estructura de archivos

const PaginaLocal = () => {
  const [imagenes, setImagenes] = useState([])
  const [nombreSitio, setNombreSitio] = useState('')
  const [tipoSitio, setTipoSitio] = useState('')
  const [descripcion, setDescripcion] = useState('')
  const [menu, setMenu] = useState('')
  const [opiniones, setOpiniones] = useState('')
  const [valoracion, setValoracion] = useState('')
  const [direccion, setDireccion] = useState('')
  const [latitud, setLatitud] = useState('')
  const [longitud, setLongitud] = useState('')
  const [decimalValue, setDecimalValue] = useState('')
  const backendBaseUrl = 'http://localhost:8000'
  const nombreLocal = useSelector(state => state.local.nombreLocal)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [posibilidadesLocales, setPosibilidadesLocales] = useState([])
  const [posibilidadesDonde, setPosibilidadesDonde] = useState([])
  const [posibilidadesTipo, setPosibilidadesTipo] = useState([])
  const [selectedOptionNombre, setSelectedOptionNombre] = useState('')
  const [selectedOptionPoblacion, setselectedOptionPoblacion] = useState('')
  const [selectedOptionTipo, setSelectedOptionTipo] = useState('')
  const user = useSelector(state => state.user)
  const [mostrarMapa, setMostrarMapa] = useState(false)

  const obtenerLocal = async nombre => {
    const userData = {
      nombre,
    }

    try {
      const response = await fetch('http://127.0.0.1:8000/api/local', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      })

      if (response.ok) {
        const data = await response.json()
        const {
          imagenes,
          nombreLocal,
          tipoLocal,
          descripcion,
          menu,
          comentarios,
          valoracion,
          direccion,
          latitud,
          longitud,
        } = data
        const imagenesCompletas = imagenes.map(
          imagen => `${backendBaseUrl}${imagen}`,
        )
        setImagenes(imagenesCompletas)
        setNombreSitio(nombreLocal)
        setTipoSitio(tipoLocal)
        setDescripcion(descripcion)
        setMenu(menu)
        setOpiniones(comentarios)
        setValoracion(valoracion)
        setDireccion(direccion)
        setLatitud(latitud)
        setLongitud(longitud)
        setMostrarMapa(true)
      } else {
        const errorData = await response.json()
        console.log(errorData)
      }
    } catch (error) {
      console.log(error)
    }
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
  const cargarLugares = async () => {
    fetch('http://localhost:8000/api/opcionesLocales')
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
          setPosibilidadesLocales(options)
        } else {
          console.error('La respuesta del servidor no es un array válido')
        }
      })
      .catch(error => {
        console.error('Error al realizar la petición:', error)
      })
  }
  const cargarPueblos = async () => {
    fetch('http://localhost:8000/api/pueblos')
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
      const response = await fetch('http://localhost:8000/api/tiposLocal')
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

  useEffect(() => {
    cargarLugares()
    cargarPueblos()
    cargarTipos()
    obtenerLocal(nombreLocal)
  }, [])
  return (
    <>
      <NavBar usuario={user} />
      <div className='flex flex-col h-full w-full space-y-8 bg-green-300 md:items-center md:space-y-2 lg:w-screen'>
        <div className='flex flex-row w-full h-48 sm:h-auto justify-center pt-20  sm:flex-col md:w-1/2  md:pt-24 md:pb-4  lg:w-full lg:justify-center'>
          <h4 className='font-bold text-large text-black pl-4 pb-4 lg:pl-32'>
            Busca tu mejor lugar
          </h4>
          <div className='flex flex-col w-12/12 sm:flex-row  sm:space-x-8 sm:justify-center sm:pr-6 md:flex-col md:space-x-0 md:pr-0 md:items-center lg:flex-row lg:pr-48'>
            <div className='w-2/5 md:w-9/12 md:mx-auto md:flex md:justify-center md:items-center lg:w-1/3'>
              <AutocompletarOpcionesPrincipal
                options={posibilidadesLocales}
                onOptionSelected={option =>
                  handleOptionSelected(option, 'opcionesLocales')
                }
                labelText='Local'
              />
            </div>
            <div className='  w-2/5 md:w-9/12 md:mx-auto md:flex md:justify-center md:items-center lg:w-1/3'>
              <AutocompletarOpcionesPrincipal
                options={posibilidadesTipo}
                onOptionSelected={handleOptionSelectedTipo}
                labelText='Tipo'
              />
            </div>
          </div>
          <div
            className='flex flex-col w-12/12 sm:flex-row  sm:space-x-8 sm:justify-center sm:pr-6 md:flex-col md:space-x-0 md:pr-0 md:items-center lg:flex-row lg:pr-48 '>
            <div className='  w-2/5 md:w-9/12 md:mx-auto md:flex md:justify-center md:items-center lg:w-1/3'>
              <AutocompletarOpcionesPrincipal
                options={posibilidadesDonde}
                onOptionSelected={option =>
                  handleOptionSelected(option, 'opcionesDonde')
                }
                labelText='Lugar'
              />
            </div>
            <div className='  w-2/5 h-14 md:w-9/12 md:mx-auto md:h-20 md:pb-4 md:flex md:justify-center md:items-center md:pt-2 lg:w-1/3 lg:pt-4 lg:pb-2 '>
              <DecimalInput
                onChange={handleDecimalChange}
                labelText='Kms'
              ></DecimalInput>
            </div>
          </div>
          <div className='flex flex-col items-center justify-center w-12/12 sm:flex-row justify-center '>
            <button
              className='block w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 sm:w-5/12 md:w-6/12 lg:w-1/3' 
              onClick={handleBotonbuscar}
            >
              Buscar
            </button>
          </div>
        </div>
        <div className='flex flex-row pb-4 w-8/12 justify-between hidden md:block '>
          <div className='flex flex-row justify-between'>
            <h4 className='font-bold text-large text-black pb-4'>
              {nombreSitio}
            </h4>
            <h4 className='font-bold text-large text-black pb-4'>
              {tipoSitio}
            </h4>
          </div>
          <div className='flex flex-row justify-between'>
            <h4 className='font-bold text-large text-black'>{direccion}</h4>
            <Rate allowHalf={true} value={valoracion} disabled></Rate>
          </div>
        </div>
        <div className='flex flex-row flex-wrap justify-center items-center sm:hidden lg:flex lg:block '>
          {imagenes.map((imagen, index) => (
            <div className='w-80 h-56 m-4' key={index}>
              <img
                src={imagen}
                alt='Foto del local'
                className='w-full h-full object-cover rounded-xl shadow-2xl'
              />
            </div>
          ))}
        </div>
        <div className=' pt-2 md:hidden '>
          <div className='flex flex-col  justify-between pl-4'>
            <div className='flex flex-row items-center justify-between w-10/12 pb-2'>
              <h4 className='font-bold text-md text-black '>{nombreSitio}</h4>
              <Rate allowHalf={true} value={valoracion} disabled></Rate>
            </div>
            <div className='flex flex-row justify-between  w-10/12'>
              <h4 className=' text-md text-black '>{direccion}</h4>
              <h4 className=' text-md text-black '>{tipoSitio}</h4>
            </div>
          </div>
        </div>
        <div className='flex flex-row w-full justify-center items-center  md:w-3/5  lg:hidden  '>
          {console.log(imagenes)}
          <CarruselImagenes images={imagenes} />
        </div>
        <div className='flex w-full flex-row  justify-center items-center lg:space-x-32 md:space-x-8 md:justify-between md:w-10/12  '>
          <div className='w-10/12 content-end rounded-xl h-full sm:h-auto pb-32 md:w-1/2 md:pt-16 lg:w-10/12'>
            <TablaLocal
              descripcion={descripcion}
              menu={menu}
              opiniones={opiniones}
            />
          </div>
          <div className=' flex flex-col pb-12 w-1/4 hidden md:block md:w-9/12'>
            <div className='hidden md:block'>
              {mostrarMapa && (
                <Mapa coordenadas={[{ latitud, longitud }]} altura='320px' />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default PaginaLocal

import TablaLocal from '../components/TablaLocal'
import { useEffect, useState } from 'react'
import { Rate } from 'antd'
// import { useNavigate } from 'react-router-dom'
import NavBar from '../components/NavBar'
import Mapa from '../components/Mapa'
import AutocompletarOpcionesPrincipal from '../components/AutocompletarOpcionesPrincipal'
import DecimalInput from '../components/InputDecimal'

const PaginaLocal = () => {
  // const [nombre, setNombre] = useState('');
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
  const [mostrarMapa, setMostrarMapa] = useState(false)
  const backendBaseUrl = 'http://localhost:8000' // Dirección base de tu backend de Django
  // const nombreLocal = useSelector((state) => state.busqueda.local);
  const nombreLocal = 'Uno ocho'
  // const user = useSelector((state) => state.user);
  // const navigate = useNavigate()
  // const dispatch = useDispatch();
  const [posibilidadesLocales, setposibilidadesLocales] = useState([])
  const [posibilidadesDonde, setPosibilidadesDonde] = useState([])
  const [posibilidadesTipo, setPosibilidadesTipo] = useState([])
  const [selectedOptionNombre, setSelectedOptionNombre] = useState('') // Lugar
  const [selectedOptionPoblacion, setselectedOptionPoblacion] = useState('') // Pueblo
  const [selectedOptionTipo, setSelectedOptionTipo] = useState('') // Pueblo
  // const handleLoginPage = async (e) => {

  //   navigate('/LoginPage')
  // };
  // const handleCerrarSesion = () => {
  //     // Lógica para cerrar sesión (ejemplo usando una acción de Redux)
  //     dispatch(logout());
  //     navigate("/local");
  //   };
  // const handleBuscarPrueba = () => {
  //   // Lógica para cerrar sesión (ejemplo usando una acción de Redux)
  //   navigate('/local')
  // };
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
        setMostrarMapa(true) // Cambiar a true para que el mapa se muestre cuando los datos estén disponibles
      } else {
        const errorData = await response.json()
        console.log(errorData)
      }
    } catch (error) {
      console.log(error)
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

  useEffect(() => {
    obtenerLocal(nombreLocal)
    cargarLugares()
    cargarPueblos()
    cargarTipos()
  }, [])
  return (
    <>
      <NavBar></NavBar>
      <div className='flex flex-col h-full w-full space-y-8 bg-green-300 '>
        <div className='flex flex-row w-full h-48  justify-center pt-24 space-x-32'>
          <div className='flex flex-col w-2/12'>
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
          </div>
          <div className='flex flex-col w-2/12'>
            <AutocompletarOpcionesPrincipal
              options={posibilidadesDonde}
              onOptionSelected={option =>
                handleOptionSelected(option, 'opcionesDonde')
              }
              labelText='Lugar'
            />
            <DecimalInput></DecimalInput>
          </div>
          <div className='flex flex-col items-center justify-center w-1/12'>
            <button className='block w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600'>
              Buscar
            </button>
          </div>
        </div>
        <div className='flex flex-row w-full justify-center items-center '>
          {imagenes.map((imagen, index) => (
            <div className='w-96 h-56 m-4' key={index}>
              <img
                src={imagen}
                alt='Foto del local'
                className='w-full h-full object-cover rounded-lg shadow-2xl'
              />
            </div>
          ))}
        </div>
        <div className='flex w-full flex-row  justify-center items-center space-x-32'>
          <div className='w-1/4 content-end rounded-xl h-full pb-32'>
            <TablaLocal
              descripcion={descripcion}
              menu={menu}
              opiniones={opiniones}
            />
          </div>
          <div className=' flex flex-col pb-12 w-1/4 '>
            <div className='flex flex-row pb-4 justify-between'>
              <div className='flex flex-col'>
                <h4 className='font-bold text-large text-black pb-4'>
                  {nombreSitio}
                </h4>
                <h4 className='font-bold text-large text-black pb-4'>
                  {tipoSitio}
                </h4>
              </div>
              <div className='flex flex-col'>
                <h4 className='font-bold text-large text-black pb-4'>
                  {direccion}
                </h4>
                <Rate value={valoracion}></Rate>
              </div>
            </div>
            <div>
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

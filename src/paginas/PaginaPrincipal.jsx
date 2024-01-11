import React, {useRef} from 'react'
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
  cambioLongitud,
  cambioLatitud,
  cambioRadio,
  
} from '../redux/searchSlice'
import {Modal} from 'antd'
import MapaArea from '../components/MapaArea'

import Switch from '../components/Switch'

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
  const [show, setShow] = useState(false);

  const [executeAccept, setExecuteAccept] = useState(false);
  const [executeCancel, setExecuteCancel] = useState(false);
  const [centro, setCentro] = useState(null);
  const [radio, setRadio] = useState(null);


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
  const handleClickMapaInteractivo = () => {
    setShow(true);
};

const handleAcceptMapaInteractivo  = async (centro,radio) => {
  setCentro(centro);
  setRadio(radio);
  if (centro && radio) {
    const [longitud, latitud] = centro;

    dispatch(cambioRadio(radio));
    dispatch(cambioLongitud(longitud))
    dispatch(cambioLatitud(latitud))
    navigate("/busquedaMapaDibujado")
    // const [longitud, latitud] = centro;
    // const data = {
    //   longitud: longitud,
    //   latitud: latitud,
    //   radio: radio,
    // };
    // try {
    //   const response = await fetch('http://localhost:8000/api/mapaDibujo', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(data),
    //   });
  
    //   if (response.ok) {
    //     console.log('Datos enviados exitosamente al servidor');
    //   } else {
    //     console.error('Error en la respuesta del servidor:', response.statusText);
    //   }
    // } catch (error) {
    //   console.error('Error al realizar la petición:', error);
    // }



  } else {
    alert('No se ha dibujado ninguna área');
  }
  setExecuteAccept(false);
  setShow(false);
};

const handleCancelMapaInteractivo = () => {
  // Cerrar el modal al cancelar
  setShow(false);
  setExecuteCancel(false);

  // navigate("/cargaPrincipal")
};

const handleExecuteAccept = () => {
  setExecuteAccept(true);
};

const handleExecuteCancel = () => {
  setExecuteCancel(true);
};

  useEffect(() => {
    handleBuscarLocal()
    cargarLugares()
    cargarPueblos()
    cargarTipos()
  }, [])

  return (
    <>
      <NavBar usuario={user} />
      <div className='h-full w-screen bg-fondo bg-opacity-0  bg-cover bg-center flex justify-center items-start  sm:pt-20 sm:pl-4 md:pt-12 
                      md:h-screen md:pl-0 md:h-[1150px] lg:h-[1100px] 2xl:bg-repeat xl:h-[1200px]'>
        <div className='flex flex-col   bg-tranparent h-full sm:items-center   md:w-4/4 md:items-start  lg:w-full lg:items-center '>
        <div className=' flex flex-col    w-2/3  items-center space-y-8 pt-8 sm:w-full sm:mr-8 md:pt-16 lg:w-8/12 lg:pt-12 xl:w-5/12 
                        xl:items-start xl:mr-[475px]  2xl:w-5/12 xl:mr-[600px]'>
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

            <div className='pt-4 md:flex md:w-full md:items-center md:justify-center '>
              <Switch  /> 
              
            </div>
            </div>
          </div>
          <div className='w-full lg:w-full xl:w-10/12 lg:ml-48 mt-8  rounded-2xl xl:items-start xl:ml-24 xl:mr-40'>
          <div className='bg-azul-oscuro bg-opacity-80   rounded-lg shadow-md sm:flex sm:flex sm:flex-col sm:items-center
                          sm:py-4 sm:px-2 sm:w-10/12 sm:ml-4 md:py-6  md:px-8  md:w-10/12 md:ml-14 lg:w-7/12 lg:ml-24  
                          xl:w-5/12  2xl:w-5/12 2xl:py-4  2xl:ml-24'> 
            <h4 className='sm:text-md sm:pl-4 md:pl-0 text-large  font-luckiestGuy md:text-xl 2xl:text-2xl text-orange-400'>
                Si lo prefieres puedes diseñar tu area
              </h4>
              <button className=' w-8/12 bg-azul-claro  text-black rounded-lg mt-4 text-lg py-2 font-acme md:text-xl rounded-lg hover:bg-blue-500 sm:w-8/12 sm:mx-auto sm:text-md'
               onClick={handleClickMapaInteractivo}>
                Mapa interactivo
              </button>
              <Modal
              title="Mapa Interactivo"
              open={show}
              onOk={handleExecuteAccept}
              onCancel={handleExecuteCancel}
              okText="Aceptar"
              cancelText="Cancelar"
              okButtonProps={{type: 'default'}}
              cancelButtonProps={{type: 'default', danger: 'true'}}
            >
              <MapaArea onAccept={handleAcceptMapaInteractivo} onCancel={handleCancelMapaInteractivo} executeAccept={executeAccept} executeCancel={executeCancel} />
            </Modal>
            </div>
          </div>
          <div
            id='recomendacion'
            className='flex flex-col bg-transparent pt-16 w-full sm:pl-2 md:pt-8 lg:w-9/12 lg:pt-8'
          >
            <h4 className=' text-large text-orange-400 sm:pl-12 md:text-xl md:pb-4 font-luckiestGuy 2xl:pl-24 2xl:text-2xl'>
              Nuestras recomendaciones
            </h4>
            <div
              id='localesRecomendacion'
              className='flex flex-row py-4 sm:flex-wrap sm:justify-center sm:space-x-2 sm:mr-10 md:mr-0 md:justify-between xl:flex-nowrap 2xl:justify-center 2xl:space-x-32 '
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

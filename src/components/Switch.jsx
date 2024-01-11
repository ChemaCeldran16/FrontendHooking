import React, { useState } from 'react';
import Switch from '@mui/material/Switch';
import FormGroup from '@mui/material/FormGroup';
import { useDispatch } from 'react-redux';
import { cambioLongitudLocalizacion, cambioLatitudLocalizacion } from '../redux/localizacionSlice';

export default function FormControlLabelPosition() {
  const [switchState, setSwitchState] = useState(false);
  const dispatch = useDispatch()

  const handleSwitchChange = () => {
    setSwitchState(!switchState);

    if (!switchState) {
      // El interruptor se activó, solicitar las coordenadas
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // Coordenadas obtenidas exitosamente
          const { latitude, longitude } = position.coords;
          dispatch(cambioLatitudLocalizacion(latitude))
          dispatch(cambioLongitudLocalizacion(longitude))
          console.log(`Coordenadas obtenidas: Latitud ${latitude}, Longitud ${longitude}`);
        },
        (error) => {
          // Manejar errores en la obtención de coordenadas
          console.error('Error al obtener coordenadas:', error.message);
        }
      );
    } else {
      // El interruptor se desactivó
      dispatch(cambioLatitudLocalizacion(""))
      dispatch(cambioLongitudLocalizacion(""))    }
  };

  return (
    <FormGroup>
      <div>
        <span className='sm:text-sm md:text-lg 2xl:text-xl'>Valoracion</span>
        <Switch checked={switchState} onChange={handleSwitchChange} color='warning'/>
        <span className='sm:text-sm md:text-lg 2xl:text-xl'>Ubicación actual</span>
      </div>
    </FormGroup>
  );
}
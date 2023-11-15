import React, { useState } from 'react'
import { Tabs } from 'antd'
import TablaComentario from './TablaComentario'
import BarraComentario from './BarraComentario'

const onChange = key => {}

const TablaLocal = ({ descripcion, menu, opiniones,horario }) => {
  const comentarios = Object.values(opiniones)
  const [showOpinionForm, setShowOpinionForm] = useState(false) // Estado para mostrar/ocultar el formulario de opinión
  const regex = /[\w\s-]+:\d+€/
  const regexHorario = /\*([^*]+)\*/g;
  const handleOpinionClick = () => {
    setShowOpinionForm(true) // Mostrar el formulario de opinión al hacer clic en el botón "Opinión"
  }

  const highlightLines = text => {
    // Divide el texto en líneas
    const lines = text.split('*') // Dividir por saltos de línea en lugar de asteriscos

    const highlightedLines = lines.map(line => {
      // Verifica si la línea contiene asteriscos al principio y al final
      if (regex.test(line)) {
        return (
          <>
            {line}
            <br />
          </>
        )
      } else {
        return (
          <>
            <strong>{line}</strong> <br />
          </>
        )
      }
    })

    // Devuelve las líneas resaltadas como un array
    return highlightedLines
  }

  const formateadorHorario = (texto) => {
    const lineas = texto.split('/');
  
    const resultado = lineas.map((linea, index) => {
      const partes = linea.trim().split(': ');
      console.log(partes+"!!!!!")
      if (partes.length === 2) {
        // Si hay dos puntos, formatea la parte antes de los dos puntos en negrita y la parte después sin negrita
        return (
          <React.Fragment key={index}>
            <strong>{partes[0]}</strong>: {partes[1]}<br />
          </React.Fragment>
        );
      } else {
        // Si no hay dos puntos, formatea toda la línea en negrita
        return (
          <React.Fragment key={index}>
            <strong>{linea.trim()}</strong><br />
          </React.Fragment>
        );
      }
    });
  
    return resultado;
  };

  const highlightedMenu = highlightLines(menu)
  const horarioFormateado = formateadorHorario(horario)

  const items = [
    {
      key: '1',
      label: 'Menú',
      children: (
        <div className='relative'>
          <div className='h-[245px] xl:h-[350px] overflow-y-scroll'>
            <h4 className='font-raleway xl:text-lg'>{highlightedMenu}</h4>
          </div>
        </div>
      ),
    },
    {
      key: '2',
      label: 'Descripción',
      children: (
        <div className='h-[245px] xl:h-[350px]'>
          <h4 className='font-dancingScript xl:text-lg'>{descripcion}</h4>
        </div>
      ),
    },
    {
      key: '3',
      label: 'Horario',
      children: (
        <div className='h-[245px] xl:h-[350px]'>
          <h4 className='font-dancingScript xl:text-lg'>{horarioFormateado}</h4>
        </div>
      ),
    },
    {
      key: '4',
      label: 'Opiniones',
      children: (
        <div class='relative'>
          <div class='h-[245px] overflow-y-scroll mb-30 pr-10 xl:h-[350px] 2xl:h-[355px]'>
            {comentarios.map(comentario => (
              <TablaComentario key={comentario.id} comentario={comentario} />
            ))}
          </div>
          <div class='pt-12 2xl:pt-16'></div>
          <div class=' absolute top-64'>
            <BarraComentario />
          </div>
        </div>
      ),
    },
  ]

  return (
    <div className='bg-blanco-gris h-full  rounded-xl pl-4'>
      <Tabs defaultActiveKey='1' items={items} onChange={onChange} />
      {showOpinionForm && <div class='flex justify-end items-end '></div>}
    </div>
  )
}

export default TablaLocal

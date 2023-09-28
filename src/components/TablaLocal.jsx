import React, { useState } from 'react'
import { Tabs } from 'antd'
import TablaComentario from './TablaComentario'
import BarraComentario from './BarraComentario'

const onChange = key => {}

const TablaLocal = ({ descripcion, menu, opiniones }) => {
  const comentarios = Object.values(opiniones)
  const [showOpinionForm, setShowOpinionForm] = useState(false) // Estado para mostrar/ocultar el formulario de opinión
  const regex = /[\w\s-]+:\d+€/
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

  const highlightedMenu = highlightLines(menu)

  const items = [
    {
      key: '1',
      label: 'Menú',
      children: (
        <div className='h-[245px] '>
          <h4>{highlightedMenu}</h4>
        </div>
      ),
    },
    {
      key: '2',
      label: 'Descripción',
      children: (
        <div className='h-[245px] '>
          <h4>{descripcion}</h4>
        </div>
      ),
    },
    {
      key: '3',
      label: 'Horario',
      children: (
        <div className='h-[245px] '>
          <h4>15:00-00:00</h4>
        </div>
      ),
    },
    {
      key: '4',
      label: 'Opiniones',
      children: (
        <div class='relative'>
          <div class='h-[245px] overflow-y-scroll mb-30 pr-10'>
            {comentarios.map(comentario => (
              <TablaComentario key={comentario.id} comentario={comentario} />
            ))}
          </div>
          <div class='pt-12'></div>
          <div class=' absolute top-64'>
            <BarraComentario />
          </div>
        </div>
      ),
    },
  ]

  return (
    <div className='bg-purple-400 h-full  rounded-xl pl-4'>
      <Tabs defaultActiveKey='1' items={items} onChange={onChange} />
      {showOpinionForm && <div class='flex justify-end items-end '></div>}
    </div>
  )
}

export default TablaLocal

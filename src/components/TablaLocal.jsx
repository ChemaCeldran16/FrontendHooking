import React, { useState } from 'react';
import { Tabs } from 'antd';
import TablaComentario from './TablaComentario';
import BarraComentario from './BarraComentario';

const onChange = (key) => {
};

const TablaLocal = ({ descripcion, menu, opiniones }) => {
  const comentarios = Object.values(opiniones);
  const [showOpinionForm, setShowOpinionForm] = useState(false); // Estado para mostrar/ocultar el formulario de opinión

  const handleOpinionClick = () => {
    setShowOpinionForm(true); // Mostrar el formulario de opinión al hacer clic en el botón "Opinión"
  };

  const items = [
    {
      key: '1',
      label: 'Descripción',
      children: descripcion,
    },
    {
      key: '2',
      label: 'Menú',
      children: menu,
    },
    {
      key: '3',
      label: 'Opiniones',
      children: (
        <div style={{ position: 'relative' }}>
          <div style={{ maxHeight: '350px', overflowY: 'scroll', marginBottom: '60px', paddingRight:'10px'}}>
            {comentarios.map((comentario) => (
              <TablaComentario key={comentario.id} comentario={comentario} />
            ))}
          </div>
          <div>
            <BarraComentario />
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className='bg-purple-400 h-full  rounded-xl pl-4'>
      <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
      {showOpinionForm && (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10%', position: 'absolute', bottom: -50, left: 0, right: 0 }}>
          <p>Dejanos tu opinión</p>
          <button onClick={handleOpinionClick}>Opinión</button>
        </div>
      )}
    </div>
  );
};

export default TablaLocal;
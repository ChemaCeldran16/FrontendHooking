import React, { useState, useEffect } from 'react';
import { List, Rate } from 'antd';

const TablaComentario = ({ comentario }) => {
  const [nombreUsuario, setNombreUsuario] = useState(null);

  

  useEffect(() => {
    const recibirUsuario = async () => {
      const dataToSend = {
        user: comentario.usuario
      };

      try {
        const response = await fetch('http://127.0.0.1:8000/api/info_User', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(dataToSend),
        })  
        // .then((response) => handleResponse(response))
        // .catch((error) => console.error('Error:', error));
        if (response.ok) {
          const textContent = await response.text();
          // console.log("Contenido de la respuesta:", textContent);
          const responseObject = JSON.parse(textContent); // Convierte la cadena JSON a un objeto
          const usuario = responseObject.usuario; // Obtiene el objeto de usuario de la respuesta
          const nombre = usuario.nombre;
          const apellido = usuario.apellido;
          setNombreUsuario(nombre + " " +apellido);
          console.log('Opinión enviada con éxito');
        } else {
          console.log('Error al enviar la opinión');
        }
      } catch (error) {
        console.log('Error de la solicitud:', error);
      }
      
    };

    recibirUsuario();
  }, [comentario.usuario]); // Agrega comentario.usuario como dependencia

  return (
    <List.Item>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'baseline', flexWrap: 'wrap' }}>
          <p style={{ fontSize: '16px', fontWeight: 'bold', paddingRight: '10px' }}>{comentario.titulo}</p>
          <Rate allowHalf defaultValue={comentario.puntuacion} />
        </div>
        <div>
          {/* Mostrar el nombre del usuario */}
          <p>Usuario: {nombreUsuario || "Cargando..."}</p>
        </div>
        <p>{comentario.mensaje}</p>
      </div>
    </List.Item>
  );
};

export default TablaComentario;
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
      <div className='flex flex-col border-b-2  border-blue-900 p-2 ' style={{ display: 'flex', flexDirection: 'column' }}>
        <div className='flex flex-row items-center justify-around pb-2 xl:justify-between'>
          <p className='font-bold text-xl sm:text-sm pr-4 font-raleway xl:text-xl '>{comentario.titulo}</p>
          <Rate className='text-sm xl:text-lg' allowHalf defaultValue={comentario.puntuacion} disabled />
        </div>
        <div className='pl-4 font-roboto '>
          <p>{comentario.mensaje}</p>
        </div>
        <div className='flex  pt-2 justify-end font-dancingScript'>
          {/* Mostrar el nombre del usuario */}
          <p> {nombreUsuario || "Cargando..."}</p>
        </div>
      </div>
    </List.Item>
  );
};

export default TablaComentario;
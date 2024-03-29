import React, { useState } from 'react';
import { Modal, Input, Rate } from 'antd';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import logo from '../static/img/TwitterLogo.png';
const BarraComentario = () => {
  const [showModal, setShowModal] = useState(false);
  const [opinionInput1, setOpinionInput1] = useState('');
  const [opinionInput2, setOpinionInput2] = useState('');
  const [valoracion, setValoracion] = useState(0);
  const nombreLocal = localStorage.getItem("nombreLocal")
  const [showLoginModal, setShowLoginModal] = useState(false); // Nuevo estado para el modal de inicio de sesión
  const [showLoginModalTwitter, setShowLoginModalTwitter] = useState(false); // Nuevo estado para el modal de inicio de sesión
  const navigate = useNavigate();
  const user = useSelector((state) => state.user); // Obtén el estado del usuario guardado
  


  const handleOpinion = () => {
    if (user.nombre !== "") {
      // Verifica si el usuario está logueado
      setShowModal(true);
    } else {
      setShowLoginModal(true); // Muestra el modal de inicio de sesión
    }
  };

  const handleModalOk = async () => {
    if (!opinionInput1 || !opinionInput2 || valoracion === 0) {
      // Si alguno de los campos no está relleno, muestra un mensaje al usuario
      alert('Por favor, completa todos los campos antes de enviar tu opinión.');
      return;
    }
    console.log(nombreLocal)
    let tweetText = opinionInput2 + "\nValoracion: " + valoracion.toString();
    localStorage.setItem("tweetText", tweetText);
    const dataToSend = {
      local: nombreLocal,
      email: user.email,
      titulo: opinionInput1,
      mensaje: opinionInput2,
      puntuacion: valoracion,
    };

    try {
      const response = await fetch('http://127.0.0.1:8000/api/opinion', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      });
      if (response.ok) {
        console.log('Opinión enviada con éxito');
        // navigate("/carga");
      } else {
        console.log('Error al enviar la opinión');
      }
      setShowLoginModalTwitter(true);



    } catch (error) {
      console.log('Error de la solicitud:', error);
    }



    setShowModal(false);
  };

  const handleModalCancel = () => {
    console.log('Se ha hecho clic en Cancelar');
    setShowModal(false);
  };

  const handleRateChange = (value) => {
    setValoracion(value);
  };

  const handleLoginModalOk = () => {
    navigate("/LoginPage");
    setShowLoginModal(false);
  };

  const handleLoginModalCancel = () => {
    setShowLoginModal(false);
  };
  const handleLoginTwitterModalCancel = () => {
    alert("Se almacenará la opinión pero no se publicará en Twitter")
    
    setShowLoginModal(false);
    navigate("/carga")
  };






  const handleAutenticacionTwitter = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/autenticacionTwitter');
      const data = await response.json();
      
      // Verifica si la solicitud fue exitosa
      if (!response.ok) {
        throw new Error('Error al solicitar el token de solicitud al backend');
      }
      console.log(response)
      // Extrae el token de solicitud del cuerpo de la respuesta
      const url = data.url;
      // console.log(requestToken);
  
      // Redirige al usuario a la página de autorización de Twitter
      window.location.href = url;
    } catch (error) {
      console.error('Error obteniendo el token de solicitud: ', error);
    }
  };

  return (
    <div class="flex flex-row w-full justify-center pl-36 sm:pl-16 lg:pl-28 xl:pt-28 xl:pl-32 2xl:pl-52 2xl:pt-30">
                  <button className='bg-orange-400  text-large font-bold font-fredoka rounded-md w-full 2xl:text-2xl' onClick={handleOpinion}> Dejanos tu opinión</button>

      <Modal
        title="Opinión"
        open={showModal}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        okText="Aceptar"
        cancelText="Cancelar"
        okButtonProps={{type: 'default'}}
        cancelButtonProps={{type: 'default', danger: 'true'}}
        >
        <div class='pt-4 pb-2'>
          <Input value={opinionInput1} onChange={(e) => setOpinionInput1(e.target.value)} placeholder="Titulo" className='w-full'/>
        </div>
        <div>
          <Input value={opinionInput2} onChange={(e) => setOpinionInput2(e.target.value)} placeholder="Opinión" className='h-16' />
        </div>
        <div className='pt-4'>
          <p>Valoración:</p>
          <Rate allowHalf={true} value={valoracion} onChange={handleRateChange} />
        </div>
      </Modal>

      <Modal
        title="Iniciar sesión"
        open={showLoginModal}
        onOk={handleLoginModalOk}
        onCancel={handleLoginModalCancel}
        okText="Aceptar"
        cancelText="Cancelar"
        okButtonProps={{type: 'default'}}
        cancelButtonProps={{type: 'default', danger: 'true'}}
      >
        <p>Por favor, inicia sesión para dejar tu opinión.</p>
      </Modal>

      <Modal
        title={
          <div className='flex flex-row items-center justify-center pr-20 font-bold  text-xl'>
            <img src={logo} alt="Twitter Logo" className='w-2/12 ' />
            Publica tu opinión en Twitter
          </div>
        }
        open={showLoginModalTwitter}
        onOk={handleAutenticacionTwitter}
        onCancel={handleLoginTwitterModalCancel}
        okText="Aceptar"
        cancelText="Cancelar"
        okButtonProps={{type: 'default'}}
        cancelButtonProps={{type: 'default', danger: 'true'}}
      >

        {/* <TweetForm></TweetForm> */}


        {/* <div class='pt-4 pb-2'>
          <Input value={correoTwitter} onChange={(e) => setCorreoTwitter(e.target.value)} placeholder="Correo" className='w-10/12'/>
        </div>
        <div>
          <Input type='password' value={contrasenaTwitter} onChange={(e) => setContrasenaTwitter(e.target.value)} placeholder="Contrarseña" className='w-10/12'  />
        </div> */}
      </Modal>



    </div>
  );
};

export default BarraComentario;




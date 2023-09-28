import React, { useState } from 'react';
import { Modal, Input, Rate } from 'antd';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { color } from 'framer-motion';

const BarraComentario = () => {
  const [showModal, setShowModal] = useState(false);
  const [opinionInput1, setOpinionInput1] = useState('');
  const [opinionInput2, setOpinionInput2] = useState('');
  const [valoracion, setValoracion] = useState(0);
  const [showLoginModal, setShowLoginModal] = useState(false); // Nuevo estado para el modal de inicio de sesión
  const navigate = useNavigate();
  const user = useSelector((state) => state.user); // Obtén el estado del usuario guardado
  const nombreLocal = useSelector(state => state.local.nombreLocal)
  


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
        navigate("/carga");
      } else {
        console.log('Error al enviar la opinión');
      }
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

  return (
    <div class="flex flex-row w-full justify-center pl-36 sm:pl-16">
                  <button className='bg-blue-400  text-large font-bold rounded-xl w-full' onClick={handleOpinion}> Dejanos tu opinión</button>

      <Modal
        title="Opinión"
        visible={showModal}
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
        visible={showLoginModal}
        onOk={handleLoginModalOk}
        onCancel={handleLoginModalCancel}
        okText="Aceptar"
        cancelText="Cancelar"
        okButtonProps={{type: 'default'}}
        cancelButtonProps={{type: 'default', danger: 'true'}}
      >
        <p>Por favor, inicia sesión para dejar tu opinión.</p>
      </Modal>
    </div>
  );
};

export default BarraComentario;




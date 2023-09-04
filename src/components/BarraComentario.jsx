import React, { useState } from 'react';
import { Modal, Input, Rate } from 'antd';
// import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const BarraComentario = () => {
  const [showModal, setShowModal] = useState(false);
  const [opinionInput1, setOpinionInput1] = useState('');
  const [opinionInput2, setOpinionInput2] = useState('');
  const [valoracion, setValoracion] = useState(0);
  const [showLoginModal, setShowLoginModal] = useState(false); // Nuevo estado para el modal de inicio de sesión
  const navigate = useNavigate();
//   const user = useSelector((state) => state.user); // Obtén el estado del usuario guardado
//   const nombreLocal = useSelector((state) => state.busqueda.local);
  
  const user = "" // Obtén el estado del usuario guardado
  const nombreLocal = "Kanalla Hookah"


  const handleOpinion = () => {
    if (user.nombre !== "") {
      // Verifica si el usuario está logueado
      setShowModal(true);
    } else {
      setShowLoginModal(true); // Muestra el modal de inicio de sesión
    }
  };

  const handleModalOk = async () => {
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
    <div style={{ position: 'absolute', bottom: -50, left: 0, right: 0, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10%' }}>
      <p>Dejanos tu opinión</p>
      <button onClick={handleOpinion}>Opinión</button>

      <Modal
        title="Opinión"
        visible={showModal}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        okText="Aceptar"
        cancelText="Cancelar"
      >
        <div>
          <Input value={opinionInput1} onChange={(e) => setOpinionInput1(e.target.value)} placeholder="Titulo" />
        </div>
        <div>
          <Input value={opinionInput2} onChange={(e) => setOpinionInput2(e.target.value)} placeholder="Opinión" />
        </div>
        <div>
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
      >
        <p>Por favor, inicia sesión para dejar tu opinión.</p>
      </Modal>
    </div>
  );
};

export default BarraComentario;




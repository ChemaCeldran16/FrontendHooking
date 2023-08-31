import React from 'react';
import logo from '../static/img/logo.png';
import { useNavigate } from 'react-router-dom';





const Marca = () => {
  const navigate = useNavigate();
  const handleClickTitulo = async (e) => {


    navigate("/");
  };


  return (
    <div className='flex items-center h-[var(--navbar-height)]'>
    <button className="flex items-center boton" onClick={handleClickTitulo}>
      <img src={logo} alt="Hooking" className='h-12 w-12 object-contain' />
      <span className="ml-2 text-sm font-bold">Hooking</span>
    </button>
  </div>
  );
}

export default Marca;
import React from 'react';
import logo from '../static/img/logo.png';
import { useNavigate } from 'react-router-dom';





const MarcaRegistroLogin = () => {
  const navigate = useNavigate();
  const handleClickTitulo = async (e) => {


    navigate("/");
  };


  return (
    <div className='flex items-center pl-8'>
    <button className="flex items-center boton" onClick={handleClickTitulo}>
      <img src={logo} alt="Hooking" className='h-20 w-16 object-contain md:h-24 md:w-20' />
      <span className="ml-8 text-lg font-bold md:text-xl">Hooking</span>
    </button>
  </div>
  );
}

export default MarcaRegistroLogin;
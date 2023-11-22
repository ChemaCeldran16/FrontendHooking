import NavBar from '../components/NavBar'
import ModalBusqueda from '../components/ModalBusqueda'
import React from 'react';
import { useNavigate } from 'react-router-dom';

const PaginaCarga = () => {
    const navigate = useNavigate();
    


    return (
        <div className='w-screen  '>
        
        <NavBar></NavBar>
        <div className="h-screen bg-fondo">
                <ModalBusqueda></ModalBusqueda>
        </div>
        </div>
    );
};

export default PaginaCarga;
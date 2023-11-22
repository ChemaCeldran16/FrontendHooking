import React from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const PaginaCarga = () => {
    const navigate = useNavigate();
    
    useEffect(() => {
        navigate("/local");
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Cargando...</p>
        </div>
    );
};

export default PaginaCarga;
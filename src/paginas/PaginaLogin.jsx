import React, { useEffect, useState } from "react";
import MarcaRegistroLogin from '../components/MarcaRegistroLogin'
import MailInput from '../components/MailInput'
import PasswordInput from '../components/PasswordInput'
import ComponenteLoginGoogle from '../components/ComponenteLoginGoogle'
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { login } from '../redux/userSlice';


export default function PaginaPrincipal() {
    const [correo, setCorreo] = useState('');
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const nombreLocal = useSelector((state) => state.local.nombreLocal);

    const handleLogin = async (e) => {
        e.preventDefault();
        
        const userData = {
          correo: correo,
          password,
        };
        try {
          const response = await fetch('http://127.0.0.1:8000/api/login/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
          });
    
          if (response.ok) {
            // El inicio de sesión fue exitoso
            const data = await response.json();
            const usuario = data.usuario;
            dispatch(
              login({
                nombre: usuario.nombre,
                apellido: usuario.apellido,
                email: usuario.email,
              })
            );
            if (nombreLocal) {
              navigate("/local"); // Si hay un local, redirige a /local
            } else {
              navigate("/"); // Si no hay local, redirige a /
            }
    
          } else {
            // Ocurrió un error en el inicio de sesión
            const errorData = await response.json();
            console.log(errorData); // Maneja el error según tus necesidades
          }
        } catch (error) {
          console.log(error); // Maneja el error de la solicitud según tus necesidades
        }
      };
    
      const handleRegisterPage = async (e) => {
        navigate("/RegisterPage");
      };

    useEffect(() => {
        
    }, []);

    return (
        <div className="flex w-full h-full justify-center pt-24 pb-48 bg-gray-900">
                <div className="flex-col content-center bg-gray-700  w-1/5 h-full rounded-lg p-8 ">
                    <MarcaRegistroLogin />
                    <div className="flex-col pt-8 space-y-8">
                        <MailInput setValue={setCorreo} value={correo} />
                        <PasswordInput
                            labelName="Introduce tu contraseña"
                            value={password}
                            setValue={setPassword}
                            validate={password.trim() !== ""}
                            MensajeError="La contraseña no puede estar en blanco"
                        />
                    </div>
                    <div className="flex justify-center pt-8 pb-8">
                        <button className="block w-3/4 px-4 py-2 bg-teal-700 text-white rounded-lg hover:bg-teal-600" onClick={handleLogin}>
                            Iniciar Sesión
                        </button>
                    </div>
                    <div className="flex justify-center pb-8 ">
                        <ComponenteLoginGoogle/>
                    </div>
                    <div className="flex flex-row justify-center items-center pt-4">

                        <span className=" text-md font-bold pr-4">¿Aún no tienes cuenta?</span>
                        <button className="block w-5/8 px-4 py-2 bg-teal-700 text-white rounded-lg hover:bg-teal-600" onClick={handleRegisterPage}>
                            Registrate
                        </button>
                    </div>
                </div>
        </div>
    );
}

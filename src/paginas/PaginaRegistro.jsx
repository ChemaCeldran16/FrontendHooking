import React, { useEffect, useState } from "react";
import MarcaRegistroLogin from '../components/MarcaRegistroLogin'
import MailInput from '../components/MailInput'
import NombreInput from '../components/NombreInput'
import PasswordInput from '../components/PasswordInput'
import { useNavigate } from "react-router-dom";

export default function PaginaPrincipal() {
    const [email, setEmail] = useState('');
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordsMatch, setPasswordsMatch] = useState(true);
    const navigate = useNavigate();

    const handlePaginaLogin = async (e) => {


        navigate("/LoginPage");
      };
    const handleRegistro = async (e) => {
    e.preventDefault();

    const userData = {
      email,
      nombre,
      apellido,
      password,
    };
    console.log(userData)

    try {
      const response = await fetch('http://127.0.0.1:8000/api/registro/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        // El registro fue exitoso
        const data = await response.json();
        console.log(data); // Maneja la respuesta según tus necesidades
        navigate("/LoginPage")
      } else {
        // Ocurrió un error en el registro
        const errorData = await response.json();
        console.log(errorData); // Maneja el error según tus necesidades
      }
    } catch (error) {
      console.log(error); // Maneja el error de la solicitud según tus necesidades
    }
  };

    useEffect(() => {
        setPasswordsMatch(password === confirmPassword);
    }, [password, confirmPassword]);

    return (
        <div className="flex w-screen h-full md:h-[1100px] justify-center 2xl:pt-16 md:pt-8 sm:pt-4  pb-12 bg-black lg:pt-0">
            <div className="xl:p-12 md:p-8 rounded-lg sm:p-4 sm:px-8 ">
                <div className="flex-col content-center bg-gray-800  w-full xl:h-full rounded-lg xl:p-8 md:p-8 sm:p-4 ">
                    <MarcaRegistroLogin />
                    <div className="flex-col pt-4  space-y-4">
                        <MailInput 
                        value={email}
                        setValue={setEmail}
                        />
                        <NombreInput labelName="Nombre" MensajeError="Por favor inserta un nombre válido" setValue={setNombre} value={nombre}/>
                        <NombreInput labelName="Apellidos" MensajeError="Por favor inserta unos apellidos válidos" setValue={setApellido} value={apellido}/>
                        <PasswordInput
                            labelName="Introduce tu contraseña"
                            value={password}
                            setValue={setPassword}
                            validate={passwordsMatch && (password.trim() !== "")}
                            MensajeError="Las contraseñas deben coincidir y no pueden estar en blanco"
                        />
                        <PasswordInput
                            labelName="Repite tu contraseña"
                            value={confirmPassword}
                            setValue={setConfirmPassword}
                            validate={passwordsMatch && (confirmPassword.trim() !== "")}
                            MensajeError="Las contraseñas deben coincidir y no pueden estar en blanco"
                        />
                    </div>
                    <div className="flex justify-center pt-8 pb-8">
                        <button className="block w-3/4 px-4 py-2 bg-teal-700 text-white rounded-lg hover:bg-teal-600" onClick={handleRegistro}>
                            Registrate
                        </button>
                    </div>
                    <div className="flex flex-row justify-center items-center">

                        <span className=" text-md font-bold pr-4">¿Ya tienes cuenta?</span>
                        <button className="block w-5/8 px-4 py-2 bg-teal-700 text-white rounded-lg hover:bg-teal-600" onClick={handlePaginaLogin}>
                            Inicia sesion
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

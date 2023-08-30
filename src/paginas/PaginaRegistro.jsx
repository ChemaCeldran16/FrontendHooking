import React, { useEffect, useState } from "react";
import MarcaRegistroLogin from '../components/MarcaRegistroLogin'
import MailInput from '../components/MailInput'
import NombreInput from '../components/NombreInput'
import PasswordInput from '../components/PasswordInput'

export default function PaginaPrincipal() {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordsMatch, setPasswordsMatch] = useState(true);

    useEffect(() => {
        setPasswordsMatch(password === confirmPassword);
    }, [password, confirmPassword]);

    return (
        <div className="flex w-full h-full justify-center pt-16 pb-16">
            <div className="bg-gray-900 w-1/4 p-12 rounded-lg">
                <div className="flex-col content-center bg-gray-700  w-full h-full rounded-lg p-8">
                    <MarcaRegistroLogin />
                    <div className="flex-col pt-8 space-y-4">
                        <MailInput />
                        <NombreInput labelName="Nombre" MensajeError="Por favor inserta un nombre válido"/>
                        <NombreInput labelName="Apellidos" MensajeError="Por favor inserta unos apellidos válidos"/>
                        <PasswordInput
                            labelName="Introduce tu contraseña"
                            value={password}
                            setValue={setPassword}
                            validate={passwordsMatch}
                            MensajeError="Las contraseñas deben coincidir"
                        />
                        <PasswordInput
                            labelName="Repite tu contraseña"
                            value={confirmPassword}
                            setValue={setConfirmPassword}
                            validate={passwordsMatch}
                            MensajeError="Las contraseñas deben coincidir"
                        />
                    </div>
                    <div className="flex justify-center pt-8 pb-8">
                        <button className="block w-3/4 px-4 py-2 bg-teal-700 text-white rounded-lg hover:bg-teal-600">
                            Registrate
                        </button>
                    </div>
                    <div className="flex flex-row justify-center items-center">

                        <span className=" text-md font-bold pr-4">¿Ya tienes cuenta?</span>
                        <button className="block w-5/8 px-4 py-2 bg-teal-700 text-white rounded-lg hover:bg-teal-600">
                            Inicia sesion
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

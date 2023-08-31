import React, { useEffect, useState } from "react";
import MarcaRegistroLogin from '../components/MarcaRegistroLogin'
import MailInput from '../components/MailInput'
import PasswordInput from '../components/PasswordInput'
import ComponenteLoginGoogle from '../components/ComponenteLoginGoogle'

export default function PaginaPrincipal() {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordsMatch, setPasswordsMatch] = useState(true);

    useEffect(() => {
        setPasswordsMatch(password === confirmPassword);
    }, [password, confirmPassword]);

    return (
        <div className="flex w-full h-full justify-center pt-24 pb-48 bg-gray-900">
                <div className="flex-col content-center bg-gray-700  w-1/5 h-full rounded-lg p-8 ">
                    <MarcaRegistroLogin />
                    <div className="flex-col pt-8 space-y-8">
                        <MailInput />
                        <PasswordInput
                            labelName="Introduce tu contraseña"
                            value={password}
                            setValue={setPassword}
                            validate={passwordsMatch}
                            MensajeError="Las contraseñas deben coincidir"
                        />
                    </div>
                    <div className="flex justify-center pt-8 pb-8">
                        <button className="block w-3/4 px-4 py-2 bg-teal-700 text-white rounded-lg hover:bg-teal-600">
                            Iniciar Sesión
                        </button>
                    </div>
                    <div className="flex justify-center pb-8 ">
                        <ComponenteLoginGoogle/>
                    </div>
                    <div className="flex flex-row justify-center items-center pt-4">

                        <span className=" text-md font-bold pr-4">¿Aún no tienes cuenta?</span>
                        <button className="block w-5/8 px-4 py-2 bg-teal-700 text-white rounded-lg hover:bg-teal-600">
                            Registrate
                        </button>
                    </div>
                </div>
        </div>
    );
}

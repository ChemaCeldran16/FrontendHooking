import React, { useState } from "react";
import { Input } from "@nextui-org/react";
import { IconoOjoCerrado } from "../static/iconos/IconoOjoCerrado";
import { IconoOjoAbierto } from "../static/iconos/IconoOjoAbierto";

export default function PasswordInput({ labelName, value, setValue, validate, MensajeError}) {
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => setIsVisible(!isVisible);

    const validationState = validate ? "valid" : "invalid";

    return (
        <Input
            label={labelName}
            variant="underlined"
            endContent={
                <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                    {isVisible ? (
                        <IconoOjoCerrado className="text-2xl text-default-400 pointer-events-none" />
                    ) : (
                        <IconoOjoAbierto className="text-2xl text-default-400 pointer-events-none" />
                    )}
                </button>
            }
            type={isVisible ? "text" : "password"}
            color={validationState === "invalid" ? "danger" : "success"}
            errorMessage={!validate && MensajeError}
            validationState={validationState}
            value={value}
            onValueChange={setValue}
            className="max-w-xs"
        />
    );
}

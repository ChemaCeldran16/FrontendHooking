import React from "react";
import { Input } from "@nextui-org/react";
import { IconoMail } from "../static/iconos/IconoMail";

export default function App() {
  const [value, setValue] = React.useState("junior2nextui.org");

  const validateEmail = (value) =>
    /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value.trim()); // Cambio en la expresión regular

  const validationState = React.useMemo(() => {
    if (value.trim() === "") return "invalid"; // Cambio aquí para considerar cadena vacía como inválida
    return validateEmail(value) ? "valid" : "invalid";
  }, [value]);

  return (
    <Input
      value={value}
      type="email"
      label="Email"
      variant="underlined"
      color={validationState === "invalid" ? "danger" : "success"}
      errorMessage={validationState === "invalid" && "Por favor inserta un email valido"}
      validationState={validationState}
      onValueChange={setValue}
      className="max-w-xs"
      endContent={
        <IconoMail className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
      }
    />
  );
}

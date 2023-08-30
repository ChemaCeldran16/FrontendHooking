import React from "react";
import { Input } from "@nextui-org/react";

export default function App({ labelName, MensajeError }) {
  const [value, setValue] = React.useState("");

  const validateName = (value) => /^[A-Za-z\s]*$/.test(value.trim()); // Cambio en la expresión regular

  const validationState = React.useMemo(() => {
    if (value === "") return "invalid"; // Cambio aquí para considerar cadena vacía como inválida

    return validateName(value) ? "valid" : "invalid";
  }, [value]);

  return (
    <Input
      value={value}
      label={labelName}
      variant="underlined"
      color={validationState === "invalid" ? "danger" : "success"}
      errorMessage={validationState === "invalid" && ` ${MensajeError}`}
      validationState={validationState}
      onValueChange={setValue}
      className="max-w-xs"
    />
  );
}

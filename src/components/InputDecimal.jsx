import React, { useState } from "react";
import clsx from "clsx";
const DecimalInput = ({ labelText }) => {
    const [value, setValue] = useState("");
  
    const handleChange = (event) => {
      const newValue = event.target.value;
      // Expresión regular para permitir solo números y un punto o una coma
      const regex = /^[0-9]*([.,])?[0-9]*$/;
  
      if (newValue === "" || (regex.test(newValue) && parseFloat(newValue) >= 0)) {
        setValue(newValue);
      }
    };
  
    const handleBlur = () => {
      // Asegurarse de que el primer y último caracteres sean números
      let sanitizedValue = value;
      if (!isNaN(value.charAt(0)) && !isNaN(value.charAt(value.length - 1))) {
        sanitizedValue = ensureLastCharacterIsNumber(sanitizedValue);
      } else {
        sanitizedValue = removeLastCharacterIfDotOrComma(sanitizedValue);
      }
  
      setValue(sanitizedValue);
    };
  
    const ensureLastCharacterIsNumber = (str) => {
      const lastChar = str.charAt(str.length - 1);
      if (!isNaN(lastChar)) {
        return str;
      } else {
        return str.slice(0, -1);
      }
    };
  
    const removeLastCharacterIfDotOrComma = (str) => {
      const lastChar = str.charAt(str.length - 1);
      if (lastChar === "." || lastChar === ",") {
        return str.slice(0, -1);
      }
      return str;
    };
  
    return (
      <input
        type="text"
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        className={clsx(
          "h-full w-full p-3 mb-4  rounded-lg placeholder-black text-black bg-blue-400"
        )}
        placeholder={labelText || "Ingresar número decimal"}
      />
    );
  };
  
  export default DecimalInput;
  
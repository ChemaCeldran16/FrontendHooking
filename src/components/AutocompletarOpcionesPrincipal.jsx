import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

const InputBuscador = ({ options, onOptionSelected, labelText }) => {
  return (
    <Autocomplete
      id="buscador-select"
      className="flex w-full mb-4 bg-teal-700 rounded-lg "
      options={options}
      autoHighlight
      getOptionLabel={(option) => option.label}
      renderOption={(props, option) => (
        <Box component="li" sx={{ "& > img": { mr: 2, flexShrink: 0 } }} {...props}>
          {option.label}
        </Box>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          label={labelText || "Buscar"}
          inputProps={{
            ...params.inputProps,
            autoComplete: "new-password", // disable autocomplete and autofill
          }}
        />
      )}
      onChange={(event, value) => onOptionSelected(value)}
    />
  );
};

export default InputBuscador;

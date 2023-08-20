import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

const AutocompletarOpcionesPrincipal = ({ options, onOptionSelected, labelText }) => {
  return (
    <Autocomplete
      id="buscador-select"
      sx={{ width: 300 }}
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

export default AutocompletarOpcionesPrincipal;
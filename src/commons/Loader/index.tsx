import React from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { customStyles } from "src/styles";

export const Spinner = () => {
  return (
    <Box sx={{ ...customStyles.centerStuff, position: "absolute" }}>
      <Typography sx={customStyles.loaderStyle}>Loading...</Typography>
    </Box>
  );
};

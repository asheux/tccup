import React from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import LinearProgress, {
  LinearProgressProps,
} from "@mui/material/LinearProgress";

import { isMobile } from "src/helpers";
import { customStyles } from "src/styles";

export const Spinner = () => {
  return (
    <Box sx={{ ...customStyles.centerStuff, position: "absolute" }}>
      <Typography sx={customStyles.loaderStyle}>Loading...</Typography>
    </Box>
  );
};

export const LinearProgressWithLabel = (
  props: LinearProgressProps & { value: number },
) => {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ width: "100%", mr: 1 }}>
        <LinearProgress
          variant="determinate"
          {...props}
          sx={{
            "& .MuiLinearProgress-bar": {
              backgroundColor: "#03abe2",
            },
          }}
        />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography
          variant="body2"
          sx={{ color: "#ffffff", fontSize: isMobile ? 27 : 12 }}
        >{`${Math.round(props.value)}%`}</Typography>
      </Box>
    </Box>
  );
};

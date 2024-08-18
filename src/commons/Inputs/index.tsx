import React from "react";
import { TextField, Typography } from "@mui/material";

import { styled } from "@mui/material/styles";
import { isMobile } from "src/helpers";

export const StyledInput = styled(TextField)({
  "& label.Mui-focused": {
    color: "#A0AAB4",
  },
  "& Label.MuiFormLabel-root": {
    fontSize: isMobile ? "20px" : "12px",
    lineHeight: "1.8em",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#B2BAC2",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "none",
    },
    "&:hover fieldset": {
      borderColor: "#35495E",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#35495E",
    },
  },
});

export const CustomLabel = (props) => {
  const { theme, label } = props;

  return (
    <Typography
      sx={{
        fontSize: isMobile ? 24 : 14,
        pb: 0.5,
        color: theme.palette.text.primary,
      }}
    >
      {label}
    </Typography>
  );
};

export const ShowError = (props) => {
  const { show, message, color } = props;

  return (
    <small
      style={{
        color: color,
        padding: "10px",
        border: `.5px solid ${color}`,
      }}
    >
      {show && message}
    </small>
  );
};

export const ControlledInput = styled(StyledInput)({
  "& .MuiOutlinedInput-input": {
    fontSize: isMobile ? "20px" : "14px",
  },
  "& .MuiInputBase-root": {
    height: isMobile ? "60px" : "40px",
  },
});

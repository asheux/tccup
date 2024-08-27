import React from "react";
import {
  TextField,
  Typography,
  Paper,
  IconButton,
  InputBase,
  Box,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useTheme } from "@mui/material/styles";

import { styled } from "@mui/material/styles";

// App related imports
import { StyledToolbar } from "src/commons/Toolbar";

import { isMobile } from "src/helpers";
import { customStyles } from "src/styles";

export const StyledInput = styled(TextField)({
  "& label.Mui-focused": {
    color: "#A0AAB4",
  },
  "& Label.MuiFormLabel-root": {
    fontSize: isMobile ? "24px" : "12px",
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
  const { show, message, color, showBorder } = props;
  const border = showBorder ? { border: `.5px solid ${color}` } : {};

  return (
    show && (
      <small
        style={{
          color: color,
          padding: "10px",
          ...border,
          fontSize: isMobile ? "22px" : "12px",
        }}
      >
        {message}
      </small>
    )
  );
};

export const SearchResponse = (props) => {
  const { handleSearchChange, searchTerm } = props;
  const theme = useTheme();

  return (
    <Box
      component="nav"
      sx={{
        ...customStyles.searchResponseAppBar,
        backgroundColor: theme.palette.primary.main,
      }}
    >
      <StyledToolbar disableGutters sx={customStyles.responseSearchToolbar}>
        <Paper
          component="form"
          sx={{
            ...customStyles.filterSearchStyles,
            width: "100%",
            backgroundColor: theme.palette.primary.main,
            boxShadow: 0,
          }}
        >
          <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
            <SearchIcon sx={customStyles.searchIcon} />
          </IconButton>
          <InputBase
            sx={customStyles.inputBase}
            onChange={handleSearchChange}
            value={searchTerm}
            placeholder="Search..."
            inputProps={{ "aria-label": "search listings" }}
          />
        </Paper>
      </StyledToolbar>
    </Box>
  );
};

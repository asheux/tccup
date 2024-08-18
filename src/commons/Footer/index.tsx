import React from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

const Footer = (props) => {
  const { data, theme } = props;

  return (
    <Paper
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        textAlign: "center",
        paddingTop: 1,
        paddingBottom: 1,
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.text.primary,
        borderRadius: 0,
      }}
      elevation={3}
    >
      <Typography
        sx={{
          fontSize: 11,
        }}
      >
        {data}
      </Typography>
    </Paper>
  );
};

export default Footer;

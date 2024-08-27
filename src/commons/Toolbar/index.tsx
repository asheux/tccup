import React from "react";
import { Box, Fade, Toolbar, Fab, Typography } from "@mui/material";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import { styled } from "@mui/material/styles";

import { isMobile } from "src/helpers";
import { customStyles } from "src/styles";

interface Props {
  children: React.ReactElement;
}

export const StyledToolbar = styled(Toolbar)(() => ({
  position: "sticky",
  ["@media (min-width:0px)"]: {
    minHeight: "50px",
  },
}));

export const ChangeLayout = (props) => {
  const { handleClick, label } = props;

  return (
    isMobile && (
      <Box
        onClick={handleClick}
        role="presentation"
        sx={{
          position: "fixed",
          bottom: 40,
          right: 30,
        }}
      >
        <Fab
          size="large"
          aria-label="change-layout"
          variant="extended"
          sx={{
            backgroundColor: "#10161d",
            "&:hover": {
              backgroundColor: "#22303d",
            },
            color: "#ffffff",
            mb: isMobile ? 6 : 0,
            fontSize: isMobile ? 20 : 11,
          }}
        >
          {label}
        </Fab>
      </Box>
    )
  );
};

export const SecretMessage = (props) => {
  const { handleClick, label, showSecretMessage, secret } = props;
  return (
    <Box
      onClick={handleClick}
      role="presentation"
      sx={{
        position: "fixed",
        bottom: 40,
        left: 30,
      }}
    >
      {showSecretMessage && (
        <Box
          sx={{
            width: isMobile ? "350px" : "310px",
            p: 2,
            borderRadius: 5,
            mb: 2,
            ml: 0.5,
            ...customStyles.messagePopover,
          }}
        >
          <Typography
            variant="h6"
            sx={{ pb: 0.5, fontSize: isMobile ? 30 : 16 }}
          >
            Secret Message
          </Typography>
          <Typography
            variant="body2"
            sx={{ fontStyle: "italic", fontSize: isMobile ? 24 : 12 }}
          >
            {secret
              ? "The expected behaviour for a system with null rule, of course, is that it immediately dies out for a program like a cellular automata. But since we are going to use a different program; Turing machine, the expected behaviour is for this machine to run forever or up to a finite number that you have set the program to run without changing any state. So if we run the above machine again for some steps, the following should be expected."
              : "You have not unlocked a secret. Play to unlock."}
          </Typography>
        </Box>
      )}
      <Fab
        size="large"
        aria-label="change-layout"
        variant="extended"
        sx={{
          backgroundColor: "#10161d",
          "&:hover": {
            backgroundColor: "#22303d",
          },
          color: "#ffffff",
          mb: isMobile ? 6 : 0,
        }}
      >
        {label}
      </Fab>
    </Box>
  );
};

export const ScrollTop = (props: Props) => {
  const { children } = props;

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const anchor = (
      (event.target as HTMLDivElement).ownerDocument || document
    ).querySelector("#back-to-top-anchor");

    if (anchor) {
      anchor.scrollIntoView({
        block: "center",
      });
    }
  };

  return (
    <Fade in={trigger}>
      <Box
        onClick={handleClick}
        role="presentation"
        sx={{
          position: "fixed",
          bottom: 40,
          right: 30,
        }}
      >
        {children}
      </Box>
    </Fade>
  );
};

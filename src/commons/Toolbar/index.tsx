import React from "react";
import { Box, Fade, Toolbar, Typography } from "@mui/material";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import { styled } from "@mui/material/styles";

import { isMobile } from "src/helpers";
import { customStyles } from "src/styles";
import { StyledButton } from "src/commons/Buttons";

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
      <StyledButton
        size="large"
        onClick={handleClick}
        sx={{
          backgroundColor: "#038ebb",
          "&:hover": {
            backgroundColor: "#036889",
          },
          color: "#ffffff",
          mb: isMobile ? 6 : 0,
          fontSize: isMobile ? 30 : 11,
          position: "fixed",
          bottom: 40,
          right: 30,
          borderRadius: 5,
          zIndex: 1000,
        }}
      >
        {label}
      </StyledButton>
    )
  );
};

export const SecretMessage = (props) => {
  const { handleClick, label, showSecretMessage, secret } = props;
  return (
    <>
      {showSecretMessage && (
        <Box
          sx={{
            width: isMobile ? "700px" : "310px",
            p: 2,
            borderRadius: 5,
            mb: isMobile ? 16 : 14,
            ml: 1,
            ...customStyles.messagePopover,
            position: "fixed",
            bottom: isMobile ? 60 : 0,
            left: isMobile ? 50 : 30,
          }}
        >
          <Typography
            variant="h6"
            sx={{ pb: 0.5, fontSize: isMobile ? 50 : 16 }}
          >
            Secret Message
          </Typography>
          <Typography variant="body2" sx={{ fontSize: isMobile ? 35 : 12 }}>
            {secret
              ? secret
              : "You have not unlocked a secret. Play to unlock."}
          </Typography>
        </Box>
      )}
      <Box
        onClick={handleClick}
        sx={{
          backgroundColor: "#038ebb",
          "&:hover": {
            backgroundColor: "#036889",
          },
          color: "#ffffff",
          mb: isMobile ? 6 : 0,
          fontSize: isMobile ? 30 : 14,
          position: "fixed",
          bottom: isMobile ? 30 : 40,
          p: isMobile ? 3 : 2,
          left: 30,
          cursor: "pointer",
          borderRadius: "100%",
          zIndex: 1000,
        }}
      >
        {label}
      </Box>
    </>
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

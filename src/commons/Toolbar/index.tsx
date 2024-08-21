import * as React from "react";
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import Toolbar from "@mui/material/Toolbar";
import Fab from "@mui/material/Fab";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import { styled } from "@mui/material/styles";

import { isMobile } from "src/helpers";

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
          left: 30,
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
            mb: isMobile ? 4 : 0,
            fontSize: 18,
          }}
        >
          {label}
        </Fab>
      </Box>
    )
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

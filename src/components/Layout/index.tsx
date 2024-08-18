// External imports
import React from "react";
import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Fab from "@mui/material/Fab";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import LightModeIcon from "@mui/icons-material/LightMode";
import { useTheme } from "@mui/material/styles";

// App related imports
import Footer from "src/commons/Footer";
import { StyledToolbar, ScrollTop } from "src/commons/Toolbar";
import { isMobile } from "src/helpers";
import { customStyles } from "src/styles";

const tccup_logo = "/icons/google.svg";

const Layout = (props) => {
  const { children, toggleTheme } = props;
  const theme = useTheme();

  return (
    <React.Fragment>
      <AppBar
        component="nav"
        sx={{
          boxShadow: 1,
          backgroundColor: theme.palette.primary.main,
          zIndex: 1302,
        }}
      >
        <Container maxWidth="xl">
          <StyledToolbar disableGutters sx={isMobile ? { height: 100 } : {}}>
            <Box component="div" sx={customStyles.tccupName}>
              <Link
                to="/"
                style={{
                  textDecoration: "none",
                  color: theme.palette.text.primary,
                }}
              >
                <Stack direction="row" alignItems="center">
                  <img
                    className="questlist_logo"
                    src={tccup_logo}
                    height="30px"
                    width="30px"
                  />
                  <Typography
                    component="h6"
                    sx={{
                      fontSize: isMobile ? 30 : 18,
                      fontWeight: 500,
                    }}
                  >
                    Tccup
                  </Typography>
                </Stack>
              </Link>
            </Box>
            <Box sx={{ flexGrow: 0, mr: 2, cursor: "pointer" }}>
              <LightModeIcon onClick={toggleTheme} />
            </Box>
          </StyledToolbar>
        </Container>
      </AppBar>
      <StyledToolbar id="back-to-top-anchor" />
      {children}
      <Footer
        data={`@ ${new Date().getFullYear()}, Tccup: The Cosmic Clean Up.`}
        theme={theme}
      />
      <ScrollTop {...props}>
        <Fab
          size="small"
          aria-label="scroll back to top"
          sx={{
            backgroundColor: "#10161d",
            "&:hover": {
              backgroundColor: "#22303d",
            },
          }}
        >
          <KeyboardArrowUpIcon sx={{ color: "#ffffff" }} />
        </Fab>
      </ScrollTop>
    </React.Fragment>
  );
};

export default Layout;

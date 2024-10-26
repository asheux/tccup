// External imports
import React from "react";
import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import LightModeIcon from "@mui/icons-material/LightMode";
import { useTheme } from "@mui/material/styles";

// App related imports
import Footer from "src/commons/Footer";
import {
  StyledToolbar,
  ChangeLayout,
  SecretMessage,
} from "src/commons/Toolbar";
import { isMobile } from "src/helpers";
import { customStyles } from "src/styles";

const tccup_logo = "/icons/tccup.png";

const Layout = (props) => {
  const {
    children,
    toggleTheme,
    handleChangeLayout,
    label,
    showSecretMessage,
    setShowSecretMessage,
    secret,
  } = props;
  const theme = useTheme();

  const handleViewSecret = () => {
    setShowSecretMessage(!showSecretMessage);
  };

  return (
    <React.Fragment>
      <AppBar
        component="nav"
        sx={{
          boxShadow: 1,
          backgroundColor: theme.palette.primary.main,
          zIndex: 10,
        }}
      >
        <Container maxWidth="xl">
          <StyledToolbar disableGutters sx={isMobile ? { height: 150 } : {}}>
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
                    height={isMobile ? "80px" : "30px"}
                    width={isMobile ? "80px" : "30px"}
                  />
                  <Typography
                    sx={{
                      fontSize: isMobile ? 45 : 22,
                      fontWeight: 500,
                    }}
                  >
                    enyasparks
                  </Typography>
                </Stack>
              </Link>
            </Box>
            <Box sx={{ flexGrow: 0, mr: 2, cursor: "pointer" }}>
              <LightModeIcon
                onClick={toggleTheme}
                sx={{ width: isMobile ? 80 : 30, height: isMobile ? 80 : 30 }}
              />
            </Box>
          </StyledToolbar>
        </Container>
      </AppBar>
      {children}
      <Footer
        data={`@ ${new Date().getFullYear()}, Kenyasparks by Blus Vikjel (@vikjel on X, blus.vijkel@protonmail.com).`}
        theme={theme}
      />
      <ChangeLayout handleClick={handleChangeLayout} label={label} />
      <SecretMessage
        handleClick={handleViewSecret}
        showSecretMessage={showSecretMessage}
        secret={secret}
        label="SM"
      />
    </React.Fragment>
  );
};

export default Layout;

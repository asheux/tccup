import React, { useState } from "react";
import {
  Container,
  Box,
  Typography,
  Divider,
  Grid,
  Stack,
  Paper,
} from "@mui/material";
import { connect } from "react-redux";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

import Layout from "src/components/Layout";
import { isMobile, projects } from "src/helpers";

const Archive = (props) => {
  const [showSecretMessage, setShowSecretMessage] = useState(false);

  const theme = useTheme();
  const navigate = useNavigate();

  const handleChangeLayout = () => {
    navigate("/");
  };

  const handleOpenArchive = (e) => {
    const id = e.currentTarget.getAttribute("id");
    localStorage.setItem("projectName", id);
    navigate("/archives");
  };

  return (
    <Layout
      {...props}
      handleChangeLayout={handleChangeLayout}
      showSecretMessage={showSecretMessage}
      setShowSecretMessage={setShowSecretMessage}
      secret=""
      label="Go back home"
    >
      <Container
        maxWidth="xl"
        sx={{
          color: theme.palette.text.primary,
          boxSizing: isMobile ? "inherit" : "inherit",
          mt: isMobile ? 22 : 8,
          mb: isMobile ? 22 : 8,
        }}
      >
        <Box>
          <Typography
            sx={{
              fontSize: isMobile ? 45 : 25,
              fontStyle: "italic",
            }}
          >
            The Kenya Archive's
          </Typography>
          <Divider orientation="horizontal" />
          <Grid
            container
            spacing={isMobile ? 4 : 2}
            sx={{ mt: 2 }}
            alignItems="center"
          >
            {projects.map((proj, index) => (
              <Grid item xs={3} sm={12} md={6} lg={3} key={index}>
                <Stack>
                  <Paper
                    onClick={handleOpenArchive}
                    id={proj.value}
                    sx={{
                      p: 2,
                      cursor: "pointer",
                    }}
                  >
                    <Typography
                      color="text.secondary"
                      sx={{
                        fontSize: isMobile ? 33 : 15,
                        fontStyle: "italic",
                      }}
                    >
                      {`Project: ${proj.label}`}
                    </Typography>
                  </Paper>
                </Stack>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Layout>
  );
};

const mapStateToProps = (state) => ({
  thought: state.thought,
  thoughts: state.thoughts,
  vote: state.vote,
  upload: state.upload,
  trashdetect: state.trashdetect,
});

export default connect(mapStateToProps, {})(Archive);

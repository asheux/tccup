import React, { useState, useEffect } from "react";
import {
  Container,
  Box,
  Typography,
  Divider,
  Grid,
  Stack,
} from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { connect } from "react-redux";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

import Layout from "src/components/Layout";
import { isMobile, dateFormatterNoTime } from "src/helpers";
import { getBlocksAction } from "src/redux/actions/blocks";
import { useAppSelector } from "src/hooks";

const Archive = (props) => {
  const { getBlocksAction } = props;
  const [showSecretMessage, setShowSecretMessage] = useState(false);

  const blocks = useAppSelector((state) => state.blocks);
  const theme = useTheme();
  const navigate = useNavigate();

  const handleChangeLayout = () => {
    navigate("/");
  };

  useEffect(() => {
    const projectName = localStorage.projectName;
    if (projectName) {
      getBlocksAction(projectName);
    }
  }, [localStorage.projectName]);

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
          <Grid container spacing={1} sx={{ mt: 2 }} alignItems="center">
            {blocks.loading ? (
              <Stack
                direction="row"
                alignItems="center"
                sx={{ mt: 2 }}
                spacing={1}
              >
                <ErrorOutlineIcon sx={{ fontSize: 25 }} />
                <Typography color="text.secondary">Loading data...</Typography>
              </Stack>
            ) : blocks.data.length ? (
              blocks.data.map((block) => (
                <Grid key={block?.id} item xs={2} sm={4} md={4} lg={2}>
                  <Stack>
                    <Box
                      component="img"
                      src={block?.image_link}
                      alt="No image"
                      sx={{
                        width: "100%",
                        maxHeight: 300,
                      }}
                    ></Box>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        fontStyle: "italic",
                        fontSize: isMobile ? 22 : 14,
                      }}
                    >
                      {`Photo By ${block.created_by} on ${dateFormatterNoTime(block.timestamp)}`}
                    </Typography>
                  </Stack>
                </Grid>
              ))
            ) : (
              <Stack
                direction="row"
                alignItems="center"
                sx={{ mt: 2 }}
                spacing={1}
              >
                <ErrorOutlineIcon sx={{ fontSize: 25 }} />
                <Typography color="text.secondary">
                  No data available
                </Typography>
              </Stack>
            )}
          </Grid>
        </Box>
      </Container>
    </Layout>
  );
};

const mapStateToProps = (state) => ({
  blocks: state.blocks,
});

export default connect(mapStateToProps, { getBlocksAction })(Archive);

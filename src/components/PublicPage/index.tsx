// External imports
import React, { useState } from "react";
import {
  Grid,
  Container,
  Typography,
  Box,
  Stack,
  Divider,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

// App related imports
import Layout from "src/components/Layout";
import Message from "src/commons/Message";
import { StyledButton } from "src/commons/Buttons";
import {
  StyledInput,
  CustomLabel,
  ShowError,
  ControlledInput,
} from "src/commons/Inputs";
import { customStyles } from "src/styles";

const PublicPage = (props) => {
  const { darkMode } = props;
  const [openForm, setOpenForm] = useState(false);
  const [canvote, setCanvote] = useState(false);
  const theme = useTheme();
  // const description = "While many critics refer to film noir as a genre itself, others argue that it can be no such thing.[13] Foster Hirsch defines a genre as determined by 'conventions of narrative structure, characterization, theme, and visual design.' Hirsch, as one who has taken the position that film noir is a genre, argues that these elements are present 'in abundance.' Hirsch notes that there are unifying features of tone, visual style and narrative sufficient to classify noir as a distinct genre";
  const description =
    "This is a testing thought I think you can do more than 5 words the is the first second third";
  const lists = [1, 2, 3, 4, 5, 6, 7];
  const handleOpenForm = () => {
    setOpenForm(true);
  };

  const handleChange = (e) => {
    console.log(e.target.value);
  };

  return (
    <React.Fragment>
      <Layout {...props}>
        <Container maxWidth="xl" sx={{ color: theme.palette.text.primary }}>
          <Grid container spacing={2}>
            <Grid
              item
              xs={8}
              sx={{
                boxShadow: `4px 0 4px -4px ${darkMode ? "rgba(0,0,0,0.5)" : "#22303d"}`,
                position: "fixed",
                width: "59.67vw",
                height: "100vh",
                overflow: "hidden",
              }}
            >
              <Container
                sx={{
                  ...customStyles.centerStuff,
                  height: "100%",
                }}
              >
                <Stack spacing={2}>
                  <Box>
                    <Typography variant="h3">The Cosmic Clean up</Typography>
                    <Typography
                      sx={{ fontStyle: "italic" }}
                      variant="body1"
                      color="text.secondary"
                    >
                      Pick up trash, pick up freedom. Literally!
                    </Typography>
                    <Typography
                      sx={{ fontStyle: "italic" }}
                      variant="body1"
                      color="text.secondary"
                    >
                      Like recycling, but for democracy.
                    </Typography>
                    <Typography
                      sx={{ fontStyle: "italic" }}
                      variant="body1"
                      color="text.secondary"
                    >
                      Every piece of trash picked up gets you a vote in a
                    </Typography>
                    <Typography
                      sx={{ fontStyle: "italic" }}
                      variant="body1"
                      color="text.secondary"
                    >
                      "What Should We Do Next As A Country?" referendum.
                    </Typography>
                  </Box>
                  <Stack direction="row" spacing={2}>
                    <StyledButton>
                      Upload a photo of your trash haul
                    </StyledButton>
                    <StyledButton onClick={handleOpenForm}>
                      What should we do next?
                    </StyledButton>
                  </Stack>
                  {openForm &&
                    (!canvote ? (
                      <Stack spacing={2}>
                        <Box>
                          <Divider />
                        </Box>
                        <CustomLabel
                          theme={theme}
                          label="All humans are born free and equal in dignity and rights."
                        />
                        <Stack>
                          <ControlledInput
                            id="name"
                            placeholder="Choose a name"
                            size="small"
                            name="name"
                            fullWidth
                            required
                            onChange={handleChange}
                          />
                        </Stack>
                        <Stack spacing={2}>
                          <StyledInput
                            id="thoughts"
                            placeholder="Let's get your input for a new government"
                            name="thoughts"
                            fullWidth
                            required
                            multiline
                            rows={10}
                            onChange={handleChange}
                            sx={{
                              "& .MuiOutlinedInput-input": {
                                fontSize: "14px",
                              },
                            }}
                          />
                          <StyledButton sx={{ width: "20%" }}>
                            Submit
                          </StyledButton>
                        </Stack>
                      </Stack>
                    ) : (
                      <ShowError
                        show={!canvote && openForm}
                        message="Show me your trash, and I will show you your vote."
                      />
                    ))}
                </Stack>
              </Container>
            </Grid>
            <Grid
              item
              xs={4}
              sx={{
                mt: 1,
                mb: 3,
                ml: "66.67%",
              }}
            >
              <Box sx={{ mb: 4 }}>
                {lists.map((item) => (
                  <Message
                    id={item}
                    description={description}
                    name="Brian Mboya"
                    postedOn="2024-10-10"
                  />
                ))}
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Layout>
    </React.Fragment>
  );
};

export default PublicPage;

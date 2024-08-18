// External imports
import React, { useState, useEffect } from "react";
import {
  Grid,
  Container,
  Typography,
  Box,
  Stack,
  Divider,
  CircularProgress,
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
import { useAppSelector } from "src/hooks";
import initState from "src/redux/reducers/initState";

const PublicPage = (props) => {
  const { darkMode, saveThoughtAction, getThoughtsAction, saveVoteAction } =
    props;
  const [openForm, setOpenForm] = useState(false);
  const [canvote, setCanvote] = useState(false);
  const [payload, setPayload] = useState(initState.thoughtpayload);
  const [data, setData] = useState([]);
  const [errors, setErrors] = useState(initState.errors);
  const [errorMessages, setErrorMessages] = useState(initState.errorMessages);

  const theme = useTheme();
  const thought = useAppSelector((state) => state.thought);
  const thoughts = useAppSelector((state) => state.thoughts);

  const handleOpenForm = () => {
    setOpenForm(true);
  };

  useEffect(() => {
    getThoughtsAction();
  }, []);

  useEffect(() => {
    setData(thoughts.data);
  }, [thoughts]);

  const parseErrors = (errs) => ({
    name: !!errs["name"],
    description: !!errs["description"],
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    saveThoughtAction(payload).then((res) => {
      if (res && res.type === "thought/failure") {
        const errs = res.payload?.error;
        const parsedErrors = parseErrors(errs);
        setErrors({ ...errors, ...parsedErrors });
        setErrorMessages({ ...errorMessages, ...errs });
      } else {
        setOpenForm(false);
        getThoughtsAction();
      }
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setErrors({ ...errors, [name]: false });
    setPayload({ ...payload, [name]: value });
  };

  const updateUpvotes = (toupdate, newVote, id) => {
    return toupdate.map((ct) => {
      let upvs = ct.upvotes;
      if (String(ct.id) === id) {
        upvs += newVote;
      }
      return {
        ...ct,
        upvotes: upvs,
      };
    });
  };

  const handleUpvote = (e) => {
    const id = e.currentTarget.getAttribute("id");
    const newVote = 1;
    let cloneThoughts = updateUpvotes(data, newVote, id);
    if (
      localStorage.voted &&
      localStorage.voted?.split(",")[0] === "downvote" &&
      localStorage.voted?.split(",")[1] === id
    ) {
      cloneThoughts = updateDownvotes(cloneThoughts, -1, id);
      saveVoteAction(id, -1, "downvote");
    }
    setData(cloneThoughts);
    saveVoteAction(id, newVote, "upvote");
    localStorage.setItem("voted", `upvote,${id}`);
  };

  const updateDownvotes = (toupdate, newVote, id) => {
    return toupdate.map((ct) => {
      let downvs = ct.downvotes;
      if (String(ct.id) === id) {
        downvs += newVote;
      }
      return {
        ...ct,
        downvotes: downvs,
      };
    });
  };

  const handleDownvote = (e) => {
    const id = e.currentTarget.getAttribute("id");
    const newVote = 1;
    let cloneThoughts = updateDownvotes(data, newVote, id);
    if (
      localStorage.voted &&
      localStorage.voted?.split(",")[0] === "upvote" &&
      localStorage.voted?.split(",")[1] === id
    ) {
      cloneThoughts = updateUpvotes(cloneThoughts, -1, id);
      saveVoteAction(id, -1, "upvote");
    }
    setData(cloneThoughts);
    saveVoteAction(id, newVote, "downvote");
    localStorage.setItem("voted", `downvote,${id}`);
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
                      Pick up trash, pick up freedom. Literally! Like recycling,
                    </Typography>
                    <Typography
                      sx={{ fontStyle: "italic" }}
                      variant="body1"
                      color="text.secondary"
                    >
                      but for democracy. Every piece of trash picked up
                    </Typography>
                    <Typography
                      sx={{ fontStyle: "italic" }}
                      variant="body1"
                      color="text.secondary"
                    >
                      gets you a token to say something in a
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
                    (canvote ? (
                      <Stack spacing={2}>
                        <Box>
                          <Divider />
                        </Box>
                        <CustomLabel
                          theme={theme}
                          label=" You only get one input. Make it count."
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
                            error={errors.name}
                            helperText={errors.name && errorMessages.name}
                          />
                        </Stack>
                        <Stack spacing={2}>
                          <StyledInput
                            id="thoughts"
                            placeholder="Let's get your input for a new government."
                            name="description"
                            fullWidth
                            required
                            multiline
                            rows={10}
                            onChange={handleChange}
                            error={errors.description}
                            helperText={
                              errors.description && errorMessages.description
                            }
                            sx={{
                              "& .MuiOutlinedInput-input": {
                                fontSize: "14px",
                              },
                            }}
                          />
                        </Stack>
                        {errors.name && (
                          <ShowError
                            show={errors.name}
                            color="orange"
                            message="Simply search your name on the list to see all the coins you gathered."
                          />
                        )}
                        <StyledButton
                          onClick={handleSubmit}
                          disabled={errors.name || errors.description}
                          sx={{ width: "20%" }}
                        >
                          {thought.loading ? (
                            <CircularProgress
                              variant="indeterminate"
                              disableShrink
                              sx={{ color: "#ffffff" }}
                              size={customStyles.spinnerSize}
                              thickness={4}
                            />
                          ) : (
                            "Submit"
                          )}
                        </StyledButton>
                      </Stack>
                    ) : (
                      <ShowError
                        show={!canvote && openForm}
                        color="#d32f2f"
                        message="Show me your trash, and I will show you your token."
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
                {thoughts.loading ? (
                  <Box sx={{ ...customStyles.centerStuff, height: "100vh" }}>
                    <CircularProgress
                      variant="indeterminate"
                      disableShrink
                      sx={{ color: "#ffffff" }}
                      size={customStyles.spinnerSize}
                      thickness={4}
                    />
                  </Box>
                ) : !thoughts.data.length ? (
                  <Box sx={{ ...customStyles.centerStuff, height: "100vh" }}>
                    <Typography
                      sx={{ fontStyle: "italic" }}
                      variant="body1"
                      color="text.secondary"
                    >
                      Congratulations! You get to be the first to say something!
                    </Typography>
                  </Box>
                ) : (
                  data.map((item) => (
                    <Box
                      key={item.id}
                      className="ratings-reviews-body"
                      sx={{
                        color: theme.palette.text.primary,
                      }}
                    >
                      <Message
                        id={item.id}
                        handleUpvote={handleUpvote}
                        handleDownvote={handleDownvote}
                        description={item.thought}
                        name={item.name}
                        postedOn={item.created_at}
                        upvotes={item.upvotes}
                        downvotes={item.downvotes}
                        grokcoins={item.grokcoins}
                      />
                    </Box>
                  ))
                )}
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Layout>
    </React.Fragment>
  );
};

export default PublicPage;

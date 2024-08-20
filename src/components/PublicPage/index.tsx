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
  Paper,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

// App related imports
import Layout from "src/components/Layout";
import Message from "src/commons/Message";
import { StyledButton, VisuallyHiddenInput } from "src/commons/Buttons";
import {
  StyledInput,
  CustomLabel,
  ShowError,
  ControlledInput,
} from "src/commons/Inputs";
import { LinearProgressWithLabel } from "src/commons/Loader";
import { customStyles } from "src/styles";
import { useAppSelector } from "src/hooks";
import { convertBlobObjToUrl } from "src/helpers";
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
  const [uploadedImage, setUploadedImage] = useState(null);
  const [progress, setProgress] = useState(0);
  const [isUploading, setIsUploadinng] = useState(false);
  const [progressMessage, setProgressMessage] = useState("Upload your image");

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
    setOpenForm(false);
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
    let newVote = 1;
    let cloneThoughts = updateUpvotes(data, newVote, id);
    if (localStorage.voted && localStorage.voted?.split(",")[1] === id) {
      if (localStorage.voted?.split(",")[0] === "downvote") {
        cloneThoughts = updateDownvotes(cloneThoughts, -1, id);
        saveVoteAction(id, -1, "downvote");
        localStorage.setItem("voted", `upvote,${id}`);
      } else {
        newVote = -1;
        cloneThoughts = updateUpvotes(data, newVote, id);
        localStorage.removeItem("voted");
      }
    } else {
      localStorage.setItem("voted", `upvote,${id}`);
    }
    setData(cloneThoughts);
    saveVoteAction(id, newVote, "upvote");
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
    let newVote = 1;
    let cloneThoughts = updateDownvotes(data, newVote, id);
    if (localStorage.voted && localStorage.voted?.split(",")[1] === id) {
      if (localStorage.voted?.split(",")[0] === "upvote") {
        cloneThoughts = updateUpvotes(cloneThoughts, -1, id);
        saveVoteAction(id, -1, "upvote");
        localStorage.setItem("voted", `downvote,${id}`);
      } else {
        newVote = -1;
        cloneThoughts = updateDownvotes(data, newVote, id);
        localStorage.removeItem("voted");
      }
    } else {
      localStorage.setItem("voted", `downvote,${id}`);
    }
    setData(cloneThoughts);
    saveVoteAction(id, newVote, "downvote");
  };

  const handleUpload = (e) => {
    setIsUploadinng(true);
    setCanvote(false);
    const files = e.target.files;

    const file = files[0];
    import("compressorjs").then((module) => {
      const Compressor = module.default;
      new Compressor(file, {
        quality: 0.6,
        convertSize: 0,
        mimeType: "image/jpeg",
        success(result) {
          const blobUrl = convertBlobObjToUrl(result);
          setUploadedImage(blobUrl);
        },
        error(err) {
          console.log(err.message);
        },
      });
    });
    setProgress(10);
  };

  useEffect(() => {
    if (uploadedImage) {
      setProgressMessage("Processing your image");
    }
    const timer = setInterval(() => {
      setProgress((prevProgress) =>
        prevProgress >= 100 ? 0 : prevProgress + 1,
      );
    }, 800);
    return () => {
      clearInterval(timer);
    };
  }, [uploadedImage]);

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
                    <StyledButton
                      component="label"
                      role={undefined}
                      variant="contained"
                      tabIndex={-1}
                    >
                      Upload a photo of your trash haul
                      <VisuallyHiddenInput
                        onChange={handleUpload}
                        type="file"
                        accept="image/*"
                      />
                    </StyledButton>
                    <StyledButton
                      disabled={isUploading}
                      onClick={handleOpenForm}
                    >
                      What should we do next?
                    </StyledButton>
                  </Stack>
                  {isUploading && (
                    <Paper
                      sx={{
                        pr: 2,
                        pl: 2,
                        pt: 1,
                        pb: 1,
                        backgroundColor: "#528393",
                      }}
                    >
                      <Stack>
                        <Typography
                          variant="body2"
                          sx={{
                            fontStyle: "italic",
                            color: "#ffffff",
                          }}
                        >
                          {progressMessage}
                        </Typography>
                        <LinearProgressWithLabel value={progress} />
                      </Stack>
                    </Paper>
                  )}
                  {openForm && canvote && (
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
                  )}
                  <ShowError
                    show={!isUploading && !canvote && openForm}
                    color="#d32f2f"
                    message="Use the upload button to show me your trash, then I will show you a form."
                  />
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
                {thoughts.loading && !data.length ? (
                  <Box sx={{ ...customStyles.centerStuff, height: "100vh" }}>
                    <CircularProgress
                      variant="indeterminate"
                      disableShrink
                      sx={{ color: theme.palette.text.primary }}
                      size={customStyles.spinnerSize}
                      thickness={4}
                    />
                  </Box>
                ) : !thoughts.data.length && !data.length ? (
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

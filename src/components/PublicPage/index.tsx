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
import { StyledInput, ShowError, SearchResponse } from "src/commons/Inputs";
import { LinearProgressWithLabel } from "src/commons/Loader";
import { customStyles } from "src/styles";
import { useAppSelector } from "src/hooks";
import { isMobile } from "src/helpers";
import initState from "src/redux/reducers/initState";

const PublicPage = (props) => {
  const {
    darkMode,
    saveThoughtAction,
    getThoughtsAction,
    saveVoteAction,
    uploadFileAction,
    trashDetectAction,
  } = props;
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
  const [allGoodMessage, setAllgoodMessage] = useState("");
  const [verificationError, setVerificationError] = useState(false);
  const [verificationErrorM, setVerificationErrorM] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const [showOtherResponses, setShowOtherResponses] = useState(false);
  const [showSecretMessage, setShowSecretMessage] = useState(false);
  const [secret, setSecret] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const theme = useTheme();
  const thought = useAppSelector((state) => state.thought);
  const thoughts = useAppSelector((state) => state.thoughts);

  const handleOpenForm = () => {
    setAllgoodMessage("");
    setIsUploadinng(false);
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
        setCanvote(false);
        setOpenForm(false);
        getThoughtsAction();
      }
      setUploadedImage(null);
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
        saveVoteAction(id, { vote: -1 }, "downvote");
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
    saveVoteAction(id, { vote: newVote }, "upvote");
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
        saveVoteAction(id, { vote: -1 }, "upvote");
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
    saveVoteAction(id, { vote: newVote }, "downvote");
  };

  const handleUpload = (e) => {
    setIsUploadinng(true);
    const files = e.target.files;
    const file = files[0];
    if (!file) {
      setIsUploadinng(false);
    } else {
      setShowMessage(false);
      setVerificationError(false);
      setVerificationErrorM("");
    }
    setUploadedImage(file);
    setProgress(10);
  };

  const resetStuff = () => {
    setUploadedImage(null);
    setProgressMessage("Selecting your image...");
    setCanvote(false);
    setOpenForm(false);
    setAllgoodMessage("");
  };

  useEffect(() => {
    if (isUploading && !canvote) {
      const timer = setTimeout(() => {
        setProgress((preProgress) =>
          preProgress >= 99
            ? canvote || verificationError
              ? 100
              : preProgress
            : preProgress + 1,
        );
      }, 800);
      return () => {
        clearInterval(timer);
      };
    }
  }, [progress, isUploading, canvote]);

  useEffect(() => {
    if (uploadedImage) {
      uploadFileAction(setProgressMessage, setProgress, uploadedImage).then(
        (res) => {
          if (res.type === "upload/success") {
            setProgressMessage(
              "Checking for any indication of trash in the image...",
            );
            trashDetectAction(uploadedImage).then((tres) => {
              if (tres.type === "trashdetect/success") {
                setProgress(100);
                setShowMessage(true);
                setProgressMessage("All good. You can submit your input.");
                setAllgoodMessage("All good. You can submit your input.");
                setCanvote(true);
              } else {
                setProgress(100);
                setShowMessage(true);
                setVerificationError(true);
                setVerificationErrorM(tres.payload?.error);
              }
            });
            // setIsUploadinng(false);
          } else {
            setProgress(100);
            setShowMessage(true);
            setVerificationError(true);
            setVerificationErrorM(res.payload?.error);
          }
          setUploadedImage(null);
        },
      );
    }
  }, [uploadedImage]);

  useEffect(() => {
    if (showSecretMessage) {
      setTimeout(() => {
        setShowSecretMessage(!showSecretMessage);
      }, 30000);
    }
  }, [showSecretMessage]);

  const positionStyle = isMobile
    ? {}
    : {
        boxShadow: `4px 0 4px -4px ${darkMode ? "#22303d" : "rgba(0,0,0,0.2)"}`,
      };

  const handleChangeLayout = () => {
    setShowOtherResponses(!showOtherResponses);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <React.Fragment>
      <Layout
        {...props}
        handleChangeLayout={handleChangeLayout}
        showSecretMessage={showSecretMessage}
        setShowSecretMessage={setShowSecretMessage}
        secret={secret}
        label={
          showOtherResponses ? "Create your response" : "View other's responses"
        }
      >
        <Container
          maxWidth="xl"
          sx={{
            color: theme.palette.text.primary,
            boxSizing: isMobile ? "inherit" : "inherit",
          }}
        >
          <Grid container spacing={2} sx={{ height: "100vh" }}>
            {!showOtherResponses && (
              <Grid item xs={isMobile ? 12 : 8} sx={positionStyle}>
                <Box
                  sx={{
                    ...customStyles.centerStuff,
                    height: "100%",
                  }}
                >
                  <Stack spacing={2}>
                    <Box>
                      <Typography sx={{ fontSize: isMobile ? 80 : 43 }}>
                        The Kosmic Clean up
                      </Typography>
                      <Typography
                        sx={{
                          fontStyle: "italic",
                          fontSize: isMobile ? 27 : 14,
                        }}
                        variant="body1"
                        color="text.secondary"
                      >
                        Pick up trash, pick up freedom. Literally! Like
                        recycling,
                      </Typography>
                      <Typography
                        sx={{
                          fontStyle: "italic",
                          fontSize: isMobile ? 27 : 14,
                        }}
                        variant="body1"
                        color="text.secondary"
                      >
                        but for democracy. Every piece of trash picked up
                      </Typography>
                      <Typography
                        sx={{
                          fontStyle: "italic",
                          fontSize: isMobile ? 27 : 14,
                        }}
                        variant="body1"
                        color="text.secondary"
                      >
                        gets you a token to say something in a promptocracy on
                      </Typography>
                      <Typography
                        sx={{
                          fontStyle: "italic",
                          fontSize: isMobile ? 27 : 14,
                        }}
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
                        disabled={canvote}
                        onClick={resetStuff}
                        sx={{ fontSize: isMobile ? 24 : 12 }}
                      >
                        Upload a photo of your trash haul
                        <VisuallyHiddenInput
                          onChange={handleUpload}
                          type="file"
                          accept="image/*"
                        />
                      </StyledButton>
                      <StyledButton
                        component="label"
                        role={undefined}
                        variant="contained"
                        tabIndex={-1}
                        disabled={!canvote && isUploading}
                        onClick={handleOpenForm}
                        sx={{ fontSize: isMobile ? 24 : 12 }}
                      >
                        What should we do next?
                      </StyledButton>
                    </Stack>
                    {isUploading && (
                      <Paper
                        sx={{
                          pr: 2,
                          pl: 2,
                          pt: 2,
                          pb: 2,
                          backgroundColor: "#528393",
                        }}
                      >
                        <Stack>
                          <Typography
                            variant="body2"
                            sx={{
                              fontStyle: "italic",
                              color: "#ffffff",
                              fontSize: isMobile ? 24 : 12,
                            }}
                          >
                            {progressMessage}
                          </Typography>
                          <LinearProgressWithLabel value={progress} />
                        </Stack>
                        {showMessage && (
                          <Box
                            sx={{ backgroundColor: "black", height: 30, p: 1 }}
                          >
                            {verificationError && verificationErrorM && (
                              <ShowError
                                show={verificationError && verificationErrorM}
                                color="#d32f2f"
                                showBorder={false}
                                message={verificationErrorM}
                              />
                            )}
                            {canvote && (
                              <ShowError
                                show={canvote && allGoodMessage}
                                color="green"
                                showBorder={false}
                                message={allGoodMessage}
                              />
                            )}
                          </Box>
                        )}
                      </Paper>
                    )}
                    {openForm && canvote && (
                      <Stack spacing={2}>
                        <Box>
                          <Divider />
                          <Box sx={{ mt: 2 }}>
                            <Typography variant={isMobile ? "h4" : "h5"}>
                              Promptocracy
                            </Typography>
                            <Typography
                              sx={{
                                fontStyle: "italic",
                                fontSize: isMobile ? 24 : 12,
                              }}
                              variant="body2"
                              color="text.secondary"
                            >
                              You only get one input. Make it count.
                            </Typography>
                          </Box>
                        </Box>
                        <Stack>
                          <StyledInput
                            id="name"
                            placeholder="Choose a name"
                            name="name"
                            fullWidth
                            required
                            onChange={handleChange}
                            error={errors.name}
                            helperText={errors.name && errorMessages.name}
                            sx={{
                              "& .MuiOutlinedInput-input": {
                                fontSize: isMobile ? "24px" : "14px",
                              },
                            }}
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
                                fontSize: isMobile ? "24px" : "14px",
                              },
                            }}
                          />
                        </Stack>
                        {errors.name && (
                          <ShowError
                            show={errors.name}
                            color="orange"
                            message="Simply search your name on the list to see all the coins you gathered."
                            showBorder={true}
                          />
                        )}
                        <StyledButton
                          onClick={handleSubmit}
                          disabled={errors.name || errors.description}
                          sx={{ fontSize: isMobile ? 22 : 12, width: "20%" }}
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
                      message="Use the upload button to show me your trash. Then you get a prompt."
                      showBorder={true}
                    />
                  </Stack>
                </Box>
              </Grid>
            )}
            {isMobile ? (
              showOtherResponses && (
                <Grid
                  item
                  xs={12}
                  sx={
                    (thoughts.loading && !data.length) ||
                    (!thoughts.data.length && !data.length)
                      ? {
                          height: "100vh",
                          ...customStyles.centerStuff,
                        }
                      : customStyles.scrollableBox
                  }
                >
                  <Box
                    sx={{
                      pb: 10,
                      pt: 15,
                    }}
                  >
                    {thoughts.loading && !data.length ? (
                      <Box>
                        <CircularProgress
                          variant="indeterminate"
                          disableShrink
                          sx={{ color: theme.palette.text.primary }}
                          size={customStyles.spinnerSize}
                          thickness={4}
                        />
                      </Box>
                    ) : !thoughts.data.length && !data.length ? (
                      <Box>
                        <Typography
                          sx={{
                            fontStyle: "italic",
                            fontSize: isMobile ? 30 : 14,
                          }}
                          variant="body1"
                          color="text.secondary"
                        >
                          Congratulations! You get to be the first to say
                          something!
                        </Typography>
                      </Box>
                    ) : (
                      <>
                        <SearchResponse
                          handleSearchChange={handleSearchChange}
                          searchTerm={searchTerm}
                        />
                        {data.map((item) => (
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
                        ))}
                      </>
                    )}
                  </Box>
                </Grid>
              )
            ) : (
              <Grid
                item
                xs={4}
                sx={
                  (thoughts.loading && !data.length) ||
                  (!thoughts.data.length && !data.length)
                    ? {
                        ...customStyles.centerStuff,
                        ...positionStyle,
                      }
                    : {
                        ...customStyles.scrollableBox,
                        ...positionStyle,
                      }
                }
              >
                <Box
                  sx={{
                    pb: 4,
                    pt: 8,
                  }}
                >
                  {thoughts.loading && !data.length ? (
                    <Box>
                      <CircularProgress
                        variant="indeterminate"
                        disableShrink
                        sx={{ color: theme.palette.text.primary }}
                        size={customStyles.spinnerSize}
                        thickness={4}
                      />
                    </Box>
                  ) : !thoughts.data.length && !data.length ? (
                    <Box>
                      <Typography
                        sx={{
                          fontStyle: "italic",
                          fontSize: isMobile ? 30 : 14,
                        }}
                        variant="body1"
                        color="text.secondary"
                      >
                        Congratulations! You get to be the first to say
                        something!
                      </Typography>
                    </Box>
                  ) : (
                    <>
                      <SearchResponse
                        handleSearchChange={handleSearchChange}
                        searchTerm={searchTerm}
                      />
                      {data.map((item) => (
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
                      ))}
                    </>
                  )}
                </Box>
              </Grid>
            )}
          </Grid>
        </Container>
      </Layout>
    </React.Fragment>
  );
};

export default PublicPage;

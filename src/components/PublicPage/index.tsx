// External imports
import React, { useState, useEffect, useCallback } from "react";
import Fuse from "fuse.js";
import {
  Grid,
  Container,
  Typography,
  Box,
  Stack,
  CircularProgress,
  Paper,
  Checkbox,
  Modal,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
// import { useNavigate } from "react-router-dom";
import { debounce } from "lodash";

// App related imports
import Layout from "src/components/Layout";
import Message from "src/commons/Message";
import { StyledButton } from "src/commons/Buttons";
import { StyledInput, ShowError, SearchResponse } from "src/commons/Inputs";
import { LinearProgressWithLabel } from "src/commons/Loader";
import { customStyles } from "src/styles";
import { useAppSelector } from "src/hooks";
import { isMobile, searchOptions } from "src/helpers";
import initState from "src/redux/reducers/initState";

const secrets_file = "/text/secret.txt";
const project_file = "/text/project.txt";
const ppk_image = "/images/ppk.png";

const PublicPage = (props) => {
  const {
    darkMode,
    saveThoughtAction,
    getThoughtsAction,
    saveVoteAction,
    uploadFileAction,
    trashDetectAction,
    addToBlockchainAction,
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
  const [checkIdentity, setCheckIdentity] = useState(false);
  const [blob, setBlob] = useState(null);
  const [isLinked, setIsLinked] = useState(false);
  const [clickedOpen, setClickedOpen] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [fetched, setFetched] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [openM, setOpenM] = useState(false);

  const theme = useTheme();
  const thought = useAppSelector((state) => state.thought);
  const thoughts = useAppSelector((state) => state.thoughts);
  // const navigate = useNavigate();

  const handleOpenForm = () => {
    setAllgoodMessage("");
    setClickedOpen(true);
    setIsUploadinng(false);
    setOpenForm(true);
    // if (canvote) {
    //   setOpenForm(true);
    // }
  };

  const handleCloseForm = () => {
    setOpenForm(false);
    setShowSecretMessage(false);
    setErrors(initState.errors);
  };

  const handleOpenM = () => setOpenM(true);
  const handleCloseM = () => setOpenM(false);

  useEffect(() => {
    if (!thoughts.data.length) {
      getThoughtsAction();
    }
  }, []);

  useEffect(() => {
    fetchTextContent(project_file).then((text) => {
      if (text) {
        setProjectName(text);
      }
    });
    setData(thoughts.data);
  }, [thoughts]);

  const parseErrors = (errs) => ({
    name: !!errs["name"],
    description: !!errs["description"],
  });

  const fetchTextContent = (read_file) => {
    return fetch(read_file)
      .then((response) => response.text())
      .then((text) => text)
      .catch((error) => console.error("Error:", error));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    saveThoughtAction(payload).then((res) => {
      if (res && res.type === "thought/failure") {
        const errs = res.payload?.error;
        const parsedErrors = parseErrors(errs);
        setErrors({ ...errors, ...parsedErrors });
        setErrorMessages({ ...errorMessages, ...errs });
      } else {
        fetchTextContent(secrets_file).then((text) => {
          if (text) {
            setShowSecretMessage(true);
            setSecret(text);
          }
        });
        setCanvote(false);
        setOpenForm(false);
        setClickedOpen(false);
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

  // const handleUpload = (e) => {
  //   setIsUploadinng(true);
  //   const files = e.target.files;
  //   const file = files[0];
  //   if (!file) {
  //     setIsUploadinng(false);
  //   } else {
  //     setShowMessage(false);
  //     setVerificationError(false);
  //     setVerificationErrorM("");
  //     setUploadedImage(file);
  //     setProgress(10);
  //     // Compress the image to small
  //     import("compressorjs").then((module) => {
  //       const Compressor = module.default;
  //       new Compressor(file, {
  //         quality: 0.2,
  //         convertSize: 0,
  //         mimeType: "image/jpeg",
  //         success(result) {
  //           const blobObj = new Blob([result], { type: result.type });
  //           setBlob(blobObj);
  //         },
  //         error(err) {
  //           console.log(err.message);
  //         },
  //       });
  //     });
  //   }
  // };

  // const resetStuff = () => {
  //   setUploadedImage(null);
  //   setProgressMessage("Selecting your image...");
  //   setCanvote(false);
  //   setOpenForm(false);
  //   setClickedOpen(false);
  //   setAllgoodMessage("");
  // };

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
                setProgress(90);
                setProgressMessage("Checking image identity...");
                setCheckIdentity(true);
              } else {
                setProgress(100);
                setShowMessage(true);
                setVerificationError(true);
                setVerificationErrorM(tres.payload?.error);
              }
            });
          } else {
            setProgress(100);
            setShowMessage(true);
            setVerificationError(true);
            setVerificationErrorM(res.payload?.error);
          }
        },
      );
    }
  }, [uploadedImage]);

  useEffect(() => {
    if (checkIdentity && uploadedImage) {
      addToBlockchainAction(uploadedImage, blob, projectName).then((res) => {
        if (res.type === "blockchain/failure") {
          // Set error messages
          setProgress(100);
          setShowMessage(true);
          setVerificationError(true);
          setVerificationErrorM(res.payload?.error);
        } else {
          setProgress(100);
          setShowMessage(true);
          setProgressMessage("All good. You can submit your input.");
          setAllgoodMessage("All good. You can submit your input.");
          setCanvote(true);
        }
        setCheckIdentity(false);
        setUploadedImage(null);
      });
    }
  }, [checkIdentity, uploadedImage, blob, projectName]);

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
    const { value } = e.target;
    setSearchTerm(value);
    if (value) {
      setIsSearching(true);
    } else {
      setIsSearching(false);
      if (fetched) {
        getThoughtsAction();
        setFetched(false);
      }
    }
  };

  // const handleOpenArchive = () => {
  //   navigate("/karchive");
  // };

  const handleCheckboxChange = (e) => {
    setIsLinked(e.target.checked);
  };

  const fetchOptions = async (_value) => {
    try {
      const result = await getThoughtsAction({ search: _value });
      if (result.type === "thoughts/success") {
        setFetched(true);
        setData(result.payload);
        if (!result.payload.length) {
          setIsSearching(false);
        }
      } else {
        setFetched(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const debouncedFetchOptions = useCallback(
    debounce(async (v) => {
      await fetchOptions(v);
    }, 1000),
    [],
  );

  useEffect(() => {
    if (thoughts.data.length) {
      if (searchTerm) {
        const fuse = new Fuse(thoughts.data, searchOptions);
        const result = fuse.search(searchTerm);
        const out = result.map((r) => r.item);
        if (!out.length) {
          debouncedFetchOptions(searchTerm);
        } else {
          setData(out);
        }
      } else {
        setData(thoughts.data);
      }
    } else if (searchTerm && isSearching) {
      debouncedFetchOptions(searchTerm);
    }
    return () => {
      debouncedFetchOptions.cancel();
    };
  }, [thoughts.data, isSearching, searchTerm, debouncedFetchOptions]);

  return (
    <React.Fragment>
      <Layout
        {...props}
        handleChangeLayout={handleChangeLayout}
        showSecretMessage={showSecretMessage}
        setShowSecretMessage={setShowSecretMessage}
        secret={secret}
        label={
          showOtherResponses ? "Create your response" : "View all responses"
        }
      >
        <Container
          maxWidth="xl"
          sx={{
            color: theme.palette.text.primary,
            boxSizing: isMobile ? "inherit" : "none",
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
                  <Stack
                    spacing={2}
                    sx={{ p: 2, width: isMobile ? "100%" : "60%" }}
                  >
                    {!openForm && (
                      <Box>
                        <Box
                          sx={{
                            mb: 2,
                            mt: isMobile ? 0 : 3,
                            border: `1px solid ${darkMode ? "#22303d" : "rgba(0,0,0,0.2)"}`,
                            p: 1,
                          }}
                        >
                          <Box
                            component="img"
                            src={ppk_image}
                            sx={{ mb: 2, width: "100%", cursor: "pointer" }}
                            onClick={handleOpenM}
                          />
                        </Box>
                        <Modal
                          open={openM}
                          onClose={handleCloseM}
                          aria-labelledby="enlarged-image-modal"
                          aria-describedby="A modal to display the enlarged image"
                        >
                          <Box
                            component="img"
                            src={ppk_image}
                            sx={{
                              width: isMobile ? "90%" : "50%",
                              height: isMobile ? "80%" : "90%",
                              position: "absolute",
                              top: "50%",
                              left: "50%",
                              transform: "translate(-50%, -50%)",
                              boxShadow: `4px 0 4px -4px ${darkMode ? "#22303d" : "rgba(0,0,0,0.2)"}`,
                            }}
                          />
                        </Modal>
                        <Box>
                          <StyledButton
                            component="label"
                            role={undefined}
                            variant="contained"
                            tabIndex={-1}
                            onClick={handleOpenForm}
                            sx={{
                              fontSize: isMobile ? 28 : 14,
                              float: "right",
                            }}
                          >
                            Submit your response
                          </StyledButton>
                        </Box>
                      </Box>
                    )}
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
                              fontSize: isMobile ? 27 : 12,
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
                    {openForm && (
                      <Stack
                        spacing={2}
                        sx={{ width: isMobile ? "100%" : "80%" }}
                      >
                        <Box>
                          <Box sx={{ mt: 2 }}>
                            <Typography variant={isMobile ? "h2" : "h5"}>
                              Promptocracy
                            </Typography>
                            <Typography
                              sx={{
                                fontStyle: "italic",
                                fontSize: isMobile ? 27 : 12,
                              }}
                              variant="body2"
                              color="text.secondary"
                            >
                              You only get one input. Make it count.
                            </Typography>
                          </Box>
                        </Box>
                        <Stack spacing={1}>
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
                                fontSize: isMobile ? "27px" : "14px",
                              },
                            }}
                          />
                          <Stack
                            direction="row"
                            alignItems="center"
                            spacing={1}
                          >
                            <Checkbox
                              checked={isLinked}
                              onChange={handleCheckboxChange}
                              size={isMobile ? "large" : "small"}
                              inputProps={{ "aria-label": "controlled" }}
                              sx={{
                                color: "#35495E",
                                "&.Mui-checked": {
                                  color: "#35495E",
                                },
                              }}
                            />
                            <Typography
                              sx={{
                                fontSize: isMobile ? 27 : 14,
                              }}
                              variant="body2"
                              color="text.secondary"
                            >
                              Link X account to your name
                            </Typography>
                          </Stack>
                          {isLinked && (
                            <StyledInput
                              id="link"
                              placeholder="X profile link"
                              name="link"
                              fullWidth
                              required
                              onChange={handleChange}
                              error={errors.link}
                              helperText={errors.link && errorMessages.link}
                              sx={{
                                "& .MuiOutlinedInput-input": {
                                  fontSize: isMobile ? "27px" : "14px",
                                },
                              }}
                            />
                          )}
                        </Stack>
                        <Stack spacing={2}>
                          <StyledInput
                            id="thoughts"
                            placeholder="Let's get your input for a new government."
                            name="description"
                            fullWidth
                            required
                            multiline
                            rows={isMobile ? 25 : 10}
                            onChange={handleChange}
                            error={errors.description}
                            helperText={
                              errors.description && errorMessages.description
                            }
                            sx={{
                              "& .MuiOutlinedInput-input": {
                                fontSize: isMobile ? "27px" : "14px",
                              },
                            }}
                          />
                        </Stack>
                        {errors.name && (
                          <ShowError
                            show={payload?.name && errors.name}
                            color="orange"
                            message={
                              payload?.name &&
                              "Simply search your name on the list to see all the coins you gathered."
                            }
                            showBorder={true}
                          />
                        )}
                        <Box>
                          <StyledButton
                            onClick={handleSubmit}
                            disabled={errors.name || errors.description}
                            sx={{
                              fontSize: isMobile ? 30 : 12,
                              width: isMobile ? "30%" : "20%",
                              float: "right",
                            }}
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
                          <StyledButton
                            onClick={handleCloseForm}
                            sx={{
                              fontSize: isMobile ? 30 : 12,
                              width: isMobile ? "30%" : "20%",
                              float: "left",
                            }}
                          >
                            Cancel
                          </StyledButton>
                        </Box>
                      </Stack>
                    )}
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
                    <SearchResponse
                      handleSearchChange={handleSearchChange}
                      searchTerm={searchTerm}
                    />
                    {thoughts.loading && !data.length ? (
                      <Box
                        sx={{
                          ...customStyles.centerStuff,
                          ...positionStyle,
                          height: "80vh",
                          width: "100vw",
                        }}
                      >
                        <CircularProgress
                          variant="indeterminate"
                          disableShrink
                          sx={{ color: theme.palette.text.primary }}
                          size={customStyles.spinnerSize}
                          thickness={4}
                        />
                      </Box>
                    ) : !thoughts.data.length && !data.length ? (
                      <Box
                        sx={{
                          ...customStyles.centerStuff,
                          ...positionStyle,
                          height: "80vh",
                          width: "100vw",
                        }}
                      >
                        <Typography
                          sx={{
                            fontStyle: "italic",
                            fontSize: isMobile ? 30 : 14,
                          }}
                          variant="body1"
                          color="text.secondary"
                        >
                          {searchTerm
                            ? `No response for "${searchTerm}"`
                            : "Congratulations! You get to be the first to say something!"}
                        </Typography>
                      </Box>
                    ) : (
                      <>
                        {data.map((item) => (
                          <Box
                            key={item.id}
                            sx={{
                              color: theme.palette.text.primary,
                              width: "100vw",
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
                sx={{
                  ...customStyles.scrollableBox,
                  ...positionStyle,
                }}
              >
                <Box
                  sx={{
                    pb: 4,
                    pt: 8,
                  }}
                >
                  <SearchResponse
                    handleSearchChange={handleSearchChange}
                    searchTerm={searchTerm}
                  />
                  {thoughts.loading && !data.length ? (
                    <Box
                      sx={{
                        ...customStyles.centerStuff,
                        ...positionStyle,
                        height: "80vh",
                      }}
                    >
                      <CircularProgress
                        variant="indeterminate"
                        disableShrink
                        sx={{ color: theme.palette.text.primary }}
                        size={customStyles.spinnerSize}
                        thickness={4}
                      />
                    </Box>
                  ) : !thoughts.data.length && !data.length ? (
                    <Box
                      sx={{
                        ...customStyles.centerStuff,
                        ...positionStyle,
                        height: "80vh",
                      }}
                    >
                      <Typography
                        sx={{
                          fontStyle: "italic",
                          fontSize: isMobile ? 30 : 14,
                        }}
                        variant="body1"
                        color="text.secondary"
                      >
                        {searchTerm
                          ? `No response for "${searchTerm}"`
                          : "Congratulations! You get to be the first to say something!"}
                      </Typography>
                    </Box>
                  ) : (
                    <>
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
                            link={item.link}
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

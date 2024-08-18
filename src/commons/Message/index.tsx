import React from "react";
import {
  Box,
  Stack,
  Avatar,
  Typography,
  Divider,
  Tooltip,
} from "@mui/material";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";

// App related imports
import { customStyles } from "src/styles";
import { isMobile, dateFormatter } from "src/helpers";

const tccup_logo = "/icons/tccup.png";
const grokcoin = "/icons/grokcoin.png";

const Message = (props) => {
  const {
    description,
    name,
    postedOn,
    id,
    upvotes,
    downvotes,
    grokcoins,
    handleUpvote,
    handleDownvote,
  } = props;

  return (
    <>
      <Stack spacing={2} direction="row" sx={{ p: 2 }}>
        <Box>
          <Avatar
            alt="User Profile"
            src={tccup_logo}
            sx={{
              width: 35,
              height: 35,
            }}
          />
        </Box>
        <Box>
          <Stack direction="row" spacing={1} alignItems="center">
            <Box>
              <Typography
                sx={{
                  ...customStyles.boldText,
                  fontSize: isMobile ? 24 : 14,
                }}
              >
                {name}
              </Typography>
            </Box>
            <Tooltip title="Verified">
              <VerifiedUserIcon sx={customStyles.verifiedIcon} />
            </Tooltip>
            <Divider
              className="divider"
              orientation="vertical"
              variant="middle"
              flexItem
            />
            <Tooltip title="GovCoins gained">
              <Stack
                sx={{ cursor: "pointer" }}
                direction="row"
                alignItems="center"
                spacing={0.3}
              >
                <Box
                  src={grokcoin}
                  component="img"
                  sx={{
                    height: 16,
                    width: 16,
                  }}
                />
                <Typography
                  sx={{
                    ...customStyles.boldText,
                    fontSize: isMobile ? 24 : 14,
                  }}
                >
                  {grokcoins}
                </Typography>
              </Stack>
            </Tooltip>
          </Stack>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ fontSize: isMobile ? 14 : 12 }}
          >
            Posted on {dateFormatter(postedOn)}
          </Typography>
          <Typography
            variant="body2"
            sx={{ fontSize: isMobile ? 18 : 16, mt: 1 }}
          >
            {description}
          </Typography>
          <Stack direction="row" sx={{ mt: 2 }} spacing={3} alignItems="center">
            <Typography variant="body2" sx={{ fontSize: isMobile ? 24 : 14 }}>
              Agreed?
            </Typography>
            <Typography variant="body2" sx={{ fontSize: isMobile ? 24 : 14 }}>
              {upvotes}
            </Typography>
            <ThumbUpOffAltIcon
              sx={customStyles.likeIcon}
              id={id}
              onClick={handleUpvote}
            />
            <Typography variant="body2" sx={{ fontSize: isMobile ? 24 : 14 }}>
              {downvotes}
            </Typography>
            <ThumbDownOffAltIcon
              sx={customStyles.likeIcon}
              id={id}
              onClick={handleDownvote}
            />
          </Stack>
        </Box>
      </Stack>
    </>
  );
};

export default Message;

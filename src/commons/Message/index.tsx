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
import { useTheme } from "@mui/material/styles";

// App related imports
import { customStyles } from "src/styles";
import { isMobile, dateFormatter } from "src/helpers";

const Message = (props) => {
  const { description, name, postedOn, id } = props;
  const theme = useTheme();

  return (
    <Box
      className="ratings-reviews-body"
      component="div"
      key={id}
      sx={{
        color: theme.palette.text.primary,
      }}
    >
      <Stack spacing={2} direction="row" sx={{ p: 2 }}>
        <Box>
          <Avatar
            alt="User Profile"
            src=""
            sx={{
              width: 40,
              height: 40,
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
            <Divider
              className="divider"
              orientation="vertical"
              variant="middle"
              flexItem
            />
            <Tooltip title="Verified">
              <VerifiedUserIcon sx={customStyles.verifiedIcon} />
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
            <ThumbUpOffAltIcon sx={customStyles.likeIcon} />
            <ThumbDownOffAltIcon sx={customStyles.likeIcon} />
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
};

export default Message;

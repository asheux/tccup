import Button, { ButtonProps } from "@mui/material/Button";

import { styled } from "@mui/material/styles";

export const StyledButton = styled(Button)<ButtonProps>(
  ({ theme, disabled }) => ({
    color: theme.palette.getContrastText("#000"),
    backgroundColor: disabled ? "#849eba" : "#22303d",
    "&:hover": {
      backgroundColor: "#10161d",
    },
    size: "medium",
    textTransform: "none",
    paddingLeft: "15px",
    paddingRight: "15px",
    fontSize: "12px",
  }),
);

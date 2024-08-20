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

export const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

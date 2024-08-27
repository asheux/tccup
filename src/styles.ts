import { isMobile } from "src/helpers";

export const customStyles = {
  centerStuff: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
  },
  loaderStyle: {
    fontSize: isMobile ? 30 : 20,
    color: "#35495E",
  },
  tccupName: {
    mr: 2,
    display: { xs: "none", md: "flex" },
    letterSpacing: ".3rem",
    color: "inherit",
    flexGrow: 1,
  },
  buttonStyle: {
    fontSize: isMobile ? 25 : 12,
  },
  boldText: {
    fontWeight: 700,
  },
  likeIcon: {
    height: isMobile ? 40 : 16,
    width: isMobile ? 40 : 16,
    cursor: "pointer",
  },
  verifiedIcon: {
    height: isMobile ? 35 : 16,
    width: isMobile ? 35 : 16,
    cursor: "pointer",
    color: "#35495E",
  },
  spinnerSize: isMobile ? 40 : 21,
  scrollableBox: {
    height: "100vh",
    overflowY: "auto",
    scrollbarWidth: "none",
    "&::-webkit-scrollbar": {
      display: "none", // For Chrome, Safari, and Edge
    },
    position: "relative",
  },
  messagePopover: {
    overflow: "visible",
    backgroundColor: "#10161d",
    color: "#ffffff",
    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
    mt: 1.5,
    "&::before": {
      content: "''",
      display: "block",
      position: "absolute",
      bottom: -8,
      left: 14,
      width: 10,
      height: 10,
      bgcolor: "#10161d",
      transform: "translateY(-50%) rotate(45deg)",
    },
  },
  searchResponseAppBar: {
    position: "sticky",
    top: isMobile ? 100 : 50,
    mr: 2,
    zIndex: 1,
    borderBottom: `1px solid ${isMobile ? "rgba(0,0,0,0.5)" : "rgba(0,0,0,0.2)"}`,
  },
  responseSearchToolbar: {
    height: isMobile ? 100 : 40,
  },
  filterSearchStyles: {
    pr: "40px",
    display: "flex",
    alignItems: "center",
    height: isMobile ? "100px" : "50px",
    cursor: "pointer",
  },
  searchIcon: {
    color: "#35495E",
    width: isMobile ? 70 : 25,
    height: isMobile ? 70 : 25,
  },
  inputBase: {
    ml: 1,
    flex: 1,
    "& input::placeholder": {
      fontSize: isMobile ? 40 : 14,
    },
    "& input": {
      fontSize: isMobile ? 40 : 14,
    },
  },
};

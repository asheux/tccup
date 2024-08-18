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
    height: isMobile ? 24 : 16,
    width: isMobile ? 24 : 16,
    cursor: "pointer",
  },
  verifiedIcon: {
    height: isMobile ? 24 : 16,
    width: isMobile ? 24 : 16,
    cursor: "pointer",
    color: "#35495E",
  },
  spinnerSize: isMobile ? 40 : 21,
};

import moment from "moment";

export const isMobile = window.innerWidth <= 981;

export const isDark = () => {
  const dark = localStorage.getItem("darkTheme");
  return dark === "true";
};

export const dateFormatter = (date) =>
  moment(date).format("MMM Do YYYY, h:mm:ss a");

export const dateFormatterNoTime = (date) => moment(date).format("MMM Do YYYY");

export const projects = [{ label: "The Kosmic Clean Up", value: "kosmic" }];

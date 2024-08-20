import moment from "moment";

export const isMobile = window.innerWidth <= 981;

export const isDark = () => {
  const dark = localStorage.getItem("darkTheme");
  return dark === "true";
};

export const dateFormatter = (date) =>
  moment(date).format("MMM Do YYYY, h:mm:ss a");

export const convertBlobObjToUrl = (blobObj) => {
  if (!blobObj) {
    return;
  }
  if (typeof blobObj === "object") {
    // This is a Blob object. Return a url instead
    return URL.createObjectURL(blobObj);
  } else {
    return blobObj;
  }
};

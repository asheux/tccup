const TCCUP_BASE_URL =
  `${process.env.TCCUP_BASE_URL}` || "http://127.0.0.1:5000";

export const getHost = () => TCCUP_BASE_URL;

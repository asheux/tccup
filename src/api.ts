const TCCUP_BASE_URL =
  `${process.env.TCCUP_BASE_URL}` || "http://143.244.136.59/api";

export const getHost = () => TCCUP_BASE_URL;
export const getGoogleMapApiKey = () => process.env.GOOGLE_MAP_API_KEY;

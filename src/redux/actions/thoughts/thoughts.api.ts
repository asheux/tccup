import { getHost } from "src/api";

export const getThoughts = () => {
  return fetch(`${getHost()}/thoughts`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
};

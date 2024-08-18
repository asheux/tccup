import { getHost } from "src/api";

export const saveThought = (data) => {
  const url = `${getHost()}/thought`;
  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((res) => res.json());
};

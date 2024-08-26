import { getHost } from "src/api";

export const saveVote = (thoughtId, vote, endpoint) => {
  const url = `${getHost()}/thoughts/${thoughtId}/${endpoint}`;
  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(vote),
  }).then((res) => res.json());
};

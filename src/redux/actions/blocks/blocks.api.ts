import { getHost } from "src/api";

export const getBlocks = (project_name) => {
  return fetch(`${getHost()}/blocks?project_name=${project_name}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
};

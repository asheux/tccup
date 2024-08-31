import { getHost } from "src/api";
import { serializeQuery } from "src/utils/serialize";

export const getThoughts = (params) => {
  let url = `${getHost()}/thoughts`;
  if (Object.keys(params).length) {
    const query = serializeQuery(params);
    url = `${url}?${query}`;
  }
  return fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
};

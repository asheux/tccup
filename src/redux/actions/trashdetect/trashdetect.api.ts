import { getHost } from "src/api";

export const trashDetect = (file) => {
  const url = `${getHost()}/detectrash`;
  const formData = new FormData();
  formData.set("file", file);
  return fetch(url, {
    method: "POST",
    body: formData,
  }).then((res) => res.json());
};

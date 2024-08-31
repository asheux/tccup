import { getHost } from "src/api";

export const addToBlockchain = (file, blob, projectName) => {
  const url = `${getHost()}/blockchain`;
  const formData = new FormData();
  formData.set("file", file);
  formData.set("blob", blob);
  formData.set("project_name", projectName);
  return fetch(url, {
    method: "POST",
    body: formData,
  }).then((res) => res.json());
};

export const serializeQuery = (query) =>
  Object.keys(query)
    .map(
      (key) => `${encodeURIComponent(key)}=${encodeURIComponent(query[key])}`,
    )
    .join("&");

export const convertToFormData = (data, isUpdating) => {
  const formData = new FormData();

  const appendFormData = (formData, key, value) => {
    if (value instanceof Date) {
      formData.append(key, value.toISOString());
    } else if (value instanceof Blob) {
      formData.append(key, value);
    } else if (Array.isArray(value)) {
      value.forEach((item, index) => {
        if (typeof item === "object" && item !== null) {
          Object.keys(item).forEach((k) => {
            appendFormData(formData, `${key}[${index}][${k}]`, item[k]);
          });
        } else {
          formData.append(`${key}[]`, item);
        }
      });
    } else if (typeof value === "object" && value !== null) {
      Object.keys(value).forEach((subKey) => {
        appendFormData(formData, `${key}[${subKey}]`, value[subKey]);
      });
    } else {
      formData.append(key, value);
    }
  };

  Object.keys(data).forEach((key) => {
    appendFormData(formData, key, data[key]);
  });
  if (isUpdating) {
    formData.append("_method", "PATCH");
  }

  return formData;
};

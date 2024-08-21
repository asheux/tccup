import axios from "axios";
import { getHost } from "src/api";

export const uploadFile = async (setProgressMessage, setProgress, file) => {
  setProgressMessage("Processing your image...");
  const uploadCancelToken = axios.CancelToken.source();

  try {
    const formData = new FormData();
    formData.set("file", file);
    const result = await axios.post(`${getHost()}/veribot`, formData, {
      onUploadProgress: (progressEvent) => {
        const percentCompleted = Math.round(
          (progressEvent.loaded * 45) / progressEvent.total,
        );
        setProgress(percentCompleted);
        setProgressMessage("Verifying your image...");
      },
      cancelToken: uploadCancelToken.token,
    });
    setProgress(70);
    return result.data;
  } catch (error) {
    if (axios.isCancel(error)) {
      setProgress(100);
      setProgressMessage("Upload canceled.");
      return { error: error };
    } else {
      setProgress(100);
      setProgressMessage("Image failed verification! Check error below.");
      if (error?.code === "ERR_NETWORK") {
        return {
          error: `${error?.message}: Please check your network connectivity and try again.`,
        };
      } else {
        return error?.response?.data;
      }
    }
  }
};

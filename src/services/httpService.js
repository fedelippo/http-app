import axios from "axios";
import { toast } from "react-toastify";

//axios.interceptors.response.use(success, failure);
axios.interceptors.response.use(null, (error) => {
  const expectedErrors =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (!expectedErrors) {
    toast.error("Something went wrong! Unexpected errror!");
    console.log("Error occurred: " + error);
  }

  return Promise.reject(error);
});

export default {
  get: axios.get,
  post: axios.post,
  patch: axios.patch,
  put: axios.put,
  delete: axios.delete,
};

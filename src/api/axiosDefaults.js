import axios from "axios";

axios.defaults.baseURL =
  "https://bn-api-code-institute-6164ccee29f7.herokuapp.com/";
axios.defaults.headers.post["Content-Type"] = "multipart/form-data";
axios.defaults.withCredentials = true;

export const axiosReq = axios.create();
export const axiosRes = axios.create();

import axios from "axios";

axios.defaults.baseURL = "https://be-api-7ff643bbf9fb.herokuapp.com/";
axios.defaults.headers.post["Content-Type"] = "multipart/form-data";
axios.defaults.withCredentials = true;

export const axiosReq = axios.create();
export const axiosRes = axios.create();

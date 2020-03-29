import axios from "axios";

// eslint-disable-next-line
const baseURL =
  process.env.NODE_ENV === "development" ? "http://127.0.0.1:3333/api" : "/api";

const api = axios.create({ baseURL });

export default api;

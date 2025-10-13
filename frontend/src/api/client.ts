import axios from "axios";
const client = axios.create({ baseURL: import.meta.env.VITE_API_BASE || "http://localhost:8000" });
client.interceptors.request.use((cfg) => { const token = import.meta.env.VITE_AUTH_TOKEN; if (token) cfg.headers.Authorization = token; return cfg; });
export default client;

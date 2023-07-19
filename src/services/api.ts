import axios from "axios";
const baseURL = process.env.NEXT_PUBLIC_URL;
const api = axios.create({ baseURL });

export default api;

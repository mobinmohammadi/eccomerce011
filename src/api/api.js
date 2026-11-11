import axios from "axios";

const local = "http://localhost:5000";
const production = 'https://backend-exp-zeta.vercel.app'
const api = axios.create({
  baseURL: `${production}/api`,
});


export default api;

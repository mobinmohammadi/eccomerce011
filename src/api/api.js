import axios from "axios";

const local = "http://localhost:5000";
const production = 'https://backend-m6auqhuh7-jacks-projects-b193d194.vercel.app'
const api = axios.create({
  baseURL: `${production}/api`,
});


export default api;

import axios from "axios";

const local = "http://localhost:5000";
const production = 'https://backend-ecommerce-api-ch5g.onrender.com'
const api = axios.create({
  baseURL: `${production}/api`,
});


export default api;

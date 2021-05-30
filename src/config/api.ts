import axios from "axios";

const api = axios.create({
    baseURL: 'https://enterprise-crud.herokuapp.com/',
});
  
export default api;
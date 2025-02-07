import axios from "axios";

const instance = axios.create({
    baseURL:"https://papapetbackend-1.onrender.com/api/v1",
    withCredentials:true
})

export default instance;
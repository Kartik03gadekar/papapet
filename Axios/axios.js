// import axios from "axios";

// const instance = axios.create({
//     baseURL:"https://papapetbackend-1.onrender.com/api/v1/",
//     // baseURL:"http://localhost:8080/api/v1/",

//     withCredentials:true
// })

// export default instance;

import axios from "axios";


// Create an axios instance
const instance = axios.create({
baseURL: "https://papapetbackend-qxyx.onrender.com/api/v1/",
  // baseURL: "https://papapetbackend-1.onrender.com/api/v1/",

  // baseURL: "http://localhost:8080/api/v1/",

  withCredentials: true, 
});

// Interceptor to add Authorization token (optional)
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("papapetToken");

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);





export default instance;

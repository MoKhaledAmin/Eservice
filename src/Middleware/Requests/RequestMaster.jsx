import axios from "axios";

// Request With Token
const RequestMaster = axios.create({
    baseURL: process.env.REACT_APP_URL
})

export default RequestMaster;
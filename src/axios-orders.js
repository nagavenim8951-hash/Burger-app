import axios from "axios";

const instance = axios.create({
    baseURL:'https://my-burger-app-aabca-default-rtdb.firebaseio.com/'
})
export default instance;
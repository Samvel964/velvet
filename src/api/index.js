import axios from "axios";
import store from "../app/store";
import { setErrors, } from "../features/errorSlice";


const instance = axios.create({
    baseURL: 'https://server-nekoma.onrender.com/'
})

instance.interceptors.response.use(
    function(response) {
        return response
    },
    function(error) {
        if (error.response.status === 400) {
            store.dispatch(setErrors(error.response.data))
        }
        console.log(error, "err");
        throw error
    }
)

export default instance

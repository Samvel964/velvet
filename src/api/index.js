import axios from "axios";
import store from "../app/store";
import { setErrors, } from "../features/errorSlice";


const instance = axios.create({
    baseURL: 'https://nekoma-server.herokuapp.com/'
})

instance.interceptors.response.use(
    function(response) {
        return response
    },
    function(error) {
        if (error.response.status === 400) {
            store.dispatch(setErrors(error.response.data))
        }
        throw error
    }
)

export default instance

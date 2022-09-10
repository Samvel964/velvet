import axios from './index';

export const getAllProducts = async () => {
    return await axios.get('product')
}

import axios from './index';

export const registration = async(data) => {
    return await axios.post('userAuth/registration', data)
}

export const getUser = async() => {
    return await axios.get('userAuth/auth', 
        {headers: { Authorization: localStorage.getItem("Token")}}
    )
}

export const logIn = async(data) => {
    return await axios.post('userAuth/login', data)
}

export const addToCard = async (id) => {
    return await axios.post("product/addCart", {
      headers: { authorization: localStorage.getItem("Token") },
      cartId: id,
    });
};

export const removeCart = async (id) => {
    return await axios.post('product/removeCart', {
        headers: { authorization: localStorage.getItem("Token") },
        cartId: id,
    })
}

export const addFavorite = async (id) => {
    return await axios.post('product/addFavorite', {
        headers: { authorization: localStorage.getItem("Token") },
        favoriteId: id,
    })
}

export const removeFavorite = async (id) => {
    return await axios.post('product/removeFavorite', {
        headers: { authorization: localStorage.getItem("Token") },
        favoriteId: id
    })
}

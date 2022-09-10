import { configureStore} from '@reduxjs/toolkit';
import productsReducer from '../features/productsSlice';
import userReducer from '../features/userSlice';
import configReducer from '../features/configSlice';
import errorReducer from '../features/errorSlice';

export default configureStore({
    reducer: {
        products :productsReducer,
        user: userReducer,
        configs: configReducer,
        error: errorReducer
    },
})

import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { setIsLoading } from './isLoading.slice';
import getConfig from '../../helpers/GetConfig';
import { useDispatch } from 'react-redux';

export const cartSlice = createSlice({
    name: 'cart',
    initialState: [],
    reducers: {
        setCart: ( state, action ) => {
          return action.payload
        }
    }
})

export const getCartThunk = () => dispatch => {
  axios
    .get('https://e-commerce-api-v2.academlo.tech/api/v1/cart', getConfig() )
    .then( resp => dispatch(setCart( resp.data )))
    .catch( error => console.error( error ) )
}

export const createCartThunk = (data) => (dispatch) => {
  axios
    .post(
      "https://news-app-api.academlo.tech/news/add_to_favorite/",
      data,
      getConfig()
    )
    .then(() => dispatch(getCartThunk()))
    .catch((error) => console.error(error));
};

export const cartCheckoutThunk = () => (dispatch) => {
  axios
    .post(
      "https://e-commerce-api-v2.academlo.tech/api/v1/purchases",
      {},
      getConfig()
    )
    .then(() => dispatch(getCartThunk()))
    .catch((error) => console.error(error));
};



export const { setCart } = cartSlice.actions;

export default cartSlice.reducer;
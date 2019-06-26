import * as actionTypes from './actionTypes'
import axios from '../../axios-orders';

export const purchaseBurguerSuccess = (id, data) =>  {
  return {
    type: actionTypes.PURCHASE_BURGUER_SUCCESS,
    orderId: id,
    orderData: data
  }
}

export const purchaseBurguerFail = error => {
  return {
    type: actionTypes.PURCHASE_BURGUER_FAIL,
    error: error
  }
}

export const purchaseBurguerStart = () => {
  return {
    type: actionTypes.PURCHASE_BURGUER_START
  }
}

export const purchaseBurguer = (orderData, token) => {
  return dispatch => {
    dispatch(purchaseBurguerStart());
    axios.post('/orders.json?auth=' + token, orderData)
      .then(res => {
        dispatch(purchaseBurguerSuccess(res.data.name, orderData))
      })
      .catch(err => {
        dispatch(purchaseBurguerFail(err))
      })
  }
}

export const purchaseInit = () => {
  return {
    type: actionTypes.PURCHASE_INIT
  }
}

export const fetchOrdersSuccess = orders => {
  return {
    type: actionTypes.FETCH_ORDERS_SUCCESS,
    orders
  }
}

export const fetchOrdersFail = error => {
  return {
    type: actionTypes.FETCH_ORDERS_FAIL,
    error
  }
}

export const fetchOrdersStart = () => {
  return {
    type: actionTypes.FETCH_ORDERS_START
  }
}

export const fetchOrders = (token, userId) => {
  return dispatch => {
    dispatch(fetchOrdersStart());
    const queryParams = `?auth=${token}&orderBy="userId"&equalTo="${userId}"`
    axios.get('/orders.json' + queryParams)
    .then((res) => {
      const fetchedOrders = [];
      for ( let key in res.data ) {
        fetchedOrders.push( {
            ...res.data[key],
            id: key
        } );
      }

      dispatch(fetchOrdersSuccess(fetchedOrders));
    })
    .catch(error => {
      dispatch(fetchOrdersFail(error))
    })
  }
}

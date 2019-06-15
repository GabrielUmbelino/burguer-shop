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

export const purchaseBurguer = orderData => {
  return dispatch => {
    dispatch(purchaseBurguerStart());
    axios.post('/orders.json', orderData)
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

export const fetchOrders = () => {
  return dispatch => {
    dispatch(fetchOrdersStart());
    axios.get('/orders.json')
    .then(({data}) => {

      const orders = [];

      for (const key in data) {
        orders.push({
          ...data[key],
          id: key
        });
      }
      dispatch(fetchOrdersSuccess(orders))
    })
    .catch(error => dispatch(fetchOrdersFail(error)))
  }
}

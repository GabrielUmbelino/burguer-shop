import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility'
const initialState = {
  orders: [],
  loading: false,
  purchased: false
}

const purchaseInit = (state, action) => updateObject(state, { purchased: false });
const purchaseBurguerStart = (state, action) => updateObject(state, { loading: true });
const purchaseBurguerSuccess = (state, action) => {
  const newOrder = updateObject(action.orderData, { id: action.orderId });

  return updateObject(state, {
    ...state,
    loading: false,
    purchased: true,
    orders: state.orders.concat(newOrder)
  })
}
const purchaseBurguerFail = (state, action) => updateObject(state, { loading: false });
const fetchOrderStart = (state, action) => updateObject(state, { loading: true });
const fetchOrderSuccess = (state, action) => updateObject(state, { loading: false, orders: action.orders });
const fetchOrderFail = (state, action) => updateObject(state, { loading: false });

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PURCHASE_INIT: return purchaseInit(state, action);
    case actionTypes.PURCHASE_BURGUER_START: return purchaseBurguerStart(state, action);
    case actionTypes.PURCHASE_BURGUER_SUCCESS: return purchaseBurguerSuccess(state, action);
    case actionTypes.PURCHASE_BURGUER_FAIL: return purchaseBurguerFail(state, action);
    case actionTypes.FETCH_ORDERS_START: return fetchOrderStart(state, action);
    case actionTypes.FETCH_ORDERS_SUCCESS: return fetchOrderSuccess(state, action);
    case actionTypes.FETCH_ORDERS_FAIL: return fetchOrderFail(state, action);
    default: return state
  }
}

export default reducer;
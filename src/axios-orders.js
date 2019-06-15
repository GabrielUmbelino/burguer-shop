import axios from 'axios';


const instance = axios.create({
  baseURL: 'https://burguer-shop-731e1.firebaseio.com/'
})

export default instance;
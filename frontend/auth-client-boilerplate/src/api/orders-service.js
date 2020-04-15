import axios from "axios";

const orders_service = axios.create({
  baseURL: process.env.REACT_APP_API_URI, 
  withCredentials: true
});

const errorHandler = (err) => {
  console.error(err);
  throw err;
};

export default {
  orders_service,

  resetOrder(resOrder) {          /* No sé si esto está bien *//* Restaurar order para próximo cliente */
    return orders_service
      .post("/orders/add/:tableId", resOrder) /* ver como poner lo de :tableId */
      .then((res) => res.data)
      .catch(errorHandler);
  },
  
  
  
};
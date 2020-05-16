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

  // Creamos la Order en la mesa que haya elegido previamente el camarero
  addOrder(tableId, dishesId, quantity, bill) { 
    return orders_service
      .post(`/orders/add/${tableId}`, {dishesId, quantity}, bill)
      .then((res) => res.data)
      .catch(errorHandler)
  },  

  // Confirmamos la Order y la enviamos al back para actualizarla en la mesa
  confirmOrder(orderId, tableId) { 
    return orders_service
      .put(`/orders/${orderId}/table/${tableId}/confirm`)
      .then((res) => res.data)
      .catch(errorHandler)
  }, 

  getAllOrders() {
    return orders_service
      .get('/orders/showAll')
      .then((res) => res.data)
      .catch(errorHandler);
  },

  getOrder(orderId) {
    return orders_service
      .get(`/orders/${orderId}`)
      .then((res) => res.data)
      .catch(errorHandler);
  },

  // Borramos la Order desde Admin cuando ya la realizó
  deleteOrder(orderId, tableId) { 
    return orders_service
      .delete(`/orders/staff/${orderId}/table/${tableId}/delete`)
      .then((res) => res.data)
      .catch(errorHandler)
  }, 
  
};
import axios from "axios";

const employees_service = axios.create({
  baseURL: process.env.REACT_APP_API_URI, 
  withCredentials: true
});

const errorHandler = (err) => {
  console.error(err);
  throw err;
};

export default {
  employees_service,

  
  getAllEmployees() {
    return employees_service
      .get('/employees/staff')
      .then((res) => res.data)
      .catch(errorHandler);
  },

  deleteEmployee() {
    return employees_service
      .delete('/employees/staff/:_id/delete')
      .then((res) => res.data)
      .catch(errorHandler);
  }
  
};
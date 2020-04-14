import axios from "axios";

const employees_service = axios.create({
  baseURL: 'http://localhost:4000', //process.env.REACT_APP_API_URI, 
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
  }
  
};

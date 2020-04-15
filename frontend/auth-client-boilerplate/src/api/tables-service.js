import axios from "axios";

const tables_service = axios.create({
  baseURL: 'http://localhost:4000', //process.env.REACT_APP_API_URI,
  withCredentials: true
});

const errorHandler = (err) => {
  console.error(err);
  throw err;
};

export default {
  tables_service,
    
  editTheNumberOfTheTable(number) {
    return tables_service
      .put("/tables/:_id/editNumber", number)
      .then((res) => res.data)
      .catch(errorHandler);
  },
  
  editTables(number) {
    return tables_service
      .put("/tables/edit", number)
      .then((res) => res.data)
      .catch(errorHandler)
  }
  
};

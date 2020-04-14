import axios from "axios";

const tables_service = axios.create({
  baseURL: process.env.REACT_APP_API_URI,
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
  }

  
};

import axios from "axios";

const tables_service = axios.create({
  baseURL: "http://localhost:4000/tables",
  /* withCredentials: true */
});

const errorHandler = (err) => {
  console.error(err);
  throw err;
};

export default {
  tables_service,
    
  editTheNumberOfTheTable(number) {
    return tables_service
      .put("/:_id/editNumber", number)
      .then((res) => res.data)
      .catch(errorHandler);
  }

  
};

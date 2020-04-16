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
  
  // Con esta editamos el numero de la mesa ya creada (la key number pasa a ser el que le indiquemos)

  
  // Con esta añadimos tantas como pongamos en el input (con numero de mesa 0), y borra las anteriores
  editTables(number) {
    return tables_service
      .put("/tables/edit", number)
      .then((res) => res.data)
      .catch(errorHandler)
  },

  // Para la primera vez
  addTables(number) { 
    return tables_service
      .post("/tables/add", number)
      .then((res) => res.data)
      .catch(errorHandler)
  },

  showAllTables() { 
    return tables_service
      .get("/tables/showAll")
      .then((res) => res.data)
      .catch(errorHandler)
  }
  
};

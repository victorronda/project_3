import axios from "axios";

const dishes_service = axios.create({
  baseURL: "http://localhost:4000", /* Esto es lo que da problemas?? */
  withCredentials: true
});

const errorHandler = (err) => {
  console.error(err);
  throw err;
};

export default {
  dishes_service,

  handleUpload(theFile) {
    return dishes_service
      .post("/dishes/add", theFile)
      .then((res) => res.data)
      .catch(errorHandler);
  },

  saveNewDish(newDish) {
    return dishes_service
      .post("/dishes/add", newDish)
      .then((res) => res.data)
      .catch(errorHandler);
  },
  
  getAllDishes() {
    return dishes_service
      .get('/dishes/showAll')
      .then((res) => res.data)
      .catch(errorHandler);
  }
  
};

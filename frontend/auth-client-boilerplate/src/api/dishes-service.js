import axios from "axios";

const dishes_service = axios.create({
  baseURL: "http://localhost:4000/dishes",
  /* withCredentials: true */
});

const errorHandler = (err) => {
  console.error(err);
  throw err;
};

export default {
  dishes_service,

  handleUpload(theFile) {
    return dishes_service
      .post("/add", theFile)
      .then((res) => res.data)
      .catch(errorHandler);
  },
  saveNewDish(newDish) {
    return dishes_service
      .post("/add", newDish)
      .then((res) => res.data)
      .catch(errorHandler);
  },
  getAllDishes() {
    return dishes_service
      .get('/showAll')
      .then((res) => res.data)
      .catch(errorHandler);
  }

  
};

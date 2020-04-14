import axios from "axios";

const menus_service = axios.create({
  baseURL: "http://localhost:4000/menus",
  withCredentials: true
});

const errorHandler = (err) => {
  console.error(err);
  throw err;
};

export default {
  menus_service,

  saveNewMenu(newMenu) {
    return menus_service
      .post("/add", newMenu)
      .then((res) => res.data)
      .catch(errorHandler);
  },

  
};

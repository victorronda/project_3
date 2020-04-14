import axios from "axios";

const menus_service = axios.create({
  baseURL: 'http://localhost:4000', //process.env.REACT_APP_API_URI,
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
      .post("/menus/add", newMenu)
      .then((res) => res.data)
      .catch(errorHandler);
  },

  
};

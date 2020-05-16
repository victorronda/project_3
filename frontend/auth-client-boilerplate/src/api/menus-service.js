import axios from "axios";

const menus_service = axios.create({
  baseURL: process.env.REACT_APP_API_URI,
  withCredentials: true
});

const errorHandler = (err) => {
  console.error(err);
  throw err;
};

export default {
  menus_service,

  saveNewMenuName(newMenu) {
    return menus_service
      .post("/menus/add", newMenu)
      .then((res) => res.data)
      .catch(errorHandler);
  },

  getMyMenu() {
    return menus_service
      .get('/menus/show')
      .then((res) => res.data)
      .catch(errorHandler);
  },
  deleteMyMenu(id){
    return menus_service
      .delete(`/menus/${id}/delete`)
      .then((res) => res.data)
      .catch(errorHandler);
  }


  
};
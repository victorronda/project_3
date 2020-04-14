import axios from "axios";

class Auth {
  constructor() {
    this.auth = axios.create({
      baseURL: 'http://localhost:4000', //process.env.REACT_APP_API_URI,
      withCredentials: true,
    });
  }

  signup({ name, email, password }) {
    return this.auth
      .post("/auth/signup", { name, email, password })
      .then(({ data }) => data);
  }

  addEmployee({ name, password }) {
    return this.auth
      .post("/employees/staff/add", { name, password })
      .then(({ data }) => data);
  }

  loginAdmin({ name, password }) {
    return this.auth
      .post("/auth/login", { name, password })
      .then(({ data }) => data);
  }

  loginEmployee({ name, password }) {
    return this.auth
      .post("/employee/login", { name, password })
      .then(({ data }) => data);
  }

  logout() {
    return this.auth
      .post("/auth/logout", {})
      .then(({ data }) => data);
  }

  me() {
    return this.auth
      .get("/auth/me")
      .then(({ data }) => data);
  }
}

const axiosRequestFunctions = new Auth();

export default axiosRequestFunctions;

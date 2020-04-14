import React from "react";
import auth from "../api/auth-service"; // Importamos funciones para llamadas axios a la API
const { Consumer, Provider } = React.createContext();

// HOC para crear Consumer
// el componente withAuth recibe un componente como argumento y nos devuelve un componente con el mismo componente dentro de un <Consumer /> con las propiedades user e isLoggedin (state), y los métodos login, signup y logout (this)
const withAuth = (WrappedComponent) => {
  return class extends React.Component {
    render() {
      return (
        <Consumer>
          {/* El componente <Consumer> provee un callback que recibe el "value" con el objeto Providers */}
          {({ signup, addEmployee, user, loginAdmin, loginEmployee, logout, isLoggedin }) => {
            return (
              <WrappedComponent
                loginAdmin={loginAdmin}
                loginEmployee={loginEmployee}
                signup={signup}
                addEmployee={addEmployee}
                user={user}
                logout={logout}
                isLoggedin={isLoggedin}
                {...this.props}
              />
            );
          }}
        </Consumer>
      );
    }
  };
};

// Provider
class AuthProvider extends React.Component {
  state = { isLoggedin: false, user: null, isLoading: true };

  componentDidMount() {
    // luego de que se monte el componente, llama a auth.me() que nos devuelve el usuario y setea los valores para loguearlo
    auth
      .me()
      .then((user) =>
        this.setState({ isLoggedin: true, user: user, isLoading: false })
      )
      .catch((err) =>
        this.setState({ isLoggedin: false, user: null, isLoading: false })
      );
  }

  signup = (user) => {
    const { name, email, password } = user;

    auth
      .signup({ name, email, password })
      .then((user) => this.setState({ isLoggedin: true, user }))
      .catch(({ response }) =>
        this.setState({ message: response.data.statusMessage })
      );
  };

  addEmployee = (user) => {
    const { name, password } = user;

    auth
      .addEmployee({ name, password })
      .then((user) => this.setState({ isLoggedin: true, user }))
      .catch(({ response }) =>
        this.setState({ message: response.data.statusMessage })
      );
        console.log("employee created")
  };

  loginAdmin = (user) => {
    const { name, password } = user;

    auth
      .loginAdmin({ name, password })
      .then((user) => this.setState({ isLoggedin: true, user }))
      .catch((err) => console.log(err));
  };

  loginEmployee = (user) => {
    const { name, password } = user;

    auth
      .loginEmployee({ name, password })
      .then((user) => this.setState({ isLoggedin: true, user }))
      .catch((err) => console.log(err));
  };

  logout = () => {
    auth
      .logout()
      .then(() => this.setState({ isLoggedin: false, user: null }))
      .catch((err) => console.log(err));
  };

  render() {
    // destructuramos isLoading, isLoggedin y user de this.state y login, logout y signup de this
    const { isLoading, isLoggedin, user } = this.state;
    const { loginAdmin, loginEmployee, logout, signup, addEmployee } = this;

    return isLoading ? (
      // si está loading, devuelve un <div> y sino devuelve un componente <Provider> con un objeto con los valores: { isLoggedin, user, login, logout, signup}
      // el objeto pasado en la prop value estará disponible para todos los componentes <Consumer>
      <div>Loading</div>
    ) : (
      <Provider value={{ isLoggedin, user, loginAdmin, loginEmployee, logout, signup, addEmployee }}>
        {this.props.children}
      </Provider>
    ); /*<Provider> "value={}" datos que estarán disponibles para todos los componentes <Consumer> */
  }
}

export { Consumer, withAuth };

export default AuthProvider;

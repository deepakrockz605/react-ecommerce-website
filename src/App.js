import React, { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom";

import Navbar from "./components/Navbar";
import Landing from "./components/Landing";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import "./scss/App.scss";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";
import Cart from "./components/Cart";
import ProductDetails from "./components/ProductDetails";
import Checkout from "./components/Checkout";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Navbar />
          <PublicRoute restricted={false} exact path="/" component={Landing} />
          <div className="container">
            <PublicRoute
              restricted={true}
              exact
              path="/register"
              component={Register}
            />
            <PublicRoute
              restricted={true}
              exact
              path="/login"
              component={Login}
            />
            <PrivateRoute exact path="/dashboard" component={Dashboard} />
            <PrivateRoute exact path="/cart" component={Cart} />
            <PrivateRoute
              exact
              path="/product-details"
              component={ProductDetails}
            />
            <PrivateRoute exact path="/checkout" component={Checkout} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;

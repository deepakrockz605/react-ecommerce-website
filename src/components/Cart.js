import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  cartIncrementDetails,
  cartDecrementDetails,
  cartRemoveDetails,
  handleCheckout,
} from "../Actions/index";

function Cart(props) {
  const handleCheckout = () => {
    props.history.push("/checkout");
    props.handleCheckout();
  };

  return (
    <React.Fragment>
      {props.state.cartValue > 0 ? (
        <div className="cart-details">
          <div className="product-wrapper">
            <div className="offset-md-4 button-wrapper go-back">
              <button
                className="btn"
                onClick={() => props.history.push("/dashboard")}
              >
                Go to Dashboard
              </button>
            </div>
          </div>
          <table style={{ margin: "40px auto" }}>
            <thead>
              <tr>
                <th>Product</th>
                <th className="text-center">Quantity</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {props.state.cartMap.map((product, index) => {
                return (
                  <tr key={index}>
                    <td>
                      <div>
                        <img src={product.productURL} alt={product.name} />
                        <p>{product.name}</p>
                      </div>
                    </td>
                    <td>
                      <div className="product-counter">
                        <input
                          id="minus"
                          type="button"
                          value="-"
                          onClick={() =>
                            props.cartDecrementDetails(product.name)
                          }
                        />
                        <input
                          id="quantity"
                          type="text"
                          value={product.quantity}
                          name="quantity"
                          readOnly
                        />
                        <input
                          id="plus"
                          type="button"
                          value="+"
                          onClick={() =>
                            props.cartIncrementDetails(product.name)
                          }
                        />
                        <span
                          onClick={() => props.cartRemoveDetails(product.name)}
                        >
                          <i
                            className="fa fa-trash"
                            aria-hidden="true"
                            style={{ color: "red", cursor: "pointer", marginLeft:'5px' }}
                          ></i>
                        </span>
                      </div>
                    </td>
                    <td>
                      <div className="bold">{"$" + product.finalPrice}</div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr>
                <td>Final Amount</td>
                <td></td>
                <td className="bold">{"$" + props.state.subTotal}</td>
              </tr>
              <tr>
                <div className="product-wrapper">
                  <div className="offset-md-4 button-wrapper go-back">
                    <button className="btn" onClick={handleCheckout}>
                      Checkout
                    </button>
                  </div>
                </div>
              </tr>
            </tfoot>
          </table>
        </div>
      ) : (
        <div className="text-center mt-5">
          <p>Cart is Empty</p>
          <p>
            go to{" "}
            <span className="strikethrough">
              <Link to="/dashboard">Dashboard</Link>
            </span>{" "}
            and add some products to checkout list
          </p>
        </div>
      )}
    </React.Fragment>
  );
}

const mapStateToProps = (state) => {
  return {
    state,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    cartIncrementDetails: (name) => {
      dispatch(cartIncrementDetails(name));
    },
    cartDecrementDetails: (name) => {
      dispatch(cartDecrementDetails(name));
    },
    cartRemoveDetails: (name) => {
      dispatch(cartRemoveDetails(name));
    },
    handleCheckout: () => {
      dispatch(handleCheckout());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);

import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { cartAddDetails, cartRemoveDetails } from "../Actions/index";

class ProductDetails extends PureComponent {
  constructor(props) {
    super(props);
    const isCheckCart = props.state.selectedProduct && props.state.selectedProduct.isAddedtoCart
    const isCheckQuantity = props.state.selectedProduct && props.state.selectedProduct.finalPrice
    this.state = {
      product: {},
      buttonCartStatus: isCheckCart ? "Remove From Cart" : "Add To Cart" 
    };
  }

  componentDidMount() {
    const { state } = this.props;
    console.log(state);
    if (state && Object.keys(state.selectedProduct).length === 0) {
      this.props.history.push("/dashboard");
    } else {
      this.setState({
        product: state.selectedProduct,
      });
    }
  }

  handleAddToCart = (status, name) => {
    if (status === "Add To Cart") {
      this.setState({ buttonCartStatus: "Remove From Cart" });
      this.props.cartAddDetails(name);
    } else {
      this.setState({ buttonCartStatus: "Add To Cart" });
      this.props.cartRemoveDetails(name);
    }
  };

  handleOrderNow = (name) => {
    this.props.cartAddDetails(name);
    this.props.history.push("/cart");
  };

  render() {
    const { product, buttonCartStatus } = this.state;
    console.log(this.props.state.cartMap)
    return (
      <div className="product-wrapper">
        <div className="row">
          <div className="col-md-4 text-center">
            <div className="offset-md-4 button-wrapper go-back">
              <button
                className="btn"
                onClick={() => this.props.history.goBack()}
              >
                Go Back
              </button>
            </div>
            <img src={product.productURL} alt={product.name} />
          </div>
          <div className="col-md-6 text-left">
            <p className="product-name bold">{product.name}</p>
            <p>
              Price:{" "}
              <span className="strikethrough">
                <del>{"$" + product.price}</del>
              </span>
            </p>
            <p>
              Offer Price:{" "}
              <span className="strikethrough">
                {"$" + product.specialPrice}
              </span>
            </p>
            <div>
              <p className="bold">Specifications: </p>
              <p>
                Dimensions:{" "}
                <span className="strikethrough">
                  {product.specs && product.specs.dimensions}
                </span>
              </p>
              <p>
                Weight:{" "}
                <span className="strikethrough">
                  {product.specs && product.specs.weight}
                </span>
              </p>
              <p>
                Primary Camera:{" "}
                <span className="strikethrough">
                  {product.specs && product.specs.primaryCamera}
                </span>
              </p>
              <p>
                Battery:{" "}
                <span className="strikethrough">
                  {product.specs && product.specs.battery}
                </span>
              </p>
            </div>
          </div>
        </div>
        <div className="offset-md-4 button-wrapper">
          <button
            className="btn"
            onClick={() => this.handleAddToCart(buttonCartStatus, product.name)}
          >
            {buttonCartStatus}
          </button>
          <button
            onClick={() => this.handleOrderNow(product.name)}
            className="btn"
          >
            Order Now
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    state,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    cartAddDetails: (name) => {
      dispatch(cartAddDetails(name));
    },
    cartRemoveDetails: (name) => {
      dispatch(cartRemoveDetails(name));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetails);

import React, { PureComponent } from "react";
import listProducts from './products'
import { connect } from 'react-redux';
import { productDetails } from "../Actions/index";

class Dashboard extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      products: listProducts,
      addcart: 'Add To Cart',
    };
  }

  handleViewProduct = (keyx) => {
    this.props.productDetails(keyx);
    this.props.history.push("/product-details")
  }

  render() {
    return (
      <section>
        <div className="container">
          <div className="dashboard-wrapper">
            {
              this.state.products.map((product, index) => {
                return (
                  <div className="product-list" key={index}>
                    <div className="product-detail">
                      <img src={product.productURL} alt={product.name} />
                      <p className="product-name">{product.name}</p>
                      <p>Price: <span className="strikethrough"><del>{"$"+product.price}</del></span></p>
                      <p>Offer Price: <span className="strikethrough">{"$"+product.specialPrice}</span></p>
                    </div>
                    <button className="btn cart-btn" onClick={() => this.handleViewProduct(product.name)}>View Details</button>
                  </div>
                )
              })
            }
          </div>
        </div>
      </section>
    );
  }
}

const mapStateToProps = state => {
  return {
    state
  };
};

const mapDispatchToProps = dispatch => {
  return {
    productDetails: keyx => {
      dispatch(productDetails(keyx));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
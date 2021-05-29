import {
  CART_DETAILS,
  PRODUCT_DETAILS,
  CART_REMOVE_DETAILS,
  CART_ADD_DETAILS,
  CART_INCREMENT_DETAILS,
  CART_DECREMENT_DETAILS,
  HANDLE_CHECKOUT_DETAILS,
} from "../Actions/action-types";
import listProducts from "../components/products";

const initState = {
  cartValue: 0,
  selectedProduct: {},
  cartMap: [],
  subTotal: 0,
};

const dataReducer = (states = initState, action) => {
  states = states || initState;

  if (action.type === PRODUCT_DETAILS) {
    const selectedProduct = listProducts.find(
      (product) => product.name === action.product
    );

    const checkDuplicates = states.cartMap.find(
      (product) => product.name === selectedProduct.name
    );
    if (checkDuplicates) {
      states.selectedProduct = selectedProduct;
      states.selectedProduct.isAddedtoCart = true;
    } else {
      states.selectedProduct = selectedProduct;
      states.selectedProduct.isAddedtoCart = false;
    }

    return {
      ...states,
    };
  } else if (action.type === CART_ADD_DETAILS) {
    const cartMap = listProducts.find(
      (product) => product.name === action.product
    );
    const checkDuplicates = states.cartMap.find(
      (product) => product.name === action.product
    );
    if (!checkDuplicates) {
      states.cartValue += 1;
      cartMap.quantity = 1;
      cartMap.finalPrice = Number(cartMap.specialPrice)
      states.subTotal = states.subTotal + Number(cartMap.specialPrice);
      states.cartMap.push(cartMap);
    }
    return {
      ...states,
    };
  } else if (action.type === CART_REMOVE_DETAILS) {
    states.cartValue -= 1;
    const newCartMap = states.cartMap.find(
      (product) => product.name === action.name
    );
    states.cartMap = states.cartMap.filter(function (product) {
      return product.name !== action.name;
    });
    states.subTotal = states.subTotal - Number(newCartMap.finalPrice);
    return {
      ...states,
    };
  } else if (action.type === CART_DETAILS) {
    states.cartValue += action.data;
    return {
      ...states,
    };
  } else if (action.type === CART_INCREMENT_DETAILS) {
    const getCartMapindex = states.cartMap.findIndex(
      (product) => product.name === action.product
    );
    states.cartMap[getCartMapindex].quantity += 1;
    states.cartMap[getCartMapindex].finalPrice =
      Number(states.cartMap[getCartMapindex].specialPrice) *
      states.cartMap[getCartMapindex].quantity;
    states.subTotal =
      states.subTotal + Number(states.cartMap[getCartMapindex].specialPrice);
    return {
      ...states,
    };
  } else if (action.type === CART_DECREMENT_DETAILS) {
    const getCartMapindex = states.cartMap.findIndex(
      (product) => product.name === action.product
    );
    if (states.cartMap[getCartMapindex].quantity !== 0) {
      states.cartMap[getCartMapindex].quantity -= 1;
      states.cartMap[getCartMapindex].finalPrice =
        Number(states.cartMap[getCartMapindex].specialPrice) *
        states.cartMap[getCartMapindex].quantity;
      states.subTotal =
        states.subTotal - Number(states.cartMap[getCartMapindex].specialPrice);
    }
    return {
      ...states,
    };
  } else if (action.type === HANDLE_CHECKOUT_DETAILS) {
    states.cartMap = [];
    states.cartValue = 0;
    states.selectedProduct = {};
    states.subTotal = 0
  
    return {
      ...states
    }
  } else {
    return states;
  }
};

export default dataReducer;

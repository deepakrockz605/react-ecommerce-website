import {
  CART_DETAILS,
  PRODUCT_DETAILS,
  CART_ADD_DETAILS,
  CART_REMOVE_DETAILS,
  CART_INCREMENT_DETAILS,
  CART_DECREMENT_DETAILS,
  HANDLE_CHECKOUT_DETAILS
} from "./action-types";

export const productDetails = (product) => {
  return {
    type: PRODUCT_DETAILS,
    product,
  };
};

export const cartDetails = (data) => {
  return {
    type: CART_DETAILS,
    data,
  };
};

export const cartAddDetails = (product) => {
  return {
    type: CART_ADD_DETAILS,
    product,
  };
};

export const cartRemoveDetails = (name) => {
  return {
    type: CART_REMOVE_DETAILS,
    name,
  };
};

export const cartIncrementDetails = (product) => {
  return {
    type: CART_INCREMENT_DETAILS,
    product,
  };
};

export const cartDecrementDetails = (product) => {
  return {
    type: CART_DECREMENT_DETAILS,
    product,
  };
};

export const handleCheckout = () => {
  return {
    type: HANDLE_CHECKOUT_DETAILS,
  };
};



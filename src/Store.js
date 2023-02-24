import React, { createContext, useReducer } from "react";
export const Store = createContext();

const initialState = {
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null,
  cart: {
    shippingAddress: localStorage.getItem("shippingAddress")
      ? JSON.parse(localStorage.getItem("shippingAddress"))
      : {},
    paymentMethod: localStorage.getItem("paymentMethod")
      ? localStorage.getItem("paymentMethod")
      : "Openpay",
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
  },
};

function reducer(state, action) {
  switch (action.type) {
    case "CART_ADD_ITEM":
      // add to cart
      const newItem = action.payload;
      const existItem = state.cart.cartItems.find(
        (item) =>
          item?.product?.id === newItem.product?.id ||
          item?.product?.id === newItem.id
      );
      const cartItems = existItem
        ? state.cart.cartItems.map((item) =>
            item.product.id === existItem.product.id
              ? {
                  product: {
                    ...existItem.product,
                  },
                  purchasePrice: item.purchasePrice,
                  quantity: newItem.product
                    ? newItem.quantity
                    : existItem.quantity + 1,
                }
              : item
          )
        : [
            ...state.cart.cartItems,
            {
              product: newItem,
              purchasePrice: newItem.price,
              quantity: newItem.quantity,
            },
          ];

      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      return { ...state, cart: { ...state.cart, cartItems } };
    case "CART_ADD_ITEMS": {
      //add to cart
      const productsArray = action.payload;
      var cartItems2 = state.cart.cartItems;
      productsArray.forEach((newItem) => {
        const existItem = cartItems2.find(
          (item) => item.product.id === newItem.product.id
        );
        cartItems2 = existItem
          ? cartItems2.map((item) =>
              item.product.id === existItem.product.id
                ? {
                    product: {
                      ...existItem.product,
                    },
                    purchasePrice: item.purchasePrice,
                    quantity: newItem.quantity + existItem.quantity,
                  }
                : item
            )
          : [
              ...cartItems2,
              {
                product: newItem.product,
                purchasePrice: newItem.product.price,
                quantity: newItem.quantity,
              },
            ];
      });

      // return;
      localStorage.setItem("cartItems", JSON.stringify(cartItems2));
      return { ...state, cart: { ...state.cart, cartItems2 } };
    }

    case "CART_REMOVE_ITEM": {
      const cartItems = state.cart.cartItems.filter(
        (item) => item.product.id !== action.payload.product.id
      );
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      return { ...state, cart: { ...state.cart, cartItems } };
    }
    case "CART_CLEAR":
      return { ...state, cart: { ...state.cart, cartItems: [] } };

    case "USER_SIGNIN":
      return { ...state, userInfo: action.payload };
    case "USER_SIGNOUT":
      return {
        ...state,
        userInfo: null,
        cart: {
          cartItems: [],
          shippingAddress: {},
        },
      };
    case "SAVE_SHIPPING_ADDRESS":
      return {
        ...state,
        cart: {
          ...state.cart,
          shippingAddress: action.payload,
        },
      };
    default:
      return state;
  }
}

export function StoreProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <Store.Provider value={value}>{props.children} </Store.Provider>;
}

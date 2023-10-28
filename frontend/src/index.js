import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

import productsReducer, { productsFetch } from "./slices/productsSlice";
import featuresReducer, { featuresFetch } from "./slices/featuresSlice";
import categoryReducer, { categoryFetch } from "./slices/categorySlice";
import cartReducer, { getTotals } from "./slices/cartSlice";
import authReducer from "./slices/authSlice";
import { productsApi } from "./slices/productsApi";
import UsersSlice from "./slices/UsersSlice";
import ordersSlice from "./slices/ordersSlice";

const store = configureStore({
  reducer: {
    products: productsReducer,
    features: featuresReducer,
    category: categoryReducer,
    users: UsersSlice,
    orders: ordersSlice,
    cart: cartReducer,
    auth: authReducer,
    [productsApi.reducerPath]: productsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productsApi.middleware),
});

store.dispatch(productsFetch());
store.dispatch(featuresFetch());
store.dispatch(categoryFetch());
store.dispatch(getTotals());

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Home from "./components/Home";
import NavBar from "./components/NavBar";
import NotFound from "./components/NotFound";
import Cart from "./components/Cart";
import "react-toastify/dist/ReactToastify.css";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loadUser } from "./slices/authSlice";
import CheckoutSuccess from "./components/CheckoutSuccess";
import Dashboard from "./components/admin/Dashboard";
import Products from "./components/admin/Products";
import Users from "./components/admin/Users";
import Orders from "./components/admin/Oders";
import Summary from "./components/admin/Summary";
import ProductsList from "./components/admin/lists/ProductsList";
import Product from "./components/Details/Product";
import UserProfile from "./components/Details/UserProfile";
import Order from "./components/Details/Order";
import Features from "./components/admin/Features";
import FeaturesList from "./components/admin/lists/FeaturesList";
import Category from "./components/admin/Category";
import CategoryList from "./components/admin/lists/CategoryList";
import CreateFeatures from "./components/admin/CreateFeatures";
import EditFeatures from "./components/admin/EditFeatures";
import DeleteFeatures from "./components/admin/DeleteFeatures";
import CreateProduct from "./components/admin/CreateProduct";
import DeleteProduct from "./components/admin/DeleteProduct";
import EditProducts from "./components/admin/EditProducts";
import EditUsers from "./components/admin/EditUsers";
import UsersList from "./components/admin/lists/UsersList";
import CreateCategory from "./components/admin/CreateCategory";
import EditCategory from "./components/admin/EditCategory";
import DeleteCategory from "./components/admin/DeleteCategory";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser(null));
  }, [dispatch]);

  return (
    <div className="">
      <BrowserRouter>
        <ToastContainer />
        <NavBar />
        <div className="content-container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout-success" element={<CheckoutSuccess />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/product/:id" element={<Product />} />
            <Route path="/order/:id" element={<Order />} />
            <Route path="/user/:id" element={<UserProfile />} />
            <Route path="/admin" element={<Dashboard />}>
              <Route path="summary" element={<Summary />} />
              <Route path="products" element={<Products />}>
                <Route index element={<ProductsList />} />
                <Route path="create-product" element={<CreateProduct />} />
                <Route path="edit-product/:prodId" element={<EditProducts />} />
                <Route path="delete-product/:prodId" element={<DeleteProduct />} />
              </Route>
              <Route path="features" element={<Features />}>
                <Route index element={<FeaturesList />} />
                <Route path="create-features" element={<CreateFeatures />} />
                <Route path="edit-features/:featId" element={<EditFeatures />} />
                <Route path="delete-features/:featId" element={<DeleteFeatures />} />
              </Route>
              <Route path="users" element={<Users />} >
                <Route index element={<UsersList />} />
                <Route path="edit-user/:usrId" element={<EditUsers />} />
              </Route>
              <Route path="category" element={<Category />}>
                <Route index element={<CategoryList />} />
                <Route path="create-category" element={<CreateCategory />} />
                <Route path="edit-category/:catId" element={<EditCategory />} />
                <Route path="delete-category/:catId" element={<DeleteCategory />} />
              </Route>
              <Route path="orders" element={<Orders />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;

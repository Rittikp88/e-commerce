import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css';
// import "bootstrap/dist/css/bootstrap.min.css";
import Login from './Screens/Login';
import Register from './Screens/Register';
// import Home from "./components/Home";
import BoardUser from "./components/BoardUser";
import BoardSeller from "./components/BoardSeller";
import Admin from "./components/Admin";
import SuperAdmin from "./components/SuperAdmin";
import { AppDispatch } from "./store";
import EventBus from "./common/EventBus";
import { logout } from "./slices/auth";
import Header from "./components/layout/Header/Header";
import Footer from "./components/layout/Footer/Footer";
import Home from "./components/Home/Home";
import ProductDetails from "./components/Product/ProductDetails";
import Profile from "./Screens/Profile";
import store from "./store";
import { loadUser } from "./slices/auth";
import Dashboard from "./Admin/Dashboard";
import UserOptions from "./components/layout/Header/UserOptions";
import ProductList from "./Admin/ProductList";
import NewProduct from "./Admin/NewProduct";
import UpdateProduct from "./Admin/UpdateProduct";
import Products from "./components/Product/Products";
import Search from "./components/Product/Search";


function App() {

  const { isLoggedIn, user } = useSelector((state: any) => state.auth);
  console.log(isLoggedIn, user)
  useEffect(() => {

    store.dispatch(loadUser());


  }, []);
  return (
    <Router>
      <Header />

      {isLoggedIn && <UserOptions user={user} />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="product/:id" element={<ProductDetails match={undefined} />} />
        <Route path="/products" element = {<Products />} />
        <Route path="/search" element = {<Search />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/products" element={<ProductList />} />
        <Route path="/admin/products/create" element={<NewProduct />} />
        <Route path="/admin/product/:id" element={<UpdateProduct />} />
        {/* Define other routes here */}
      </Routes>

      <Footer />
    </Router>
  )
}

export default App;
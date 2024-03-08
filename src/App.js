import logo from "./logo.svg";
import "./App.css";
// import ProductItem from "./features/product/ProductItem";
import ProductList from "./features/product/ProductList";
import NavBar from "./NavBar";
import Details from "./features/product/Details";
import { Route, Routes } from "react-router-dom";
import Footer from "./Footer";
import Home from "./Home";
import { useDispatch } from "react-redux";
import ShoppingCart from "./features/order/ShoppingCart";
import SmallShoppingCart from "./features/order/SmallShoppingCart";
import SignUp from "./features/user/SignUp";
import { Login } from "./features/user/Login";
import Form from "./features/order/Form";
import { userIn } from "./features/user/userSlice";
import { useEffect } from "react";
import { setCount, setBasket } from "./features/order/orderSlice";
import AddProduct from "./features/product/AddProduct";
import Update from "./features/product/Update";
import AllOrders from "./features/order/AllOrders";
import ProtectedRoute from "./ProtectedRoute";
function App() {
  let dispatch = useDispatch();
  useEffect(() => {
    let user = localStorage.getItem("currentUser");
    if (user) {
      dispatch(userIn(JSON.parse(user)));
    }
  }, []);

  useEffect(() => {
    let basket = localStorage.getItem("basket");
    if (basket) {
      dispatch(setBasket(JSON.parse(basket)));
    }
    let count = localStorage.getItem("count");
    console.log("count", count);
    if (count) {
      dispatch(setCount(JSON.parse(count)));
    }
  }, []);

  return (
    <>
      <NavBar />
      <Routes>
        <Route path="form" element={<Form />} />
        {/* <Route path="allOrders" element={<AllOrders />} /> */}

        <Route path="/" element={<Home />} />
        <Route path="product" element={<ProductList />}>
          <Route path="update" element={<Update />} />

          <Route path=":id" element={<Details />} />
          <Route path=":id/smallBasket" element={<SmallShoppingCart />}></Route>
        </Route>
        <Route path="/signUp" element={<SignUp />} />

        <Route path="/login" element={<Login />} />
        <Route path="order" element={<ShoppingCart />}>
          <Route path="form" element={<Form />} />
          <Route path="login" element={<Login />} />
        </Route>

        <Route
          path="addProduct"
          element={
            <ProtectedRoute>
              {" "}
              <AddProduct />{" "}
            </ProtectedRoute>
          }
        />
        <Route
          path="allOrders"
          element={
            <ProtectedRoute>
              {" "}
              <AllOrders />{" "}
            </ProtectedRoute>
          }
        />
      </Routes>

      <Footer />
    </>
  );
}

export default App;

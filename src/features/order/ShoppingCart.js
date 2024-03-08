// ShoppingCart.js
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addToBasket, removeFromBasket } from "./orderSlice";
import "./ShoppingCart.css";
import { Link, Outlet } from "react-router-dom";

export const ShoppingCart = () => {
  const basket = useSelector((state) => state.order.basket);
  const user = useSelector((state) => state.user.currentUser)?.role;
  const dispatch = useDispatch();
  const [selectedProducts, setSelectedProducts] = useState([]);

  const handleAddToBasket = (product) => {
    dispatch(addToBasket(product));
  };

  const decrementCount = (productId) => {
    dispatch(removeFromBasket(productId));
  };

  const handleCheckboxChange = (productId) => {
    if (selectedProducts.includes(productId)) {
      setSelectedProducts(selectedProducts.filter((id) => id !== productId));
    } else {
      setSelectedProducts([...selectedProducts, productId]);
    }
  };

  // פונקציה לחישוב סכום הזמנה ועלות המשלוח
  const calculateOrderSummary = () => {
    const orderTotal = basket.reduce((total, item) => {
      return total + item.price * item.countProduct;
    }, 0);
    const count = basket.reduce((total, item) => {
      return (total += item.countProduct);
    }, 0);
    const shippingCost = 25; // עלות משלוח קבועה
    const grandTotal = orderTotal + shippingCost;

    return {
      count,
      orderTotal,
      shippingCost,
      grandTotal,
    };
  };

  const orderSummary = calculateOrderSummary();

  return (
    <>
      <div id="all">
        <div className="shopping-cart">
          <ul>
            {basket.map((item) => (
              <li key={item.id}>
                {" "}
                <span>{item.price * item.countProduct}.00₪</span>
                <div className="count">
                  <button onClick={() => handleAddToBasket(item)}>+</button>
                  <h1>{item.countProduct}</h1>
                  <button onClick={() => decrementCount(item._id)}>-</button>
                </div>
                <span>{item.name}</span>
                <img className="imgShoppingLarg" src={item.src} />
                <div className="checkbox-container">
                  <input
                    type="checkbox"
                    checked={selectedProducts.includes(item._id)}
                    onChange={() => handleCheckboxChange(item._id)}
                  />
                </div>
              </li>
            ))}
          </ul>{" "}
        </div>
        <div className="order-summary">
          <img className=" " src="/logo.jpg" />

          <h3>סיכום הזמנה</h3>
          <p>סה"כ: ₪{orderSummary.orderTotal.toFixed(2)}</p>
          <p>עלות משלוח: ₪{orderSummary.shippingCost.toFixed(2)}</p>
          <p>כמות : {orderSummary.count}</p>

          <h4 id="pay">
            סה"כ כולל משלוח: ₪{orderSummary.grandTotal.toFixed(2)}
          </h4>

          <div className="buttonS">
            {" "}
            {user == undefined && (
              <Link to={"login"}>
                <button className="purchase-button">רכישה</button>
              </Link>
            )}
            {user !== undefined && (
              <Link to={"/order/form"}>
                <button className="purchase-button">רכישה</button>
              </Link>
            )}
            <Link to="/product">
              <button className="purchase-button">חזרה לחנות</button>
            </Link>
          </div>
        </div>{" "}
      </div>
      <Outlet />
    </>
  );
};

export default ShoppingCart;

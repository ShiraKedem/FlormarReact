import "./SmallShoppingCart.css";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addToBasket, removeFromBasket } from "./orderSlice";
import { getProductsById } from "../product/productApi";
import { useParams, Link } from "react-router-dom";
import ShoppingCart from "./ShoppingCart";
import { FiPlus } from "react-icons/fi";
import { FiMinus } from "react-icons/fi";

const SmallShoppingCart = () => {
  const basket = useSelector((state) => state.order.basket);
  const dispatch = useDispatch();
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [isVisible, setIsVisible] = useState(true);

  const handleAddToBasket = (product) => {
    dispatch(addToBasket(product));
  };

  const decrementCount = (productId) => {
    dispatch(removeFromBasket(productId));
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 7000); // 5000 milliseconds = 5 seconds

    return () => clearTimeout(timer);
  }, []); // Empty dependency array to run the effect only once on mount

  return (
    <>
      {isVisible && (
        <div className="shopping-cart-small">
          {" "}
          <img className="imgs" src="/logo.jpg" alt="flogo"></img>
          <ul>
            {" "}
            {basket.map((item) => (
              <li key={item.id}>
                <div className="count-small">
                  {/* <button onClick={() => handleAddToBasket(item)}><FiPlus/></button> */}
                  {/* <span>count {item.countProduct}</span> */}
                  {/* <button onClick={() => decrementCount(item._id)}><FiPlus/></button> */}
                </div>{" "}
                <span>{item.price}.00₪</span>
                <span>{item.name}</span>
                <img className="imgShoppingLarg-samall" src={item.src} />
              </li>
            ))}
          </ul>
          <Link to="/order">
            <button
              style={{
                bottom: "0",
                fontSize: "16px",
                fontWeight: "bold",
                border: "none",
                borderRadius: "3px",
                backgroundColor: "rgb(247, 95, 138)",
                color: "#fff",
                cursor: "pointer",
                width: "200px",
                outline: "none",
                marginLeft: "50px",
              }}
            >
              צפה בעגלת קניות
            </button>{" "}
          </Link>
        </div>
      )}
    </>
  );
};

export default SmallShoppingCart;

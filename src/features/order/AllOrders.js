import { useSelector } from "react-redux";
import { getAllOrders, updateById } from "./orderApi";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import "./AllOrders.css";
const AllOrders = () => {
  const token = useSelector((state) => state.user.currentUser)?.token;
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    getAllOrders(token)
      .then((res) => {
        setOrders(res.data);
      })
      .catch((err) => {
        alert("לא ניתן לטעון את ההזמנות");
        console.log("error");
      });
  }, [token]);

  const send = (id) => {
    updateById(id, token)
      .then(() => {
        alert(" עודכן בהצלחה");
      })
      .catch((err) => {
        alert("לא ניתן לשנות את מצב ההזמנה");
        console.error("error", err);
      });
  };

  return (
    <>
      {" "}
      <div>
        <ul className="orders-container">
          {orders.map((order) => (
            <li key={order._id} className="order-card">
              <p>Order ID: {order._id}</p>
              <p>Address: {order.address}</p>
              <p>isCameOut: {order.isCameOut ? "Yes" : "No"}</p>
              {!order.isCameOut && (
                <button className="send-button" onClick={() => send(order._id)}>
                  Send
                </button>
              )}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default AllOrders;

import React, { useEffect, useState } from "react";
import { getProductsById } from "./productApi";
import "./Details.css";
import { useNavigate, useParams, Link, Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToBasket } from "../order/orderSlice";
import SmallShoppingCart from "../order/SmallShoppingCart";

const Details = () => {
  let params = useParams();
  const [product, setProduct] = useState([]);
  let navigate = useNavigate();
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showBasket, setShowBasket] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    getProductsById(params.id)
      .then((res) => {
        setProduct(res.data);
      })
      .catch((err) => {
        alert("לא ניתן לטעון המוצר");
        console.log("error");
      });
  }, []);
  const handleAddToBasket = (product) => {
    dispatch(addToBasket(product));
    setShowSuccessMessage(true);
    setShowBasket(true);
  };

  return (
    <>
      {product && (
        <div className="allDivProduct">
          <button
            onClick={() => navigate(-1)}
            style={{
              position: "absolute",
              top: "0",
              left: "0",
              padding: "5px",
              backgroundColor: "black",
              color: "#fff",
              border: "none",
              borderRadius: "8px 0  0  0",
              cursor: "pointer",
              width: "40px",
              height: "30px",
            }}
          >
            X
          </button>
          <div className="allProduct">
            <div className="product">
              <h2> {product.name}</h2>
              <h3>{product.price}.00₪</h3>
              <h5>{product.discaption}</h5> <h5>{product.ProvidCode}</h5>{" "}
              <img
                class="item_color_image lazy loaded"
                data-optimized="product_color"
                src="https://www.flormar.co.il/wp-content/uploads/2023/11/31000228-001-1.png?x23503"
                data-src="https://www.flormar.co.il/wp-content/uploads/2023/11/31000228-001-1.png?x23503"
                width="24"
                height="24"
                alt="MOOD BOOSTER ILLUMINATOR אילומינטור נוזלי MOON GLOW 001"
                title="MOOD BOOSTER ILLUMINATOR אילומינטור נוזלי MOON GLOW 001"
                data-was-processed="true"
              ></img>
              <img
                class="item_color_image lazy loaded"
                data-optimized="product_color"
                src="https://www.flormar.co.il/wp-content/uploads/2023/11/31000228-001-1.png?x23503"
                data-src="https://www.flormar.co.il/wp-content/uploads/2023/11/31000228-001-1.png?x23503"
                width="24"
                height="24"
                alt="MOOD BOOSTER ILLUMINATOR אילומינטור נוזלי MOON GLOW 001"
                title="MOOD BOOSTER ILLUMINATOR אילומינטור נוזלי MOON GLOW 001"
                data-was-processed="true"
              ></img>
              <img
                class="item_color_image lazy loaded"
                data-optimized="product_color"
                src="https://www.flormar.co.il/wp-content/uploads/2023/10/31000249-030-1.png?x23503"
                data-src="https://www.flormar.co.il/wp-content/uploads/2023/10/31000249-030-1.png?x23503"
                width="24"
                height="24"
                alt="SKIN REFRESH FOUNDATION סקין ריפרש  LIGHT BRIGHT 030"
                title="SKIN REFRESH FOUNDATION סקין ריפרש  LIGHT BRIGHT 030"
                data-was-processed="true"
              ></img>
              <p>{product.providCode}</p>
              <Link to={"smallBasket"}>
                <button
                  className="plus-minus"
                  onClick={() => handleAddToBasket(product)}
                  style={{
                    position: "absolute",
                    bottom: "0",
                    left: "0",
                    padding: "10px",
                    fontSize: "16px",
                    fontWeight: "bold",
                    border: "none",
                    borderRadius: "5px",
                    backgroundColor: "rgb(247, 95, 138)",
                    color: "#fff",
                    cursor: "pointer",
                    outline: "none",
                    marginLeft: "20px",
                    marginBottom: "20px",
                    zIndex: "999",
                  }}
                >
                  <i
                    class="sh_m_sui_icon_addtocart_20px"
                    data-v-42b4c5fb=""
                  ></i>{" "}
                  הוסף לעגלה
                </button>{" "}
              </Link>
            </div>
            <div className="imgProduct">
              <img src={product.src} alt="תמונת המוצר" />{" "}
              {/* {showSuccessMessage && (
                <div className="success-message">
                  {" "}
                  <p>! המוצר נוסף בהצלחה </p>
                </div>
              )} */}
            </div>
          </div>
        </div>
      )}
      <Outlet />
    </>
  );
};

export default Details;

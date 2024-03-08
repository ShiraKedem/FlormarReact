// ProductList.js
import React, { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { getProducts, deleteProduct } from "./productApi";
import "./ProductList.css";
import Rating from "@mui/material/Rating";
import Pagination from "@mui/material/Pagination";
import { useSelector } from "react-redux";
import { Alert } from "@mui/material";

const ProductList = () => {
  const [arr, setArr] = useState([]);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const [message, setMessage] = useState("");
  const [userRol, setUserRol] = useState(false);

  const role = useSelector((state) => state.user.currentUser)?.role;
  const token = useSelector((state) => state.user.currentUser)?.token;
  useEffect(() => {
    getProducts(page, 12, "")
      .then((res) => {
        setArr(res.data);
        setPageCount(Math.ceil(res.totalCount / 12));
      })
      .catch((err) => {
        alert("לא ניתן לטעון את המוצרים");
        console.log("error");
      });
  }, [page]);
  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (confirmDelete) {
      try {
        const response = await deleteProduct(id, token);
        setMessage(`Product deleted successfully`);
        alert(message);
        window.location.reload();
      } catch (error) {
        setMessage(`Failed to delete product`);
        console.error("Error details:", error);
      }
    }
  };
  return (
    <>
      <div class="container">
        <img class="image" src="/3.png" />
        <img class="image" src="/4.png" />
        <img class="image" src="/2.png" />
      </div>

      <div className="product-list">
        {arr.map((item) => (
          <div key={item._id} className="product-item">
            <div className="product-image">
              {" "}
              <img
                src={item.src}
                alt="תמונת המוצר"
                style={{ height: "60vh", width: "10wh" }}
              />
            </div>
            <div className="product-details">
              <h4>{item.name}</h4>
              <p>{item.price}.00₪</p>
            </div>
            <Rating name="half-rating" defaultValue={2.5} precision={0.5} />
            <div className="add-to-cart">
              {role === "ADMIN" && (
                <>
                  <Link to={"update"}>
                    <button className="updatAndDel">UPDATE</button>
                  </Link>{" "}
                  <button
                    className="updatAndDel"
                    onClick={() => handleDelete(item._id)}
                  >
                    DELETE
                  </button>{" "}
                </>
              )}{" "}
              {role !== "ADMIN" && (
                <Link to={"" + item._id}>
                  {" "}
                  <button className="plus-minus">
                    <i
                      className="sh_m_sui_icon_addtocart_20px"
                      data-v-42b4c5fb=""
                    ></i>
                  </button>{" "}
                </Link>
              )}
            </div>
          </div>
        ))}

        <Outlet />
        {/* {message && (
          <Alert severity="success" style={{ marginBottom: "10px" }}>
            {message}
          </Alert>
        )} */}
        
      </div>

      <Pagination count={3} page={page} onChange={handlePageChange} />
    </>
  );
};

export default ProductList;

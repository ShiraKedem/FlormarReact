import React, { useState } from "react";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { VscAccount } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import "./NavBar.css";
import { Link } from "react-router-dom";
import { BiExit } from "react-icons/bi";
import { userOut } from "./features/user/userSlice";
import Badge from "@mui/material/Badge";
import MailIcon from "@mui/icons-material/Mail";
const NavBar = () => {
  const user = useSelector((state) => state.user.currentUser)?.userName;
  const role = useSelector((state) => state.user.currentUser)?.role;
  const count = useSelector((state) => state.order.count);
  const dispatch = useDispatch();
  const singOut = () => {
    dispatch(userOut());
    window.location.href = "/";
  };
  return (
    <>
      <div class="html-container">
        <div class="html-section">
          <div class="html-project">
            {role === "USER" && (
              <>
                <div class="navigation">
                  {" "}
                  <nav>
                    {" "}
                    <img className="img" src="/logo.jpg"></img>{" "}
                    <ul class="nav-type">
                      {" "}
                      <li>
                        <Link to="order" class="active">
                          {" "}
                          <Badge
                            color="secondary"
                            badgeContent={count}
                            showZero
                          >
                            <HiOutlineShoppingBag
                              style={{ fontSize: "1.5em" }}
                            />
                          </Badge>
                        </Link>
                      </li>{" "}
                      <li>
                        <Link to="/" class="active">
                          Home
                        </Link>
                      </li>
                      <li>
                        <Link to="product" class="active1">
                          product
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/"
                          className="active user-link"
                          onClick={singOut}
                        >
                          <div className="user-info">
                            {" "}
                            <span className="user-text">{user}</span>
                            <BiExit style={{ fontSize: "1.5em" }} />
                          </div>
                        </Link>
                      </li>
                    </ul>{" "}
                  </nav>
                </div>
              </>
            )}
            {role === "ADMIN" && (
              <div class="navigation">
                <nav>
                  {" "}
                  <img className="img" src="/logo.jpg"></img>
                  <ul class="nav-type">
                    <li>
                      <Link to="/" class="active">
                        Home
                      </Link>
                    </li>
                    <li>
                      <Link to="/allOrders" class="active">
                        allOrders
                      </Link>
                    </li>
                    <li>
                      <Link to="addProduct" class="active">
                        addProduct{" "}
                      </Link>
                    </li>{" "}
                    <li>
                      <Link to="product" class="active1">
                        products
                      </Link>
                    </li>
                    <li>
                      <Link to="/" class="active">
                        {" "}
                        Exit
                        <BiExit
                          style={{ fontSize: "1.4em" }}
                          onClick={singOut}
                        ></BiExit>{" "}
                      </Link>{" "}
                    </li>
                  </ul>{" "}
                </nav>
              </div>
            )}

            {role === undefined && (
              <div class="navigation">
                <nav>
                  {" "}
                  <img className="img" src="/logo.jpg"></img>
                  <ul class="nav-type">
                    <li>
                      <Link to="order" class="active">
                        <HiOutlineShoppingBag style={{ fontSize: "1.4em" }} />
                      </Link>
                    </li>{" "}
                    <li>
                      <Link to="/" class="active">
                        Home
                      </Link>
                    </li>
                    <li>
                      <Link to="product" class="active1">
                        product
                      </Link>
                    </li>
                    <li>
                      <Link to="/login" class="active">
                        {" "}
                        <VscAccount style={{ fontSize: "1.4em" }}></VscAccount>
                      </Link>{" "}
                    </li>
                  </ul>{" "}
                </nav>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default NavBar;

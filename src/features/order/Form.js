import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "./Form.css";
import { TextField, Button, Grid } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { addToOrder } from "./orderApi";
import { useNavigate } from "react-router-dom";
import { addToOrders } from "./orderSlice";
import { EmptyBasket } from "./orderSlice";
const CreditCardForm = () => {
  const basket = useSelector((state) => state.order.basket);
  const user = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  const minimalProduct = basket.map((product) => ({
    name: product.name,
    _id: product._id,
    countproduct: product.countproduct,
  }));

  const [message, setMessage] = useState("");

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await addToOrder(
        minimalProduct,
        data.address,
        false,
        user.token
      );
      setMessage("ההזמנה בוצעה בהצלחה");

      reset();
      localStorage.removeItem("basket");
      localStorage.removeItem("count");

      dispatch(EmptyBasket());
    } catch (error) {
      setMessage(error.response.data.message);
      console.error("Error details:", error);
    }
  };
  let navigate = useNavigate();

  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <h3>סיום הזמנה</h3>
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
      <TextField
        className="TextField"
        label="טלפון"
        variant="outlined"
        margin="normal"
        {...register("phoneNumber", {
          required: "שדה חובה",
          pattern: /^\d{10}$/,
        })}
        error={Boolean(errors.phoneNumber)}
        helperText={
          errors.phoneNumber?.type === "pattern"
            ? "מספר טלפון לא תקין"
            : errors.phoneNumber?.message
        }
      />

      <TextField
        className="TextField"
        label="כתובת"
        variant="outlined"
        margin="normal"
        {...register("address", { required: "שדה חובה" })}
        error={Boolean(errors.address)}
        helperText={errors.address?.message}
      />

      <Grid item xs={20} md={18}>
        <TextField
          className="TextField"
          label="מספר אשראי"
          variant="outlined"
          margin="normal"
          fullWidth
          {...register("creditCardNumber", {
            required: "שדה חובה",
            pattern: /^\d{16}$/,
          })}
          error={Boolean(errors.creditCardNumber)}
          helperText={
            errors.creditCardNumber?.type === "pattern"
              ? "מספר אשראי לא תקין"
              : errors.creditCardNumber?.message
          }
        />
      </Grid>
      <Grid item xs={2} md={18}>
        <TextField
          label="תוקף"
          variant="outlined"
          margin="normal"
          fullWidth
          {...register("expirationDate", {
            required: "שדה חובה",
            pattern: /^(0[1-9]|1[0-2])\/\d{2}$/,
          })}
          error={Boolean(errors.expirationDate)}
          helperText={
            errors.expirationDate?.type === "pattern"
              ? "תוקף לא תקין (MM/YY)"
              : errors.expirationDate?.message
          }
        />
      </Grid>
      <Button
        className="Button"
        type="submit"
        variant="contained"
        style={{ marginTop: "20px", backgroundColor: "black" }}
      >
        שליחה
      </Button>

      {message && <p>{message}</p>}
    </form>
  );
};

export default CreditCardForm;

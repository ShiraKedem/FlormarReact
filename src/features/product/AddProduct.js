import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Alert from "@mui/material/Alert";
import { addProduct } from "./productApi";
import { useSelector } from "react-redux";

const AddProduct = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [message, setMessage] = useState("");
  const user = useSelector((state) => state.user.currentUser);
  const onSubmit = async (data) => {
    try {
      // השינוי כאן: שמתי את השדות בפונקציה הנכונה שלך
      const response = await addProduct(
        data.name,
        data.Providercode,
        data.price,
        user.token
      );
      setMessage(response.data.message + "המוצר ונצר בהצלחה");

      reset();
    } catch (error) {
      setMessage(error.response.data.message);
      console.error("Error details:", error);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        margin: "2%",
      }}
    >
      <h2 style={{ fontFamily: "Arial, sans-serif", color: "black" }}>
        הוספת מוצר
      </h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{
          display: "flex",
          flexDirection: "column",
          padding: "20px",
          backgroundImage: `url(${process.env.PUBLIC_URL}/5.jpg)`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          height: "350px",
          backgroundColor: "white",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          borderRadius: "10px",
        }}
      >
        <TextField
          label="Name"
          variant="outlined"
          margin="normal"
          {...register("name", {
            required: { value: true, message: "שדה זה חובה" },
          })}
        />
        {errors.name && (
          <Alert severity="error" style={{ marginBottom: "10px" }}>
            {errors.name.message}
          </Alert>
        )}

        <TextField
          label="Providercode"
          variant="outlined"
          margin="normal"
          {...register("Providercode", {
            required: { value: true, message: "שדה זה חובה" },
          })}
        />
        {errors.Providercode && (
          <Alert severity="error" style={{ marginBottom: "10px" }}>
            {errors.Providercode.message}
          </Alert>
        )}

        <TextField
          label="Price"
          variant="outlined"
          margin="normal"
          {...register("price", {
            required: { value: true, message: "שדה זה חובה" },
            pattern: {
              value: /^\d+(\.\d{1,2})?$/,
              message: "מחיר לא חוקי",
            },
          })}
        />
        {errors.price && (
          <Alert severity="error" style={{ marginBottom: "10px" }}>
            {errors.price.message}
          </Alert>
        )}

        {message && (
          <Alert severity="success" style={{ marginBottom: "10px" }}>
            {message}
          </Alert>
        )}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          style={{ marginTop: "50px", backgroundColor: "black" }}
        >
          Add
        </Button>
      </form>
    </div>
  );
};

export default AddProduct;

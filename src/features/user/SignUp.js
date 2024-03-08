// SignUpForm.js

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Alert from "@mui/material/Alert";
import { addUser, login } from "./userApi"; // אני מניח שיש קובץ userApi.js באותו מדור
import "./SignUp.css";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { userIn } from "../user/userSlice";

const SignUp = () => {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [message, setMessage] = useState("");

  const onSubmit = async (data) => {
    try {
      const response = await addUser(data.email, data.password, data.userName);
      setMessage(" המשתמש נוסף בהצלחה!");
      const response2 = await login(data.email, data.password);
      window.location.href = "/";
      dispatch(userIn(response.data));
      reset();
    } catch (error) {
      setMessage(error.response.data.message);
      console.error("Error details:", error);
    }
  };

  return (
    <div className="all-form">
      <div className="imag-from">
        <img
          src="https://www.flormar.co.il/wp-content/plugins/flormar-popup/popups//img/f_pink.png"
          alt="Flormar"
        ></img>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{
          display: "flex",
          flexDirection: "column",
          maxWidth: "600px",
          padding: "25px",
        }}
      >
        <div className="text-Login">
          <h1> 🩷 הצטרפי אלינו</h1>
        </div>

        <TextField
          label="userName"
          variant="outlined"
          margin="dense"
          {...register("userName", {
            required: { value: true, message: "שדה זה חובה" },
            minLength: { value: 3, message: "שם משתמש קצר מידי" },
          })}
        />
        {errors.userName && (
          <Alert severity="error" style={{ marginBottom: "10px" }}>
            {errors.userName.message}
          </Alert>
        )}

        <TextField
          label="email"
          variant="outlined"
          margin="dense"
          {...register("email", {
            required: { value: true, message: "שדה זה חובה" },
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
              message: "כתובת דואר אלקטרוני לא חוקית",
            },
          })}
        />
        {errors.email && (
          <Alert severity="error" style={{ marginBottom: "10px" }}>
            {errors.email.message}
          </Alert>
        )}

        <TextField
          className="m"
          label="password"
          variant="outlined"
          margin="dense"
          type="password"
          {...register("password", {
            required: { value: true, message: "שדה זה חובה" },
            minLength: { value: 6, message: "סיסמה קצרה מידי" },
          })}
        />
        {errors.password && (
          <Alert severity="error" style={{ marginBottom: "10px" }}>
            {errors.password.message}
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
          style={{
            marginTop: "20px",
            backgroundColor: "black",
          }}
        >
          הרשם
        </Button>
      </form>
    </div>
  );
};

export default SignUp;

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Alert from "@mui/material/Alert";
import { login } from "./userApi"; // אני מניח שיש קובץ userApi.js באותו מדור
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userIn } from "../user/userSlice";

export const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [message, setMessage] = useState("");
  const [signUp, setSignUp] = useState(false);
  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    try {
      alert(data);
      const response = await login(data.email, data.password);
      setMessage(response.data.userName + " התחברת בהצלחה");
      dispatch(userIn(response.data));
      window.location.href = "/";

      reset();
    } catch (error) {
      setMessage(error.response.data.message);
      if (error.response.data.message === "User does not exist") {
        setSignUp(true);
      }

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
          padding: "20px",
        }}
      >
        <div className="text-Login">
          היי, איזה כיף שבאת :)
          <br />
          הצטרפי למועדון הצבעוני של פלורמר
          <br />
          <span>HAPPINESS IS YOUR COLOR</span>
        </div>

        <TextField
          style={{ width: "300px", marginLeft: "30px" }}
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
          style={{ width: "300px", marginLeft: "30px" }}
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
          color="primary"
          style={{
            width: "300px",
            marginLeft: "30px",
            marginTop: "38px",
            backgroundColor: "black",
          }}
        >
          Login
        </Button>
        {signUp && (
          <Link to="/signUp">
            <Button
              type="submit"
              variant="contained"
              color="primary"
              style={{
                width: "300px",
                marginLeft: "30px",
                marginTop: "38px",
                backgroundColor: "black",
              }}
            >
              signUp
            </Button>{" "}
          </Link>
        )}
      </form>
    </div>
  );
};

export default Login;

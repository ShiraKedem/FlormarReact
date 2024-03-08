import { useNavigate } from "react-router-dom";

const Update = () => {
  let navigate = useNavigate();
  return (
    <>
      <h1>עדכון מוצר</h1>
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
    </>
  );
};

export default Update;

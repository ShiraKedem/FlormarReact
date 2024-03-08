import axios from "axios";

let baseUrl = "http://localhost:4500/api/order/";
export const addToOrder = (orderDetails, address, isCameOut, token) => {
  const data = {
    orderDetails: orderDetails,
    address: address,
    isCameOut: isCameOut,
  };
  const headers = {
    headers: {
      "x-access-token": token,
    },
  };

  return axios.post(baseUrl, data, headers);
};

export const getAllOrders = (token) => {
  const headers = {
    headers: {
      "x-access-token": token,
    },
  };

  return axios.get(baseUrl, headers);
};
export const updateById = (id, token) => {
  const config = {
    headers: {
      "x-access-token": token,
    },
  };

  return axios.put(`${baseUrl}/${id}`, {}, config);
};

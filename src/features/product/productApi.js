import axios from "axios";
let baseUrl = "http://localhost:4500/api/product/";
export const getProducts = (page, perPage, serach) => {
  return axios.get(`${baseUrl}?page=${page}&perPage=${perPage}&txt=${serach}`);
};
export const getProductsById = (id) => {
  return axios.get(`${baseUrl}/${id}`);
};

export const addProduct = (name, Providercode, price, token) => {
  const data = {
    name: name,
    Providercode: Providercode,
    price: price,
  };
  const headers = {
    headers: {
      "x-access-token": token,
    },
  };

  return axios.post(baseUrl, data, headers);
};

export const deleteProduct = (id, token) => {
  const headers = {
    headers: {
      "x-access-token": token,
    },
  };
  return axios.delete(`${baseUrl}/${id}`, headers);
};

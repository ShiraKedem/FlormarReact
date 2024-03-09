import axios from "axios";

const baseUrl = "https://projectnode-2.onrender.com/api/user";

export const addUser = (email, password, userName) => {
  return axios.post(`${baseUrl}`, { email, password, userName });
};
export const login = (email, password) => {
  return axios.post(`${baseUrl}/login`, { email, password }); // Add / before login
};


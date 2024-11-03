import axios from "axios";

const BASE_URL = "http://localhost:8800/api/major";

const majorApi = {
  getAll: async () => {
    const response = await axios.get(BASE_URL);
    return response.data;
  },

  getLoad: async (ref) => {
    const response = await axios.get(`${BASE_URL}/params?id=${ref}`);
    return response.data;
  },

  search: async (value) => {
    const response = await axios.get(`${BASE_URL}/search?search=${value}`);
    return response.data;
  },

  create: async (values) => {
    const response = await axios.post(`${BASE_URL}/`, values);
    return response.data;
  },

  deleteById: async (id) => {
    const response = await axios.delete(`${BASE_URL}/?id=${id}`);
    return response.data;
  },
  edit: async (selectedItem, values) => {
    const response = await axios.put(`${BASE_URL}/?id=${selectedItem}`, values);
    return response.data;
  },
};

export default majorApi;

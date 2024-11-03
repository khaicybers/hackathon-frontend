import axios from "axios";

const BASE_URL = "http://localhost:8800/api/university";

const universityApi = {
  getWithParams: async (pageSize, currentPage) => {
    const response = await axios.get(
      `${BASE_URL}?pageSize=${pageSize}&currentPage=${currentPage}`
    );
    return response.data;
  },

  getById: async (id) => {
    const response = await axios.get(`${BASE_URL}/${id}`);
    return response.data;
  },

  getAdmissionInformation: async (id) => {
    const response = await axios.get(
      `${BASE_URL}/v1/admission-information?id=${id}`
    );
    return response.data;
  },

  getName: async () => {
    const response = await axios.get(`${BASE_URL}/v1/name`);
    return response.data;
  },

  suggest: async (value) => {
    console.log(value);
    const response = await axios.post(`${BASE_URL}/suggest`, value);
    return response.data;
  },

  searchAdmissionInformation: async (name) => {
    const response = await axios.get(
      `${BASE_URL}/v1/admission-information?name=${name}`
    );
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
  edit: async (id, values) => {
    const response = await axios.put(`${BASE_URL}/update/${id}`, values);
    return response.data;
  },
};

export default universityApi;

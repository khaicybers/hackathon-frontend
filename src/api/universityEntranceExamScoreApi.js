import axios from "axios";

const BASE_URL = "http://localhost:8800/api/uees";

const universityEntranceExamScoreApi = {
  getWithParams: async (pageSize, currentPage) => {
    const response = await axios.get(
      `${BASE_URL}/panigation?pageSize=${pageSize}&currentPage=${currentPage}`
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

export default universityEntranceExamScoreApi;

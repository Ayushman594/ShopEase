import axios from "axios";

const API_URL = "http://localhost:8080";

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

const Allservices = {
  getAllServices: async (endpoint) => {
    const response = await api.get(`/${endpoint}`);

    return response.data;
  },

  getServiceById: async (endpoint, id) => {
    const response = await api.get(`/${endpoint}/${id}`);

    return response.data;
  },

  addService: async (endpoint, serviceData) => {
    const response = await api.post(`/${endpoint}`, serviceData);

    return response.data;
  },

  updateService: async (endpoint, id, updatedData) => {
    const response = await api.put(`/${endpoint}/${id}`, updatedData);

    return response.data;
  },

  searchServices: async (endpoint, query) => {
    const response = await api.get(`/${endpoint}?q=${query}`);

    return response.data;
  },

  deleteService: async (endpoint, id) => {
    const response = await api.delete(`/${endpoint}/${id}`);

    return response.data;
  },
  addToCart: async (productId, quantity = 1) => {
    const response = await api.post(
      `/cart/add?productId=${productId}&quantity=${quantity}`,
    );

    return response.data;
  },
  clearCart: async () => {
    const response = await api.delete("/cart/clear");
    return response.data;
  },
  updateCartQuantity: async (cartItemId, quantity) => {
    const response = await api.put(
      `/cart/item/${cartItemId}?quantity=${quantity}`,
    );

    return response.data;
  },
  verifyPayment: async (paymentData) => {
    const response = await api.post(
        "/orders/verify-payment",
        paymentData
    );
    return response.data;
},
  createOrder: async () => {
    const response = await api.post('/orders/create');
    return response.data;
},
};

export default Allservices;

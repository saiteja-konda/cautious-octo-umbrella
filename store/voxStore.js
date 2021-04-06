import { action, thunk, computed } from "easy-peasy";
import axios from "axios";
import { baseUrl, authUrl } from "../utils/urlConfig";
import { store } from "./store";
import products from "../pages/admin/products";

export const voxStore = {
  products: [],
  product: {},
  cart: [],
  token: {},
  setProducts: action((state, data) => {
    state.products = data;
  }),

  getProducts: thunk(async (actions) => {
    axios
      .get(`${baseUrl}/products`)
      .then((res) => {
        actions.setProducts(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }),

  setProduct: action((state, data) => {
    state.product = data;
  }),

  getProduct: thunk(async (actions, id) => {
    axios
      .get(`${baseUrl}/products/${id}`)
      .then((res) => {
        actions.setProduct(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }),
  performProductUpdate: action((state, id, payload) => {
    state.products.push(payload);
  }),
  updateProduct: thunk(async (actions, payload) => {
    axios
      // console.log(payload);
      .put(`${baseUrl}/products/${payload.id}`, payload)
      .then((res) => actions.performProductUpdate(res.data));
  }),
  performDeleteProduct: action((state, id) => {
    const newList = state.products.filter((product) => product.id != id);
    state.products = newList;
  }),

  deleteProduct: thunk(async (actions, id) => {
    axios.delete(`${baseUrl}/products/${id}`).then((res) => {
      actions.performDeleteProduct(id);
    });
  }),

  signup: thunk(async (actions, payload) => {
    axios
      .post(`${authUrl}/users/register`, payload)
      .then((res) => console.log(res.data));
  }),
  setToken: action((state, data) => {
    state.token = data;
    localStorage.setItem("token", JSON.stringify(data.token));
  }),
  login: thunk(async (actions, payload) => {
    axios.post(`${authUrl}/users/login`, payload).then((res) => {
      actions.setToken(res.data);
    });
  }),
  setToCart: action((state, payload) => {
    if (state.cart.includes(payload)) state.cart.push(payload);
  }),

  addToCart: thunk(async (actions, id) => {
    actions.setToCart(id);
  }),
};

export default voxStore;

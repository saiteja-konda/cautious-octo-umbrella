import { action, thunk, computed } from "easy-peasy";
import axios from "axios";
import { baseUrl, authUrl } from "../utils/urlConfig";

export const voxStore = {
  products: [],
  product: {},
  categories: [],
  category: {},
  cart: [],
  token: {},

  //Products

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
  performProductUpdate: action((state, data) => {
    const newList = state.products.filter((product) => product.id != data.id);
    newList.push(data);
    state.products = newList;
  }),
  updateProduct: thunk(async (actions, payload) => {
    axios
      .put(`${baseUrl}/products/${payload.id}`, payload)
      .then((res) => actions.performProductUpdate(res.data))
      .catch((err) => {
        console.error(err);
      });
  }),
  performDeleteProduct: action((state, id) => {
    const newList = state.products.filter((product) => product.id != id);
    state.products = newList;
  }),

  deleteProduct: thunk(async (actions, id) => {
    axios
      .delete(`${baseUrl}/products/${id}`)
      .then((res) => {
        actions.performDeleteProduct(id);
      })
      .catch((err) => {
        console.error(err);
      });
  }),

  // Category
  setCategories: action((state, data) => {
    state.categories = data;
  }),
  getCategories: thunk(async (actions, id) => {
    axios
      .get(`${baseUrl}/categories`)
      .then((res) => actions.setCategories(res.data))
      .catch((err) => {
        console.error(err);
      });
  }),
  setCategory: action((state, data) => {
    state.category = data;
  }),
  getCategory: thunk(async (actions, id) => {
    axios
      .get(`${baseUrl}/categories/${id}`)
      .then((res) => {
        actions.setCategory(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }),
  addCategory: action((state, payload) => {
    state.categories.push(payload);
  }),
  createCategory: thunk(async (actions, payload) => {
    axios
      .post(`${baseUrl}/categories`, payload)
      .then((res) => actions.addCategory(res.data))
      .catch((err) => {
        console.log(err);
      });
  }),

  performCategoryDelete: action((state, id) => {
    const newList = state.categories.filter((category) => category.id != id);
    state.categories = newList;
  }),

  performCategoryUpdate: action((state, data) => {
    const newList = state.categories.filter(
      (category) => category.id != data.id
    );
    newList.push(data);
    state.categories = newList;
  }),

  updateCategory: thunk(async (actions, payload) => {
    axios
      .put(`${baseUrl}/categories/${payload.id}`, payload)
      .then((res) => actions.performCategoryUpdate(res.data))
      .catch((err) => {
        console.log(err);
      });
  }),

  deleteCategory: thunk(async (actions, id) => {
    axios
      .delete(`${baseUrl}/categories/${id}`)
      .then((res) => actions.performCategoryDelete(id))
      .catch((err) => {
        console.error(err);
      });
  }),
  // Authentication

  signup: thunk(async (actions, payload) => {
    axios
      .post(`${authUrl}/users/register`, payload)
      .then((res) => console.log(res.data))
      .catch((err) => {
        console.error(err);
      });
  }),
  setToken: action((state, data) => {
    state.token = data;
    localStorage.setItem("token", JSON.stringify(data.token));
  }),
  login: thunk(async (actions, payload) => {
    axios
      .post(`${authUrl}/users/login`, payload)
      .then((res) => {
        actions.setToken(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }),

  //Cart
  len: computed((state) => state.cart.length),
  setToCart: action((state, payload) => {
    if (!state.cart.find((prod) => prod.id === payload.id)) {
      state.cart.push(payload);
    }
  }),

  addToCart: thunk(async (actions, id) => {
    actions.setToCart(id);
  }),
};

export default voxStore;

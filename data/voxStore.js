import { action, thunk, computed } from "easy-peasy";
import axios from "axios";
import { baseUrl, authUrl } from "../utils/urlConfig";
import shortid from "shortid";
import jwt_decode from "jwt-decode";

export const voxStore = {
  products: [],
  product: {},
  categories: [{ id: "", name: "All Categories" }],
  category: {},
  cart: {
    id: "false",
    lineItems: [],
  },
  token: {},
  error: {},
  tempUrl: "",
  loading: false,
  admin: false,
  site: {},
  userDetails: {},
  addresses: [],
  order: {
    orderDetails: {},
    paymentDetails: {},
  },
  orders: [],

  // Order
  getOrder: action((state, payload) => {
    state.order.orderDetails = payload;
  }),

  // setPaymentDetails: action((state, payload) => {
  //   state.order.paymentDetails = payload;
  // }),
  // getPaymentDetails: thunk(async (actions, payload) => {
  //   actions.setPaymentDetails(payload);
  // }),

  // Token

  setUserDetails: action((state, payload) => {
    const {
      username,
      fullName,
      phoneNumber,
      dateOfBirth,
      gender,
      memberSince,
      id,
    } = payload;
    state.userDetails = {
      username,
      fullName,
      phoneNumber,
      dateOfBirth,
      gender,
      memberSince,
      id,
    };
  }),
  getToken: thunk(async (actions, payload) => {
    const id = jwt_decode(JSON.stringify(payload)).id;
    axios
      .get(`${authUrl}/users/details/${id}`)
      .then((res) => actions.setUserDetails(res.data));
  }),

  removeUser: action((state) => {
    state.userDetails = {};
  }),

  // Address

  setAddresses: action((state, payload) => {
    state.addresses = payload;
  }),
  getAddresses: thunk(async (actions, payload) => {
    axios
      .get(`${authUrl}/address/by/${payload}`)
      .then((res) => {
        actions.setAddresses(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }),

  addAddress: action((state, payload) => {
    state.addresses.push(payload);
  }),

  postAddress: thunk(async (actions, payload) => {
    axios
      .post(`${authUrl}/address`, payload)
      .then((res) => {
        actions.addAddress(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }),

  removeAddress: action((state, payload) => {
    const newList = state.addresses.filter((address) => address.id != payload);
    state.addresses = newList;
    console.log(newList);
  }),

  deleteAddress: thunk(async (actions, payload) => {
    axios
      .delete(`${authUrl}/address/${payload.id}`)
      .then((res) => {
        actions.removeAddress(payload.id);
      })
      .catch((err) => {
        console.error(err);
      });
    actions.removeAddress(payload.id);
  }),

  // Admin

  setSite: action((state, payload) => {
    state.site = payload;
  }),
  getSite: thunk(async (actions) => {
    axios.get(`${baseUrl}/site`).then((res) => actions.setSite(res.data));
  }),

  updateSite: action((state, payload) => {
    state.site = payload;
  }),
  siteUpdate: thunk(async (actions, payload) => {
    axios
      .put(`${baseUrl}/site`, payload)
      .then((res) => {
        actions.res(payload);
      })
      .catch((err) => console.log(err));
  }),

  setAdmin: action((state, payload) => {
    state.admin = payload;
  }),

  // getAdmin: thunk(async (actions, payload) => {
  //   actions.setAdmin(localStorage.getItem("admin"));
  // }),

  // TempUrl

  getUrl: action((state, payload) => {
    state.tempUrl = payload;
  }),

  setUrl: thunk(async (actions, payload) => {
    actions.getUrl(payload);
  }),

  // Error

  setError: action((state, error) => {
    if (error.hasError === "no") {
      state.error = "no";
    } else {
      state.error = "yes";
    }
  }),

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
    state.categories = [{ id: "", name: "All Categories " }, ...data];
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
      .then((res) => {
        actions.addCategory(res.data);
      })
      .catch((err) => {
        window.alert(`Category with name ${payload.name} already exists`);
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
      // .then((res) => console.log(res.data))
      .catch((err) => {
        console.error(err);
      });
  }),

  // setToken: action((state, data) => {
  //   state.token = data;
  //   localStorage.setItem("token", JSON.stringify(data.token));
  // }),

  login: thunk(async (actions, payload) => {
    axios
      .post(`${authUrl}/users/login`, payload)
      .then((res) => {
        actions.setToken(res.data);
      })
      .then(() => {
        actions.setError({ hasError: "no" });
      })
      .catch((err) => {
        actions.setError({
          hasError: "yes",
        });
      });
  }),

  //Cart
  len: computed((state) => state.cart.lineItems.length),

  setToCart: action((state, payload) => {
    if (state.cart.id === "false") {
      state.cart.id = shortid();
    }
    if (!state.cart.lineItems.find((prod) => prod.id === payload.id)) {
      payload.quantity = 1;
      state.cart.lineItems.push(payload);
    }
  }),
  PriceChanger: action((state, payload) => {
    state.cart.lineItems.find((o) => o.id === payload.id).price =
      payload.newPrice;
  }),
  changePrice: thunk((actions, payload) => {
    actions.PriceChanger(payload);
  }),

  deleteFromCart: action((state, id) => {
    const newList = state.cart.lineItems.filter((product) => product.id != id);
    state.cart.lineItems = newList;
  }),

  increaseProductQty: action((state, id) => {
    state.cart.lineItems.forEach((product) => {
      if (product.id === id) {
        product.quantity = product.quantity + 1;
      }
    });
  }),
  decreaseProductQty: action((state, id) => {
    state.cart.lineItems.forEach((product) => {
      if (product.id === id && product.quantity >= 0) {
        product.quantity = product.quantity - 1;
      }
    });
  }),
  addToCart: thunk(async (actions, id) => {
    actions.setToCart(id);
  }),
  removeFromCart: thunk(async (actions, id) => {
    actions.deleteFromCart(id);
  }),
  increase: thunk(async (actions, product) => {
    actions.increaseProductQty(product.id);
  }),
  decrease: thunk(async (actions, product) => {
    if (product.quantity === 1) {
      actions.deleteFromCart(product.id);
    } else actions.decreaseProductQty(product.id);
  }),

  ResetOrder: action((state) => {
    state.order = {
      orderDetails: {},
      paymentDetails: {},
    };
  }),

  ResetCart: action((state) => {
    state.cart = {
      id: "false",
      lineItems: [],
    };
  }),
};

export default voxStore;

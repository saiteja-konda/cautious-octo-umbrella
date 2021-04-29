import { action, thunk, computed } from "easy-peasy";
import axios from "axios";
import { baseUrl } from "../utils/urlConfig";
export const roxStore = {
  orders: [],
  Promos: [],

  setPromos: action((state, payload) => {
    state.Promos = payload.variants;
  }),
  addNewPromo: action((state, payload) => {
    state.Promos.push(payload);
  }),
  getNewPromo: thunk(async (actions, payload) => {
    actions.addNewPromo(payload);
  }),
  getPromos: thunk(async (actions) => {
    axios
      .get(`${baseUrl}/promo`)
      .then((res) => {
        actions.setPromos(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }),

  // Promos

  setOrders: action((state, payload) => {
    state.orders = payload;
  }),
  getOrders: thunk(async (actions) => {
    axios
      .get(`${baseUrl}/orders`)
      .then((res) => {
        actions.setOrders(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }),
};
export default roxStore;

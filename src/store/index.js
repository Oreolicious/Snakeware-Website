import { createStore } from "vuex";

const axios = require("axios");

export default createStore({
  state: {
    products: [],
    filters: {},
    sortName: "",
    total: 0,
  },
  mutations: {
    FETCH_PRODUCTS(state, products) {
      state.products = products;
    },
    CHANGE_QUANTITY(state, payload) {
      const product = state.products.find(
        (product) => product.ProductID === payload.id
      );
      product.quantity = payload.amount;
    },
    UPDATE_TOTAL(state) {
      const cost = state.products.reduce((total, product) => {
        return total + product.quantity * product.ProductPrices[0].Price;
      }, 0);
      state.total = cost;
    },
    SORT_PRODUCTS(state, sortFunction) {
      state.products.sort(sortFunction);
    },
    CHANGE_SORT_NAME(state, name) {
      state.sortName = name;
    },
    UPDATE_ITEM_FILTER(state, payload) {
      if (state.filters[payload.key] === undefined)
        state.filters[payload.key] = {};
      state.filters[payload.key][payload.value] = payload.filter;
    },
    UPDATE_LIST_FILTER(state, payload) {
      if (state.filters[payload.list] === undefined)
        state.filters[payload.list] = {};
      if (state.filters[payload.list][payload.key] === undefined)
        state.filters[payload.list][payload.key] = {};
      state.filters[payload.list][payload.key][payload.value] = payload.filter;
    },
    DELETE_ITEM_FILTER(state, payload) {
      delete state.filters[payload.key][payload.value];
      if (Object.keys(state.filters[payload.key]).length === 0)
        delete state.filters[payload.key];
    },
    DELETE_LIST_FILTER(state, payload) {
      delete state.filters[payload.list][payload.key][payload.value];
      if (Object.keys(state.filters[payload.list][payload.key]).length === 0)
        delete state.filters[payload.list][payload.key];
      if (Object.keys(state.filters[payload.list]).length === 0)
        delete state.filters[payload.list];
    },
    CLEAR_ALL_FILTERS(state) {
      state.filters = {};
    },
  },
  actions: {
    fetchProducts({ commit, state }) {
      return new Promise((resolve, reject) => {
        if (state.products.length) {
          resolve();
        } else {
          axios
            .get(
              "https://a1-api.detailresult.nl/v1/assortmentcache/group/281/104?api_key=6d3a42a3-6d93-4f98-838d-bcc0ab2307fd"
            )
            .then((response) => {
              for (let i = 0; i < response.data.length; i++) {
                response.data[i].quantity = 0;
              }
              commit("FETCH_PRODUCTS", response.data);

              resolve();
            })
            .catch((error) => {
              console.log(error.statusText);
              reject();
            });
        }
      });
    },
    changeQuantity({ commit }, payload) {
      commit("CHANGE_QUANTITY", payload);
      commit("UPDATE_TOTAL");
    },
    sortProductsAlphabetically({ commit }) {
      const sortFunction = (a, b) => {
        const textA = a.MainDescription.toUpperCase();
        const textB = b.MainDescription.toUpperCase();
        return textA < textB ? -1 : textA > textB ? 1 : 0;
      };
      commit("SORT_PRODUCTS", sortFunction);
      commit("CHANGE_SORT_NAME", "None");
    },
    sortProductsPriceAscending({ commit }) {
      const sortFunction = (a, b) => {
        const priceA = a.ProductPrices[0].Price;
        const priceB = b.ProductPrices[0].Price;
        return priceA < priceB ? -1 : priceA > priceB ? 1 : 0;
      };
      commit("SORT_PRODUCTS", sortFunction);
      commit("CHANGE_SORT_NAME", "Oplopend");
    },
    sortProductsPriceDescending({ commit }) {
      const sortFunction = (a, b) => {
        const priceA = a.ProductPrices[0].Price;
        const priceB = b.ProductPrices[0].Price;
        return priceA > priceB ? -1 : priceA < priceB ? 1 : 0;
      };
      commit("SORT_PRODUCTS", sortFunction);
      commit("CHANGE_SORT_NAME", "Aflopend");
    },
    updateItemFilter({ commit }, payload) {
      payload.filter = (product) => {
        return product[payload.key] === payload.value;
      };
      commit("UPDATE_ITEM_FILTER", payload);
    },
    updateListFilter({ commit }, payload) {
      payload.filter = (product) => {
        return product[payload.list].some(
          (e) => e[payload.key] === payload.value
        );
      };
      commit("UPDATE_LIST_FILTER", payload);
    },
    deleteItemFilter({ commit }, payload) {
      commit("DELETE_ITEM_FILTER", payload);
    },
    deleteListFilter({ commit }, payload) {
      commit("DELETE_LIST_FILTER", payload);
    },
    clearAllFilters({ commit }) {
      commit("CLEAR_ALL_FILTERS");
    },
  },
  modules: {},
  getters: {
    getProductById: (state) => (id) => {
      return state.products.find((product) => product.ProductID === id);
    },
    getProductsAlphabetically(state) {
      const productCopy = [...state.products];
      return productCopy.sort((a, b) => {
        const textA = a.MainDescription.toUpperCase();
        const textB = b.MainDescription.toUpperCase();
        return textA < textB ? -1 : textA > textB ? 1 : 0;
      });
    },
    getBrands(state) {
      const brands = [];
      state.products.forEach((product) => {
        if (product.Brand && brands.indexOf(product.Brand) == -1)
          brands.push(product.Brand);
      });
      return brands.sort((a, b) => {
        const textA = a.toUpperCase();
        const textB = b.toUpperCase();
        return textA < textB ? -1 : textA > textB ? 1 : 0;
      });
    },
    getWebSubGroups(state) {
      const WebSubGroups = [];
      state.products.forEach((product) => {
        product.WebSubGroups.forEach((webSubGroup) => {
          if (WebSubGroups.indexOf(webSubGroup.Description) == -1)
            WebSubGroups.push(webSubGroup.Description);
        });
      });
      return WebSubGroups.sort((a, b) => {
        const textA = a.toUpperCase();
        const textB = b.toUpperCase();
        return textA < textB ? -1 : textA > textB ? 1 : 0;
      });
    },
    getProductOffers(state) {
      const ProductOffersIds = [];
      const ProductOffers = [];
      state.products.forEach((product) => {
        product.ProductOffers.forEach((productOffer) => {
          if (ProductOffersIds.indexOf(productOffer.OfferID) == -1) {
            ProductOffers.push(productOffer.Offer);
            ProductOffersIds.push(productOffer.OfferID);
          }
        });
      });
      return ProductOffers.sort((a, b) => {
        const textA = a.TextPriceSign.toUpperCase();
        const textB = b.TextPriceSign.toUpperCase();
        return textA < textB ? -1 : textA > textB ? 1 : 0;
      });
    },
    getFilteredProducts(state) {
      return state.products.filter((product) => {
        let total = true;
        for (const list of Object.values(state.filters)) {
          let correct = false;
          for (const filter of Object.values(list)) {
            if (typeof filter === "function") {
              if (filter(product)) correct = true;
            } else {
              for (const func of Object.values(filter)) {
                if (func(product)) correct = true;
              }
            }
          }
          total = total && correct;
        }
        return total;
      });
    },
  },
});

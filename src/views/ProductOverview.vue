<template>
  <div class="home">
    <div class="filters">
      <div class="filtercategory">
        <button
          class="selection-expander"
          v-on:click="brands_expanded = !brands_expanded"
        >
          Merk
        </button>
        <hr />
        <div
          class="selection"
          :style="{ display: brands_expanded ? 'flex' : 'none' }"
        >
          <label
            class="dropdown-option"
            v-for="brand in this.$store.getters.getBrands"
            v-bind:key="brand"
          >
            <input
              type="checkbox"
              name="brand"
              v-bind:value="brand"
              v-on:click="updateItemFilter('Brand', brand, $event)"
            />
            {{ brand }}
          </label>
        </div>
      </div>
      <div class="filtercategory">
        <button
          class="selection-expander"
          v-on:click="websubgroups_expanded = !websubgroups_expanded"
        >
          Categorie
        </button>
        <hr />
        <div
          class="selection"
          :style="{ display: websubgroups_expanded ? 'flex' : 'none' }"
        >
          <label
            class="dropdown-option"
            v-for="webSubGroup in this.$store.getters.getWebSubGroups"
            v-bind:key="webSubGroup"
          >
            <input
              type="checkbox"
              name="webSubGroup"
              v-bind:value="webSubGroup"
              v-on:click="
                updateListFilter(
                  'WebSubGroups',
                  'Description',
                  webSubGroup,
                  $event
                )
              "
            />
            {{ webSubGroup }}
          </label>
        </div>
      </div>
      <div class="filtercategory">
        <button
          class="selection-expander"
          v-on:click="productoffers_expanded = !productoffers_expanded"
        >
          Aanbieding
        </button>
        <hr />
        <div
          class="selection"
          :style="{ display: productoffers_expanded ? 'flex' : 'none' }"
        >
          <label
            class="dropdown-option"
            v-for="productOffer in this.$store.getters.getProductOffers"
            v-bind:key="productOffer"
          >
            <input
              type="checkbox"
              name="productOffers"
              v-bind:value="productOffer"
              v-on:click="
                updateListFilter(
                  'ProductOffers',
                  'OfferID',
                  productOffer.OfferID,
                  $event
                )
              "
            />
            {{ productOffer.TextPriceSign + " €" + productOffer.OfferPrice }}
          </label>
        </div>
      </div>
      <div class="filtercategory">
        <button
          class="selection-expander"
          v-on:click="sorting_expanded = !sorting_expanded"
        >
          Sorteren
        </button>
        <hr />
        <div
          class="selection"
          :style="{ display: sorting_expanded ? 'flex' : 'none' }"
        >
          <label
            class="dropdown-option"
            v-for="productOffer in this.$store.getters.getProductOffers"
            v-bind:key="productOffer"
          >
            <input type="radio" v-model="sort" value="0" />
            Alphabetisch
          </label>
          <label
            class="dropdown-option"
            v-for="productOffer in this.$store.getters.getProductOffers"
            v-bind:key="productOffer"
          >
            <input type="radio" v-model="sort" value="1" />
            Prijs oplopend
          </label>
          <label
            class="dropdown-option"
            v-for="productOffer in this.$store.getters.getProductOffers"
            v-bind:key="productOffer"
          >
            <input type="radio" v-model="sort" value="2" />
            Prijs dalend
          </label>
        </div>
      </div>
    </div>
    <div class="products">
      <ProductCard
        v-for="product in this.$store.getters.getFilteredProducts"
        v-bind:product="product"
        v-bind:key="product.ProductID"
      ></ProductCard>
    </div>
  </div>
</template>

<script>
import ProductCard from "@/components/ProductCard.vue";
import anime from "animejs/lib/anime.es.js";

export default {
  name: "ProductOverview",
  created() {
    this.$store.dispatch("fetchProducts").then(() => {
      this.$store.dispatch("sortProductsAlphabetically");
      this.$store.dispatch("clearAllFilters");
    });
  },
  updated() {
    if (!this.loaded) {
      setTimeout(() => {
        anime({
          targets: ".product",
          translateY: [200, 0],
          opacity: [0, 100],
          delay: anime.stagger(50, { easing: "easeOutQuad" }),
        });
      }, 200);
      this.loaded = true;
    }
  },
  data() {
    return {
      brands_expanded: false,
      websubgroups_expanded: false,
      productoffers_expanded: false,
      sorting_expanded: false,
      sort: 0,
      loaded: false,
    };
  },
  methods: {
    updateItemFilter(key, value, event) {
      if (event.target.checked) {
        this.$store.dispatch("updateItemFilter", { key: key, value: value });
      } else {
        this.$store.dispatch("deleteItemFilter", { key: key, value: value });
      }
    },
    updateListFilter(list, key, value, event) {
      if (event.target.checked) {
        this.$store.dispatch("updateListFilter", {
          list: list,
          key: key,
          value: value,
        });
      } else {
        this.$store.dispatch("deleteListFilter", {
          list: list,
          key: key,
          value: value,
        });
      }
    },
  },
  watch: {
    sort: function (newValue) {
      switch (newValue) {
        case "1":
          this.$store.dispatch("sortProductsPriceAscending");
          break;
        case "2":
          this.$store.dispatch("sortProductsPriceDescending");
          break;
        default:
          this.$store.dispatch("sortProductsAlphabetically");
      }
    },
  },
  components: {
    ProductCard,
  },
};
</script>

<style scoped>
.home {
  display: flex;
  justify-content: center;
  overflow: hidden;
}
.products {
  display: grid;
  grid-template-columns: repeat(auto-fill, 18.7em);
  max-width: 1200px;
  justify-content: center;
}
.selection {
  text-align: left;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: white;
  white-space: nowrap;
}
.filtercategory {
  display: flex;
  width: 100%;
  flex-direction: column;
  position: relative;
}
.selection-expander {
  color: black;
  font-weight: 600;
  font-size: 1em;
  border: none;
  text-align: left;
  background: white;
  margin: 0.5em 0 0.5em 0;
}
.filters {
  display: flex;
  max-width: 300px;
  width: 100%;
  align-items: flex-start;
  flex-direction: column;
}
hr {
  margin: 0;
  width: 100%;
}
label {
  font-weight: 300;
  font-size: 1em;
  color: rgb(61, 61, 61);
}
@media (max-width: 1450px) {
  .home {
    flex-direction: column;
  }
  .products {
    margin: auto;
  }
  .filters {
    width: 100%;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    text-align: center;
    margin: auto;
  }
  .selection-expander {
    text-align: center;
  }
}
@media (max-width: 1200px) {
  .products {
    margin: 0;
  }
}
</style>

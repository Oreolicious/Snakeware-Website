<template>
  <div class="product clearfix">
    <router-link v-bind:to="'/product/' + product.ProductID">
      <img v-bind:src="product.ProductPictures[0].Url + `?width=235`" alt="" />
      <div class="information">
        <h3 class="name">{{ product.MainDescription }}</h3>
        <div class="pricing">
          <div class="price">
            <h3 class="euros">
              {{ String(product.ProductPrices[0].Price).split(".")[0] + "." }}
            </h3>
            <h3 class="cents">
              {{ String(product.ProductPrices[0].Price).split(".")[1] }}
            </h3>
          </div>
          <h4 class="content">{{ product.CommercialContent }}</h4>
        </div>
      </div>
    </router-link>
    <div class="counter">
      <button v-on:click="quantity++" id="plus">+</button>
      <button
        v-on:click="quantity--"
        :style="{ visibility: quantity > 0 ? 'visible' : 'hidden' }"
        id="minus"
      >
        -
      </button>
      <input
        type="number"
        min="0"
        oninput="this.value = Math.abs(this.value)"
        v-model="quantity"
        class="amount"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "ProductCard",
  props: {
    product: Object,
  },
  computed: {
    quantity: {
      get() {
        return this.$store.getters.getProductById(this.product.ProductID)
          .quantity;
      },
      set(newValue) {
        this.$store.dispatch("changeQuantity", {
          id: this.product.ProductID,
          amount: Math.abs(newValue),
        });
      },
    },
  },
};
</script>

<style scoped>
.product {
  max-width: 20em;
  flex-basis: 14.7em;
  padding: 2em;
  opacity: 0;
}
a {
  text-decoration: none;
  color: black;
}
.product img {
  width: 100%;
}
.information {
  display: flex;
  align-items: top;
}
.name {
  margin-right: auto;
  font-weight: 400;
  padding-right: 1em;
  text-align: left;
  font-size: 0.9em;
}
.pricing {
  margin-left: auto;
}
.price {
  display: flex;
  align-items: center;
  justify-content: right;
  font-weight: 500;
}
.price h3 {
  margin-bottom: 0;
  margin-top: 0.63em;
}
.cents {
  font-size: 0.8em;
}
.euros {
  font-size: 1.3em;
}
.content {
  margin-top: 0;
  font-weight: 300;
  font-size: 0.75em;
  text-align: right;
  color: rgb(97, 97, 97);
}
button {
  border-radius: 50%;
  width: 1.6em;
  height: 1.6em;
  font-size: 1.3em;
  border: none;
  background-color: #64b39b;
  color: white;
  font-weight: 600;
  text-align: center;
}
button:hover {
  cursor: pointer;
}
#plus {
  float: right;
}
#minus {
  float: left;
}
.counter {
  height: 2.1em;
  line-height: 2.1em;
  margin-top: 2em;
}
.amount {
  text-align: center;
  font-weight: 400;
  font-size: 1em;
  width: 4em;
  height: 1.6em;
  overflow: hidden;
  border: none;
  resize: none;
}
</style>

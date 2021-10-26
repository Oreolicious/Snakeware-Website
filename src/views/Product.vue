<template>
  <div class="product">
    <div class="picture">
      <img v-bind:src="product.ProductPictures[0].Url" alt="" />
    </div>
    <div class="information">
      <h1>{{ product.MainDescription }}</h1>
      <p>{{ productIngredients }}</p>

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
      <div class="counter">
        <button v-on:click="quantity++" id="plus">+</button>
        <button v-on:click="quantity > 0 ? quantity-- : ''" id="minus">
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
  </div>
</template>

<script>
export default {
  name: "Product",
  created() {
    this.$store.dispatch("fetchProducts").then(() => {
      this.product = this.$store.getters.getProductById(
        parseInt(this.$route.params.id)
      );
      this.count = this.product.quantity;
    });
  },
  data() {
    return {
      count: 0,
      product: {},
    };
  },
  computed: {
    productIngredients() {
      return this.product.ProductDeclarations.length
        ? this.product.ProductDeclarations[0].ProductIngredients[0].Text
        : "Ingrediënten: Er zijn geen ingrediënten voor dit product beschikbaar gesteld";
    },
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
  display: flex;
  align-items: stretch;
  flex: 1;
}
.picture {
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  width: 50%;
}
.information {
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.information h1 {
  font-weight: 600;
  font-size: 2.6em;
}
.information p {
  padding: 0em 5em 1em 5em;
  text-align: justify;
  text-justify: inter-word;
}
img {
  max-width: 800px;
  width: 100%;
  margin: auto;
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
  max-width: 400px;
  width: 100%;
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
.price {
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
}
.price h3 {
  margin-bottom: 0;
  margin-top: 0.63em;
}
.cents {
  font-size: 1.2em;
}
.euros {
  font-size: 2em;
}
.content {
  margin-top: 0;
  font-weight: 300;
  font-size: 0.9em;
  text-align: center;
  color: rgb(97, 97, 97);
}
@media (max-width: 1300px) {
  .product {
    flex-direction: column;
  }
  .information {
    width: 100%;
  }
  .picture {
    width: 75%;
    margin: auto;
  }
  .information p {
    padding: 0 2em 1em 2em;
    font-size: 1.05em;
    text-justify: inter-character;
  }
  .information h1 {
    font-size: 2.4em;
  }
}
@media (max-width: 800px) {
  .information p {
    font-size: 0.8em;
  }
  .information h1 {
    font-size: 2em;
  }
}
</style>

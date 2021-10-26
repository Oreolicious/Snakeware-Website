<template>
  <div class="cart">
    <h4 class="total">{{ total }}</h4>
    <img src="@/assets/shopping-cart.svg" alt="" />
  </div>
</template>

<script>
export default {
  name: "Cart",
  computed: {
    total: {
      get() {
        return "€" + this.$store.state.total.toFixed(2);
      },
    },
  },
};
</script>

<style scoped>
.cart {
  display: flex;
  border: 1px solid #d4d4d4;
  border-radius: 2em;
  padding: 0.6em 1.8em 0.6em 1.8em;
  width: 7em;
}
h4 {
  color: black;
  font-weight: 400;
  margin: 0;
}
img {
  margin-left: auto;
  filter: invert(76%) sepia(22%) saturate(678%) hue-rotate(111deg)
    brightness(82%) contrast(84%);
}
</style>

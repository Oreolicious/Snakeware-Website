<template>
  <nav>
    <router-link to="/">Producten</router-link>
    <Cart></Cart>
  </nav>
  <router-view />
</template>

<script>
import Cart from "@/components/Cart.vue";

export default {
  components: {
    Cart,
  },
};
</script>

<style>
* {
  font-family: "Poppins", sans-serif;
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

nav {
  border-bottom: 1px solid #d4d4d4;
  display: flex;
  justify-content: left;
  align-items: center;
  margin-bottom: 2em;
  padding: 0 2em 0 2em;
}

nav a {
  font-weight: 500;
  font-size: 1em;
  padding: 1.3em 0.5em 1.3em 0.5em;
  text-decoration: none;
  color: black;
}

.cart {
  margin-left: auto;
}

nav a.router-link-exact-active {
  color: #64b39b;
  background-repeat: repeat-x;
  background-position: 0 calc(100% - 0.15em);
  background-size: 100% 0.2em;
  border-bottom: 3px solid #64b39b;
}

nav a:hover {
  background-color: #f5f5f5;
}

body {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  padding-bottom: 5em;
}

.clearfix::after {
  content: "";
  clear: both;
  display: table;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  /* display: none; <- Crashes Chrome on hover */
  -webkit-appearance: none;
  margin: 0; /* <-- Apparently some margin are still there even though it's hidden */
}

input[type="number"] {
  -moz-appearance: textfield; /* Firefox */
}
</style>

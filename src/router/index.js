import { createRouter, createWebHistory } from "vue-router";
import ProductOverview from "../views/ProductOverview.vue";

const routes = [
  {
    path: "/",
    name: "Producten",
    component: ProductOverview,
  },
  {
    path: "/product/:id",
    name: "Product",
    component: () => import("../views/Product.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;

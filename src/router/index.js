import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("@/views/HomeFilm"),
    meta: {},
    children: [
      {
        path: "",
        name: "heatReflection",
        component: () => import("@/views/HeatReflection"),
      },
      {
        path: "/cinema",
        name: "cinema",
        component: () => import("@/views/CinemaFilm"),
      },
      {
        path: "/stay",
        name: "stay",
        component: () => import("@/views/StayFilm"),
      },
      {
        path: "/classic",
        name: "classic",
        component: () => import("@/views/ClassicFilm"),
      },
    ],
  },
  {
    path: "/hot",
    name: "hot",
    component: () => import("@/views/HotFilm"),
  },
  {
    path: "/mine",
    name: "mine",
    component: () => import("@/views/MineFilm"),
  },
  {
    path: "/city",
    name: "city",
    component: () => import("@/views/LocationCity"),
  },
  {
    path: "/:catchAll(.*)",
    name: "error",
    component: () => import("@/views/NotFound"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;

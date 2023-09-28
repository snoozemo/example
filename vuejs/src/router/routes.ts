import type { RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
    {
        name: "index",
        path: "/",
        component: () => import("@/pages/index.vue"),
        children: [
            {
                name: "home",
                path: "/",
                component: () => import("@/pages/home.vue"),
            },
            {
                name: "about",
                path: "about",
                component: () => import("@/pages/about.vue"),
            }
        ]
    }
];

export default routes
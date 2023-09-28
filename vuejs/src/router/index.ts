import { createRouter, createWebHistory, } from "vue-router"
import routes from "@/router/routes"
import NProgress from "nprogress";

const router = createRouter({
    history: createWebHistory(),
    routes,
})


router.beforeEach((to, from, next) => {
    NProgress.start();
    next()
})
router.beforeResolve((to) => true)
router.afterEach((to, from, failure) => {
    NProgress.done();
})

export default router
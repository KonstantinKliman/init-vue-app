import HomePage from '@/views/HomePageView'
import LoginPage from '@/views/LoginPageView'
import SignupPage from "@/views/SignupPageView";
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    {
        path: '/',
        component: HomePage,
        meta : {
            requiresAuth: true
        }
    },
    {
        path: '/login',
        component: LoginPage
    },
    {
        path:'/signup',
        component: SignupPage
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes: routes
});

router.beforeEach((to, from, next) => {
    const isAuthenticated = !!localStorage.getItem('accessToken'); // Проверка наличия токена доступа
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
    if (requiresAuth && !isAuthenticated) {
        next('/login'); // Перенаправление на страницу логина
    } else {
        next(); // Продолжение навигации
    }
});


export default router;

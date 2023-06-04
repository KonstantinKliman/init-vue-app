import HomePage from '@/views/HomePageView';
import LoginPage from '@/views/LoginPageView';
import SignupPage from '@/views/SignupPageView';
import AboutPage from '@/views/AboutPageView';
import ContactsPage from '@/views/ContactsPageView'
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    {
        path: '/',
        component: HomePage,
        name: 'HomePage',
        meta: {
            requiresAuth: true,
        }
    },
    {
        path: '/about',
        component: AboutPage,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/contacts',
        component: ContactsPage,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/login',
        component: LoginPage,
    },
    {
        path: '/signup',
        component: SignupPage,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes: routes,
});

router.beforeEach((to, from, next) => {
    const isAuthenticated = !!localStorage.getItem('accessToken');
    const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
    if (requiresAuth && !isAuthenticated) {
        next('/login');
    } else {
        next();
    }
});

export default router;

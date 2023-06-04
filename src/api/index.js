import axios from 'axios';
import router from "@/routes";

const API_BASE_URL = process.env.VUE_APP_API_BASE_URL;

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type" : "application/json",
    }
});

api.interceptors.request.use(
    (config) => {
        const requiresAuth = config.meta && config.meta.requiresAuth;

        if (requiresAuth && !isAuthenticated()) {
            router.push('/login');
        }

        return config
    },
    (error) => {
        return Promise.reject(error)
    }
    );

api.interceptors.response.use(
    response => response,
    async error => {
        if (error.response.status === 401) {
            try {
                const response = await api.get('identity/token/access', {
                    withCredentials: true
                });
                const newAccessToken = response.data.data.accessToken;
                localStorage.setItem('accessToken', newAccessToken);
                error.config.headers['Authorization'] = `Bearer ${newAccessToken}`;
                return api.request(error.config)
            } catch (refreshError) {
                console.error(refreshError);
            }
        }
        return Promise.reject(error);
    }
)

function isAuthenticated() {
    const accessToken = localStorage.getItem('accessToken');
    return !!accessToken;
}

export default api;
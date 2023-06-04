import { createApp } from 'vue'
import App from './App.vue'
import vuetify from "@/vuetify";
import router from "@/routes";
import LoaderComponent from "@/components/LoaderComponent.vue";

const app = createApp(App);
app.use(router).use(vuetify);

app.component('loader-component', LoaderComponent);

app.mount('#app');

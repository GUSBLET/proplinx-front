import {createApp} from 'vue'
import App from './App.vue'
import './index.css'
import router from "@/router";
import "@/axiosConfig";

console.log(process.env.VUE_APP_API_URL);

createApp(App)
    .use(router)
    .mount('#app')



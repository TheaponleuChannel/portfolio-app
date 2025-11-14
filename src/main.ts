import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import PrimeVue from 'primevue/config';
import router from './router';
import AppState from './components/plugins/appState';
import Noir from './components/presets/Nior';
import Tooltip from 'primevue/tooltip';
import ToastService from 'primevue/toastservice';

const app = createApp(App);
app.use(PrimeVue, {
    theme: {
        preset: Noir,
         options: {
            prefix: 'p',
            darkModeSelector: '.my-app-dark',
            cssLayer: false,
        }
    }
});
app.directive('tooltip', Tooltip);
// app.use(PrimeVue);
app.use(AppState);
app.use(router);
app.use(ToastService);
app.mount('#app');


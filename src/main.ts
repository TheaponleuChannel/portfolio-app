import { createApp } from 'vue'
import App from './App.vue'
import PrimeVue from 'primevue/config';
import router from './router';
import AppState from './composables/plugins/appState';
import Noir from './composables/presets/Nior';
import Tooltip from 'primevue/tooltip';
import ToastService from 'primevue/toastservice';
import './style.css'
import AnimateOnScroll from 'primevue/animateonscroll';
import scrollReveal from './directives/scrollReveal';

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
app.directive('animateonscroll', AnimateOnScroll);
app.directive('scroll-reveal', scrollReveal);
app.directive('tooltip', Tooltip);
// app.use(PrimeVue);
app.use(AppState);
app.use(router);
app.use(ToastService);
app.mount('#app');

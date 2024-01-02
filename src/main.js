import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import { FontAwesomeIcon } from './plugins/font-awesome';
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import 'admin-lte/dist/css/adminlte.css';
import 'admin-lte/dist/js/adminlte.js';
import vuetify from './plugins/vuetify';
import { loadFonts } from './plugins/webfontloader';

loadFonts();

createApp(App)
    .use(store)
    .use(router)
    .use(vuetify)
    .component("font-awesome-icon", FontAwesomeIcon)
    .mount('#app');
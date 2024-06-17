// src/main.js
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

// Create the Vue app instance and use the router
createApp(App)
  .use(router)
  .mount('#app');



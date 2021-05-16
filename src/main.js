import {
  createApp
} from 'vue';
import App from './App.vue';
if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
  document.documentElement.classList.add("dark");
} else {
  document.documentElement.classList.add("light");
}
let app = createApp(App);
app.mount('#app');
import './theme/variables.css';
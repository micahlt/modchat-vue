// These global variables are used to provide API and redirect routes.
window.serverHost = "https://modchatserver.herokuapp.com"; // please reset to https://modchatserver.herokuapp.com after testing or development
window.clientHost = "https://modchat.micahlindley.com"; // please reset to https://modchat.micahlindley.com after testing or development
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
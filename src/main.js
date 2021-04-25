import {
  createApp
} from 'vue'
import App from './App.vue'
let app = createApp(App);
app.provide({
  apiEndpoint: 'http://localhost:8000'
})
app.mount('#app');
import './theme/variables.css';
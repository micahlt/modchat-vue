import {
  createApp
} from 'vue';
import App from './App.vue';
switch (window.localStorage.getItem('theme')) {
  case (null): {
    window.localStorage.setItem('theme', 'default');
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.add("light");
    }
    break;
  }
  case ('default'): {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.add("light");
    }
    break;
  }
  case ('dark'): {
    document.documentElement.classList.add("dark");
    break;
  }
  case ('light'): {
    document.documentElement.classList.add("light");
    break;
  }
}

let app = createApp(App);
app.mount('#app');
import './theme/variables.css';
import {
  createApp
} from 'vue';
import VueSafeHTML from 'vue-safe-html';
import Markdown from 'vue3-markdown-it';
import Mouseover from 'vue-mouseover';
import App from './App.vue';
import runtime from "serviceworker-webpack-plugin/lib/runtime";
if ("serviceWorker" in navigator) {
  runtime.register();
}
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
app.use(Mouseover);
app.use(Markdown);
app.use(VueSafeHTML, {
  allowedTags: ['a'],
});
app.mount('#app');
import './theme/variables.css';
import { createApp } from "vue"
import VueSafeHTML from "vue-safe-html"
import Markdown from "vue3-markdown-it"
import vClickOutside from "click-outside-vue3"
import "balloon-css"
import App from "./App.vue"
import runtime from "serviceworker-webpack-plugin/lib/runtime"
if ("serviceWorker" in navigator) {
  runtime.register()
}
switch (window.localStorage.getItem("theme")) {
  case null: {
    window.localStorage.setItem("theme", "default")
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.add("light")
    }
    break
  }
  case "default": {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.add("light")
    }
    break
  }
  case "dark": {
    document.documentElement.classList.add("dark")
    break
  }
  case "light": {
    document.documentElement.classList.add("light")
    break
  }
}

if (!String.prototype.replaceAll) {
  String.prototype.replaceAll = function(str, newStr) {
    // If a regex pattern
    if (
      Object.prototype.toString.call(str).toLowerCase() === "[object regexp]"
    ) {
      return this.replace(str, newStr)
    }

    // If a string
    return this.replace(new RegExp(str, "g"), newStr)
  }
}

let app = createApp(App)
app.use(Markdown)
app.use(vClickOutside)
app.use(VueSafeHTML, {
  allowedTags: ["a"],
})
app.mount("#app")
import "./theme/variables.css"
import "./theme/index.css"

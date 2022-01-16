import { createApp } from "vue";
import App from "./App.vue";
import Choices from "./components/Choices.vue"; //Define new component question choices

const app = createApp(App);
app.component("app-choices", Choices); //Register component question Choices
app.mount("#app");

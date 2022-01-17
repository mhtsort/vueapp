import { createApp } from "vue";
import App from "./App.vue";
import Choices from "./components/Choices.vue"; //Define new component
import QuestionDisplay from "./components/QuestionDisplay.vue"; //Define new com
//
import Katex from "vue-katex-auto-render";

//
const app = createApp(App);
app.directive("katex", Katex);
app.component("app-choices", Choices);
app.component("app-question-display", QuestionDisplay);
app.mount("#app");

import "./global.css";
import { createApp } from "vue";
import App from "./App.vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faHatWizard,
  faPerson,
  faPersonWalking,
  faCircleCheck,
  faTrash,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
library.add(
  faHatWizard,
  faPerson,
  faPersonWalking,
  faCircleCheck,
  faTrash,
  faCircleXmark
);
const app = createApp(App);

app.component("font-awesome-icon", FontAwesomeIcon);

app.mount("#app");

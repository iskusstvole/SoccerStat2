import "@mdi/font/css/materialdesignicons.css";
import ru from "./vuetify-ru.js";

import "vuetify/styles";
import { createVuetify } from "vuetify";

export default defineNuxtPlugin((app) => {
  const vuetify = createVuetify({
    lang: {
      locales: { ru },
      current: "ru",
    },
  });
  app.vueApp.use(vuetify);
});

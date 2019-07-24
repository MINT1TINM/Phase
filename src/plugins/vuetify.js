import Vue from "vue";
import Vuetify from "vuetify/lib";
import zhHans from "./zhHans";
import colors from "vuetify/lib/util/colors";
Vue.use(Vuetify);

import "./confirm-dialog/index";
import "./snackbar/index";

export default new Vuetify({
  theme: {
    options: {
      customProperties: true
    },

    themes: {
      light: {
        primary: "#a64ed1",
        secondary: "#424242",
        accent: "#82B1FF",
        error: "#FF5252",
        info: "#2196F3",
        success: "#4CAF50",
        warning: "#FFC107"
      }
    }
  },
  lang: {
    locales: { zhHans },
    current: "zhHans"
  },
  icons: {
    iconfont: "mdi"
  }
});

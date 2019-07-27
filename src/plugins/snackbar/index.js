import Vue from "vue";
import SnackBar from "./Main.vue";
const snackBar = (Vue.prototype.$snackbar = new Vue(SnackBar).$mount());
document.body.appendChild(snackBar.$el);

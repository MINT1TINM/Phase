import Vue from "vue";
import SnackBar from "./Main";
const snackBar = (Vue.prototype.$snackbar = new Vue(SnackBar).$mount());
document.body.appendChild(snackBar.$el);

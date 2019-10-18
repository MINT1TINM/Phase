import Vue from 'vue';
import SnackBar from './Main.vue';

// eslint-disable-next-line no-multi-assign
const snackBar = (Vue.prototype.$snackbar = new Vue(SnackBar).$mount());
document.body.appendChild(snackBar.$el);

import "babel-polyfill";
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VueLodash from "vue-lodash";
import lodash from "lodash";
import tweetlyComponents from "./layouts";
import moment from "moment";

Vue.prototype.moment = moment;
Vue.use(VueLodash, { name: "custom", lodash: lodash });
Vue.use(tweetlyComponents);

new Vue({
  el: "#app",
  router,
  store,
  render: h => h(App)
});

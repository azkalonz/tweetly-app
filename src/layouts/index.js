import DefaultLayout from "./DefaultLayout";
import LoginLayout from "./LoginLayout";

const components = ["tw-button", "tw-input", "tw-loader", "tw-nav"];

export default {
  install: function(Vue, options) {
    Vue.component("default-layout", DefaultLayout);
    Vue.component("login-layout", LoginLayout);

    components.forEach(function(component) {
      Vue.component(component, require("../components/" + component).default);
    });
  }
};

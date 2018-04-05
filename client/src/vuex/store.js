import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
Vue.use(Vuex);
axios.defaults.headers.post["Content-Type"] = "text/plain";
const store = new Vuex.Store({
  state: {
    user: {
      name: "",
      pwd: "",
      status: ""
    }
  },
  actions: {
    register({ commit }, { name, pwd }) {
      axios
        .post({
          url: "http://localhost:1105/api/register",
          data: { name, pwd }
        })
        .then(res => console.log(res))
        .catch(err => console.log(err));
    }
  }
});

export default store;

import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);
const socket = io.connect("http://localhost:1105");
socket.on("chat", data => {
  console.log(store);
  console.log(data);
});
const store = new Vuex.Store({
  state: {
    userId: "",
    chatList: [],
    msgList: []
  },
  mutations: {
    loginSuccess(state, { id }) {
      state.userId = id;
    }
  },
  actions: {
    sendChat({ commit }, { chatContent }) {
      socket.emit("chat", { chatContent });
    }
  }
});

export default store;

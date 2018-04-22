import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);
const socket = window.io.connect("http://localhost:1105");
const store = new Vuex.Store({
  state: {
    user: { userId: "", name: "", avatar: "" },
    commonGroupId: "",
    currentChat: {
      type: "",
      id: ""
    },
    chatList: [],
    msgList: []
  },
  mutations: {
    loginSuccess(state, { userId, avatar, name, commonGroupId }) {
      state.user = {
        userId,
        name,
        avatar
      };
      state.commonGroupId = commonGroupId;
      state.currentChat = {
        type: "group",
        id: commonGroupId
      };
    }
  },
  actions: {
    sendChat({ commit }, { message }) {
      console.log(this.state.user.userId);
      socket.emit("chat", {
        message,
        ...this.state.user,
        sendTime: new Date().toLocaleString()
      });
    }
  }
});
socket.on("chat", data => {
  store.state.msgList.push(data);
});

export default store;

import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
Vue.use(Vuex);

const socket = window.io.connect("http://localhost:1105");
const store = new Vuex.Store({
  state: {
    user: { userId: "", name: "", avatar: "" },
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
      state.currentChat = {
        type: "group",
        id: commonGroupId
      };
    }
  },
  actions: {
    loginUser({ commit }, { name, pwd }) {
      axios
        .post("/api/login", {
          name,
          pwd,
          time: new Date(),
          socketId: socket.id
        })
        .then(res => {
          if (res.status === 200) {
            let { avatar, userId, commonGroupId } = res.data;
            commit("loginSuccess", { avatar, name, userId, commonGroupId });
          } else {
            console.log(res.data.returnMessage);
          }
        });
    },
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

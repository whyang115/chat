import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import { setItem } from "../common/storage";
Vue.use(Vuex);

const socket = window.io.connect("http://localhost:1105");
const store = new Vuex.Store({
  state: {
    user: {},
    commonGroup: {},
    currentChat: {
      chatType: "",
      chatId: ""
    },
    chatView: "chat",
    chatList: [],
    msgList: []
  },
  mutations: {
    loginSuccess(state, { router, userId, avatar, name, commonGroupId }) {
      state.user = {
        userId,
        name,
        avatar
      };
      state.currentChat = {
        chatType: "group",
        chatId: commonGroupId
      };
      setItem("user", JSON.stringify({ userId, avatar, name }));
      router.push("/chat");
    },
    changeChatView(state, { view }) {
      state.chatView = view;
    },
    updateCommonGroup(state, args) {
      state.commonGroup = args;
    }
  },
  actions: {
    userAction({ commit }, { router, action, name, pwd }) {
      axios
        .post(`/api/${action}`, {
          name,
          pwd,
          time: new Date(),
          socketId: socket.id
        })
        .then(res => {
          console.log(res);
          if (res.status === 200) {
            let { avatar, userId, commonGroupId } = res.data;
            commit("loginSuccess", {
              router,
              avatar,
              name,
              userId,
              commonGroupId
            });
          } else {
            console.log(res.data.returnMessage);
          }
        });
    },
    sendChat({ commit }, { message }) {
      console.log(this.state);
      socket.emit("chat", {
        message,
        ...this.state.user,
        ...this.state.currentChat,
        sendTime: new Date()
      });
    },
    getFriends({ commit }) {
      axios.get(`/friends?id=${this.state.user.userId}`).then(res => {
        console.log(res);
      });
    },
    getCommonGroupInfo({ commit }) {
      axios.get("/api/commonGroup").then(res => {
        if (res.status === 200) {
          let { avatar, name, members, messageList, id } = res.data;
          commit("updateCommonGroup", {
            avatar,
            name,
            members,
            messageList,
            id
          });
        }
      });
    },
    createGroup({ commit }) {
      axios.post("/api/group").then(res => console.log(res));
    },
    beFriend({ commit }, { id }) {
      socket.emit("addFriend", { from: this.state.user.userId, to: id });
    }
  }
});

socket.on("chat", data => {
  store.state.msgList.push(data);
});
socket.on("addFriend", ({ form }) => {
  alert("一个来自" + from + "的好友请求");
});
console.log(socket.join);
export default store;

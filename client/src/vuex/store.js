import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import { setItem, getItem } from "../common/storage";
Vue.use(Vuex);

const socket = window.io.connect("http://localhost:1105");
const store = new Vuex.Store({
  state: {
    chatView: "chat",
    user: {},
    commonGroup: {
      name: "全体群",
      avatar:
        "http://tuku-image.oss-cn-beijing.aliyuncs.com/18-4-1/13991140.jpg"
    },
    chatInfo: {},
    activeChat: {},
    chatList: [],
    friendList: [],
    msgList: []
  },
  mutations: {
    loginSuccess(
      state,
      { id, avatar, name, activeChat, chatList, friendList }
    ) {
      console.log(...arguments);
      state.user = {
        id,
        name,
        avatar
      };
      state.activeChat = activeChat;
      state.friendList = friendList;
      state.chatList = chatList;
    },
    changeChatView(state, { view }) {
      state.chatView = view;
    },
    updateCommonGroup(state, args) {
      state.commonGroup = args;
    }
  },
  actions: {
    async userAction({ commit, dispatch }, { router, action, name, pwd }) {
      try {
        let res = await axios.post(`/api/${action}`, {
          name,
          pwd,
          time: new Date(),
          socketId: socket.id
        });
        let { id, returnCode, returnMessage, groupId } = res.data;
        if (returnCode) {
          if (getItem("user")) {
            let user = JSON.parse(getItem("user"));
            user[id] = id;
            setItem("user", JSON.stringify(user));
          } else {
            setItem("user", JSON.stringify({ [id]: id }));
          }
          await dispatch("getUserInfo", { router, id });
          if (action === "register") {
            socket.emit("joinGroup", { groupId });
          }
        } else {
          console.log(returnMessage);
        }
      } catch (err) {
        window.alert(err);
      }
    },
    async getUserInfo({ commit }, { router, id }) {
      let res = await axios.get("/api/user", {
        params: {
          id
        }
      });
      let {
        avatar,
        name,
        activeChat,
        chatList,
        friendList,
        returnCode,
        returnMessage
      } = res.data;
      if (returnCode) {
        commit("loginSuccess", {
          id,
          avatar,
          name,
          activeChat,
          chatList,
          friendList
        });
        router.push("/chat");
      } else {
        console.log(returnMessage);
      }
    },
    async getChatInfo({ commit, state }) {
      try {
        let res = await axios.get("/api/chat", {
          params: { id: state.activeChat._id }
        });
        let { name, avatar, msgList, returnCode, returnMessage } = res.data;
        if (returnCode) {
          state.activeChat = Object.assign(state.activeChat, {
            name,
            avatar,
            msgList
          });
          console.log(state);
        } else {
          console.log(returnMessage);
        }
      } catch (error) {
        console.log(error);
      }
    },
    sendChat({ commit, state }, { content }) {
      socket.emit("chat", {
        content,
        chatId: state.activeChat._id,
        to: state.activeChat.to,
        from: state.user,
        isShowUserInfo: false,
        sendTime: new Date()
      });
    },
    getFriends({ commit, state }) {
      axios.get(`/friends?id=${state.user.id}`).then(res => {
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
  Notification.requestPermission(res => {
    if (res !== "denied" && data.from.id !== store.state.user.id) {
      let n = new Notification(`${data.from.name}向您发来一条新消息`, {
        body: data.content,
        tag: data.from,
        icon: data.from.avatar
      });
      n.onclick = () => {
        n.close();
      };
      setTimeout(() => {
        n.close();
      }, 2000);
    }
  });
  store.state.msgList.push(data);
});
socket.on("addFriend", ({ from }) => {
  console.log("一个来自" + from + "的好友请求");
});
export default store;

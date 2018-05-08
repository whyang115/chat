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
    chat: {}
  },
  mutations: {
    /**
     * 登录或注册成功,缓存用户信息
     * @param {*} state
     * @param {*} param1
     */
    loginSuccess(state, { user, chat }) {
      state.user = user;
      state.chat = chat;
      setItem("user", JSON.stringify(user));
      setItem("chat", JSON.stringify(chat));
    },
    /**
     * 加入群组
     */
    joinGroup(state, { chat }) {
      console.log(chat);
      socket.emit("joinGroup", chat);
    },
    /**
     * 读取缓存
     * @param {*} state
     * @param {*} user
     */
    readStorage(state, key) {
      let val = JSON.parse(getItem(key));
      val && (state[key] = val);
    },
    /**
     * 发送消息
     * @param {*} param0
     * @param {*} param1
     */
    sendChat(state, { content, to }) {
      socket.emit("chat", {
        content,
        to,
        chat: state.chat,
        from: state.user,
        isShowUserInfo: false,
        sendTime: new Date()
      });
    },
    changeChatView(state, { view }) {
      state.chatView = view;
    },
    updateSocket(state, { socketId }) {
      state.user.socketId = socketId;
      socket.emit("updateSocket", {
        userId: state.user.id,
        socketId: socketId
      });
    }
  },
  actions: {
    /**
     * 用户操作 登录或注册
     * @param {*} param0
     * @param {*} param1
     */
    userAction({ commit, dispatch }, { action, name, pwd }) {
      return axios.post(`/api/${action}`, {
        name,
        pwd,
        time: new Date(),
        socketId: socket.id
      });
    },
    getChat({ state }) {
      return axios.get("/api/chat", {
        params: state.chat
      });
    },
    getGroupList({ state }) {
      return axios.get("/api/groupList", {
        params: { id: state.user.id }
      });
    },
    getPrivateList({ state }) {
      return axios.get("/api/privateList", {
        params: { id: state.user.id }
      });
    },
    getFriends({ commit, state }) {
      return axios.get("/api/friends", {
        params: {
          id: state.user.id
        }
      });
    },
    createGroup({ commit }) {
      return axios.post("/api/group");
    }
  }
});
socket.on("connect", a => {
  console.log(a, socket.id);
  if (store.state.user.socketId && store.state.user.socketId !== socket.id) {
    store.commit("updateSocket", { socketId: socket.id });
  }
});
socket.on("chat", data => {
  console.log(socket.id);
  console.log(data);
  Notification.requestPermission(status => {
    if (status !== "denied" && data.from.id !== this.$store.state.user.id) {
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
    this.msgList.push(data);
  });
});

export default store;

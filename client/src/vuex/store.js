import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import { setItem, getItem } from "../common/storage";
Vue.use(Vuex);

const socket = window.io.connect("http://localhost:1105");
Vue.prototype.$socket = socket;
console.log(Vue);
const store = new Vuex.Store({
  state: {
    chatView: "chat",
    socket: {},
    user: {},
    chat: {},
    msgList: [],
    showAddFriendModel: false
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
     * 浏览器刷新时socket重连 群组需要重新加入
     */
    joinGroup(state) {
      socket.emit("joinGroup", { id: state.user.id });
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
        isRead: false,
        sendTime: new Date()
      });
      state.msgList.push({
        content,
        to,
        chat: state.chat,
        from: state.user,
        isShowUserInfo: false,
        isRead: false,
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
    },
    updateMsgList(state, msgList) {
      state.msgList = msgList;
    },
    addFriend(state, { to }) {
      socket.emit("addFriend", { from: state.user, to }, status => {
        console.log(status);
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
  store.state.socket = socket;
  if (store.state.user.socketId && store.state.user.socketId !== socket.id) {
    store.commit("updateSocket", { socketId: socket.id });
  }
});
socket.on("chat", data => {
  console.log(socket.id);
  Notification.requestPermission(status => {
    if (status !== "denied" && data.from.id !== store.state.user.id) {
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
    store.state.msgList.push(data);
  });
});
// socket.on("addFriend", data => {
//   console.log(data);
// });

export default store;

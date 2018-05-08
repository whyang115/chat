import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import socket from "../common/socket";
import { setItem, getItem } from "../common/storage";
Vue.use(Vuex);

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
export default store;

import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import socket from "../common/socket";
import { setItem, getItem } from "../common/storage";
Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    activeChat: {
      type: "group",
      id: ""
    },
    chatView: "chat",
    user: {}
  },
  mutations: {
    /**
     * 登录或注册成功,缓存用户信息
     * @param {*} state
     * @param {*} param1
     */
    loginSuccess(state, user) {
      state.user = user;
      setItem("user", JSON.stringify(user));
    },
    /**
     * 加入群组
     */
    joinGroup(state, { groupId }) {
      socket.emit("joinGroup", { groupId });
    },
    /**
     * 读取缓存
     * @param {*} state
     * @param {*} user
     */
    readStorage(state, key) {
      let val = JSON.parse(getItem(key));
      val && (state[key] = val);
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
    // getUserInfo({ commit, dispatch }, { id }) {
    //   return axios.get("/api/user", {
    //     params: {
    //       id
    //     }
    //   });
    // },
    getChatInfo({ state }) {
      return axios.get("/api/chat", {
        params: { id: state.user.id }
      });
    },
    getMsgList({ state }, { id }) {
      return axios.get("/api/msgList", {
        params: {
          id
        }
      });
    },
    getChatList({ state }) {
      return axios.get("/api/chatList", {
        params: { id: state.user.id }
      });
    },
    sendChat({ commit, state }, { content, chatId, to }) {
      socket.emit("chat", {
        content,
        chatId,
        to,
        from: state.user,
        isShowUserInfo: false,
        sendTime: new Date()
      });
    },
    getFriends({ commit, state }) {
      return axios.get("/friends", {
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

import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import { setItem, getItem } from "../common/storage";
Vue.use(Vuex);

const socket = window.io.connect();

Vue.prototype.$socket = socket;

const store = new Vuex.Store({
  state: {
    view: "chat",
    socket: {},
    user: {},
    chat: {},
    config: {
      isOpenNotice: true
    },
    friendInfo: {},
    onlineUsers: []
  },
  getters: {
    onlineUserNum: state => {
      return state.onlineUsers.length;
    }
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
      socket.emit("joinSelf", { id: store.state.user.id });
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
        from: state.user.id,
        isShowUserInfo: false,
        isRead: false,
        sendTime: new Date()
      });
    },

    /**
     * 切换view 聊天、好友列表、设置页面
     * @param {*} state
     * @param {*} param1
     */
    changeView(state, { view }) {
      state.view = view;
    },
    changeChat(state, data) {
      state.chat = data;
    },
    /**
     * 浏览器刷新时更新用户socketId
     * @param {*} state
     * @param {*} param1
     */
    updateSocket(state, { socketId }) {
      state.user.socketId = socketId;
      socket.emit("updateSocket", {
        userId: state.user.id,
        socketId: socketId
      });
    },
    addFriend(state, { to }) {
      socket.emit("addFriend", { from: state.user, to });
    },
    changeNotice(state, status) {
      state.config.isOpenNotice = status;
      setItem("config", JSON.stringify(state.config));
    },
    showFriendInfo(state, { info }) {
      state.friendInfo = info;
    },
    userChange(state, { onlineUsers }) {
      state.onlineUsers = onlineUsers;
    },
    updateUser(state, name) {
      state.user.name = name;
    }
  },
  actions: {
    /**
     * 用户操作 登录或注册
     * @param {*} param0
     * @param {*} param1
     */
    userAction({ state }, { action, name, pwd }) {
      return axios.post(`/api/${action}`, {
        name,
        pwd,
        time: new Date(),
        socketId: socket.id
      });
    },
    /**
     * 获取聊天
     * @param {*} param0
     */
    getChat({ state }) {
      return axios.get("/api/chat", {
        params: state.chat
      });
    },
    /**
     * 获取用户群聊
     * @param {*} param0
     */
    getGroupList({ state }) {
      return axios.get("/api/groupList", {
        params: { id: state.user.id }
      });
    },
    /**
     *  获取用户私聊
     * @param {*} param0
     */
    getPrivateList({ state }) {
      return axios.get("/api/privateList", {
        params: { id: state.user.id }
      });
    },
    /**
     * 获取用户好友列表
     * @param {*} param0
     */
    getFriends({ state }) {
      return axios.get("/api/friends", {
        params: {
          id: state.user.id
        }
      });
    },
    /**
     * 获取用户信息
     * @param {*} param0
     */
    getUserInfo({ state }, id) {
      return axios.get("/api/user", {
        params: {
          id: id || state.user.id
        }
      });
    },
    updateUser({ state }, { name, gender, signature }) {
      return axios.post("/api/user", {
        id: state.user.id,
        name,
        gender,
        signature
      });
    },
    /**
     * 创建群聊
     * @param {*} param0
     */
    createGroup({ state }, data) {
      data.id = state.user.id;
      return axios.post("/api/group", data);
    },
    /**
     * 获取群组信息
     * @param {*} state
     * @param {*} param1
     */
    getGroup({ state }, { name }) {
      return axios.get("/api/group", { params: { name } });
    },
    /**
     * 获取所有用户
     */
    getAllUser() {
      return axios.get("/api/allUser");
    },
    /**
     * 模糊查询用户
     * @param {*} state
     * @param {*} param1
     */
    fuzzySearchUser({ state }, { name }) {
      return axios.get("/api/fuzzyUser", { params: { name } });
    }
  }
});

/**
 * 浏览器重连时 更新用户socketId
 */
socket.on("connect", () => {
  if (store.state.user.id) {
    socket.emit("joinSelf", { id: store.state.user.id });
    socket.emit("getOnlineUsers");
  }
});

window.onunload = () => {
  socket.emit("disConnect", { id: store.state.user.id });
};
export default store;

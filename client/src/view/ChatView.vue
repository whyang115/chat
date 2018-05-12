<template>
  <div class="chat-view">
    <chat-header></chat-header>
    <chat-menu></chat-menu>
    <Modal
      v-model="showAddFriend"
      style="max-width: 300px"
    >
      <p slot="header" style="text-align: center">
        <Icon type="person-add"></Icon>
        <span>{{`您有一个来自${from.name}的好友申请`}}</span>
      </p>
      <div style="text-align: center">
        <Avatar :src="from.avatar"></Avatar>
        <p>{{from.name}}请求加您为好友,是否同意</p>
      </div>
      <p slot="footer">
        <Button type="error" @click="refuse">无情拒绝</Button>
        <Button type="success" @click="accept">欣然同意</Button>
      </p>
   </Modal>
    <section v-if="view === 'chat'" class="chat-box">
      <chat-side></chat-side>
      <chat-message></chat-message>
    </section>
    <section v-if="view === 'friends'" class="chat-box">
      <friend-list></friend-list>
      <friend-info></friend-info>
    </section>
    <section v-else class="chat-box">
      <setting></setting>
    </section>
  </div>
</template>

<script>
import ChatHeader from "../components/ChatHeader";
import ChatMenu from "../components/ChatMenu";
import ChatSide from "../components/ChatSide";
import FriendList from "../components/FriendList";
import FriendInfo from "../components/FriendInfo";
import ChatMessage from "../components/ChatMessage";
import Setting from "../components/Setting";
import { mapState } from "vuex";
export default {
  components: {
    ChatHeader,
    ChatMenu,
    ChatSide,
    ChatMessage,
    FriendList,
    FriendInfo,
    Setting
  },
  data() {
    return {
      showAddFriend: false,
      isAccept: null,
      from: {}
    };
  },
  computed: mapState({
    user: state => state.user
  }),
  created() {
    this.$socket.on("addFriend", ({ from }) => {
      this.from = from;
      this.showAddFriend = true;
    });
    this.$socket.on("repeatAddFriend", () => {
      this.$Notice.destroy();
      this.$Notice.error({
        title: "该用户已是您的好友,无须重复添加",
        duration: 2
      });
    });
    this.$socket.on("addFriendSuccess", ({ from, to, id }) => {
      this.$Notice.destroy();
      this.$Notice.success({
        title: `${to.name} 同意了您的好友请求, 快去聊聊吧`,
        duration: 2
      });
      this.$store.commit("changeChat", {
        type: "private",
        id
      });
    });
    this.$socket.on("addFriendFail", ({ from, to }) => {
      this.$Notice.destroy();
      this.$Notice.error({
        title: `${from.name} 拒绝您的添加好友请求`,
        duration: 2
      });
    });
    this.$store.commit("readStorage", "user");
    this.$store.commit("readStorage", "chat");
    this.$store.commit("joinGroup");
  },
  computed: {
    view() {
      return this.$store.state.view;
    }
  },
  methods: {
    accept() {
      this.showAddFriend = false;
      this.isAccept = true;
      this.$socket.emit("addFriendRes", {
        from: this.from,
        to: this.$store.state.user,
        isAccept: true
      });

      this.$Message.success("已同意");
    },
    refuse() {
      this.showAddFriend = false;
      this.isAccept = false;
      this.$Message.warning("已拒绝");
      this.$socket.emit("addFriendRes", {
        from: this.from,
        to: this.$store.state.user,
        isAccept: false
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../common/common.scss";
.chat-view {
  height: 100%;
  background-color: #c7ced4;
  overflow: hidden;
}

.chat-box {
  margin: 5rem 3rem 0 3rem;
  padding-top: 1rem;
  display: flex;
  height: 85%;
}
</style>

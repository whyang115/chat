<template>
  <div class="chat-view">
    <chat-header></chat-header>
    <chat-menu></chat-menu>
    <Modal
      v-model="showAddFriend"
      @on-ok="accept"
      @on-cancel="refuse"
    >
      <Avatar :src="from.avatar"></Avatar>
      <p>{{from.name}}请求加您为好友,是否同意</p>
    </Modal>
    <section v-if="chatView === 'chat'" class="chat-box">
      <chat-side></chat-side>
      <chat-message></chat-message>
    </section>
    <section v-if="chatView === 'friends'" class="chat-box">
      <friend-list></friend-list>
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
import ChatMessage from "../components/ChatMessage";
import Setting from "../components/Setting";
export default {
  components: {
    ChatHeader,
    ChatMenu,
    ChatSide,
    ChatMessage,
    FriendList,
    Setting
  },
  data() {
    return {
      showAddFriend: false,
      isAccept: null,
      from: {}
    };
  },
  created() {
    console.log(this.$socket);
    this.$socket.on("addFriend", ({ from }) => {
      this.from = from;
      this.showAddFriend = true;
    });
    this.$store.commit("readStorage", "user");
    this.$store.commit("readStorage", "chat");
    this.$store.commit("joinGroup");
  },
  computed: {
    chatView() {
      return this.$store.state.chatView;
    }
  },
  methods: {
    accept() {
      this.showAddFriend = false;
      this.isAccept = true;
      this.$Message.success("已同意");
    },
    refuse() {
      this.showAddFriend = false;
      this.isAccept = false;
      this.$Message.warning("已拒绝");
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
  justify-content: space-around;
  height: 85%;
}
</style>

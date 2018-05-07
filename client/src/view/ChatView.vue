<template>
  <div class="chat-view">
    <chat-header></chat-header>
    <chat-menu></chat-menu>
    <section v-if="chatView === 'chat'" class="chat-box">
      <chat-side></chat-side>
      <chat-message></chat-message>
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
import ChatMessage from "../components/ChatMessage";
import { getItem } from "../common/storage";
import Setting from "../components/Setting";
export default {
  components: { ChatHeader, ChatMenu, ChatSide, ChatMessage, Setting },
  data() {
    return {};
  },
  computed: {
    chatView() {
      return this.$store.state.chatView;
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

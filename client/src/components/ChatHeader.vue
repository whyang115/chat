<template>
  <header>
    <p class="welcome">欢迎进入聊天室</p>
    <p class="onlineUsers">在线人数: {{onlineUserNum}}</p>
    <section>
      <Avatar size="large" :src=user.avatar></Avatar>
      <p class="userName">{{user.name}}</p>
    </section>
  </header>
</template>

<script>
import { mapState } from "vuex";
import { getItem } from "../common/storage";
import { isEmptyObj } from "../common/util";
export default {
  data() {
    return {};
  },
  created() {
    this.$socket.on("userChange", data => {
      this.$store.commit("userChange", { onlineUsers: data });
    });
  },
  computed: {
    onlineUserNum() {
      return this.$store.getters.onlineUserNum;
    },
    ...mapState({
      user: state => state.user
    })
  }
};
</script>

<style lang="scss" scoped>
@import "../common/common.scss";
header {
  @include fixedTopInFullPage;
  height: $headerHeight;
  display: flex;
  align-items: center;
  padding: 0 2rem 0 3rem;
  background-color: $main;
  box-shadow: 0px 2px 5px 10px #ccc;
  z-index: 99;
}
p.welcome {
  font-size: 1.5rem;
  color: #fff;
  flex-grow: 9;
  text-align: left;
}
.onlineUsers {
  margin-right: 1rem;
  font-size: 1.2rem;
  color: #fff;
}
section {
  display: flex;
  flex-grow: 1;
  padding-left: 2rem;
  align-items: center;
  border-left: 1px solid #fff;
}
p.userName {
  font-size: 1.2rem;
  margin-left: 1rem;
  color: #fff;
}
</style>


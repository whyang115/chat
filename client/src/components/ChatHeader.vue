<template>
  <header>
    <p class="welcome">欢迎进入聊天室</p>
    <section>
      <Avatar size="large" :src = user.avatar></Avatar>
      <p class="userName">{{user.name}}</p>
    </section>
  </header>
</template>

<script>
import { getItem } from "../common/storage";
import { isEmptyObj } from "../common/util";
export default {
  data() {
    return { user: null };
  },
  created() {
    let user = this.$store.state.user;
    if (!user) {
      this.user = JSON.parse(getItem("user"));
      this.$store.commit("readStorage", user);
    } else {
      this.user = user;
    }
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


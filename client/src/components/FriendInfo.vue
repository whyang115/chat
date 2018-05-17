<template>
  <div class="wrap" v-show="!!friendInfo.name">
    <div class="friendInfo">
      <div class="bg"><img :src="friendInfo.avatar"></div>
      <p class="name">{{friendInfo.name}}</p>
      <p class="signature"> {{friendInfo.signature}}</p>
      <div class="detail">
        <p class="registerTime">注册时间: {{formatRegisterTime}}</p>
        <p class="lastLoginTime">最后登录时间: {{formatLastLoginTime}}</p>
      </div>
      <Button type="success" long @click="chatTo(friendInfo._id)">开始聊天</Button>
    </div>
  </div>
</template>

<script>
import { time } from "../common/time";
import { mapState } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    formatRegisterTime() {
      return time.formatTime(this.friendInfo.registerTime);
    },
    formatLastLoginTime() {
      return time.formatTime(this.friendInfo.lastLoginTime);
    },
    ...mapState({
      friendInfo: state => state.friendInfo
    })
  },
  methods: {
    chatTo(id) {
      this.$store.commit("changeView", { view: "chat" });
      this.$store.commit("changeChat", { type: "private", id });
    }
  }
};
</script>

<style lang="scss" scoped>
.chat-box {
  position: relative;
}
.wrap {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  margin: auto;
  background-color: #fff;
  height: 400px;
  width: 320px;
  transform: translateX(150px);
}
.bg {
  img {
    width: 100%;
    height: 200px;
  }
}
.name {
  font-size: 24px;
  margin-top: 0.8rem;
}
.signature {
  font-size: 12px;
  color: #333;
}
.detail {
  padding: 1rem 2rem;
  margin-bottom: 8px;
  p {
    text-align: left;
    margin: 0.5rem 0;
  }
}
</style>


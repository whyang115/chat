<template>
  <ul>
    <li v-for="(icon,index) in iconList" :key="index" :class="{active: icon.isActive}" @click="handleClick(index)">
      <Icon :type=icon.id></Icon>
      <p>{{icon.text}}</p>
    </li>
  </ul>
</template>

<script>
export default {
  data() {
    return {
      iconList: [
        { id: "chatboxes", isActive: true, text: "消息列表" },
        { id: "person-stalker", isActive: false, text: "好友列表" },
        { id: "gear-b", isActive: false, text: "设置" }
      ]
    };
  },
  methods: {
    handleClick(index) {
      let index2Route = { 0: "chat", 1: "friends", 2: "setting" };
      this.$store.commit("changeChatView", { view: index2Route[index] });
      this.iconList.forEach((item, ind) => {
        if (ind === index) {
          item.isActive = true;
        } else {
          item.isActive = false;
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../common/common.scss";
ul {
  position: fixed;
  top: $headerHeight;
  left: 0;
  display: flex;
  flex-direction: column;
  width: 4rem;
  height: 100%;
  background-color: #fff;
}

li {
  margin: 20px 0;
  height: 32px;
  cursor: pointer;
  color: #666;
  font-size: 1.5rem;
  p {
    font-size: 0.8rem;
  }
  &.active {
    color: $main;
  }
}
</style>

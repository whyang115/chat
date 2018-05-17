<template>
  <ul>
    <li v-for="(icon,index) in iconList" :key="index" :class="{active: icon.id === view}" @click="handleClick(index)">
      <Icon :type=icon.icon></Icon>
      <p>{{icon.text}}</p>
    </li>
  </ul>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      iconList: [
        { id: "chat", icon: "chatboxes", isActive: true, text: "聊天列表" },
        {
          id: "friends",
          icon: "person-stalker",
          isActive: false,
          text: "好友列表"
        },
        { id: "setting", icon: "gear-b", isActive: false, text: "设置" }
      ]
    };
  },
  computed: mapState({
    view: state => state.view
  }),
  methods: {
    handleClick(index) {
      let index2Route = { 0: "chat", 1: "friends", 2: "setting" };
      this.$store.commit("changeView", { view: index2Route[index] });
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

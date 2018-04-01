<template>
  <ul>
    <li v-for="(icon,index) in iconList" :key="index" @click="handleClick(index)">
      <Icon :type=icon.id class="iconStyle" :class="{active: icon.isActive}" ></Icon>
    </li>
  </ul>
</template>

<script>
export default {
  data() {
    return {
      iconList: [
        { id: "chatboxes", isActive: true },
        { id: "person-stalker", isActive: false },
        { id: "gear-b", isActive: false }
      ]
    };
  },
  methods: {
    handleClick(index) {
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
}
.iconStyle {
  font-size: 32px;
  color: #ddd;
}
.active {
  color: $main;
}
</style>



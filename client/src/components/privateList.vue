<template>
<ul class="privateWrap">
    <li class="list" v-for="item in privateList" :key="item.id">
      <Avatar :src="item.from.avatar"></Avatar>
      <div class="content">
        <div class="name">{{item.from.name}}</div>
        <div class="msg">{{getMsgCon(item)}}</div>
      </div>
      <p class="time">{{getMsgTime(item)}}</p>
    </li>
  </ul>
</template>

<script>
import moment from "moment";
export default {
  data() {
    return {
      privateList: []
    };
  },
  created() {
    this.getPrivateList();
  },

  methods: {
    async getPrivateList() {
      try {
        let { data } = await this.$store.dispatch("getPrivateList");
        let { returnCode, returnMessage, privateList } = data;
        if (returnCode) {
          this.privateList = privateList;
          let { _id } = privateList[0];
          this.$store.commit("changeChat", { type: "private", id: _id });
        } else {
          this.$Message.warning();
        }
      } catch (error) {
        this.$Message.error(error);
      }
    },
    getMsgCon(item) {
      if (item.msgList.length) {
        let len = item.msgList.length - 1;
        return item.msgList[len].content;
      }
    },
    getMsgTime(item) {
      if (item.msgList.length) {
        let len = item.msgList.length - 1;
        let time = item.msgList[len].createTime;
        return `${moment(time).fromNow(true)}前`;
      }
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../common/common.scss";
</style>



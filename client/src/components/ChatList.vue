<template>
  <ul class="listWrap">
    <li class="list" v-for="item in chatList" :key="item.id">
      <Avatar :src="item.avatar"></Avatar>
      <div class="content">
        <div class="name">{{item.name}}</div>
        <div class="msg">{{getMsgCon(item)}}</div>
      </div>
      <p class="time">{{getMsgTime(item)}}</p>
    </li>
  </ul>
</template>

<script>
import moment from "moment";
moment.locale("zh-cn");
export default {
  name: "ChatList",
  data() {
    return {
      list: []
    };
  },
  created() {
    this.getChatList();
  },
  methods: {
    async getChatList() {
      try {
        let { data } = await this.$store.dispatch("getChatList");
        let { returnCode, returnMessage, chatList } = data;
        let { _id } = chatList && chatList[0];
        if (returnCode) {
          this.chatList = chatList;
          this.$store.commit("changeChat", { type: "group", id: _id });
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


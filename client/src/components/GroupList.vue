<template>
  <ul class="groupWrap">
    <li class="list" v-for="group in groupList" :key="group.id">
      <Avatar :src="group.avatar"></Avatar>
      <div class="content">
        <div class="name">{{group.name}}</div>
        <div class="msg">{{getMsgCon(group)}}</div>
      </div>
      <p class="time">{{getMsgTime(group)}}</p>
    </li>
  </ul>
</template>

<script>
import moment from "moment";
moment.locale("zh-cn");
export default {
  name: "groupList",
  data() {
    return {
      groupList: []
    };
  },
  created() {
    this.getGroupList();
  },
  methods: {
    async getGroupList() {
      try {
        let { data } = await this.$store.dispatch("getGroupList");
        let { returnCode, returnMessage, groupList } = data;
        if (returnCode) {
          this.groupList = groupList;
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



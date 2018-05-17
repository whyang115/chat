<template>
  <ul class="groupWrap">
    <li class="list" :class="{active: activeIndex === index}" v-for="(group,index) in groupList" :key="group._id" @click="swtichItem(group,index)">
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
      groupList: [],
      activeIndex: 0
    };
  },
  created() {
    this.$socket.on("chat", data => {
      console.log(data);
    });
    this.getGroupList();
  },
  methods: {
    async getGroupList() {
      try {
        let { data } = await this.$store.dispatch("getGroupList");
        let { returnCode, returnMessage, groupList } = data;
        let { _id } = groupList && groupList[0];
        if (returnCode) {
          this.groupList = groupList;
          this.$store.commit("changeChat", { type: "group", id: _id });
        } else {
          this.$Message.warning();
        }
      } catch (error) {
        this.$Message.error(error);
      }
    },
    swtichItem(item, index) {
      if (index !== this.activeIndex) {
        this.activeIndex = index;
        this.$store.commit("changeChat", {
          type: "group",
          id: item._id
        });
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
        console.log(moment("20170101").fromNow(true));
        return `${moment(time).fromNow(true)}前`;
      }
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../common/common.scss";
.groupWrap {
  margin-top: 1rem;
}
</style>



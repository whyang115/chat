<template>
  <div class="wrap">
    <Spin size="large" v-if="!isLoaded" fix></Spin>
    <div class="privateWrap" v-show="isLoaded">
      <ul v-if="privateList.length">
        <li class="list" :class="{active: activeIndex === index}" v-for="(item,index) in privateList" :key="item.id" @click="swtichItem(item,index)">
          <Avatar :src="item.to.avatar"></Avatar>
          <div class="content">
            <div class="name">{{getPrivateName(item)}}</div>
            <div class="msg">{{getMsgCon(item)}}</div>
          </div>
          <p class="time">{{getMsgTime(item)}}</p>
        </li>
      </ul>
      <div v-else class="empty">
        当前没有聊天
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import { mapState } from "vuex";
export default {
  data() {
    return {
      privateList: [],
      activeIndex: 0,
      isLoaded: false
    };
  },
  created() {
    this.getPrivateList();
  },
  computed: mapState({ user: state => state.user }),
  methods: {
    async getPrivateList() {
      try {
        let { data } = await this.$store.dispatch("getPrivateList");
        let { returnCode, returnMessage, privateList } = data;
        this.isLoaded = true;
        if (!privateList.length) return;
        if (returnCode) {
          this.privateList = privateList;
          let { _id } = privateList[0];
          this.$store.commit("changeChat", { type: "private", id: _id });
        } else {
          this.$Message.error(returnMessage);
        }
      } catch (error) {
        this.$Message.error(error);
      }
    },
    swtichItem(item, index) {
      if (index !== this.activeIndex) {
        this.activeIndex = index;
        this.$store.commit("changeChat", {
          type: "private",
          id: item._id
        });
      }
    },
    getPrivateName(item) {
      return item.from._id !== this.user.id ? item.from.name : item.to.name;
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
.wrap {
  position: relative;
}
.privateWrap {
  margin-top: 1rem;
}
.empty {
  line-height: 200px;
  color: #f60;
  font-size: 16px;
}
</style>



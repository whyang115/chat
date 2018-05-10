<template>
  <section class="chat_side">
    <header>
      <Button type="success" @click="createGroup">新建聊天</Button>
      <div class="createGroup">
        <div class="avatarBox">
          <Upload action="/api/image">
            <!-- <Button type="ghost" icon="ios-cloud-upload-outline">Upload files</Button> -->
          </Upload>
        </div>
      </div>
    </header>
    <div class="control">
      <p @click="switchChatType('group')" :class="{active: 'group' === chatType}">群组聊天</p>
      <p @click="switchChatType('friend')" :class="{active: 'friend' === chatType}">好友聊天</p>
    </div>
    <section v-if="chatType === 'group'" class="chat">
     <group-list></group-list>
    </section>
    <section v-else class="chat">
      <private-list></private-list>
    </section>
  </section>
</template>
<script>
import PrivateList from "./PrivateList";
import GroupList from "./GroupList";
export default {
  components: { PrivateList, GroupList },
  data() {
    return {
      chatType: "group",
      showCreateGroup: false
    };
  },
  methods: {
    createGroup() {
      this.$store.dispatch("createGroup");
    },
    switchChatType(type) {
      this.chatType = type;
    }
  }
};
</script>

<style lang="scss" scoped>
.chat_side {
  width: 18rem;
  margin: 0 3rem;
  background-color: #fff;
  li {
    display: flex;
    align-items: center;
    padding: 0.5rem;
    .content {
      flex: 1;
      padding-left: 1rem;
      p {
        text-align: left;
      }
      .name {
        font-size: 16px;
        color: #000;
      }
      .last_msg {
        font-size: 12px;
        color: #999;
      }
    }
    .info {
      width: 40px;
    }
  }
}
.control {
  display: flex;
  align-items: center;
  p {
    flex: 1;
    padding: 10px 0;
    text-align: center;
    cursor: pointer;
    &.active {
      color: #fff;
      background-color: rgba(53, 152, 219, 0.8);
    }
  }
}
.commonGroup {
  padding: 1rem 0.5rem;
  display: flex;
  align-items: center;
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
  cursor: pointer;
  span {
    margin-right: 20px;
  }
}
header {
  padding: 1rem 0;
}
</style>



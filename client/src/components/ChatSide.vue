<template>
  <section class="chat_side">
    <header>
      <Button type="success" @click="createGroup">新建聊天</Button>
    </header>
    <section class="commonGroup" @click="toCommonGroup">
      <Avatar :src=commonGroupInfo.avatar></Avatar>
      <span>{{commonGroupInfo.name}}</span>
    </section>
    <section class="chat">
      <ul>
        <li v-for="(chat,index) in chatList" :key="index">
          <Avatar :src="chat.avatar"></Avatar>
          <section class="content">
            <p class="name">{{chat.name}}</p>
            <p class="last_msg">{{chat.lastMsg}}</p>
          </section>
          <section class="info">
            <Badge :count=chat.newMsgCount overflow-count="99"></Badge>
            <p class="time">{{chat.timeAgo}}</p>
          </section>
        </li>
      </ul>
    </section>
  </section>
</template>
<script>
export default {
  data() {
    return {
      commonGroupInfo: {
        name: "",
        avatar: "",
        id: ""
      },
      chatList: []
    };
  },
  created() {
    console.log("chat-side be created");
    console.log(this.$store.state.commonGroupId);
    let commonGroupId = this.$store.state.commonGroupId;
    this.axios
      .get(`/api/getcommonGroupInfoById?id=${commonGroupId}`)
      .then(res => (this.commonGroupInfo = res.data));
  },
  methods: {
    createGroup() {
      this.axios.put("/api/createGroup").then(res => console.log(res));
    },
    toCommonGroup() {
      this.$route.push(`/chat`);
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



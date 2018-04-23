<template>
  <section class="chat-content">
    <section class="chat-room">
      <h3>{{chatTitle}}</h3>
      <ul>
        <li
          v-for="(msg,index) in msgList"
          :key="index"
          :class="self"
          >
          <Avatar :src="msg.avatar"/>
          <p >{{msg.message}}</p>
        </li>
      </ul>
    </section>
    <section class="chat-input" @keydown.enter="sendChat">
        <input v-model = sendContent @change="inputChange" placeholder="请输入你想说的话 ~ ~"/>
        <Icon type="android-send" class="icon-send" @click.native="sendChat"></Icon>
    </section>

  </section>
</template>

<script>
export default {
  data() {
    return {
      sendContent: "",
      chatTitle: ""
    };
  },
  created() {
    let { type, id } = this.$store.state.currentChat;
    this.axios.get(`/api/getChat?type=${type}&id=${id}`).then(res => {
      let { returnCode, msgList, chatTitle } = res.data;
      if (returnCode) {
        this.chatTitle = chatTitle;
        this.$store.state.msgList = msgList;
      }
    });
  },
  computed: {
    msgList() {
      console.log(this.$store.state.msgList);
      return this.$store.state.msgList;
    },
    userId() {
      return this.$store.state.userId;
    }
  },
  methods: {
    sendChat() {
      if (!this.sendContent) {
        this.$Message.error("发送内容不能为空");
        return;
      }
      this.$store.dispatch("sendChat", { message: this.sendContent });
      this.sendContent = "";
    },
    inputChange() {
      localStorage.setItem("sendContent", this.sendContent);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../common/common.scss";
.chat-content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 3;
}
.chat-room,
.chat-input {
  background-color: #fff;
}

.chat-room {
  height: 88%;
  padding: 1rem 0;
  overflow: hidden;
  h3 {
    padding-bottom: 0.5rem;
    border-bottom: 1px solid #ddd;
    color: #555;
  }
  ul {
    height: 100%;
    overflow: auto;
  }
  li {
    display: flex;
    align-items: center;
    margin: 1rem 0;
    p {
      margin: 0 1rem;
      padding: 0.2rem 1.2rem;
      line-height: 1.5rem;
      border-radius: 1.5rem;
    }
    &.other {
      justify-content: flex-start;
      p {
        color: #fff;
        background-color: #ccc;
      }
    }
    &.self {
      display: flex;
      flex-direction: row-reverse;
      p {
        color: #fff;
        background-color: $main;
      }
    }
  }
}
.chat-input {
  position: relative;
  height: 48px;
  .icon-send {
    position: absolute;
    top: 12px;
    right: 6%;
    font-size: 1.5rem;
    cursor: pointer;
    &:hover {
      color: $main;
    }
  }
  input {
    width: 100%;
    height: 48px;
    padding-left: 1rem;
    border: none;
    outline: none;
    border-radius: 0.5rem;
  }
}
</style>



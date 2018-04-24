<template>
  <section class="chat-content">
    <section class="chat-room">
      <h3>{{chatTitle}}</h3>
      <ul>
        <li
          v-for="(msg,index) in msgList"
          :key="index"
          :class="msg.userId === user.userId ? 'self' : 'other'"
          ref="msgItem"
        >
          <div class="userInfo">
            <Avatar :src="msg.avatar" size="large"></Avatar>
            <div class="name">{{msg.name}}</div>
            <div class="operation">
              <div class="beFriend" @click="beFriend(msg.userId)">加为好友</div>
              <div class="divideLine"></div>
              <div class="sendMsg" @click="divrivateChat(msg.userId)">发送消息</div>
            </div>
          </div>
          <Avatar :src="msg.avatar" @click="showUserInfo(msg.userId,index)"/>
          <p>{{msg.message}}</p>
        </li>
      </ul>
    </section>
    <section class="chat-input" @keydown.enter="sendChat">
      <input v-model=sendContent @change="inputChange" placeholder="请输入你想说的话 ~ ~" />
      <Icon type="android-send" class="icon-send" @click.native="sendChat"></Icon>
    </section>
  </section>
</template>

<script>
import { setItem, getItem } from "../common/storage";
export default {
  data() {
    return {
      sendContent: "",
      chatTitle: ""
    };
  },
  created() {
    if (getItem("sendContent")) {
      this.sendContent = getItem("sendContent");
    }
  },
  computed: {
    msgList() {
      return this.$store.state.msgList;
    },
    user() {
      return this.$store.state.user;
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
      console.log(getItem("sendContent"));
      setItem("sendContent", this.sendContent);
      console.log(getItem("sendContent"));
    },
    showUserInfo(id, index) {
      console.log(this.$refs);
      if (user.userId !== id) {
        this.showUser = true;
      }
    },
    beFriend(id) {
      this.$store.dispatch("beFriend", { id });
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
    padding: 0 1rem;
    position: relative;
    .userInfo {
      position: absolute;
      top: 100px;
      left: 0;
      background-color: #fff;
      border: 1px solid #ccc;
      width: 180px;
      padding: 0.6rem 1rem;
      z-index: 99;
      .operation {
        width: 100%;
        height: 36px;
        display: flex;
        align-items: center;
        border-top: 1px solid #333;
        cursor: pointer;
      }
      .beFriend,
      .sendMsg {
        flex-grow: 1;
      }
      .divideLine {
        height: 80%;
        width: 1px;
        background-color: #333;
      }
      .name {
        color: #333;
        font-size: 20px;
        margin: 1rem 0;
        text-align: center;
      }
    }
    p {
      margin: 0 1rem;
      padding: 0.2rem 0.8rem;
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

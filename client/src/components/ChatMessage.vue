<template>
  <section class="chat-content">
        <section class="chat-room">
      <h3>{{chatInfo.name}}</h3>
      <ul ref="chatRoom">
        <li
          v-for="(msg,index) in msgList"
          :key="index"
          :class="msg.from.id === user.id ? 'self' : 'other'"
          ref="msgItem"
          @mouseout="hideUserInfo(index)"
        >
         <div class="avatarBox" @mouseover="showUserInfo(msg,index)" >
          <div v-show="msg.isShowUserInfo" class="userInfo" :style="{left: userInfo.left + 'px',top: userInfo.top + 'px'}">
            <Avatar :src="msg.from.avatar" size="large"></Avatar>
            <div class="name">{{msg.from.name}}</div>
            <div class="operation">
              <div class="beFriend" @click="beFriend(msg.from.id)">加为好友</div>
              <div class="divideLine"></div>
              <div class="sendMsg" @click="privateChat(msg.from.id)">发送消息</div>
            </div>
          </div>
           <Avatar :src="msg.from.avatar" />
          </div>
          <p>{{msg.content}}</p>
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
      isShowUserInfo: false,
      userInfo: {}
    };
  },
  created() {
    this.$store.dispatch("getChatInfo");
    console.log(this.$store.state);
    if (getItem("sendContent")) {
      this.sendContent = getItem("sendContent");
    }
  },
  mounted() {
    this.handleScroll();
  },
  computed: {
    chatInfo() {
      console.log(this.$store.state);
      return this.$store.state.activeChat;
    },
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
      this.$store.dispatch("sendChat", { content: this.sendContent });
      setTimeout(() => {
        this.handleScroll();
      }, 0);
      this.sendContent = "";
    },
    inputChange() {
      console.log(getItem("sendContent"));
      setItem("sendContent", this.sendContent);
      console.log(getItem("sendContent"));
    },
    showUserInfo(msg, index) {
      let $target = this.$refs.msgItem[index];
      let $top = $target.offsetTop;
      let $scrollTop = this.$refs.chatRoom.scrollTop;
      if (msg.userId !== this.user.userId) {
        this.msgList[index].isShowUserInfo = true;
      }
      this.userInfo.top = $top - $scrollTop > 150 ? -140 : 40;
      this.userInfo.left = 0;
    },
    hideUserInfo(index) {
      this.msgList[index].isShowUserInfo = false;
    },
    beFriend(id) {
      this.$store.dispatch("beFriend", { id });
    },
    privateChat(id) {
      this.$store.dispatch("privateChat", { id });
    },
    handleScroll() {
      let $target = this.$refs.chatRoom;
      $target.scrollTop = $target.scrollHeight - $target.offsetTop;
    }
  },
  watch: {
    msgList() {
      console.log(this.msgList);
      this.handleScroll();
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
.userInfo {
  position: absolute;
  padding-top: 1rem;
  background-color: #fff;
  border: 1px solid #ccc;
  width: 180px;
  z-index: 99;
  .operation {
    width: 100%;
    height: 36px;
    display: flex;
    align-items: center;
    border-top: 1px solid #ccc;
    cursor: pointer;
  }
  .beFriend,
  .sendMsg {
    flex-grow: 1;
    color: $main;
    line-height: 36px;
    &:hover {
      color: #fff;
      background-color: $main;
    }
  }
  .divideLine {
    height: 40%;
    width: 1px;
    background-color: #999;
  }
  .name {
    color: #333;
    font-size: 20px;
    margin: 0.5rem 0;
    text-align: center;
  }
}
.avatar-box {
  position: relative;
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

    p {
      margin: 0 1rem;
      padding: 0.2rem 0.8rem;
      line-height: 1.5rem;
      border-radius: 1.5rem;
      position: relative;
    }
    &.other {
      justify-content: flex-start;
      p {
        color: #fff;
        background-color: #ccc;
        &::before {
          content: "";
          width: 0;
          height: 0;
          position: absolute;
          top: 6px;
          left: -21px;
          border: 10px solid transparent;
          border-right: 15px solid #ccc;
        }
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

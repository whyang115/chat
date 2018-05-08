<template>
  <section class="chat-content">
        <section class="chat-room">
      <h3>{{chatInfo.name}}</h3>
      <ul ref="chatRoom">
        <li
          v-for="(msg,index) in msgList"
          :key="index"
          :class="msg.from.id=== user.id ? 'self' : 'other'"
          ref="msgItem"
        >
          <div class="avatarBox">
           <div v-show="msg.isShowUserInfo" class="userInfo" :style="{left: 0,top: getTop(index)}">
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
import socket from "../common/socket";
import { mapState } from "vuex";
import { setItem, getItem } from "../common/storage";
export default {
  data() {
    return {
      sendContent: "",
      isShowUserInfo: false,
      chatInfo: {},
      emoijs: [
        "😂",
        "🙏",
        "😄",
        "😏",
        "😇",
        "😅",
        "😌",
        "😘",
        "😍",
        "🤓",
        "😜",
        "😎",
        "😊",
        "😳",
        "🙄",
        "😱",
        "😒",
        "😔",
        "😷",
        "👿",
        "🤗",
        "😩",
        "😤",
        "😣",
        "😰",
        "😴",
        "😬",
        "😭",
        "👻",
        "👍",
        "✌️",
        "👉",
        "👀",
        "🐶",
        "🐷",
        "😹",
        "⚡️",
        "🔥",
        "🌈",
        "🍏",
        "⚽️",
        "❤️",
        "🇨🇳"
      ]
    };
  },
  created() {
    console.log(socket.id);
    this.getChat();
    socket.on("chat", data => {
      console.log(socket.id);
      console.log(data);
      Notification.requestPermission(status => {
        if (status !== "denied" && data.from.id !== this.$store.state.user.id) {
          let n = new Notification(`${data.from.name}向您发来一条新消息`, {
            body: data.content,
            tag: data.from,
            icon: data.from.avatar
          });
          n.onclick = () => {
            n.close();
          };
          setTimeout(() => {
            n.close();
          }, 2000);
        }
        this.msgList.push(data);
      });
    });
  },
  mounted() {
    this.handleScroll();
  },
  computed: mapState({
    user: state => state.user,
    msgList() {
      return this.chatInfo.msgList;
    }
  }),
  methods: {
    async getChat() {
      try {
        let { data } = await this.$store.dispatch("getChat");
        let { returnCode, returnMessage, res } = data;
        if (returnCode) {
          this.chatInfo = res;
        } else {
          this.$Message.error(returnMessage);
        }
      } catch (error) {
        this.$Message.error(error);
      }
    },
    sendChat() {
      if (!this.sendContent) {
        this.$Message.error("发送内容不能为空");
        return;
      }
      this.$store.commit("sendChat", {
        content: this.sendContent,
        to: this.chatInfo._id
      });
      this.msgList.push({
        content: this.sendContent,
        sendTime: new Date(),
        from: this.user,
        to: this.chatInfo._id,
        isRead: false
      });
      setTimeout(() => {
        this.handleScroll();
      }, 0);
      this.sendContent = "";
    },
    inputChange() {},
    // showUserInfo(msg, index) {
    //   let $target = this.$refs.msgItem[index];
    //   let $top = $target.offsetTop;
    //   let $scrollTop = this.$refs.chatRoom.scrollTop;
    //   if (msg.userId !== this.user.userId) {
    //     this.msgList[index].isShowUserInfo = true;
    //   }
    //   this.userInfo.top = $top - $scrollTop > 150 ? -140 : 40;
    //   this.userInfo.left = 0;
    // },

    getTop(index) {},
    hideUserInfo(index) {
      // this.msgList[index].isShowUserInfo = false;
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
      border-radius: 0.3rem;
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
          left: -19px;
          border: 10px solid transparent;
          border-right: 10px solid #ccc;
        }
      }
    }
    &.self {
      display: flex;
      flex-direction: row-reverse;
      p {
        color: #fff;
        background-color: $main;
        &::after {
          content: "";
          width: 0;
          height: 0;
          position: absolute;
          top: 6px;
          right: -20px;
          border: 10px solid transparent;
          border-left: 10px solid $main;
        }
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

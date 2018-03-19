<template>
  <section class="chat-content">
    <section class="chat-room">
      <h3>{{chatTitle}}</h3>
      <ul>
        <li 
          v-for="(chat,index) in chatList" 
          :key="index" 
          :class="chat.belong">    
          <Avatar :src="chat.avatar"/>
          <p :class="chat.belong">{{chat.content}}</p>
        </li>
      </ul>
    </section>
    <section class="chat-input" @keydown.enter="sendChat">
        <input v-model= sendContent placeholder="请输入你想说的话 ~ ~"></input>
        <Icon type="android-send" class="icon-send" @click.native="sendChat"></Icon>
      </Form>
    </section>
    
  </section>
</template>

<script>
export default {
  data() {
    return {
      sendContent: "12",
      chatTitle: "聊天室",
      chatList: [
        {
          avatar:
            "http://onlzci6oa.bkt.clouddn.com/17-5-6/33331647-file_1494037395631_a205.jpg",
          content: "hello",
          belong: "other"
        },
        {
          avatar:
            "http://onlzci6oa.bkt.clouddn.com/17-5-6/33331647-file_1494037395631_a205.jpg",
          content: "hello",
          belong: "other"
        },
        {
          avatar:
            "http://onlzci6oa.bkt.clouddn.com/17-5-6/33331647-file_1494037395631_a205.jpg",
          content: "hello",
          belong: "self"
        }
      ]
    };
  },
  methods: {
    sendChat() {
      console.log(this);
      if (!this.sendContent) {
        alert("内容不能为空");
      }
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
  padding: 1rem;
  h3 {
    padding-bottom: 0.5rem;
    border-bottom: 1px solid #ddd;
    color: #555;
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



<template>
  <section class="chat_side">
    <header>
      <Button type="success">新建聊天</Button>
    </header>
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
      chatList: [
        {
          avatar:
            "http://onlzci6oa.bkt.clouddn.com/17-5-6/33331647-file_1494037395631_a205.jpg",
          name: "whyang",
          lastMsg: "连悦,我喜欢你",
          newMsgCount: 10,
          timeAgo: "10:00"
        },
        {
          avatar:
            "http://onlzci6oa.bkt.clouddn.com/17-5-6/33331647-file_1494037395631_a205.jpg",
          name: "whyang",
          lastMsg: "连悦,我喜欢你",
          newMsgCount: 10,
          timeAgo: "10:00"
        }
      ]
    };
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
header {
  padding: 1rem 0;
}
</style>



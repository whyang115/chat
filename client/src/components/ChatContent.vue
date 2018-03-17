<template>
  <section class="chat-content">
    <h3>{{chatName}}</h3>
    <ul>
      <li v-for="(chat,index) in chatList" :key="index">
        <Avatar :src="chat.src"></Avatar>
        <p :class="chat.belong"></p>
      </li>
    </ul>
    <Form>
      <Input placeholder="请输入你想说的话"></Input>
      <Icon type="android-send"></Icon>
    </Form>
  </section>
</template>

<script>
export default {
  data() {
    return {
      chatList: [
        { avatar: "", content: "hello", belong: "other" },
        { avatar: "", content: "hello", belong: "other" },
        { avatar: "", content: "hello", belong: "other" }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
.chat-content {
  flex: 3;
}
</style>



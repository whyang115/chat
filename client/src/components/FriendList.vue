<template>
<div class="friendBox">
  <div class="findFriend">
    <h3>添加好友</h3>
    <Form>
        <Input>
        <Icon></Icon>
        </Input>
      </Form>
  </div>
  <div class="friendList">
    <h3>好友列表</h3>
      <ul>
        <li v-for="item in friendList" key={item.userId}>
          <Avatar></Avatar>
          <div class="detail">
            <div class="date"></div>
            <div class="msg"></div>
          </div>
        </li>
      </ul>
  </div>
</div>
</template>

<script>
export default {
  data() {
    return {};
  },
  created() {
    this.$store.dispatch("getFriends");
  }
};
</script>


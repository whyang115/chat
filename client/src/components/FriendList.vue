<template>
      <ul>
        <li
          v-for="item in friendList"
          :key = item.userId
        >
          <Avatar></Avatar>
          <div class="detail">
            <div class="date"></div>
            <div class="msg"></div>
          </div>
        </li>
      </ul>
</template>

<script>
export default {
  data() {
    return {
      friendList: [{ userId: "1" }]
    };
  },
  created() {
    this.$store.dispatch("getFriends");
  }
};
</script>


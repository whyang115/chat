<template>
      <ul v-if="haveFriends">
        <li
          class="list"
          v-for="item in friends"
          :key = item.userId
        >
          <Avatar :src="friends.avatar"></Avatar>
          <div class="content">
            <div class="date"></div>
            <div class="msg"></div>
          </div>
        </li>
      </ul>
      <div v-else class="text">其实你可以更主动一些的</div>
</template>

<script>
export default {
  data() {
    return {
      friends: []
    };
  },
  created() {
    this.getFriends();
  },
  computed: {
    haveFriends() {
      return this.friends.length;
    }
  },
  methods: {
    async getFriends() {
      let { data } = await this.$store.dispatch("getFriends");
      let { returnCode, returnMessage } = data;
    }
  }
};
</script>

<style lang="scss" scoped>
ul {
  height: 100%;
  width: 18rem;
  background-color: #fff;
}
</style>



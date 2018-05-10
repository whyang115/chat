<template>
      <ul v-if="haveFriends">
        <li
          class="list"
          v-for="item in friends"
          :key = "item.id"
        >
          <Avatar :src="item.avatar"></Avatar>
          <div class="content">
            <p class="name">{{item.name}}</p>
            p.
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
      try {
        let { data } = await this.$store.dispatch("getFriends");
        let { returnCode, returnMessage, friends } = data;
        if (returnCode) {
          this.friends = friends;
        } else {
          this.$Message.warning(returnMessage);
        }
      } catch (error) {
        this.$Message.error(error);
      }
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



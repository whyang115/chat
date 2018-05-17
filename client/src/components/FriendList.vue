<template>
      <ul class="friendList" v-if="haveFriends">
        <li
          class="list"
          v-for="item in friends"
          :key = "item.id"
          @click="getFriendInfo(item._id)"
        >
          <Avatar :src="item.avatar"></Avatar>
          <div class="content">
            <p class="name">{{item.name}}</p>
            <p class="signature">{{item.signature}}</p>
          </div>
        </li>
      </ul>
      <div v-else class="empty">其实你可以更主动一些的</div>
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
    },
    async getFriendInfo(id) {
      let { data } = await this.$store.dispatch("getUserInfo", id);
      console.log(data);
      let { returnCode, returnMessage, user } = data;
      if (returnCode) {
        this.$store.commit("showFriendInfo", { info: user });
      } else {
        this.$Message.error(returnMessage);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../common/common.scss";
ul {
  height: 100%;
  max-width: 18rem;
  margin-left: 2rem;
  background-color: #fff;
}
.empty {
  background: #fff;
  margin-left: 40px;
  min-width: 200px;
  line-height: 200px;
  writing-mode: tb;
  letter-spacing: 5px;
  font-size: 16px;
  color: #f60;
}
</style>



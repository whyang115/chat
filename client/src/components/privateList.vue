<template>
 <ul class="privateList">
   <li class="list" v-for="chat in privateList" :key="chat.id">
     <Avatar></Avatar>
     <div class="content">
       <p class="name"></p>
       <p class="content"></p>
     </div>
     <div class="name"></div>
   </li>
 </ul>
</template>

<script>
export default {
  data() {
    return {
      privateList: []
    };
  },

  created() {
    this.getPrivateList();
  },

  methods: {
    async getPrivateList() {
      try {
        let { data } = await this.$store.dispatch("getPrivateList");
        let { returnCode, returnMessage, privateList } = data;
        if (returnCode) {
          this.privateList = privateList;
        } else {
          this.$Message.warning();
        }
      } catch (error) {
        this.$Message.error(error);
      }
    }
  }
};
</script>


<template>
  <section>
    <div class="info">
      <ul>

      </ul>
    </div>
    <div class="setting">
      <Switch v-model="isOpenNotice" @on-change="changeNotice">
        <span slot="open">开</span>
        <span slot="close">关</span>
      </Switch>
    </div>
  </section>
</template>
<script>
export default {
  name: "setting",
  data() {
    return { isOpenNotice: false, userInfo: {} };
  },
  created() {
    this.getUserInfo();
  },
  methods: {
    changeNotice(status) {
      console.log(status);
    },
    async getUserInfo() {
      let { data } = await this.$store.dispatch("getUserInfo");
    }
  }
};
</script>


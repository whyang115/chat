<template>
  <section>
    <div class="info"></div>
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
    return { isOpenNotice: false };
  },
  methods: {
    changeNotice(status) {
      console.log(status);
    }
  }
};
</script>


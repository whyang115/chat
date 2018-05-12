<template>
  <div class="Wrap">
    <div class="info" v-show="!!info.name">
      <div class="bg"></div>
      <div class="detail">
        <p class="name">{{info.name}}</p>
        <p class="signature">{{info.signature}}</p>
        <p class="registerTime">{{info.registerTime}}</p>
        <p class="lastLoginTime">{{info.lastLoginTime}}</p>
      </div>
      <Button type="success">开始聊天</Button>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      info: {}
    };
  },
  computed: mapState({
    friendInfo: state => state.friendInfo
  })
};
</script>

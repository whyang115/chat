<template>
  <section class="settingWrap">
    <div class="info">
      <ul>
        <li>
          <p>用户名: </p>
          <Input v-model="info.name"></Input>
        </li>
        <li>
          <p>性别: </p>
          <Select v-model="info.gender">
            <Option v-for="item in genders" :value="item.gender" :key="item.gender" style="padding-left:15px"></Option>
          </Select>
        </li>
        <li>
          <p>个性签名: </p>
          <Input v-model="info.signature"></Input>
        </li>
        <li>注册时间: {{formatTime}}</li>
      </ul>
    </div>
    <div class="setting">
      <p>是否开启桌面提醒</p>
      <i-switch v-model="config.isOpenNotice" @on-change="changeNotice">
        <span slot="open">开</span>
        <span slot="close">关</span>
      </i-switch>
    </div>
    <Button type="success" long @click="updateUser">确认更新</Button>
  </section>
</template>
<script>
import { time } from "../common/time";
import { mapState } from "vuex";
export default {
  name: "SettingView",
  data() {
    return {
      info: {},
      genders: [{ gender: "未知" }, { gender: "男" }, { gender: "女" }]
    };
  },
  created() {
    this.getUserInfo();
  },
  computed: {
    formatTime() {
      console.log(this.info.registerTime);
      console.log(time.formatTime(this.info.registerTime));
      return time.formatTime(this.info.registerTime);
    },
    ...mapState({
      config: state => state.config
    })
  },
  methods: {
    changeNotice(status) {
      this.$store.commit("changeNotice", status);
    },
    updateUser() {
      let { name, gender, signature } = this.info;
      this.$store.dispatch("updateUser", { name, signature, gender });
    },
    async getUserInfo() {
      let { data } = await this.$store.dispatch("getUserInfo");
      let { returnCode, returnMessage, user } = data;
      if (returnCode) {
        this.info = user;
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.chat-box {
  position: relative;
}
.settingWrap {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 300px;
  height: 300px;
  margin: auto;
  background: #fff;
  padding: 1rem 2rem;
}
.info {
  text-align: left;
  li {
    display: flex;
    align-items: center;
    padding: 0.5rem 0;
    p {
      width: 5rem;
    }
  }
}
.setting {
  display: flex;
  align-items: center;
  margin: 1rem 0;
  p {
    margin-right: 0.5rem;
  }
}
</style>



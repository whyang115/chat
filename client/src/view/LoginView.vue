<template>
  <div class="loginWrap">
    <Avatar :src = user.avatar icon="person"></Avatar>
    <h1>{{user.name}}</h1>
    <p>{{timeJudge}}好,欢迎光临</p>
    <Form ref="form" :model="form" :rules="rules" label-position="left">
      <FormItem prop="user">
        <Input type="text" v-model="form.user" placeholder="用户名">
          <Icon type="person" slot="prepend"/>
        </Input>
      </FormItem>
      <FormItem prop="pwd">
        <Input type="password" v-model="form.pwd" placeholder="请输入密码" >
          <Icon type="locked" slot="prepend"/>
        </Input>
      </FormItem>
      <FormItem>
        <Button type="primary" long @click="login('form')">登录</Button>
      </FormItem>
      <FormItem>
         <Button long @click="register">没有账号? 去注册</Button>
      </FormItem>
    </Form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        user: "",
        pwd: ""
      },
      rules: {
        user: [{ required: true, message: "请填写用户名" }],
        pwd: [
          { required: true, message: "请填写密码" },
          { type: "string", min: 6, message: "密码不能小于６位" }
        ]
      },
      time: Date.now(),
      user: {
        name: "whyang",
        avatar:
          "http://onlzci6oa.bkt.clouddn.com/17-5-6/33331647-file_1494037395631_a205.jpg"
      }
    };
  },
  created() {
    this.timer = setInterval(() => {
      this.time = Date.now();
    }, 1000);
  },
  computed: {
    timeJudge() {
      let hour = new Date(this.time).getHours();
      if (hour >= 6 && hour <= 12) return "早上";
      if (hour > 12 && hour <= 18) return "下午";
      if (hour > 18 && hour <= 24) return "晚上";
      return "您";
    }
  },
  methods: {
    login(name) {
      console.log(this);
      this.$refs[name].validate(valid => {
        if (valid) {
          this.$Message.success("success");
          console.log(this);
          this.$store.dispatch("register", {
            name: this.form.user,
            pwd: this.form.pwd
          });
          this.$router.push("chat");
        } else {
          this.$Message.error("fail");
        }
      });
    },
    register() {
      this.$router.push("/register");
    }
  },
  destroyed() {
    clearInterval(this.timer);
  }
};
</script>

<style lang="scss" scoped>
@import "../common/common.scss";
.loginWrap {
  @include centerEntirely;
  width: 400px;
  height: 320px;
  padding: 10px 50px;
  background: rgba(255, 255, 255, 0.5);
}
</style>



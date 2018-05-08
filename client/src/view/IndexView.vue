<template>
  <section :style="{backgroundImage: `url(${src})`}">
    <h1>人生若只如初见</h1>
    <h2>Life would be perfect if every moment is just like the first met</h2>
	  <div class="loginWrap">
    <p>{{timeJudge}}好,欢迎光临</p>
    <Form ref="form" :model="form" :rules="rules" label-position="left">
      <FormItem prop="user">
        <Input type="text" v-model="form.name" autoComplete=false placeholder="用户名">
          <Icon type="person" slot="prepend"/>
        </Input>
      </FormItem>
      <FormItem prop="pwd">
        <Input type="password" v-model="form.pwd" placeholder="请输入密码" >
          <Icon type="locked" slot="prepend"/>
        </Input>
      </FormItem>
      <FormItem>
        <Button type="primary" long @click="handleClick('form')">{{this.view === "login" ? "登录":"注册"}}</Button>
      </FormItem>
      <FormItem>
         <Button long @click="handleSwitchClick">{{this.view === "login" ?"没有账号? 去注册" :"已有账号? 去登录"}}</Button>
      </FormItem>
    </Form>
  </div>
  </section>
</template>
<script>
export default {
  name: "IndexView",
  data() {
    return {
      view: "login",
      form: {
        name: "",
        pwd: ""
      },
      rules: {
        name: [{ required: true, message: "请填写用户名" }],
        pwd: [
          { required: true, message: "请填写密码" },
          { type: "string", min: 6, message: "密码不能小于６位" }
        ]
      },
      src: "http://onlzci6oa.bkt.clouddn.com/18-3-13/85686249.jpg"
    };
  },
  created() {
    this.timer = setInterval(() => {
      this.time = Date.now();
    }, 1000);
  },
  destroyed() {
    clearInterval(this.timer);
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
    handleClick(ref) {
      this.$refs[ref].validate(async valid => {
        if (valid) {
          let { name, pwd } = this[ref];
          try {
            let res = await this.$store.dispatch("userAction", {
              action: this.view,
              name,
              pwd
            });
            let { returnCode, returnMessage, user, chat } = res.data;
            if (returnCode === 1) {
              this.$store.commit("loginSuccess", { user, chat });
              this.view === "register" &&
                this.$store.commit("joinGroup", { chat });
              this.$router.push("/chat");
              this.$Message.success("登录成功,正在为您跳转");
            } else {
              this.$Message.warning(returnMessage);
            }
          } catch (error) {
            this.$Message.error(error);
          }
        }
      });
    },
    handleSwitchClick() {
      this.view === "login" ? (this.view = "register") : (this.view = "login");
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../common/common.scss";

section {
  height: 100%;
  overflow: hidden;
  background-repeat: no-repeat;
  background-size: cover;
  & > h1,
  & > h2 {
    margin-top: 40px;
    color: #fff;
  }
  & > h2 {
    margin-top: 10px;
  }
}

.start {
  margin-top: 4rem;
  padding: 1rem 1.5rem;
  background-color: #3598db;
}
.loginWrap {
  @include centerEntirely;
  width: 400px;
  height: 320px;
  padding: 10px 50px;
  background: rgba(255, 255, 255, 0.5);
}
</style>

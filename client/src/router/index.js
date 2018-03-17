import Vue from "vue";
import Router from "vue-router";
import IndexView from "@/view/IndexView";
import LoginView from "@/view/LoginView";
import RegisterView from "@/view/RegisterView";
import ChatView from "@/view/ChatView";
Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "IndexView",
      component: IndexView,
      children: [
        { path: "", component: LoginView },
        { path: "register", component: RegisterView }
      ]
    },
    {
      path: "/chat",
      name: "ChatView",
      component: ChatView
    }
  ]
});

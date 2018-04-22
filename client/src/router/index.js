import Vue from "vue";
import Router from "vue-router";
import IndexView from "@/view/IndexView";
import ChatView from "@/view/ChatView";
Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "IndexView",
      component: IndexView
    },
    {
      path: "/chat",
      name: "ChatView",
      component: ChatView
    }
  ]
});

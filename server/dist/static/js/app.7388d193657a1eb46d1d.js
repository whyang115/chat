webpackJsonp([1],{"+skl":function(t,e){},DLO9:function(t,e){},JNzn:function(t,e){},NHnr:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=s("7+uW"),r={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{attrs:{id:"app"}},[e("router-view")],1)},staticRenderFns:[]};var a=s("VU/8")({name:"App"},r,!1,function(t){s("JNzn")},null,null).exports,i=s("/ocq"),o=s("Xxa5"),c=s.n(o),u=s("exGp"),d=s.n(u),l={name:"IndexView",data:function(){return{view:"login",form:{name:"",pwd:""},rules:{name:[{required:!0,message:"请填写用户名"}],pwd:[{required:!0,message:"请填写密码"},{type:"string",min:6,message:"密码不能小于６位"}]},src:"https://wallpapers.wallhaven.cc/wallpapers/full/wallhaven-646674.jpg"}},created:function(){var t=this;this.timer=setInterval(function(){t.time=Date.now()},1e3)},destroyed:function(){clearInterval(this.timer)},computed:{timeJudge:function(){var t=new Date(this.time).getHours();return t>=6&&t<=12?"早上":t>12&&t<=18?"下午":t>18&&t<=24?"晚上":"您"}},methods:{handleClick:function(t){var e,s=this;this.$refs[t].validate((e=d()(c.a.mark(function e(n){var r,a,i,o,u,d,l,f,v;return c.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(!n){e.next=14;break}return r=s[t],a=r.name,i=r.pwd,e.prev=2,e.next=5,s.$store.dispatch("userAction",{action:s.view,name:a,pwd:i});case 5:o=e.sent,u=o.data,d=u.returnCode,l=u.returnMessage,f=u.user,v=u.chat,d?(s.$store.commit("loginSuccess",{user:f,chat:v}),"register"===s.view&&s.$socket.emit("newUser"),s.$router.push("/chat"),s.$Message.success("登录成功,正在为您跳转")):s.$Message.error(l),e.next=14;break;case 11:e.prev=11,e.t0=e.catch(2),s.$Message.error(e.t0);case 14:case"end":return e.stop()}},e,s,[[2,11]])})),function(t){return e.apply(this,arguments)}))},handleSwitchClick:function(){"login"===this.view?this.view="register":this.view="login"}}},f={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("section",{style:{backgroundImage:"url("+t.src+")"}},[s("h1",[t._v("基于Node.js的聊天室设计与实现")]),t._v(" "),s("div",{staticClass:"loginWrap"},[s("p",[t._v(t._s(t.timeJudge)+"好,欢迎光临")]),t._v(" "),s("Form",{ref:"form",attrs:{model:t.form,rules:t.rules,"label-position":"left"}},[s("FormItem",{attrs:{prop:"user"}},[s("Input",{attrs:{type:"text",id:"name",autoComplete:"false",placeholder:"用户名"},model:{value:t.form.name,callback:function(e){t.$set(t.form,"name",e)},expression:"form.name"}},[s("Icon",{attrs:{slot:"prepend",type:"person"},slot:"prepend"})],1)],1),t._v(" "),s("FormItem",{attrs:{prop:"pwd"}},[s("Input",{attrs:{type:"password",id:"pwd",placeholder:"请输入密码"},model:{value:t.form.pwd,callback:function(e){t.$set(t.form,"pwd",e)},expression:"form.pwd"}},[s("Icon",{attrs:{slot:"prepend",type:"locked"},slot:"prepend"})],1)],1),t._v(" "),s("FormItem",[s("Button",{attrs:{type:"primary",id:"action",long:""},on:{click:function(e){t.handleClick("form")}}},[t._v(t._s("login"===this.view?"登录":"注册"))])],1),t._v(" "),s("FormItem",[s("Button",{attrs:{id:this.view,long:""},on:{click:t.handleSwitchClick}},[t._v(t._s("login"===this.view?"没有账号? 去注册":"已有账号? 去登录"))])],1)],1)],1)])},staticRenderFns:[]};var v=s("VU/8")(l,f,!1,function(t){s("DLO9")},"data-v-2af8cf5e",null).exports,h=s("bOdI"),p=s.n(h),m=s("Dd8w"),g=s.n(m),_=s("NYxO"),w=function(t,e){return localStorage.setItem(t,e)},j=(s("fZjL"),{data:function(){return{}},created:function(){var t=this;this.$socket.on("userChange",function(e){t.$store.commit("userChange",{onlineUsers:e})})},computed:g()({onlineUserNum:function(){return this.$store.getters.onlineUserNum}},Object(_.b)({user:function(t){return t.user}}))}),C={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("header",[s("p",{staticClass:"welcome"},[t._v("欢迎进入聊天室")]),t._v(" "),s("p",{staticClass:"onlineUsers"},[t._v("在线人数: "+t._s(t.onlineUserNum))]),t._v(" "),s("section",[s("Avatar",{attrs:{size:"large",src:t.user.avatar}}),t._v(" "),s("p",{staticClass:"userName"},[t._v(t._s(t.user.name))])],1)])},staticRenderFns:[]};var k=s("VU/8")(j,C,!1,function(t){s("S7Qt")},"data-v-c036aae4",null).exports,x={data:function(){return{iconList:[{id:"chat",icon:"chatboxes",isActive:!0,text:"聊天列表"},{id:"friends",icon:"person-stalker",isActive:!1,text:"好友列表"},{id:"setting",icon:"gear-b",isActive:!1,text:"设置"}]}},computed:Object(_.b)({view:function(t){return t.view}}),methods:{handleClick:function(t){this.$store.commit("changeView",{view:{0:"chat",1:"friends",2:"setting"}[t]}),this.iconList.forEach(function(e,s){e.isActive=s===t})}}},y={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("ul",t._l(t.iconList,function(e,n){return s("li",{key:n,class:{active:e.id===t.view},on:{click:function(e){t.handleClick(n)}}},[s("Icon",{attrs:{type:e.icon}}),t._v(" "),s("p",[t._v(t._s(e.text))])],1)}))},staticRenderFns:[]};var I=s("VU/8")(x,y,!1,function(t){s("Y6ni")},"data-v-6ad6fed6",null).exports,$=s("PJh5"),b=s.n($),L={data:function(){return{privateList:[],activeIndex:0,isLoaded:!1}},created:function(){var t=this;this.$socket.on("privateChat",function(e){var s=e.privateId,n=e.msg;t.privateList.forEach(function(t){t._id===s&&t.msgList.push(n)})}),this.getPrivateList()},computed:Object(_.b)({user:function(t){return t.user}}),methods:{getPrivateList:function(){var t=this;return d()(c.a.mark(function e(){var s,n,r,a,i,o;return c.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,t.$store.dispatch("getPrivateList");case 3:if(s=e.sent,n=s.data,r=n.returnCode,a=n.returnMessage,i=n.privateList,t.isLoaded=!0,i.length){e.next=9;break}return e.abrupt("return");case 9:r?(t.privateList=i,o=i[0]._id,t.$store.commit("changeChat",{type:"private",id:o})):t.$Message.error(a),e.next=15;break;case 12:e.prev=12,e.t0=e.catch(0),t.$Message.error(e.t0);case 15:case"end":return e.stop()}},e,t,[[0,12]])}))()},swtichItem:function(t,e){e!==this.activeIndex&&(this.activeIndex=e,this.$store.commit("changeChat",{type:"private",id:t._id}))},getAvatar:function(t){return t.from.avatar!==this.user.avatar?t.from.avatar:t.to.avatar},getPrivateName:function(t){return t.from._id!==this.user.id?t.from.name:t.to.name},getMsgCon:function(t){if(t.msgList.length){var e=t.msgList.length-1;return t.msgList[e].content}},getMsgTime:function(t){if(t.msgList.length){var e=t.msgList.length-1,s=t.msgList[e].sendTime;return b()(s).fromNow(!0)+"前"}}}},F={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"wrap"},[t.isLoaded?t._e():s("Spin",{attrs:{size:"large",fix:""}}),t._v(" "),s("div",{directives:[{name:"show",rawName:"v-show",value:t.isLoaded,expression:"isLoaded"}],staticClass:"privateWrap"},[t.privateList.length?s("ul",t._l(t.privateList,function(e,n){return s("li",{key:e.id,staticClass:"list",class:{active:t.activeIndex===n},on:{click:function(s){t.swtichItem(e,n)}}},[s("Avatar",{attrs:{src:t.getAvatar(e)}}),t._v(" "),s("div",{staticClass:"content"},[s("div",{staticClass:"name"},[t._v(t._s(t.getPrivateName(e)))]),t._v(" "),s("div",{staticClass:"msg"},[t._v(t._s(t.getMsgCon(e)))])]),t._v(" "),s("p",{staticClass:"time"},[t._v(t._s(t.getMsgTime(e)))])],1)})):s("div",{staticClass:"empty"},[t._v("\n      当前没有聊天\n    ")])])],1)},staticRenderFns:[]};var U=s("VU/8")(L,F,!1,function(t){s("f8jT")},"data-v-2e43572a",null).exports;b.a.locale("zh-cn");var N={name:"groupList",data:function(){return{groupList:[],activeIndex:0}},created:function(){var t=this;this.$socket.on("groupChat",function(e){var s=e.groupId,n=e.msg;t.groupList.forEach(function(t){t._id===s&&t.msgList.push(n)})}),this.getGroupList()},methods:{getGroupList:function(){var t=this;return d()(c.a.mark(function e(){var s,n,r,a,i,o;return c.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,t.$store.dispatch("getGroupList");case 3:s=e.sent,n=s.data,r=n.returnCode,n.returnMessage,a=n.groupList,i=a&&a[0],o=i._id,r?(t.groupList=a,t.$store.commit("changeChat",{type:"group",id:o})):t.$Message.warning(),e.next=13;break;case 10:e.prev=10,e.t0=e.catch(0),t.$Message.error(e.t0);case 13:case"end":return e.stop()}},e,t,[[0,10]])}))()},swtichItem:function(t,e){e!==this.activeIndex&&(this.activeIndex=e,this.$store.commit("changeChat",{type:"group",id:t._id}))},getMsgCon:function(t){if(t.msgList.length){var e=t.msgList.length-1;return t.msgList[e].content}},getMsgTime:function(t){if(t.msgList.length){var e=t.msgList.length-1,s=t.msgList[e].sendTime;return b()(s).fromNow(!0)+"前"}}}},S={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("ul",{staticClass:"groupWrap"},t._l(t.groupList,function(e,n){return s("li",{key:e._id,staticClass:"list",class:{active:t.activeIndex===n},on:{click:function(s){t.swtichItem(e,n)}}},[s("Avatar",{attrs:{src:e.avatar}}),t._v(" "),s("div",{staticClass:"content"},[s("div",{staticClass:"name"},[t._v(t._s(e.name))]),t._v(" "),s("div",{staticClass:"msg"},[t._v(t._s(t.getMsgCon(e)))])]),t._v(" "),s("p",{staticClass:"time"},[t._v(t._s(t.getMsgTime(e)))])],1)}))},staticRenderFns:[]};var M={components:{PrivateList:U,GroupList:s("VU/8")(N,S,!1,function(t){s("isGh")},"data-v-01a21f93",null).exports},data:function(){return{isShowCreateGroup:!1,modalHeader:{color:"#f60",textAlign:"center"},visible:!1,isLegalGroup:!1,groupName:"",groupAnnouncement:"文明群聊,理性交流",selectedUser:[],userList:[],searchContent:"",selectedFriend:[],searchedUser:[]}},computed:g()({userExpectedSelf:function(){var t=this;return this.userList.filter(function(e){return e._id!==t.$store.state.user.id})},selectedUserExpectedSelf:function(){var t=this;return this.searchedUser.filter(function(e){return e._id!==t.$store.state.user.id})}},Object(_.b)({chat:function(t){return t.chat},user:function(t){return t.user}})),methods:{showCreateGroup:function(){var t=this;return d()(c.a.mark(function e(){var s,n,r,a,i;return c.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return t.isShowCreateGroup=!0,e.next=3,t.$store.dispatch("getAllUser");case 3:s=e.sent,n=s.data,r=n.returnCode,a=n.returnMessage,i=n.res,r?t.userList=i:t.$Message.error(a);case 7:case"end":return e.stop()}},e,t)}))()},nameAvailable:function(){var t=this;return d()(c.a.mark(function e(){var s,n,r;return c.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(t.groupName.length){e.next=2;break}return e.abrupt("return");case 2:return e.next=4,t.$store.dispatch("getGroup",{name:t.groupName});case 4:s=e.sent,n=s.data,r=n.returnCode,n.returnMessage,r?(t.$Message.error("群组名称重复"),t.groupName="",t.isLegalGroup=!1):t.isLegalGroup=!0;case 8:case"end":return e.stop()}},e,t)}))()},searchUser:function(){var t=this;return d()(c.a.mark(function e(){var s,n,r,a,i;return c.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(t.searchContent.length){e.next=3;break}return t.visible=!1,e.abrupt("return");case 3:return e.next=5,t.$store.dispatch("fuzzySearchUser",{name:t.searchContent});case 5:s=e.sent,n=s.data,r=n.res,a=n.returnCode,i=n.returnMessage,a?(t.visible=!0,t.searchedUser=r):t.$Message.error(i);case 9:case"end":return e.stop()}},e,t)}))()},addFriend:function(t){this.visible=!1,this.$store.commit("addFriend",{to:t._id})},createGroup:function(){var t=this;return d()(c.a.mark(function e(){var s,n;return c.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(t.groupName){e.next=3;break}return t.$Message.error("群组名不能为空"),e.abrupt("return");case 3:if(t.isLegalGroup){e.next=5;break}return e.abrupt("return");case 5:return e.next=7,t.$store.dispatch("createGroup",{groupName:t.groupName,groupAnnouncement:t.groupAnnouncement,selectedUser:t.selectedUser});case 7:s=e.sent,n=s.data,t.$socket.emit("welcomeGroup",{id:n.id,users:t.selectedUser}),t.$store.commit("changeChat",{type:"group",id:n.id}),t.isShowCreateGroup=!1,t.groupName="",t.selectedUser=[];case 14:case"end":return e.stop()}},e,t)}))()},cancel:function(){this.isShowCreateGroup=!1},switchChatType:function(t){this.chat.type=t}}},z={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("section",{staticClass:"chat_side"},[s("header",["group"===t.chat.type?s("div",[s("Button",{attrs:{type:"success"},on:{click:t.showCreateGroup}},[t._v("新建聊天")]),t._v(" "),s("Modal",{on:{"on-ok":t.createGroup},model:{value:t.isShowCreateGroup,callback:function(e){t.isShowCreateGroup=e},expression:"isShowCreateGroup"}},[s("p",{style:t.modalHeader,attrs:{slot:"header"},slot:"header"},[s("Icon",{attrs:{type:"person-stalker"}}),t._v(" "),s("span",[t._v("创建群组")])],1),t._v(" "),s("div",{staticClass:"content"},[s("div",{staticClass:"item"},[s("p",[t._v("群名称: ")]),t._v(" "),s("Input",{attrs:{placeholder:"群名称"},on:{"on-blur":t.nameAvailable},model:{value:t.groupName,callback:function(e){t.groupName=e},expression:"groupName"}})],1),t._v(" "),s("div",{staticClass:"item"},[s("p",[t._v("群公告: ")]),t._v(" "),s("Input",{attrs:{type:"textarea",placeholder:"群公告"},model:{value:t.groupAnnouncement,callback:function(e){t.groupAnnouncement=e},expression:"groupAnnouncement"}})],1),t._v(" "),s("div",{staticClass:"item"},[s("p",[t._v("邀请好友: ")]),t._v(" "),s("Select",{attrs:{filterable:"",multiple:""},model:{value:t.selectedUser,callback:function(e){t.selectedUser=e},expression:"selectedUser"}},t._l(t.userExpectedSelf,function(e){return s("Option",{key:e._id,attrs:{value:e._id}},[s("Avatar",{attrs:{src:e.avatar}}),t._v(" "),s("span",{staticClass:"name"},[t._v(t._s(e.name))])],1)}))],1)]),t._v(" "),s("div",{attrs:{slot:"footer"},slot:"footer"},[s("Button",{attrs:{type:"error"},on:{click:t.cancel}},[t._v("取消")]),t._v(" "),s("Button",{attrs:{type:"success"},on:{click:t.createGroup}},[t._v("创建")])],1)])],1):s("div",[s("Input",{attrs:{placeholder:"搜索好友并添加"},on:{"on-change":t.searchUser},model:{value:t.searchContent,callback:function(e){t.searchContent=e},expression:"searchContent"}},[s("Button",{attrs:{slot:"append",icon:"ios-search"},slot:"append"})],1),t._v(" "),s("Dropdown",{staticClass:"dropdownStyle",attrs:{trigger:"custom",visible:t.visible}},[s("DropdownMenu",{attrs:{slot:"list"},slot:"list"},t._l(t.selectedUserExpectedSelf,function(e,n){return s("DropdownItem",{key:n},[s("p",{staticStyle:{flex:"1","text-align":"left"},on:{click:function(s){t.addFriend(e)}}},[s("Avatar",{attrs:{src:e.avatar}}),t._v(" "),s("span",{staticClass:"name"},[t._v(t._s(e.name))])],1)])}))],1)],1)]),t._v(" "),s("div",{staticClass:"control"},[s("p",{class:{active:"group"===t.chat.type},on:{click:function(e){t.switchChatType("group")}}},[t._v("群组聊天")]),t._v(" "),s("p",{class:{active:"private"===t.chat.type},on:{click:function(e){t.switchChatType("private")}}},[t._v("好友聊天")])]),t._v(" "),"group"===t.chat.type?s("section",{key:t.chat.id,staticClass:"chat"},[s("group-list")],1):s("section",{key:t.chat.id,staticClass:"chat"},[s("private-list")],1)])},staticRenderFns:[]};var O=s("VU/8")(M,z,!1,function(t){s("qZBg")},"data-v-353c73c6",null).exports,A={data:function(){return{friends:[]}},created:function(){this.getFriends()},computed:{haveFriends:function(){return this.friends.length}},methods:{getFriends:function(){var t=this;return d()(c.a.mark(function e(){var s,n,r,a,i;return c.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,t.$store.dispatch("getFriends");case 3:s=e.sent,n=s.data,r=n.returnCode,a=n.returnMessage,i=n.friends,r?t.friends=i:t.$Message.warning(a),e.next=12;break;case 9:e.prev=9,e.t0=e.catch(0),t.$Message.error(e.t0);case 12:case"end":return e.stop()}},e,t,[[0,9]])}))()},getFriendInfo:function(t){var e=this;return d()(c.a.mark(function s(){var n,r,a,i,o;return c.a.wrap(function(s){for(;;)switch(s.prev=s.next){case 0:return s.next=2,e.$store.dispatch("getUserInfo",t);case 2:n=s.sent,r=n.data,a=r.returnCode,i=r.returnMessage,o=r.user,a?e.$store.commit("showFriendInfo",{info:o}):e.$Message.error(i);case 6:case"end":return s.stop()}},s,e)}))()}}},T={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return t.haveFriends?s("ul",{staticClass:"friendList"},t._l(t.friends,function(e){return s("li",{key:e.id,staticClass:"list",on:{click:function(s){t.getFriendInfo(e._id)}}},[s("Avatar",{attrs:{src:e.avatar}}),t._v(" "),s("div",{staticClass:"content"},[s("p",{staticClass:"name"},[t._v(t._s(e.name))]),t._v(" "),s("p",{staticClass:"signature"},[t._v(t._s(e.signature))])])],1)})):s("div",{staticClass:"empty"},[t._v("其实你可以更主动一些的")])},staticRenderFns:[]};var E=s("VU/8")(A,T,!1,function(t){s("az1S")},"data-v-76a58927",null).exports;b.a.locale("zh-cn");var G=function(t){return b()(t).format("YYYY MMMM Do a h:mm:ss ")},R={data:function(){return{}},computed:g()({formatRegisterTime:function(){return G(this.friendInfo.registerTime)},formatLastLoginTime:function(){return G(this.friendInfo.lastLoginTime)}},Object(_.b)({friendInfo:function(t){return t.friendInfo},user:function(t){return t.user}})),methods:{chatTo:function(t){this.$socket.emit("chatToFriend",{from:this.user.id,to:t})}}},V={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{directives:[{name:"show",rawName:"v-show",value:!!t.friendInfo.name,expression:"!!friendInfo.name"}],staticClass:"wrap"},[s("div",{staticClass:"friendInfo"},[s("div",{staticClass:"bg"},[s("img",{attrs:{src:t.friendInfo.avatar}})]),t._v(" "),s("p",{staticClass:"name"},[t._v(t._s(t.friendInfo.name))]),t._v(" "),s("p",{staticClass:"signature"},[t._v(" "+t._s(t.friendInfo.signature))]),t._v(" "),s("div",{staticClass:"detail"},[s("p",{staticClass:"registerTime"},[t._v("注册时间: "+t._s(t.formatRegisterTime))]),t._v(" "),s("p",{staticClass:"lastLoginTime"},[t._v("最后登录时间: "+t._s(t.formatLastLoginTime))])]),t._v(" "),s("Button",{attrs:{type:"success",long:""},on:{click:function(e){t.chatTo(t.friendInfo._id)}}},[t._v("开始聊天")])],1)])},staticRenderFns:[]};var P=s("VU/8")(R,V,!1,function(t){s("b/iO")},"data-v-71cb0868",null).exports,q={data:function(){return{sendContent:"",userInfoStyle:{left:0},activeIndex:null,chatInfo:{},showEmoij:!1,emoijs:["😂","🙏","😄","😏","😇","😅","😌","😘","😍","🤓","😜","😎","😊","😳","🙄","😱","😒","😔","😷","👿","🤗","😩","😤","😣","😰","😴","😬","😭","👻","👍","✌️","👉","👀","🐶","🐷","😹","⚡️","🔥","🌈","🍏","⚽️","❤️","🇨🇳"]}},created:function(){this.getChat()},mounted:function(){this.handleScroll()},computed:g()({msgList:function(){return this.chatInfo.msgList},chatName:function(){var t=this.chatInfo,e=t.from,s=(t.to,this.user.id);return"private"===this.chat.type&&e?e._id===s?this.chatInfo.to.name:this.chatInfo.from.name:this.chatInfo.name}},Object(_.b)({user:function(t){return t.user},chat:function(t){return t.chat}})),methods:{getChat:function(){var t=this;return d()(c.a.mark(function e(){var s,n,r,a,i;return c.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,t.$store.dispatch("getChat");case 3:s=e.sent,n=s.data,r=n.returnCode,a=n.returnMessage,i=n.res,r?t.chatInfo=i:t.$Message.error(a),e.next=12;break;case 9:e.prev=9,e.t0=e.catch(0),t.$Message.error(e.t0);case 12:case"end":return e.stop()}},e,t,[[0,9]])}))()},sendChat:function(){var t=this;if(this.sendContent){var e=void 0;e="private"===this.chat.type?this.chatInfo.to._id===this.user.id?this.chatInfo.from:this.chatInfo.to:this.chatInfo._id,this.$store.commit("sendChat",{content:this.sendContent,to:e}),setTimeout(function(){t.handleScroll()},0),this.sendContent=""}else this.$Message.error("发送内容不能为空")},onUserInfoHover:function(t,e){if(console.log(this.chat),"private"!==this.chat.type){var s=this.$refs.msgItem[e].offsetTop,n=(this.$refs.chatRoom.offsetHeight,this.$refs.chatRoom.scrollTop);t.from._id!==this.user.id&&(this.activeIndex=e);var r=s-n>240?-124:48;this.userInfoStyle={left:0,top:r+"px"}}},onUserInfoOut:function(t,e){this.activeIndex=null},addEmoij:function(t){this.sendContent+=t},addFriend:function(t,e){this.$store.commit("addFriend",{to:t.from._id}),this.onUserInfoOut(t,e)},handleScroll:function(){var t=this.$refs.chatRoom;t.scrollTop=t.scrollHeight-t.offsetTop}},watch:{chat:function(){this.getChat()},chatInfo:function(){var t=this;setTimeout(function(){t.handleScroll()},0)}}},B={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("section",{staticClass:"chat-content"},[s("section",{staticClass:"chat-room"},[s("h3",[t._v(t._s(t.chatName))]),t._v(" "),s("ul",{ref:"chatRoom"},t._l(t.msgList,function(e,n){return s("li",{key:n,ref:"msgItem",refInFor:!0,class:e.from._id===t.user.id?"self":"other"},[s("div",{staticClass:"avatarBox",on:{mouseover:function(s){t.onUserInfoHover(e,n)},mouseout:function(s){t.onUserInfoOut(e,n)}}},[s("div",{directives:[{name:"show",rawName:"v-show",value:n===t.activeIndex,expression:"index === activeIndex"}],staticClass:"userInfo",style:t.userInfoStyle},[s("Avatar",{attrs:{src:e.from.avatar,size:"large"}}),t._v(" "),s("div",{staticClass:"name"},[t._v(t._s(e.from.name))]),t._v(" "),s("div",{staticClass:"operation"},[s("div",{staticClass:"beFriend",on:{click:function(s){t.addFriend(e,n)}}},[t._v("加为好友")])])],1),t._v(" "),s("Avatar",{attrs:{src:e.from.avatar}})],1),t._v(" "),s("p",[t._v(t._s(e.content))])])}))]),t._v(" "),s("ul",{directives:[{name:"show",rawName:"v-show",value:t.showEmoij,expression:"showEmoij"}],staticClass:"emoijWrap"},t._l(t.emoijs,function(e){return s("li",{key:e,on:{click:function(s){t.addEmoij(e)}}},[t._v(t._s(e))])})),t._v(" "),s("section",{staticClass:"chat-input",on:{keydown:function(e){return"button"in e||!t._k(e.keyCode,"enter",13,e.key,"Enter")?t.sendChat(e):null}}},[s("Icon",{staticClass:"icon-emoij",attrs:{type:"android-happy"},nativeOn:{click:function(e){t.showEmoij=!t.showEmoij}}}),t._v(" "),s("input",{directives:[{name:"model",rawName:"v-model",value:t.sendContent,expression:"sendContent"}],attrs:{placeholder:"请输入你想说的话 ~ ~"},domProps:{value:t.sendContent},on:{focus:function(e){t.showEmoij=!1},input:function(e){e.target.composing||(t.sendContent=e.target.value)}}}),t._v(" "),s("Icon",{staticClass:"icon-send",attrs:{type:"android-send"},nativeOn:{click:function(e){return t.sendChat(e)}}})],1)])},staticRenderFns:[]};var H=s("VU/8")(q,B,!1,function(t){s("p2dR")},"data-v-993c785a",null).exports,W={name:"SettingView",data:function(){return{info:{},genders:[{gender:"未知"},{gender:"男"},{gender:"女"}]}},created:function(){this.getUserInfo()},computed:g()({formatTime:function(){return G(this.info.registerTime)}},Object(_.b)({config:function(t){return t.config}})),methods:{changeNotice:function(t){this.$store.commit("changeNotice",t)},updateUser:function(){var t=this.info,e=t.name,s=t.gender,n=t.signature;this.$store.dispatch("updateUser",{name:e,signature:n,gender:s})},getUserInfo:function(){var t=this;return d()(c.a.mark(function e(){var s,n,r,a;return c.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.$store.dispatch("getUserInfo");case 2:s=e.sent,n=s.data,r=n.returnCode,n.returnMessage,a=n.user,r&&(t.info=a);case 6:case"end":return e.stop()}},e,t)}))()}}},D={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("section",{staticClass:"settingWrap"},[s("div",{staticClass:"info"},[s("ul",[s("li",[s("p",[t._v("用户名: ")]),t._v(" "),s("Input",{model:{value:t.info.name,callback:function(e){t.$set(t.info,"name",e)},expression:"info.name"}})],1),t._v(" "),s("li",[s("p",[t._v("性别: ")]),t._v(" "),s("Select",{model:{value:t.info.gender,callback:function(e){t.$set(t.info,"gender",e)},expression:"info.gender"}},t._l(t.genders,function(t){return s("Option",{key:t.gender,staticStyle:{"padding-left":"15px"},attrs:{value:t.gender}})}))],1),t._v(" "),s("li",[s("p",[t._v("个性签名: ")]),t._v(" "),s("Input",{model:{value:t.info.signature,callback:function(e){t.$set(t.info,"signature",e)},expression:"info.signature"}})],1),t._v(" "),s("li",[t._v("注册时间: "+t._s(t.formatTime))])])]),t._v(" "),s("div",{staticClass:"setting"},[s("p",[t._v("是否开启桌面提醒")]),t._v(" "),s("i-switch",{on:{"on-change":t.changeNotice},model:{value:t.config.isOpenNotice,callback:function(e){t.$set(t.config,"isOpenNotice",e)},expression:"config.isOpenNotice"}},[s("span",{attrs:{slot:"open"},slot:"open"},[t._v("开")]),t._v(" "),s("span",{attrs:{slot:"close"},slot:"close"},[t._v("关")])])],1),t._v(" "),s("Button",{attrs:{type:"success",long:""},on:{click:t.updateUser}},[t._v("确认更新")])],1)},staticRenderFns:[]};var X,J=(X={components:{ChatHeader:k,ChatMenu:I,ChatSide:O,ChatMessage:H,FriendList:E,FriendInfo:P,SettingView:s("VU/8")(W,D,!1,function(t){s("QW1w")},"data-v-03cad381",null).exports},data:function(){return{showAddFriend:!1,isAccept:null,from:{}}},computed:Object(_.b)({user:function(t){return t.user}}),created:function(){var t=this;this.$socket.on("groupChat",function(e){t.$store.commit("changeChat",{type:"group",id:e.groupId}),Notification.requestPermission(function(s){if("denied"!==s&&t.$store.state.config.isOpenNotice&&e.msg.from._id!==t.$store.state.user.id){var n=new Notification(e.msg.from.name+"在"+e.msg.to.name+"发送一条新消息",{body:e.msg.content,tag:e.msg.from,icon:e.msg.to.avatar});n.onclick=function(){n.close()},setTimeout(function(){n.close()},2e3)}})}),this.$socket.on("privateChat",function(e){t.$store.commit("changeChat",{type:"private",id:e.privateId}),Notification.requestPermission(function(s){if("denied"!==s&&t.$store.state.config.isOpenNotice&&e.msg.from._id!==t.$store.state.user.id){var n=new Notification(e.msg.from.name+"向您发来一条新消息",{body:e.msg.content,tag:e.msg.from,icon:e.msg.from.avatar});n.onclick=function(){n.close()},setTimeout(function(){n.close()},2e3)}})}),this.$socket.on("inviteGroup",function(e){t.$store.commit("changeChat",{type:"group",id:e})}),this.$socket.on("addFriend",function(e){var s=e.from;t.from=s,t.showAddFriend=!0}),this.$socket.on("repeatAddFriend",function(){t.$Notice.destroy(),t.$Notice.error({title:"该用户已是您的好友,无须重复添加",duration:2})}),this.$socket.on("addFriendSuccess",function(e){e.from;var s=e.to,n=e.id;t.$Notice.destroy(),t.$Notice.success({title:s.name+" 同意了您的好友请求, 快去聊聊吧",duration:2}),t.$store.commit("changeChat",{type:"private",id:n})}),this.$socket.on("addFriendFail",function(e){var s=e.from;e.to;t.$Notice.destroy(),t.$Notice.error({title:s.name+" 拒绝您的添加好友请求",duration:2})}),this.$socket.on("chatToFriend",function(e){var s=e.id;t.$store.commit("changeChat",{type:"private",id:s}),t.$store.commit("changeView",{view:"chat"})}),this.$store.commit("readStorage","user"),this.$store.commit("readStorage","chat"),this.$store.commit("readStorage","config"),this.$store.commit("joinGroup")}},p()(X,"computed",{view:function(){return this.$store.state.view}}),p()(X,"methods",{accept:function(){this.showAddFriend=!1,this.isAccept=!0,this.$socket.emit("addFriendRes",{from:this.from,to:this.$store.state.user,isAccept:!0}),this.$Message.success("已同意")},refuse:function(){this.showAddFriend=!1,this.isAccept=!1,this.$Message.warning("已拒绝"),this.$socket.emit("addFriendRes",{from:this.from,to:this.$store.state.user,isAccept:!1})}}),X),Q={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"chat-view"},[s("chat-header"),t._v(" "),s("chat-menu"),t._v(" "),s("Modal",{staticStyle:{"max-width":"300px"},model:{value:t.showAddFriend,callback:function(e){t.showAddFriend=e},expression:"showAddFriend"}},[s("p",{staticStyle:{"text-align":"center"},attrs:{slot:"header"},slot:"header"},[s("Icon",{attrs:{type:"person-add"}}),t._v(" "),s("span",[t._v(t._s("您有一个来自"+t.from.name+"的好友申请"))])],1),t._v(" "),s("div",{staticStyle:{"text-align":"center"}},[s("Avatar",{attrs:{src:t.from.avatar}}),t._v(" "),s("p",[t._v(t._s(t.from.name)+"请求加您为好友,是否同意")])],1),t._v(" "),s("p",{attrs:{slot:"footer"},slot:"footer"},[s("Button",{attrs:{type:"error"},on:{click:t.refuse}},[t._v("无情拒绝")]),t._v(" "),s("Button",{attrs:{type:"success"},on:{click:t.accept}},[t._v("欣然同意")])],1)]),t._v(" "),"chat"===t.view?s("section",{staticClass:"chat-box"},[s("chat-side"),t._v(" "),s("chat-message")],1):"friends"===t.view?s("section",{staticClass:"chat-box"},[s("friend-list"),t._v(" "),s("friend-info")],1):s("section",{staticClass:"chat-box"},[s("setting-view")],1)],1)},staticRenderFns:[]};var Y=s("VU/8")(J,Q,!1,function(t){s("TiKW")},"data-v-b065002a",null).exports;n.default.use(i.a);var K=new i.a({routes:[{path:"/",name:"IndexView",component:v},{path:"/chat",name:"ChatView",component:Y}]}),Z=s("mvHQ"),tt=s.n(Z),et=s("mtWM"),st=s.n(et);n.default.use(_.a);var nt=window.io.connect("http://localhost:1105");n.default.prototype.$socket=nt;var rt=new _.a.Store({state:{view:"chat",socket:{},user:{},chat:{},config:{isOpenNotice:!0},friendInfo:{},onlineUsers:[]},getters:{onlineUserNum:function(t){return t.onlineUsers.length}},mutations:{loginSuccess:function(t,e){var s=e.user,n=e.chat;t.user=s,t.chat=n,w("user",tt()(s)),w("chat",tt()(n)),nt.emit("joinSelf",{id:rt.state.user.id})},joinGroup:function(t){nt.emit("joinGroup",{id:t.user.id})},readStorage:function(t,e){var s=JSON.parse(function(t){return localStorage.getItem(t)}(e));s&&(t[e]=s)},sendChat:function(t,e){var s=e.content,n=e.to;nt.emit("chat",{content:s,to:n,chat:t.chat,from:t.user.id,isShowUserInfo:!1,isRead:!1,sendTime:new Date})},changeView:function(t,e){var s=e.view;t.view=s},changeChat:function(t,e){t.chat=e},updateSocket:function(t,e){var s=e.socketId;t.user.socketId=s,nt.emit("updateSocket",{userId:t.user.id,socketId:s})},addFriend:function(t,e){var s=e.to;nt.emit("addFriend",{from:t.user,to:s})},changeNotice:function(t,e){t.config.isOpenNotice=e,w("config",tt()(t.config))},showFriendInfo:function(t,e){var s=e.info;t.friendInfo=s},userChange:function(t,e){var s=e.onlineUsers;t.onlineUsers=s}},actions:{userAction:function(t,e){t.state;var s=e.action,n=e.name,r=e.pwd;return st.a.post("/api/"+s,{name:n,pwd:r,time:new Date,socketId:nt.id})},getChat:function(t){var e=t.state;return st.a.get("/api/chat",{params:e.chat})},getGroupList:function(t){var e=t.state;return st.a.get("/api/groupList",{params:{id:e.user.id}})},getPrivateList:function(t){var e=t.state;return st.a.get("/api/privateList",{params:{id:e.user.id}})},getFriends:function(t){var e=t.state;return st.a.get("/api/friends",{params:{id:e.user.id}})},getUserInfo:function(t,e){var s=t.state;return st.a.get("/api/user",{params:{id:e||s.user.id}})},updateUser:function(t,e){var s=t.state,n=e.name,r=e.gender,a=e.signature;st.a.post("/api/user",{id:s.user.id,name:n,gender:r,signature:a})},createGroup:function(t,e){var s=t.state;return e.id=s.user.id,st.a.post("/api/group",e)},getGroup:function(t,e){t.state;var s=e.name;return st.a.get("/api/group",{params:{name:s}})},getAllUser:function(){return st.a.get("/api/allUser")},fuzzySearchUser:function(t,e){t.state;var s=e.name;return st.a.get("/api/fuzzyUser",{params:{name:s}})}}});nt.on("connect",function(){rt.state.user.id&&(nt.emit("joinSelf",{id:rt.state.user.id}),nt.emit("getOnlineUsers"))}),window.onunload=function(){nt.emit("disConnect",{id:rt.state.user.id})};var at=rt,it=s("BTaQ"),ot=s.n(it),ct=(s("+skl"),s("9JMe"));Object(ct.sync)(at,K);n.default.use(ot.a),n.default.config.productionTip=!1,new n.default({el:"#app",router:K,store:at,components:{App:a},template:"<App/>"})},QW1w:function(t,e){},S7Qt:function(t,e){},TiKW:function(t,e){},Y6ni:function(t,e){},az1S:function(t,e){},"b/iO":function(t,e){},f8jT:function(t,e){},isGh:function(t,e){},p2dR:function(t,e){},qZBg:function(t,e){},uslO:function(t,e,s){var n={"./af":"3CJN","./af.js":"3CJN","./ar":"3MVc","./ar-dz":"tkWw","./ar-dz.js":"tkWw","./ar-kw":"j8cJ","./ar-kw.js":"j8cJ","./ar-ly":"wPpW","./ar-ly.js":"wPpW","./ar-ma":"dURR","./ar-ma.js":"dURR","./ar-sa":"7OnE","./ar-sa.js":"7OnE","./ar-tn":"BEem","./ar-tn.js":"BEem","./ar.js":"3MVc","./az":"eHwN","./az.js":"eHwN","./be":"3hfc","./be.js":"3hfc","./bg":"lOED","./bg.js":"lOED","./bm":"hng5","./bm.js":"hng5","./bn":"aM0x","./bn.js":"aM0x","./bo":"w2Hs","./bo.js":"w2Hs","./br":"OSsP","./br.js":"OSsP","./bs":"aqvp","./bs.js":"aqvp","./ca":"wIgY","./ca.js":"wIgY","./cs":"ssxj","./cs.js":"ssxj","./cv":"N3vo","./cv.js":"N3vo","./cy":"ZFGz","./cy.js":"ZFGz","./da":"YBA/","./da.js":"YBA/","./de":"DOkx","./de-at":"8v14","./de-at.js":"8v14","./de-ch":"Frex","./de-ch.js":"Frex","./de.js":"DOkx","./dv":"rIuo","./dv.js":"rIuo","./el":"CFqe","./el.js":"CFqe","./en-au":"Sjoy","./en-au.js":"Sjoy","./en-ca":"Tqun","./en-ca.js":"Tqun","./en-gb":"hPuz","./en-gb.js":"hPuz","./en-ie":"ALEw","./en-ie.js":"ALEw","./en-il":"QZk1","./en-il.js":"QZk1","./en-nz":"dyB6","./en-nz.js":"dyB6","./eo":"Nd3h","./eo.js":"Nd3h","./es":"LT9G","./es-do":"7MHZ","./es-do.js":"7MHZ","./es-us":"INcR","./es-us.js":"INcR","./es.js":"LT9G","./et":"XlWM","./et.js":"XlWM","./eu":"sqLM","./eu.js":"sqLM","./fa":"2pmY","./fa.js":"2pmY","./fi":"nS2h","./fi.js":"nS2h","./fo":"OVPi","./fo.js":"OVPi","./fr":"tzHd","./fr-ca":"bXQP","./fr-ca.js":"bXQP","./fr-ch":"VK9h","./fr-ch.js":"VK9h","./fr.js":"tzHd","./fy":"g7KF","./fy.js":"g7KF","./gd":"nLOz","./gd.js":"nLOz","./gl":"FuaP","./gl.js":"FuaP","./gom-latn":"+27R","./gom-latn.js":"+27R","./gu":"rtsW","./gu.js":"rtsW","./he":"Nzt2","./he.js":"Nzt2","./hi":"ETHv","./hi.js":"ETHv","./hr":"V4qH","./hr.js":"V4qH","./hu":"xne+","./hu.js":"xne+","./hy-am":"GrS7","./hy-am.js":"GrS7","./id":"yRTJ","./id.js":"yRTJ","./is":"upln","./is.js":"upln","./it":"FKXc","./it.js":"FKXc","./ja":"ORgI","./ja.js":"ORgI","./jv":"JwiF","./jv.js":"JwiF","./ka":"RnJI","./ka.js":"RnJI","./kk":"j+vx","./kk.js":"j+vx","./km":"5j66","./km.js":"5j66","./kn":"gEQe","./kn.js":"gEQe","./ko":"eBB/","./ko.js":"eBB/","./ky":"6cf8","./ky.js":"6cf8","./lb":"z3hR","./lb.js":"z3hR","./lo":"nE8X","./lo.js":"nE8X","./lt":"/6P1","./lt.js":"/6P1","./lv":"jxEH","./lv.js":"jxEH","./me":"svD2","./me.js":"svD2","./mi":"gEU3","./mi.js":"gEU3","./mk":"Ab7C","./mk.js":"Ab7C","./ml":"oo1B","./ml.js":"oo1B","./mn":"CqHt","./mn.js":"CqHt","./mr":"5vPg","./mr.js":"5vPg","./ms":"ooba","./ms-my":"G++c","./ms-my.js":"G++c","./ms.js":"ooba","./mt":"oCzW","./mt.js":"oCzW","./my":"F+2e","./my.js":"F+2e","./nb":"FlzV","./nb.js":"FlzV","./ne":"/mhn","./ne.js":"/mhn","./nl":"3K28","./nl-be":"Bp2f","./nl-be.js":"Bp2f","./nl.js":"3K28","./nn":"C7av","./nn.js":"C7av","./pa-in":"pfs9","./pa-in.js":"pfs9","./pl":"7LV+","./pl.js":"7LV+","./pt":"ZoSI","./pt-br":"AoDM","./pt-br.js":"AoDM","./pt.js":"ZoSI","./ro":"wT5f","./ro.js":"wT5f","./ru":"ulq9","./ru.js":"ulq9","./sd":"fW1y","./sd.js":"fW1y","./se":"5Omq","./se.js":"5Omq","./si":"Lgqo","./si.js":"Lgqo","./sk":"OUMt","./sk.js":"OUMt","./sl":"2s1U","./sl.js":"2s1U","./sq":"V0td","./sq.js":"V0td","./sr":"f4W3","./sr-cyrl":"c1x4","./sr-cyrl.js":"c1x4","./sr.js":"f4W3","./ss":"7Q8x","./ss.js":"7Q8x","./sv":"Fpqq","./sv.js":"Fpqq","./sw":"DSXN","./sw.js":"DSXN","./ta":"+7/x","./ta.js":"+7/x","./te":"Nlnz","./te.js":"Nlnz","./tet":"gUgh","./tet.js":"gUgh","./tg":"5SNd","./tg.js":"5SNd","./th":"XzD+","./th.js":"XzD+","./tl-ph":"3LKG","./tl-ph.js":"3LKG","./tlh":"m7yE","./tlh.js":"m7yE","./tr":"k+5o","./tr.js":"k+5o","./tzl":"iNtv","./tzl.js":"iNtv","./tzm":"FRPF","./tzm-latn":"krPU","./tzm-latn.js":"krPU","./tzm.js":"FRPF","./ug-cn":"To0v","./ug-cn.js":"To0v","./uk":"ntHu","./uk.js":"ntHu","./ur":"uSe8","./ur.js":"uSe8","./uz":"XU1s","./uz-latn":"/bsm","./uz-latn.js":"/bsm","./uz.js":"XU1s","./vi":"0X8Q","./vi.js":"0X8Q","./x-pseudo":"e/KL","./x-pseudo.js":"e/KL","./yo":"YXlc","./yo.js":"YXlc","./zh-cn":"Vz2w","./zh-cn.js":"Vz2w","./zh-hk":"ZUyn","./zh-hk.js":"ZUyn","./zh-tw":"BbgG","./zh-tw.js":"BbgG"};function r(t){return s(a(t))}function a(t){var e=n[t];if(!(e+1))throw new Error("Cannot find module '"+t+"'.");return e}r.keys=function(){return Object.keys(n)},r.resolve=a,t.exports=r,r.id="uslO"}},["NHnr"]);
//# sourceMappingURL=app.7388d193657a1eb46d1d.js.map
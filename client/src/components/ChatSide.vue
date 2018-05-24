<template>
  <section class="chat_side">
    <header>
      <div v-if="chat.type==='group'">
        <Button type="success" @click="showCreateGroup">新建聊天</Button>
        <Modal v-model="isShowCreateGroup" @on-ok="createGroup">
          <p slot="header" :style="modalHeader">
            <Icon type="person-stalker"></Icon>
            <span>创建群组</span>
          </p>
          <div class="content">
            <div class="item">
              <p>群名称: </p>
              <Input v-model="groupName" @on-blur="nameAvailable" placeholder="群名称"></Input>
            </div>
            <div class="item">
              <p>群公告: </p>
              <Input type="textarea" v-model="groupAnnouncement" placeholder="群公告"></Input>
            </div>
            <div class="item">
              <p>邀请好友: </p>
              <Select v-model="selectedUser" filterable multiple>
                <Option v-for="item in userExpectedSelf" :value="item._id" :key="item._id">
                  <Avatar :src="item.avatar"></Avatar>
                  <span class="name">{{item.name}}</span>
                </Option>
              </Select>
            </div>
          </div>
          <div slot="footer">
            <Button @click="cancel" type="error">取消</Button>
            <Button type="success" @click="createGroup">创建</Button>
          </div>
        </Modal>
      </div>
      <div v-else>
        <Input v-model="searchContent" @on-change="searchUser" placeholder="搜索好友并添加">
        <Button slot="append" icon="ios-search"></Button>
        </Input>
        <Dropdown trigger="custom" :visible="visible" class="dropdownStyle">
          <DropdownMenu slot="list">
            <DropdownItem v-for="(item,index) in selectedUserExpectedSelf" :key="index">
              <p @click="addFriend(item)" style="flex:1;text-align: left">
                <Avatar :src="item.avatar"></Avatar>
                <span class="name">{{item.name}}</span>
              </p>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    </header>
    <div class="control">
      <p @click="switchChatType('group')" :class="{active: 'group' === chat.type}">群组聊天</p>
      <p @click="switchChatType('private')" :class="{active: 'private' === chat.type}">好友聊天</p>
    </div>
    <section v-if="chat.type === 'group'" class="chat">
      <group-list></group-list>
    </section>
    <section v-else class="chat">
      <private-list></private-list>
    </section>
  </section>
</template>
<script>
import PrivateList from "./PrivateList";
import GroupList from "./GroupList";
import { mapState } from "vuex";
export default {
  components: { PrivateList, GroupList },
  data() {
    return {
      isShowCreateGroup: false,
      modalHeader: {
        color: "#f60",
        textAlign: "center"
      },
      visible: false,
      isLegalGroup: false,
      groupName: "",
      groupAnnouncement: "文明群聊,理性交流",
      selectedUser: [],
      userList: [],
      searchContent: "",
      selectedFriend: [],
      searchedUser: []
    };
  },
  computed: {
    userExpectedSelf() {
      return this.userList.filter(
        item => item._id !== this.$store.state.user.id
      );
    },
    selectedUserExpectedSelf() {
      return this.searchedUser.filter(
        item => item._id !== this.$store.state.user.id
      );
    },
    ...mapState({ chat: state => state.chat, user: state => state.user })
  },
  methods: {
    async showCreateGroup() {
      this.isShowCreateGroup = true;
      let { data } = await this.$store.dispatch("getAllUser");
      let { returnCode, returnMessage, res } = data;
      if (returnCode) {
        this.userList = res;
      } else {
        this.$Message.error(returnMessage);
      }
    },
    async nameAvailable() {
      if (!this.groupName.length) return;
      let { data } = await this.$store.dispatch("getGroup", {
        name: this.groupName
      });
      let { returnCode, returnMessage } = data;
      if (returnCode) {
        this.$Message.error("群组名称重复");
        this.groupName = "";
        this.isLegalGroup = false;
      } else {
        this.isLegalGroup = true;
      }
    },
    async searchUser() {
      if (!this.searchContent.length) {
        this.visible = false;
        return;
      }
      let { data } = await this.$store.dispatch("fuzzySearchUser", {
        name: this.searchContent
      });
      let { res, returnCode, returnMessage } = data;
      if (returnCode) {
        this.visible = true;
        this.searchedUser = res;
      } else {
        this.$Message.error(returnMessage);
      }
    },
    addFriend(item) {
      this.visible = false;
      this.$store.commit("addFriend", { to: item._id });
    },
    async createGroup() {
      if (!this.groupName) {
        this.$Message.error("群组名不能为空");
        return;
      }
      if (!this.isLegalGroup) return;
      let { data } = await this.$store.dispatch("createGroup", {
        groupName: this.groupName,
        groupAnnouncement: this.groupAnnouncement,
        selectedUser: this.selectedUser
      });
      this.$store.commit("changeChat", { type: "group", id: data.id });
      this.isShowCreateGroup = false;
    },
    cancel() {
      this.isShowCreateGroup = false;
    },
    switchChatType(type) {
      this.chat.type = type;
    }
  }
};
</script>

<style lang="scss" scoped>
.chat_side {
  width: 18rem;
  margin: 0 3rem;
  background-color: #fff;
  header {
    position: relative;
  }
  li {
    display: flex;
    align-items: center;
    padding: 0.5rem;
    .content {
      flex: 1;
      padding-left: 1rem;
      p {
        text-align: left;
      }
      .name {
        font-size: 16px;
        color: #000;
      }
      .last_msg {
        font-size: 12px;
        color: #999;
      }
    }
    .info {
      width: 40px;
    }
  }
}
.control {
  display: flex;
  align-items: center;
  p {
    flex: 1;
    padding: 10px 0;
    text-align: center;
    cursor: pointer;
    &.active {
      color: #fff;
      background-color: rgba(53, 152, 219, 0.8);
    }
  }
}
.commonGroup {
  padding: 1rem 0.5rem;
  display: flex;
  align-items: center;
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
  cursor: pointer;
  span {
    margin-right: 20px;
  }
}
header {
  padding: 1rem 0;
}
.content {
  .item {
    margin: 1.5rem 0;
    p {
      margin: 0.5rem 0;
    }
  }
}
span.name {
  margin-left: 1rem;
}
.dropdownStyle {
  width: 289px;
  position: absolute;
  top: 44px;
  left: 0;
}
</style>



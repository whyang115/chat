<template>
  <ul class="groupWrap">
    <li v-for="group in groupList" :key="group.id">
      <Avatar :src="group.avatar"></Avatar>
      <div class="content">
        <div class="name">{{group.name}}</div>
        <div class="msg">{{group.msg}}</div>
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  name: "groupList",
  data() {
    return {
      groupList: []
    };
  }
};
</script>


<template>
  <section :style="{backgroundImage: `url(${src})`}">
    <h1>人生若只如初见</h1>
    <h2>Life would be perfect if every moment is just like the first met</h2>
		<router-view></router-view>
  </section>
</template>
<script>
export default {
  name: "IndexView",
  data() {
    return {
      src: "http://onlzci6oa.bkt.clouddn.com/18-3-13/85686249.jpg"
    };
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
section {
  height: 100%;
  overflow: hidden;
  background-repeat: no-repeat;
  background-size: cover;
}

h1,
h2 {
  margin-top: 10%;
  color: #fff;
}
h2 {
  margin-top: 10px;
}
.start {
  margin-top: 4rem;
  padding: 1rem 1.5rem;
  background-color: #3598db;
}
</style>

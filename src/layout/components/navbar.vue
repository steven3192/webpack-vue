<template>
  <div class="navbar-container">
    <el-button
      class="list-btn"
      type="primary"
      plain
      @click.native.prevent="handleSignOut"
    >退出</el-button>
  </div>
</template>
<script>
export default {
  name: "Sidebar",
  data() {
    return {
      menuList: []
    };
  },
  methods: {
    // 退出
    handleSignOut() {
      localStorage.removeItem("token");
      this.$router.push("/login");
    }
  },
  created() {},
  computed: {}
};
</script>
<style lang="scss">
.navbar-container {
  margin-bottom: 10px;
  padding-right: 10px;
  background-color: #eee;
  text-align: right;
  border-radius: 5px;
}
</style>
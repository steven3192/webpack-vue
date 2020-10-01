<template>
  <div class="sidebar-container">
    <el-menu
      :default-active="$route.path"
      class="el-menu-demo"
      :router="true"
    >
      <el-menu-item v-for="item in menuList" 
      :key="item.path"
      :index="item.path"
      >{{item.title}}</el-menu-item>
    </el-menu>
  </div>
</template>
<script>
export default {
  name: "Sidebar",
  data() {
    return {
      menuList: [],
    };
  },
  methods: {
    // 退出
    handleSignOut() {
      localStorage.removeItem('token')
      this.$router.push("/login")
    },
    getMenu() {   // 获取需要生成菜单的路由
      for(let i of this.routes) {
        if(i.title) {
          this.menuList.push(i);
        }
      }
    }
  },
  created() {
    this.getMenu()
  },
  computed: {
      routes() {
          return this.$router.options.routes
      }
  }
};
</script>
<style lang="scss">
.sidebar-container {

  .el-menu-demo {
    width: 100%;
    height: 100%;
    text-align: center;
  }
}
</style>
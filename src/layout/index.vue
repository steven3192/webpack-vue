<template>
  <section class="app-wrapper">
    <sidebar class="sidebar-wrapper" />
    <section class="main-container">
      <navbar class="navbar-wrapper" />
      <section class="app-main">
        <router-view />
      </section>
    </section>
  </section>
</template>

<script>
import Sidebar from "./components/sidebar"
import Navbar from "./components/navbar"
export default {
  name: "Layout",
  components: { Sidebar, Navbar }
};
</script>
<style lang="scss">
.app-wrapper {
  width: 100%;
  height: 100%;
  position: relative;
  background-color: #fff;

  .sidebar-wrapper {
    width: 200px;
    height: 100%;
    margin-right: 10px;
    overflow-y: auto;
  }

  .main-container {
    width: calc(100% - 200px - 10px);
    height: 100%;
    position: absolute;
    top: 0;
    right: 0;
    background-color: #fff;

    .navbar-wrapper {
      width: 100%;
      height: 60px;
      line-height: 60px;
    }

    .app-main {
      width: 100%;
      height: calc(100% - 60px);
      background-color: #eee;
      border-radius: 5px;
      padding-right: 10px;
    }
  }
}
</style>
<template>
  <el-container class="layout-container">
    <el-aside
      :width="$store.state.setting.isCollapse ? '64px' : '230px'"
      class="layout-aside"
    >
      <SideBar />
    </el-aside>
    <el-container>
      <el-header class="layout-header">
        <NavBar />
      </el-header>
      <el-main class="layout-main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import SideBar from "./components/SideBar";
import NavBar from "./components/NavBar";
export default {
  name: "VueAdminIndex",
  components: {
    SideBar,
    NavBar,
  },
  data() {
    return {};
  },

  mounted() {},

  methods: {},
};
</script>

<style scoped>
.layout-container {
  height: 100vh;
}
.layout-aside {
  background-color: #304156;
}

.layout-header {
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
}
</style>
<template>
  <el-row
    type="flex"
    style="heigth: 60px"
    justify="space-between"
    align="middle"
  >
    <el-row class="header-left" type="flex" align="middle">
      <el-button
        @click="changeCollapse"
        v-if="isCollapse"
        size="small"
        icon="el-icon-s-fold"
      ></el-button>
      <el-button
        @click="changeCollapse"
        v-else
        size="small"
        icon="el-icon-s-unfold"
      ></el-button>
      &nbsp;&nbsp;
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item v-for="(item, index) in locationList" :key="index">
          <router-link :to="item.path" v-if="index < locationList.length - 1">{{
            item.title
          }}</router-link>
          <span v-else>{{ item.title }}</span>
        </el-breadcrumb-item>
      </el-breadcrumb>
    </el-row>
    <div class="header-right">
      <el-dropdown>
        <span class="el-dropdown-link">
          <el-avatar size="small" icon="el-icon-user-solid" src=""></el-avatar>
          {{ name }}<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item> 个人中心 </el-dropdown-item>
          <el-dropdown-item>布局设置</el-dropdown-item>
          <el-dropdown-item @click.native="quit">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </el-row>
</template>

<script>
import { mapState, mapMutations, mapGetters } from "vuex";
export default {
  name: "NavBar",

  data() {
    return {};
  },
  computed: {
    /* ...mapState({
      isCollapse: (state) => state.setting.isCollapse,
    }), */
    ...mapState("setting", ["isCollapse"]),
    ...mapGetters("user", ["name"]),
    locationList() {
      return this.$route.matched.map((item) => ({
        title: item.meta.title,
        path: item.path,
      }));
    },
  },
  mounted() {},

  methods: {
    ...mapMutations("setting", ["changeCollapse"]),
    ...mapMutations("user", ["logout"]),
    async quit() {
      try {
        await this.$confirm("是否确认退出？", "提示");
        this.logout();
        this.$router.push("/login");
      } catch (error) {
        return;
      }
    },
  },
};
</script>

<style scoped>
.el-dropdown-link {
  line-height: 60px;
}
.el-avatar {
  vertical-align: middle;
}
</style>
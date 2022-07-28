<template>
  <div>
    <div class="logo-container">
      <h2>优点达资讯系统</h2>
    </div>
    <div class="aside-container">
      <el-menu
        :collapse="$store.state.setting.isCollapse"
        :collapse-transition="false"
        :default-active="$route.path"
        background-color="rgb(48, 65, 86) "
        text-color="#fff"
        active-text-color="#ffd04b"
        router
      >
        <el-menu-item index="/dashboard">
          <i class="el-icon-document"></i>
          <span slot="title">后台主页</span>
        </el-menu-item>
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-menu"></i>
            <span>系统设置</span>
          </template>
          <el-menu-item index="/system_menu">
            <i class="el-icon-document"></i>
            <span slot="title">菜单管理</span>
          </el-menu-item>
          <el-menu-item index="/system_role">
            <i class="el-icon-document"></i>
            <span slot="title">角色管理</span>
          </el-menu-item>
          <el-menu-item index="/system_user">
            <i class="el-icon-document"></i>
            <span slot="title">用户管理</span>
          </el-menu-item>
          <el-menu-item index="1-4">
            <i class="el-icon-document"></i>
            <span slot="title">allMenu.66</span>
          </el-menu-item>
          <el-menu-item index="1-5">
            <i class="el-icon-document"></i>
            <span slot="title">系统配置</span>
          </el-menu-item>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-menu"></i>
            <span>会员管理</span>
          </template>
          <el-menu-item index="/user_user">
            <i class="el-icon-document"></i>
            <span slot="title">用户管理</span>
          </el-menu-item>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-menu"></i>
            <span>广告管理</span>
          </template>
          <el-menu-item index="3-1">
            <i class="el-icon-document"></i>
            <span slot="title">友情链接管理</span>
          </el-menu-item>
          <el-menu-item index="3-2">
            <i class="el-icon-document"></i>
            <span slot="title">广告图管理</span>
          </el-menu-item>
          <el-menu-item index="3-3">
            <i class="el-icon-document"></i>
            <span slot="title">广告位管理</span>
          </el-menu-item>
        </el-submenu>
        <el-submenu index="4">
          <template slot="title">
            <i class="el-icon-menu"></i>
            <span>内容管理</span>
          </template>
          <el-menu-item index="/content_cate">
            <i class="el-icon-document"></i>
            <span slot="title">分类管理</span>
          </el-menu-item>
          <el-menu-item index="/content_tag">
            <i class="el-icon-document"></i>
            <span slot="title">标签管理</span>
          </el-menu-item>
          <el-menu-item index="/content_article">
            <i class="el-icon-document"></i>
            <span slot="title">文章管理</span>
          </el-menu-item>
        </el-submenu>
      </el-menu>
    </div>
  </div>
</template>

<script>
export default {
  name: "SideBar",

  data() {
    return {};
  },

  mounted() {},

  methods: {},
};
</script>

<style scoped>
.logo-container {
  height: 60px;
  line-height: 60px;
  background-color: #2b2f3a;
}
.logo-container h2 {
  text-align: center;
  color: #fff;
  font-weight: normal;
  font-size: 18px;
}
.aside-container {
  background-color: rgb(48, 65, 86);
}
.el-menu {
  border-right: none;
}
</style>
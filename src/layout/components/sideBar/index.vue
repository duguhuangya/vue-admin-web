<template>
  <div class="sideBar" id="domSideBar">
    <div class="logo">
      <img src="../../../assets/pageBg/logo.png" alt="" />
    </div>

    <!-- <el-scrollbar> -->
    <el-menu :default-active="activeMenu" class="el-menu-vertical-demo" background-color="#3a3f51" text-color="#b5b6bd" active-text-color="rgb(79, 148, 212)" mode="vertical" :collapse-transition="false" :collapse="opened">
      <sidebar-item v-for="item in routes" :key="item.path" :item="item" :basePath="item.path"></sidebar-item>
    </el-menu>
    <!-- </el-scrollbar> -->
  </div>
</template>

<script>
import SidebarItem from './SideBarItem'
import { mapGetters } from 'vuex'
export default {
  components: { SidebarItem },
  computed: {
    ...mapGetters(['routes', 'opened']),
    // booleanOpen() {
    //   return this.opened === 'true' ? true : false
    // },
    activeMenu() {
      return this.$route.path
    }
  }
}
</script>
<style scoped lang="scss">
.logo {
  width: 68px;
  height: 70px;
  margin: 43px auto 31px;
  img {
    width: 100%;
  }
}
</style>

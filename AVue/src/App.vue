<template>
  <el-container>
    <el-header class="header"
               height="100px">
      <h3>JavaScript初探</h3>
      <p>后台管理系统</p>
    </el-header>
    <el-main>
      <router-view />
    </el-main>
  </el-container>
</template> 
<script>
export default {
  name: 'App'
}
</script> 
<style>
.header {
  background-color: #409eff; /*element最靓的那抹蓝色*/
  color: white;
}
</style>
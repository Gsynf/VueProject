<template>
  <el-row class="container">
    <el-col :span="24"
            class="main">
      <aside :class="collapsed?'menu-collapsed':'menu-expanded'">
        <!--导航菜单-->
        <el-menu :default-active="$route.path"
                 class="el-menu-vertical-demo"
                 @open="handleopen"
                 @close="handleclose"
                 @select="handleselect"
                 unique-opened
                 router
                 v-show="!collapsed">
          <template v-for="(item,index) in $router.options.routes"
                    v-if="!item.hidden">
            <el-submenu :index="index+''"
                        v-if="!item.leaf">
              <template slot="title"><i :class="item.iconCls"></i>{{item.name}}
              </template>
              <el-menu-item v-for="child in item.children"
                            :index="child.path"
                            :key="child.path"
                            v-if="!child.hidden">{{child.name}}
              </el-menu-item>
            </el-submenu>
            <el-menu-item v-if="item.leaf&&item.children.length>0"
                          :index="item.children[0].path">
              <i :class="item.iconCls">
              </i>{{item.children[0].name}}
            </el-menu-item>
          </template>
        </el-menu>
        <!--导航菜单-折叠后-->
        <ul class="el-menu el-menu-vertical-demo collapsed"
            v-show="collapsed"
            ref="menuCollapsed">
          <li v-for="(item,index) in $router.options.routes"
              v-if="!item.hidden"
              class="el-submenu item">
            <template v-if="!item.leaf">
              <div class="el-submenu__title"
                   style="padding-left: 20px;"
                   @mouseover="showMenu(index,true)"
                   @mouseout="showMenu(index,false)">
                <i :class="item.iconCls">
                </i>
              </div>
              <ul class="el-menu submenu"
                  :class="'submenu-hook-'+index"
                  @mouseover="showMenu(index,true)"
                  @mouseout="showMenu(index,false)">
                <li v-for="child in item.children"
                    v-if="!child.hidden"
                    :key="child.path"
                    class="el-menu-item"
                    style="padding-left: 40px;"
                    :class="$route.path==child.path?'is-active':''"
                    @click="$router.push(child.path)">{{child.name}}
                </li>
              </ul>
            </template>
            <template v-else>
          <li class="el-submenu">
            <div class="el-submenu__title el-menu-item"
                 style="padding-left: 20px;height: 56px;line-height: 56px;padding: 0 20px;"
                 :class="$route.path==item.children[0].path?'is-active':''"
                 @click="$router.push(item.children[0].path)">
              <i :class="item.iconCls">
              </i>
            </div>
          </li>
</template>
</li>
</ul>
</aside>
<section class="content-container">
  <div class="grid-content bg-purple-light">
    <el-col :span="24"
            class="breadcrumb-container">
      <strong class="title">{{$route.name}}
      </strong>
      <el-breadcrumb separator="/"
                     class="breadcrumb-inner">
        <el-breadcrumb-item v-for="item in $route.matched"
                            :key="item.path">
          {{ item.name }}
        </el-breadcrumb-item>
      </el-breadcrumb>
    </el-col>
    <el-col :span="24"
            class="content-wrapper">
      <transition name="fade"
                  mode="out-in">
        <router-view></router-view>
      </transition>
    </el-col>
  </div>
</section>
</el-col>
<!--注销按钮-->
<el-row type="flex"
        justify="center"
        style="margin-top:25px">
  <el-col :span="1"
          offset="22">
    <el-popover placement="left-start"
                width="160"
                v-model="visible">
      <el-button slot="reference">注销</el-button>
      <p>确定注销并退出吗？</p>
      <div style="text-align: right; margin: 0">
        <el-button size="mini"
                   type="text"
                   @click="visible = false">取消</el-button>
        <el-button type="primary"
                   size="mini"
                   @click="logout">确定</el-button>
      </div>
    </el-popover>
  </el-col>
</el-row>
</el-row>
</template>

<script>
export default {
  methods: {
    logout() {
      this.$router.replace('/')
    },
    handleopen() {
      console.log('handleopen');
    },
    handleclose() {
      console.log('handleclose');
    },
    handleselect: function (a, b) {
    },
    //折叠导航栏
    collapse: function () {
      this.collapsed = !this.collapsed;
    },
    showMenu(i, status) {
      this.$refs.menuCollapsed.getElementsByClassName('submenu-hook-' + i)[0].style.display = status ? 'block' : 'none';
    }
  },
  data() {
    return {
      visible: false,  //注销弹出框
      collapsed: false,   //菜单折叠
    };
  }
}
</script>

<style scoped lang="scss">
.container {
  position: absolute;
  top: 0px;
  bottom: 0px;
  width: 95%;

  .main {
    display: flex;
    // background: #324057;
    position: absolute;
    top: 110px;
    bottom: 0px;
    overflow: hidden;
    aside {
      flex: 0 0 230px;
      width: 230px;
      // position: absolute;
      // top: 0px;
      // bottom: 0px;
      .el-menu {
        height: 100%;
      }
      .collapsed {
        width: 60px;
        .item {
          position: relative;
        }
        .submenu {
          position: absolute;
          top: 0px;
          left: 60px;
          z-index: 99999;
          height: auto;
          display: none;
        }
      }
    }
    .menu-collapsed {
      flex: 0 0 60px;
      width: 60px;
    }
    .menu-expanded {
      flex: 0 0 230px;
      width: 230px;
    }
    .content-container {
      // background: #f1f2f7;
      flex: 1;
      // position: absolute;
      // right: 0px;
      // top: 0px;
      // bottom: 0px;
      // left: 230px;
      overflow-y: scroll;
      padding: 20px;
      .breadcrumb-container {
        //margin-bottom: 15px;
        .title {
          width: 200px;
          float: left;
          color: #475669;
        }
        .breadcrumb-inner {
          float: right;
        }
      }
      .content-wrapper {
        background-color: #fff;
        box-sizing: border-box;
      }
    }
  }
}
</style>
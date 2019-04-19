<template>
  <div>
    <el-row type="flex"
            justify="center"
            align="middle"
            style="margin-top:80px;margin-bottom:80px">
      <el-col :span="2">
        <div>使用规定</div>
      </el-col>
    </el-row>

    <el-row type="flex"
            justify="center"
            align="middle"
            style="margin-top:60px;margin-bottom:80px">
      <el-col :span="4">
        <el-checkbox v-model="checked">我已知晓并同意相关协议。</el-checkbox>
      </el-col>
      <el-col :span="3">
        <el-button type="text"
                   @click="dialogVisible = true">阅读协议</el-button>
      </el-col>

      <el-dialog title="协议"
                 :visible.sync="dialogVisible"
                 width="30%"
                 :before-close="handleClose">
        <span>系统使用协议<br></br>
          自觉规范使用<br>
          一切后果自负<br>
          最终解释权归hpf所有<br></br>
        </span>
        <span slot="footer"
              class="dialog-footer">
          <el-button type="primary"
                     @click="dialogVisible = false">确 定</el-button>
        </span>
      </el-dialog>
    </el-row>

    <el-row type="flex"
            justify="center">
      <el-col :span="3">
        <el-button type="primary"
                   @click="login"
                   plain
                   :disabled="!checked">点此登陆</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  methods: {
    login() {
      this.$router.replace('/login')
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => { });
    }
  },
  data() {
    return {
      checked: false,
      dialogVisible: false
    };
  }
}
</script>
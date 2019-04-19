<template>
  <div>
    <el-row style="margin-top:20px;margin-bottom:80px">
      <div>请上传头像!</div>
      <el-upload class="upload-demo"
                 action="https://jsonplaceholder.typicode.com/posts/"
                 :before-upload="beforeAvatarUpload"
                 :on-success="handleSuccess"
                 :on-remove="handleRemove"
                 :before-remove="beforeRemove"
                 :limit="3"
                 :on-exceed="handleExceed"
                 :file-list="fileList2"
                 list-type="picture">
        <el-button size="small"
                   type="primary">点击上传</el-button>
        <div slot="tip"
             class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>
      <el-dialog :visible.sync="dialogVisible">
        <img width="100%"
             :src="dialogImageUrl"
             alt="">
      </el-dialog>

    </el-row>
    <div>请对本系统进行评分！</div>
    <el-rate v-model="value"
             show-text>
    </el-rate>

  </div>
</template>

<script>
export default {
  data() {
    return {
      value: null,
      fileList2: [{ name: '1.jpeg', url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1553093102565&di=25a64456a16660f7b29747e49e0ef960&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201710%2F25%2F20171025063401_iYUrd.png' },
      { name: '2.jpeg', url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1553687953&di=c1d4a554be4cf9f051dd15dbf5763216&imgtype=jpg&er=1&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201708%2F06%2F20170806123359_Qm2ZC.thumb.224_0.jpeg' },
      ]
    };
  },
  methods: {
    // 判断上传文件类型
    beforeAvatarUpload: function (file) {
      var me = this
      var isJPG = file.type === 'image/jpeg'
      var isPNG = file.type === 'image/png'
      if (!(isJPG || isPNG)) {
        me.$message.error('上传的文件只能是 JPG 或者是 PNG 格式的')
      }
      else me.handlePreview(file)
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    // 文件超出个数限制时的钩子
    handleExceed(file, fileList) {
      const me = this
      me.$message.warning('最多只能上传三个文件')
    },
    //确认删除
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    //上传成功
    handleSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
  }
}
</script>
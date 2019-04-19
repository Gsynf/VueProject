<template>
  <el-form :model="ruleForm"
           :rules="rules"
           ref="ruleForm"
           label-width="100px"
           class="demo-ruleForm">
    <el-form-item label="设备名称"
                  prop="name">
      <el-input v-model="ruleForm.name"></el-input>
    </el-form-item>
    <el-form-item label="功率选择"
                  prop="region">
      <el-select v-model="ruleForm.region"
                 placeholder="请选择加热功率">
        <el-option label="8KW"
                   value="8kw"></el-option>
        <el-option label="50KW"
                   value="50kw"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="加热时间"
                  required>
      <el-col :span="11">
        <el-form-item prop="date1">
          <el-date-picker type="date"
                          placeholder="选择日期"
                          v-model="ruleForm.date1"
                          style="width: 100%;"></el-date-picker>
        </el-form-item>
      </el-col>
      <el-col class="line"
              :span="2">-</el-col>
      <el-col :span="11">
        <el-form-item prop="date2">
          <el-time-picker type="fixed-time"
                          placeholder="选择时间"
                          v-model="ruleForm.date2"
                          style="width: 100%;"></el-time-picker>
        </el-form-item>
      </el-col>
    </el-form-item>
    <el-form-item label="即时加热"
                  prop="delivery">
      <el-switch v-model="ruleForm.delivery"></el-switch>
    </el-form-item>
    <el-form-item label="加热监测"
                  prop="type">
      <el-checkbox-group v-model="ruleForm.type">
        <el-checkbox label="电压监测"
                     name="type"></el-checkbox>
        <el-checkbox label="电流监测"
                     name="type"></el-checkbox>
        <el-checkbox label="纹波监测"
                     name="type"></el-checkbox>
        <el-checkbox label="温度监测"
                     name="type"></el-checkbox>
      </el-checkbox-group>
    </el-form-item>
    <el-form-item label="加热模式"
                  prop="resource">
      <el-radio-group v-model="ruleForm.resource">
        <el-radio label="定时加热"></el-radio>
        <el-radio label="非定时加热"></el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="操作日志"
                  prop="desc">
      <el-input type="textarea"
                v-model="ruleForm.desc"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary"
                 @click="submitForm('ruleForm')">立即创建</el-button>
      <el-button @click="resetForm('ruleForm')">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      ruleForm: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入设备名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        region: [
          { required: true, message: '请选择加热功率', trigger: 'change' }
        ],
        date1: [
          { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
        ],
        date2: [
          { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
        ],
        type: [
          { type: 'array', required: true, message: '请至少选择一个加热状态监测', trigger: 'change' }
        ],
        resource: [
          { required: true, message: '请选择加热模式', trigger: 'change' }
        ],
        desc: [
          { required: true, message: '请填写操作日志', trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('创建成功!');
        } else {
          console.log('创建失败!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
}
</script>
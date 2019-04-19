<template>
  <div>
    <el-table :data="tableData"
              border
              style="width: 100%">
      <el-table-column fixed
                       prop="date"
                       label="日期"
                       width="150">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.date }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="name"
                       label="姓名"
                       width="80">
        <template slot-scope="scope">
          <el-popover trigger="hover"
                      placement="top">
            <p>姓名: {{ scope.row.name }}</p>
            <p>住址: {{ scope.row.address }}</p>
            <div slot="reference"
                 class="name-wrapper">
              <el-tag size="medium">{{ scope.row.name }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>

      <el-table-column prop="province"
                       label="省份"
                       width="60">
      </el-table-column>
      <el-table-column prop="city"
                       label="市区"
                       width="80">
      </el-table-column>
      <el-table-column prop="address"
                       label="地址"
                       width="300">
      </el-table-column>
      <el-table-column prop="zip"
                       label="邮编"
                       width="80">
      </el-table-column>
      <el-table-column fixed="right"
                       label="操作"
                       width="150">
        <template slot-scope="scope">
          <el-button @click="handleEdit(scope.$index, scope.row)"
                     size="small">编辑</el-button>
          <el-button @click="handleDelete(scope.$index,scope.row)"
                     type="danger"
                     size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--删除界面-->
    <el-dialog title="确认"
               :visible.sync="deleteFormVisible"
               width="30%"
               :before-close="handleClose">
      <span>确认删除改用户？</span>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="deleteFormVisible = false">取 消</el-button>
        <el-button type="primary"
                   @click.native.prevent="deleteRow(_index, tableData)">确 定</el-button>
      </span>
    </el-dialog>

    <!--编辑界面-->
    <el-dialog title="编辑"
               :visible.sync="editFormVisible"
               :before-close="handleClose">
      <el-form :model="editForm"
               label-width="80px"
               :rules="editFormRules"
               ref="editForm">
        <el-form-item label="日期">
          <el-date-picker type="date"
                          placeholder="选择日期"
                          v-model="editForm.date"></el-date-picker>
        </el-form-item>
        <el-form-item label="姓名"
                      prop="name">
          <el-input v-model="editForm.name"
                    auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="省份">
          <el-input type="province"
                    v-model="editForm.province"></el-input>
        </el-form-item>
        <el-form-item label="市区">
          <el-input type="city"
                    v-model="editForm.city"></el-input>
        </el-form-item>
        <el-form-item label="地址">
          <el-input type="address"
                    v-model="editForm.address"></el-input>
        </el-form-item>
        <el-form-item label="邮编">
          <el-input type="zip"
                    v-model="editForm.zip"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click.native="editFormVisible = false">取消</el-button>
        <el-button type="primary"
                   @click="editFormVisible = false">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  methods: {
    handleDelete(index, row) {
      this._index = index;
      //console.log(index);
      this.deleteFormVisible = true;
    },
    handleEdit(index, row) {
      this.editFormVisible = true;
      //console.log(index, row);
      //将每一行的数据赋值给Dialog弹框（这里是重点）
      this.editForm = Object.assign({}, row);
    },
    deleteRow(index, rows) {
      rows.splice(index, 1);
      this.deleteFormVisible = false;
    }
  },

  data() {
    return {
      _index: '',
      editFormVisible: false,//编辑界面是否显示
      deleteFormVisible: false,//删除确定界面
      editFormRules: {
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ]
      },
      //编辑界面数据
      editForm: {
        name: '',
        date: '',
        province: '',
        city: '',
        address: '',
        zip: '',
      },
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1519 弄',
        zip: 200333
      }, {
        date: '2016-05-04',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-01',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1517 弄',
        zip: 200333
      }, {
        date: '2016-05-03',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1516 弄',
        zip: 200333
      },
      {
        date: '2016-05-03',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1515 弄',
        zip: 200333
      },
      {
        date: '2016-05-03',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1514 弄',
        zip: 200333
      },
      {
        date: '2016-05-03',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1513 弄',
        zip: 200333
      },
      {
        date: '2016-05-03',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1512 弄',
        zip: 200333
      },
      {
        date: '2016-05-03',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1511 弄',
        zip: 200333
      },
      ]
    }
  }
}
</script>
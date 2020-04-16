<!-- 组件说明 -->
<template>
  <div class=''>
    <!-- current -->

    <div class="bacBtn">
      <el-button type="primary">增加</el-button>
    </div>
    <div v-show="page=='current'" class="company">

      <el-row type="flex" class="row-bg" justify="end">
        <el-col :span="1">
          <el-button type="primary">增加</el-button>
        </el-col>
      </el-row>

      <!-- table -->
      <!-- 表格 -->
      <el-table :data="tableData3" id="el-table" style="width: 100%">
        <!-- 动态循环的列表 -->
        <template v-for="(item, index) in tableLabel">
          <el-table-column :key="index" :prop="item.prop" :label="item.label" width="">
          </el-table-column>
        </template>
        <!-- 固定的列：从业人员 -->
        <el-table-column label="操作">
          <template slot-scope="scope">
            <!-- 　　　　　　<el-button type="info" @click="editTabel(scope.row)">编辑</el-button> -->
            <el-dropdown @command="handleCommand">
              <span class="el-dropdown-link">
                下拉菜单<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="a">账号设置</el-dropdown-item>
                <el-dropdown-item command="b">秘钥管理</el-dropdown-item>
                <el-dropdown-item command="c">IP设置</el-dropdown-item>
                <el-dropdown-item command="d">应用管理</el-dropdown-item>
                <el-dropdown-item command="e">渠道管理</el-dropdown-item>
                <el-dropdown-item command="f">删除公司</el-dropdown-item>
              </el-dropdown-menu>

            </el-dropdown>
            　　　　
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
//import x from ''
export default {
  components: {},
  data() {
    return {
      page: 'current',
      tableData3: [
        {
          id: '1',
          number: '112',
          a: '这是个数据',
          b: '这是个数据'
        },
        {
          id: '2',
          number: '113',
          a: '这是个数据',
          b: '这是个数据'
        }
      ],
      tableLabel: [
        { label: '公司名称', prop: 'id' },
        { label: '关联账号', prop: 'number' },
        { label: '期限', prop: 'a' },
        { label: '添加时间', prop: 'b' },
        { label: '备注', prop: 'b' }
      ]
    }
  },
  computed: {},
  methods: {
    handleCommand(command) {
      this.$message('click on item ' + command)
    }
  },
  mounted() {},
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {} //如果页面有keep-alive缓存功能，这个函数会触发
}
</script>

<style lang='scss'scope>
.company {
  padding: 20px;
  .el-row {
    margin-bottom: 20px;
  }
  .el-table {
    border: 1px solid #e3e3e3;
  }
  .el-dropdown-link {
    cursor: pointer;
    color: #409eff;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
}
</style>
<template>
  <div class="company">
    <el-card>
      <div slot="header">
        <!-- <span>基础表格</span> -->
        <el-row :gutter="8">
          <el-form ref="elForm" :model="formData" :rules="rules" size="medium" label-width="px" label-position="left">
            <el-col :span="6">
              <el-form-item label-width="70px" label="用户名" prop="userName">
                <el-input v-model="formData.userName" placeholder="请输入用户名" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="18">
              <el-button type="primary">查询</el-button>
            </el-col>
            <!-- <el-col :span="24">
              <el-form-item size="large">
                <el-button type="primary" @click="submitForm">提交</el-button>
                <el-button @click="resetForm">重置</el-button>
              </el-form-item>
            </el-col> -->
          </el-form>
        </el-row>

      </div>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="name" label="公司名称"> </el-table-column>
        <el-table-column prop="zhanghao" label="关联账号"> </el-table-column>
        <el-table-column prop="qixian" label="期限"> </el-table-column>
        <el-table-column prop="data" label="添加时间"> </el-table-column>
        <el-table-column prop="desc" label="备注"> </el-table-column>
        <!-- <el-table-column prop="address" label="操作"> </el-table-column> -->
        <el-table-column label="操作">
          <template slot-scope="scope">
            <!-- <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button> -->
            <el-dropdown size="small" split-button type="primary">
              管理
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>账号设置</el-dropdown-item>
                <el-dropdown-item>秘钥管理</el-dropdown-item>
                <el-dropdown-item>IP设置</el-dropdown-item>
                <el-dropdown-item>应用管理</el-dropdown-item>
                <el-dropdown-item>渠道管理</el-dropdown-item>
                <el-dropdown-item>删除公司</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

  </div>
</template>

<script>
import { getPageTab1 } from '@/api/table'
export default {
  data() {
    return {
      tableData: [
        {
          date: '2016-05-02',
          name: 'RUNX',
          zhanghao: '17621523693',
          desc: '11111',
          qixian: '2'
        },
        {
          date: '2016-05-02',
          name: 'RUNX',
          zhanghao: '17621523693',
          desc: '11111',
          qixian: '2'
        },
        {
          date: '2016-05-02',
          name: 'RUNX',
          zhanghao: '17621523693',
          desc: '11111',
          qixian: '2'
        }
      ],
      currentPage: 1,
      pageSize: 10,
      total: 0,
      pageSizes: [10, 20, 30, 40],
      tablePage: [],
      formData: {
        userName: ''
      },
      rules: {
        userName: []
      }
    }
  },
  created() {
    this._getPageTab1(1, 10)
  },
  filters: {
    statusText(val) {
      if (val === undefined) return
      if (val === 0) {
        return '已完成'
      } else if (val === 1) {
        return '进行中'
      } else {
        return '已取消'
      }
    },
    tagClass(val) {
      if (val === undefined) return
      if (val === 0) {
        return 'success'
      } else if (val === 1) {
        return 'warning'
      } else {
        return 'danger'
      }
    }
  },
  methods: {
    handleSize(val) {
      this.pageSize = val
      this._getPageTab1(this.currentPage, val)
    },
    handlePage(val) {
      this.currentPage = val
      this._getPageTab1(val, this.pageSize)
    },
    _getPageTab1(current, size) {
      getPageTab1({ currentPage: current, pageSize: size })
        .then(res => {
          this.total = res.data.total
          this.tablePage = res.data.tableList
        })
        .catch(error => {
          this.$message.error(error.message)
        })
    }
  }
}
</script>
<style lang="scss" scoped>
.fyDiv {
  float: right;
  margin-top: 30px;
}
</style>
<style lang="scss">
.anoCard {
  .el-card__body:after {
    content: '';
    clear: both;
    width: 0;
    height: 0;
    visibility: hidden;
    display: block;
  }
}
.el-table th {
  background: rgba(248, 250, 255, 1);
  height: 70px;
  //   line-height: 70px;
}
.el-table {
  border: 1px solid #f8faff;
}
</style>

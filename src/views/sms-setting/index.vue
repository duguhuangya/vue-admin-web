<template>
  <div class="className">
    <el-card>
      <div slot="header">
        <span>短信接口</span>
      </div>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="date" label="配置名称"> </el-table-column>
        <el-table-column prop="name" label="signName"> </el-table-column>
        <el-table-column prop="address" label="accessKeyID"> </el-table-column>
        <el-table-column prop="address" label="accessKeySecret"> </el-table-column>
      </el-table>
    </el-card>
    <el-card class="mtop30 anoCard">
      <div slot="header">
        <span>短信模板</span>
      </div>
      <el-table :data="tablePage" border stripe style="width: 100%;">
        <!-- <el-table-column prop="num" label="序号" width="120"></el-table-column> -->
        <!-- <el-table-column prop="id" label="ID#"></el-table-column> -->
        <el-table-column prop="name" label="配置名称"></el-table-column>
        <el-table-column prop="price" label="templateCode"></el-table-column>
        <el-table-column fixed="right" label="操作" width="120">
          <template slot-scope="scope">
            <el-button @click.native.prevent="deleteRow(scope.$index, tableData)" type="text" size="small">
              移除
            </el-button>
            <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
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
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }
      ],
      currentPage: 1,
      pageSize: 10,
      total: 0,
      pageSizes: [10, 20, 30, 40],
      tablePage: []
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
    },
    // 编辑
    handleClick(row) {
      console.log(row)
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
</style>

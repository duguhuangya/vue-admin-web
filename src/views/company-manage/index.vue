<template>
  <div class="company" style="height: 100%">
    <div v-show="pageType == 'current'" class="common-table" ref="commonTable">
      <el-card>
        <div slot="header">
          <!-- <span>基础表格</span> -->
          <el-row type="flex" class="row-bg" justify="end">
            <el-col :span="1">
              <div class="grid-content bg-purple">
                <el-button type="primary" size="small" @click="add">增加</el-button>
              </div>
            </el-col>
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
              <el-dropdown size="small" split-button type="primary" @command="operationFn">
                管理
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
      </el-card>
      <!-- 新增 -->
      <el-dialog v-bind="$attrs" width="30%" center v-on="$listeners" @open="onOpen" @close="onClose" title="新增公司" :visible.sync="dialogVisible">
        <el-form ref="elForm" :model="formData" :rules="rules" size="medium" label-width="px">
          <el-row>
            <el-col :span="24">
              <el-form-item label-width="120px" label="公司名称" prop="companyName">
                <el-input v-model="formData.companyName" placeholder="请输入公司名称" clearable :style="{width: '100%'}">
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label-width="120px" label="期限" prop="limits">
                <el-input v-model="formData.limits" placeholder="请输入期限" clearable :style="{width: '100%'}">
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label-width="120px" label="关联账号" prop="relate">
                <el-input v-model="formData.relate" placeholder="请输入关联账号" clearable :style="{width: '100%'}">
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label-width="120px" label="备注" prop="remark">
                <el-input v-model="formData.remark" placeholder="请输入备注" clearable :style="{width: '100%'}">
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div slot="footer" class="footer_btn">
          <el-button @click="close" class="cancel">取消</el-button>
          <el-button type="primary" @click="handelConfirm" class="sure">确定</el-button>
        </div>
      </el-dialog>
    </div>
    <!--  -->
    <!-- <task-detail v-show="pageType == 'checkDetail'" @backCurrent="pageType = 'current'"></task-detail> -->
    <compTable :tableHeader="tableHeader" v-show="pageType == 'checkDetail'" @backCurrent="pageType = 'current'" :tableData="keyTableData" @sort-events="handleSort" @filter-events="filterHandler" @click-events="handleClick" />

  </div>
</template>

<script>
import { getPageTab1 } from '@/api/table'
import compTable from '@/components/ComTable'
export default {
  components: { compTable },
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
      // 数据结构
      keyTableData: [
        {
          id: '1',
          key: 'RUNX',
          data: '2020-04-11',
          desc: '这是一个描述文案'
        },
        {
          id: '2',
          key: 'RUNX',
          data: '2020-04-11',
          desc: '这是一个描述文案'
        },
        {
          id: '3',
          key: 'RUNX',
          data: '2020-04-11',
          desc: '这是一个描述文案'
        }
      ], // 为请求到的table数据
      tableHeader: [
        // 表头信息，可根据minWidth修改宽度
        { prop: 'id', label: 'AccessKey ID', minWidth: '160px' },

        {
          prop: 'key',
          label: 'Access Key Secret',
          sortable: 'custom',
          minWidth: '75px'
        },
        {
          prop: 'data',
          label: '创建时间',
          //   filters: sourceData,
          columnKey: 'sourceList',
          minWidth: '90px',
          render: (h, params) => {
            return h('span', params.row.source)
          }
        },
        { prop: 'desc', label: '备注', minWidth: '160px' }
      ],
      currentPage: 1,
      pageSize: 10,
      total: 0,
      pageSizes: [10, 20, 30, 40],
      tablePage: [],
      formData: {
        companyName: undefined,
        limits: undefined,
        relate: undefined,
        remark: undefined
      },
      rules: {
        companyName: [
          {
            required: true,
            message: '请输入公司名称',
            trigger: 'blur'
          }
        ],
        limits: [
          {
            required: true,
            message: '请输入期限',
            trigger: 'blur'
          }
        ],
        relate: [
          {
            required: true,
            message: '请输入关联账号',
            trigger: 'blur'
          }
        ],
        remark: [
          {
            required: true,
            message: '请输入备注',
            trigger: 'blur'
          }
        ]
      },
      dialogVisible: false,
      pageType: 'current'
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
    // 增加公司
    add() {
      this.dialogVisible = true
    },
    onOpen() {},
    onClose() {
      this.$refs['elForm'].resetFields()
    },
    close() {
      this.$emit('update:visible', false)
      this.dialogVisible = false
    },
    handelConfirm() {
      this.$refs['elForm'].validate(valid => {
        if (!valid) return
        this.close()
      })
    },
    // 获取table列表数据
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

    // 管理操作
    operationFn(command) {
      console.log(command)
      this.pageType = 'checkDetail'
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
.el-table th {
  background: rgba(248, 250, 255, 1);
  height: 70px;
  //   line-height: 70px;
}
.el-table {
  border: 1px solid #f8faff;
}
.footer_btn {
  button {
    border-radius: 4px;
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
  }
  .cancel {
    background: rgba(216, 216, 216, 1);
  }
  .sure {
  }
}
</style>

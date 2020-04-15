<template>
  <div class="className">

    <el-card>
      <div slot="header">
        <span>短信接口</span>
      </div>
      <el-table :data="tablePage" border stripe style="width: 100%;">
        <!-- <el-table-column prop="num" label="序号" width="120"></el-table-column> -->
        <!-- <el-table-column prop="id" label="ID#"></el-table-column> -->
        <el-table-column label="配置名称">短信配置</el-table-column>
        <el-table-column prop="signName" label="signName"></el-table-column>
        <el-table-column prop="accessKeyId" label="accessKeyId"></el-table-column>
        <el-table-column prop="accessKeySecret" label="accessKeySecret"></el-table-column>
        <el-table-column fixed="right" label="操作" width="120">
          <template slot-scope="scope">
            <el-button @click="handleEdit(scope.row,'a')" type="text" size="small">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>

    </el-card>
    <!-- 短信模板 -->
    <el-card class="mtop30 anoCard">
      <div slot="header">
        <span>短信模板</span>
      </div>
      <el-table :data="tablePage1" border style="width: 100%">
        <el-table-column prop="name" label="配置名称"></el-table-column>
        <el-table-column prop="templateCode" label="templateCode"> </el-table-column>
        <el-table-column fixed="right" label="操作" width="120">
          <template slot-scope="scope">
            <el-button @click="handleEdit(scope.row,'b')" type="text" size="small">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 编辑a -->
    <el-dialog v-bind="$attrs" width="30%" center v-on="$listeners" @open="onOpen" @close="onClose" title="短信接口编辑" :visible.sync="dialogFormVisible">
      <el-form ref="elForm" :model="formData" size="medium" label-width="px">
        <el-row>
          <el-col :span="24">
            <el-form-item label-width="140px" label="signName">
              <el-input v-model="formData.signName" placeholder="" clearable :style="{width: '100%'}">
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label-width="140px" label="accessKeyId">
              <el-input v-model="formData.accessKeyId" placeholder="" clearable :style="{width: '100%'}">
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label-width="140px" label="accessKeySecret">
              <el-input v-model="formData.accessKeySecret" placeholder="" clearable :style="{width: '100%'}">
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="footer_btn">
        <el-button @click="close" class="cancel">取消</el-button>
        <el-button type="primary" @click="handelConfirm('a')" class="sure">确定</el-button>
      </div>
    </el-dialog>
    <!-- 编辑b -->
    <el-dialog v-bind="$attrs" width="30%" center v-on="$listeners" @open="onOpen" @close="onClose" title="短信模板编辑" :visible.sync="dialogFormVisible1">
      <el-form ref="elForm" :model="formData" size="medium" label-width="120px" label-position="left">
        <el-form-item label="templateCode">
          <el-input v-model="verifyCode" type="textarea" placeholder="请输入多行文本templateCode" :autosize="{minRows: 4, maxRows: 4}" :style="{width: '100%'}"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="close">取消</el-button>
        <el-button type="primary" @click="handelConfirm('b')">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getPageTab1 } from '@/api/table'
import { getSmsList, setSmsData, setSmsTem } from '@/api/sms'
import ComDialog from '@/components/ComDialog'
import { deepClone } from '@/libs/util.js'
export default {
  components: { ComDialog },
  data() {
    return {
      formData: {},
      verifyCode: '',
      currentPage: 1,
      pageSize: 10,
      total: 0,
      pageSizes: [10, 20, 30, 40],
      tablePage: [],
      tablePage1: [],
      dialogFormVisible: false,
      dialogFormVisible1: false
    }
  },
  created() {
    this._getPageTab1()
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
    _getPageTab1() {
      getSmsList()
        .then(res => {
          this.total = res.data.data
          this.$set(this.tablePage, 0, res.data.sms.data)
          this.tablePage = [
            {
              name: '短信配置',
              signName: res.data.sms.data.signName,
              accessKeyId: res.data.sms.data.accessKeyId,
              accessKeySecret: res.data.sms.data.accessKeySecret
            }
          ]
          this.tablePage1 = [
            {
              name: '短信模板',
              templateCode: JSON.stringify(res.data.sms.data.templateCode)
            }
          ]
        })
        .catch(error => {
          this.$message.error(error.message)
        })
    },
    // 编辑
    handleEdit(row, ty) {
      this.formData = deepClone(row)
      this.verifyCode = row.templateCode
      //   this.formData = row
      if (ty == 'a') {
        this.dialogFormVisible = true //显示弹框
      } else {
        this.dialogFormVisible1 = true
      }
      //点击编辑
    },
    onOpen() {},
    onClose() {
      this.$refs['elForm'].resetFields()
    },
    close() {
      this.$emit('update:visible', false)
      this.dialogFormVisible = false
      this.dialogFormVisible1 = false
    },
    handelConfirm(ty) {
      if (ty == 'a') {
        let params = {
          signName: this.formData.signName,
          accessKeyId: this.formData.accessKeyId,
          accessKeySecret: this.formData.accessKeySecret
        }
        setSmsData(params)
          .then(res => {
            const { code, data } = res
            if (code == 200) {
              this.close()
              this._getPageTab1()
            }
          })
          .catch(error => {
            this.$message.error(error.message)
          })
      } else {
        let params = {}
        // params = JSON.parse(JSON.stringify(this.tableData1[0]))
        params.templateCode = this.verifyCode
        // params = JSON.parse(JSON.stringify(params))
        // let params = { templateCode: { verifyCode: 'SMS_17846012711' } }

        setSmsTem(params)
          .then(res => {
            const { code, data } = res
            if (code == 200) {
              this.close()
              this._getPageTab1()
            }
          })
          .catch(error => {
            this.$message.error(error.message)
          })
      }
    }
  }
}
</script>

<style lang="scss" scope>
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

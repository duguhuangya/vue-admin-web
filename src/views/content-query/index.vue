<template>
  <div>
    <div class="bacBtn" v-show="pageType != 'current'" @click="pageType = 'current'">
      <i class="el-icon-arrow-left"></i>返回
    </div>
    <div v-show="pageType == 'current'" class="queryContent">
      <el-row :gutter="15">
        <el-form ref="elForm" :model="formData" size="medium" label-width="80px" label-position="left">
          <el-col :span="5">
            <el-form-item label="产品名称">
              <el-select v-model="formData.productName" placeholder="全部产品" clearable :style="{width: '100%'}">
                <!-- <el-option v-for="(item, index) in productNameOptions" :key="index" :label="item.label" :value="item.value" :disabled="item.disabled"></el-option> -->
                <el-option v-for="(item, index) in productNameOptions" :key="index" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <!-- <el-form-item label="日期范围" prop="dataScope">
            <el-date-picker type="daterange" v-model="formData.dataScope" format="yyyy-MM-dd" value-format="yyyy-MM-dd" :style="{width: '100%'}" start-placeholder="开始日期" end-placeholder="结束日期" range-separator="至" clearable></el-date-picker>
          </el-form-item> -->
            <el-date-picker v-model="formData.dataScope" type="datetimerange" align="right" start-placeholder="开始日期" end-placeholder="结束日期" :default-time="['12:00:00', '08:00:00']">
            </el-date-picker>
          </el-col>
          <el-col :span="3">
            <el-form-item label-width="0">
              <el-select v-model="formData.sortType" placeholder="账号" clearable :style="{width: '100%'}">
                <el-option v-for="(item, index) in sortTypeOptions" :key="index" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label-width="0">
              <el-input v-model="formData.filterValue" placeholder="请输入单行文本" clearable :style="{width: '100%'}">
              </el-input>
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>
      <el-table :data="tableData" style="width: 100%;border:1px solid #E3E3E3" fit>
        <el-table-column prop="user" label="账号" align="center">
        </el-table-column>
        <el-table-column prop="name" label="昵称" align="center">
        </el-table-column>
        <el-table-column prop="ip" label="IP" align="center">
        </el-table-column>
        <el-table-column prop="key" label="设备号" align="center">
        </el-table-column>
        <el-table-column fixed="right" label="操作">
          <template slot-scope="scope">
            <!-- <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button> -->
            <el-dropdown @command="handleCommand">
              <span class="el-dropdown-link">
                详情<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="txt">文本 11</el-dropdown-item>
                <el-dropdown-item command="pic">图片 22</el-dropdown-item>
                <el-dropdown-item command="audio">音频 33</el-dropdown-item>
                <el-dropdown-item command="video">视频 44</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>

          </template>
        </el-table-column>
      </el-table>

    </div>
    <!-- 图片查询 -->

    <star-pic-list class="key_frame" v-show="pageType == 'pic'" :data="img_arr" :max-show="20" />

  </div>
</template>
<script>
import starPicList from './star-pic-list.vue'
export default {
  components: { starPicList },
  props: [],
  data() {
    return {
      formData: {
        productName: undefined,
        dataScope: ['2020-04-13', '2020-04-13'],
        sortType: undefined,
        filterValue: undefined
      },
      productNameOptions: [
        {
          label: '选项一',
          value: 1
        },
        {
          label: '选项二',
          value: 2
        }
      ],
      sortTypeOptions: [
        {
          label: '选项一',
          value: '账号'
        },
        {
          label: '选项二',
          value: '类别'
        }
      ],
      tableData: [
        {
          user: '17621523693',
          name: '王小虎',
          ip: '192.168.0.1',
          key: '19024587963'
        },
        {
          user: '17621523693',
          name: '王小虎',
          ip: '192.168.0.1',
          key: '19024587963'
        },
        {
          user: '17621523693',
          name: '王小虎',
          ip: '192.168.0.1',
          key: '19024587963'
        },
        {
          user: '17621523693',
          name: '王小虎',
          ip: '192.168.0.1',
          key: '19024587963'
        }
      ],
      pageType: 'current',
      img_arr: []
    }
  },
  computed: {},
  watch: {},
  created() {},
  activated() {
    this.init()
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      for (let i = 0; i < 20; i++) {
        this.img_arr.push(
          'https://static.leapoon.com/PWebsite/29195ddb-8061-46cd-8f3a-766a151c3a3e/手机端banner.png'
        )
      }
    },
    handleCommand(command) {
      switch (command) {
        case 'txt':
          break
        case 'pic':
          this.pageType = 'pic'
          break

        default:
          break
      }
    }
  }
}
</script>
<style lang="scss" scope>
.queryContent {
  padding: 26px 20px;
}
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
.el-icon-arrow-down {
  font-size: 12px;
}
// .key_frame {
//   padding: 35px 58px;
//   border: none;
// }
</style>

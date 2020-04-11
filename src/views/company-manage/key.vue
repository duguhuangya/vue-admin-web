<template>
  <div class="company" id="company" style="height: 100%">
    <el-card>
      <!-- <div slot="header">

        <el-row type="flex" class="row-bg" justify="end">
          <el-col :span="1">
            <div class="grid-content bg-purple">
              <el-button type="primary" size="small" @click="$emit('backCurrent', 'close')">返回</el-button>
            </div>
          </el-col>
        </el-row>

      </div> -->
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="name" label="公司名称"> </el-table-column>
        <el-table-column prop="zhanghao" label="关联账号"> </el-table-column>
        <el-table-column prop="qixian" label="期限"> </el-table-column>
        <el-table-column prop="data" label="添加时间"> </el-table-column>
        <el-table-column prop="desc" label="备注"> </el-table-column>
      </el-table>
    </el-card>

  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          date: '2016-05-02',
          name: 'RUNX1111',
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
      tablePage: []
    }
  },
  created() {},
  mounted() {
    const insertBefore = (el, htmlString) =>
      el.insertAdjacentHTML('beforebegin', htmlString)

    insertBefore(
      document.getElementsByClassName('pageMain')[0],
      '<el-button type="primary" size="small" style="margin-left:220px" >返回</el-button>'
    ) // <p>before</p> <div id="myId">...</div>
  },

  methods: {}
}
</script>
<style lang="scss" scoped>
</style>

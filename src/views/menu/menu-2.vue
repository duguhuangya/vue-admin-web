<!-- 组件说明 -->
<template>
  <div class='table'>
    <compTable :tableHeader="tableHeader" :tableData="tableData" @sort-events="handleSort" @filter-events="filterHandler" @click-events="handleClick" />
  </div>
</template>

<script>
import compTable from '@/components/ComTable'
export default {
  components: { compTable },
  data() {
    return {
      // 数据结构
      tableData: [
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
      ]
    }
  },
  computed: {},
  methods: {
    // tableHeader() {},
    handleSort() {},
    filterHandler() {},
    handleClick() {}
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

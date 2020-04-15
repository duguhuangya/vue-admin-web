<template>
  <div id="star-pic-vue">
    <template v-if="data" :gutter="20">
      <!-- <el-row class="row-bg">
        <el-col v-for="item in images" :key="item.id">
          <div class="img_wrap"><img :src="item" id="contract_url" @click="enlargePic" /></div>
        </el-col>
      </el-row> -->
      <el-row style="overflow: hidden;">
        <el-col :span="3" v-for="item in 24" :key="item.id">
          <div class="grid-content bg-purple img-unit">
            <img src="https://static.leapoon.com/PWebsite/29195ddb-8061-46cd-8f3a-766a151c3a3e/手机端banner.png" id="contract_url" @click="enlargePic" />
          </div>
        </el-col>
      </el-row>

      <template v-if="isDialogShow">
      </template>
      <el-dialog :visible.sync="centerDialogVisible" modal close-on-click-modal custom-class="dialog">
        <el-carousel :autoplay="false" arrow="always">
          <el-carousel-item v-for="item in data" :key="item">
            <img :src="item">
          </el-carousel-item>
        </el-carousel>
      </el-dialog>
      <div class="block">

        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4" :page-sizes="[100, 200, 300, 400]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="400">
        </el-pagination>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: 'star-pic-list',
  props: ['data', 'maxShow'],
  data() {
    return {
      centerDialogVisible: false,
      showPic: '',
      isDialogShow: false,
      index: 0,
      currentPage4: 4
    }
  },
  computed: {
    images() {
      if (this.data instanceof Array && this.data.length > 2) {
        return this.data.splice(0, this.maxShow)
      } else {
        return this.data
      }
    }
  },
  methods: {
    // 放大图片
    enlargePic(e) {
      this.isDialogShow = true
      this.centerDialogVisible = true
      this.showPic = this.data[0]
      console.log(this.images)
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
    }
  }
}
</script>

<style lang="scss" scope>
#star-pic-vue {
  //   width: 100%;
  padding: 35px 58px 35px 58px;
  //   height: auto;
  //   border: 1px solid red;
  box-sizing: border-box;
  //   overflow: hidden;
  //   display: flex;
  //   flex-wrap: wrap;
  .img-unit {
    width: 252px;
    img {
      width: 100%;
      height: 252px;

      object-fit: cover;
    }
  }

  .dialog {
    img {
      width: 100%;
      height: 100%;
      margin: 0;
    }
  }
  .el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
    height: 100%;
    width: 100%;
  }
  .el-dialog__header {
    display: none;
  }
  .el-dialog__body {
    padding: 0 !important;
    margin: 0 !important;
    height: 600px;
  }
  .el-carousel {
    height: 100%;
  }
  .el-carousel__container {
    height: 100%;
  }
}
</style>
<template>
  <div class="show-container">
    <el-row>
      <el-col
        :span="5"
        v-for="(item, index) in 5"
        :key="index"
        :offset=1
      >
        <el-card
          :body-style="{ padding: '0px' }"
          class="card-box"
        >
          <div class="card-title">{{item}}</div>
          <el-image src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" class="card-image"></el-image>
          <div style="padding: 14px;">
            <div class="bottom clearfix">
              <el-button
                type="info"
                plain
                class="button"
                size="mini"
                @click.native.prevent="handleEditor()"
              >编辑</el-button>
              <el-button
                type="info"
                plain
                class="button"
                size="mini"
                v-if="isAdmin"
                @click.native.prevent="handleDelete()"
              >删除</el-button>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-pagination
      layout="pager"
      :total="total"
      :page-size="pageIndex"
      class="show-page"
      @current-change="handleChangePage"
    >
    </el-pagination>
  </div>
</template>
<script>
import { Message } from "element-ui";
// import api from "../../api";
export default {
  name: "ListShow",
  data() {
    return {
      datasource: [],
      page: 1,
      pageIndex: 8,
      total: 10,
      isAdmin: false,
    };
  },
  created() {
    this.getDatasource();
  },
  methods: {
    // 点击切换页面
    handleChangePage(data) {
      this.page = data;
    },
    // 编辑
    handleEditor(id) {
      this.$router.push({
        path: "/editor",
        query: { id },
      });
    },
    // 删除
    handleDelete(id) {
      this.$confirm("是否确认删除该文章?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
          Message.info("确认删除")
        })
        .catch(() => {
          Message.info("取消删除")
        });
    },
    // 获取列表数据
    getDatasource() {
    },
  },
};
</script>
<style lang="scss">
.show-container {
  width: 100%;
  min-height: 100%;
  .card-box {
    margin: 10px 0;
    background-color: lightgray;
    border-radius: 5px;

    .card-title {
      width: 100%;
      height: 40px;
      line-height: 40px;
      padding: 0;
      border-bottom: 1px dashed #bbbbbb;
      font-size: 16px;
      text-align: center;
      font-weight: bolder;
    }

    .card-image {
      display: block;
      width: 100%;
      height: 200px;
      border: 0;
    }

    // .bottom {
    //   position: relative;

    //   time {
    //     position: absolute;
    //     right: 0;
    //     top: 0;
    //   }
    // }
  }
  .show-page {
    width: 100%;
    height: 50px;
    position: absolute;
    bottom: 50px;
    left: 0;
    text-align: center;
  }
}
</style>
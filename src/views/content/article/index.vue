<template>
  <el-card class="tag-container">
    <el-form :model="formSearch" label-width="80px" inline>
      <el-form-item label="标题" prop="title" size="small">
        <el-input
          v-model.trim="formSearch.title"
          placeholder="请输入标题名"
        ></el-input>
      </el-form-item>
      <el-form-item label="分类" prop="cate" size="small">
        <el-select v-model="formSearch.cateid" placeholder="请选择" @focus="getCateList">
    <el-option
      v-for="item in cateList"
      :key="item.id"
      :label="item.catename"
      :value="item.id">
    </el-option>
  </el-select>
      </el-form-item>
      <el-form-item label="时间" prop="time" size="small">
        <el-date-picker
          v-model="formSearch.time"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item size="small">
        <el-button @click="search" type="primary">
          <i class="el-icon-search"></i>
          搜索
        </el-button>
        <el-button @click="reset">
          <i class="el-icon-refresh"></i>
          重置
        </el-button>
      </el-form-item>
    </el-form>

    <div class="custom-table">
      <div class="action-box" style="margin-bottom: 10px">
        <el-button
          @click="dialogVisible = true"
          type="primary"
          size="small"
          plain
        >
          <i class="el-icon-plus"></i>
          新增
        </el-button>
        <el-button type="success" size="small" plain>
          <i class="el-icon-download"></i>
          导出
        </el-button>
      </div>
      <div class="table-bg">
        <el-table :data="articleList" border style="width: 100%">
          <el-table-column prop="id" label="用户ID"></el-table-column>
          <el-table-column width="300" prop="title" label="标题"></el-table-column>
          <el-table-column prop="catename" label="分类名"></el-table-column>
          <el-table-column label="图片" width="120">
            <template slot-scope="scope">
              <el-image
                style="width: 100px; height: 100px"
                :src="'http://124.223.14.236:8060/' + scope.row.pic"
                fit="cover"
              >
              </el-image>
            </template>
          </el-table-column>
          <el-table-column label="创建时间">
            <template slot-scope="scope">
              {{scope.row.create_date | formatDate}}
            </template>
          </el-table-column>
          <el-table-column label="是否推荐">
            <template slot-scope="scope"
              ><el-switch
                v-model="scope.row.ishot"
                :active-value='1'
                :inactive-value='0'
                disabled
              >
              </el-switch
            ></template>
          </el-table-column>
          <el-table-column  label="是否置顶">
            <template slot-scope="scope"
              ><el-switch
                v-model="scope.row.istop"
                :active-value='1'
                :inactive-value='0'
                disabled
              >
              </el-switch
            ></template>
          </el-table-column>
          <el-table-column  label="文章状态">
            <template slot-scope="scope">
              <el-tag>{{ scope.row.status | whichStatus }}</el-tag></template
            >
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button
                @click="handleClick(scope.row.id)"
                type="primary"
                circle
                size="small"
              >
                <i class="el-icon-edit"></i>
              </el-button>
              <el-button
                @click="del(scope.row.id)"
                type="danger"
                size="small"
                circle
              >
                <i class="el-icon-delete"></i>
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="block">
          <el-pagination
            background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="params.page"
            :page-sizes="[10, 15, 20, 30]"
            :page-size="params.limit"
            layout="total, sizes, prev, pager, next, jumper"
            :total="count"
          >
          </el-pagination>
        </div>
      </div>
    </div>
  </el-card>
</template>

<script>
import { getArticleListApi,delArticleApi } from "@/api/article";
import {getCateListApi,} from "@/api/cate";
export default {
  name: "Article",
  data() {
    return {
      cateList: [],
      dialogVisible: false,
      formSearch: {
        title: "",
        cateid: "",
        time:[],
      },
      fileList: [],
      formRules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        mobile: [{ required: true, message: "请输入手机号", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        sex: [{ required: true, message: "请选择性别", trigger: "blur" }],
      },
      params: {
        start_time: "",
        end_time: "",
        title: "",
        cateid: "",
        page: 1,
        limit: 10,
      },
      count: 0,
      articleList: [],
    };
  },
  filters: {
    whichStatus(val) {
      if (val === 0) {
        return "待审核";
      } else if (val === 1) {
        return "草稿箱";
      } else if (val === 2) {
        return "已发布";
      } else if (val === 3) {
        return "已删除";
      }
    },
  },
  watch: {},
  created() {
    this.initData();
  },
  methods: {
    async initData() {
      const { count, data } = await getArticleListApi(this.params);
      this.count = count;
      this.articleList = data;
    },
    async getCateList(){
      const { data } = await getCateListApi(this.params);
      this.cateList = data;
    },
    search(){
      this.params.start_time = this.formSearch.time[0]
      this.params.end_time = this.formSearch.time[1]
      this.params.cateid = this.formSearch.cateid
      this.params.title = this.formSearch.title
      this.initData()
    },
    reset(){
      this.formSearch={
        title: "",
        cateid: "",
        time:[],
      }
      this.params ={
        start_time: "",
        end_time: "",
        title: "",
        cateid: "",
        page: 1,
        limit: 10,
      }
      this.initData()
    },
    handleSizeChange(val) {
      this.params.limit = val;
      this.initData();
    },
    handleCurrentChange(val) {
      this.params.page = val;
      this.initData();
    },
    async del(id){
      await this.$confirm('确认删除吗？')
      await delArticleApi({id:id})
      this.$message.success('删除成功')
      this.initData()
    }
  },
};
</script>

<style scoped>
.block {
  display: flex;
  justify-content: center;
  margin-top: 10px;
}
</style>

<template>
  <el-card class="tag-container">
    <el-form :model="formSearch" label-width="80px" inline>
      <el-form-item label="标签名称" prop="tagname" size="small">
        <el-input
          v-model.trim="formSearch.tagname"
          placeholder="请输入标签名称"
        ></el-input>
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
        <el-button @click="addTag" type="primary" size="small" plain>
          <i class="el-icon-plus"></i>
          新增
        </el-button>
        <el-button type="success" size="small" plain>
          <i class="el-icon-download"></i>
          导出
        </el-button>
      </div>
      <div class="table-bg">
        <el-table :data="tagList" border style="width: 100%">
          <el-table-column type="index" label="#" width="50"></el-table-column>
          <el-table-column prop="id" label="ID"></el-table-column>
          <el-table-column prop="tagname" label="标签名称"></el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button
                @click="handleClick(scope.row)"
                type="primary"
                circle
                size="small"
              >
                <i class="el-icon-edit"></i>
              </el-button>
              <el-button
                @click="del(scope.row)"
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

    <el-dialog
      :title="formData.id ? '修改标签' : '添加标签'"
      :visible.sync="dialogVisible"
      width="30%"
      @close="close"
    >
      <el-form
        :model="formData"
        :rules="formRules"
        ref="form"
        label-width="80px"
        inline
      >
        <el-form-item label="标签名称" prop="tagname" size="small">
          <el-input
            v-model="formData.tagname"
            placeholder="请输入标签名称"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size='small' @click="dialogVisible = false">取 消</el-button>
        <el-button size='small' type="primary" @click="add">确 定</el-button>
      </span>
    </el-dialog>
  </el-card>
</template>

<script>
import { getTagListApi, delTagApi, addTagApi, editTagApi } from "@/api/tag";
export default {
  name: "Tag",
  data() {
    return {
      dialogVisible: false,
      formSearch: {
        tagname: "",
      },
      formData: {
        tagname: "",
      },
      formRules: {
        tagname: [
          { required: true, message: "请输入标签名称", trigger: "blur" },
        ],
      },
      params: {
        tagname: "",
        page: 1,
        limit: 10,
      },
      count: 0,
      tagList: [],
    };
  },

  mounted() {},
  created() {
    this.initData();
  },
  methods: {
    async initData() {
      const { count, data } = await getTagListApi(this.params);
      this.tagList = data;
      this.count = count;
    },
    handleSizeChange(val) {
      this.params.limit = val;
      this.initData();
    },
    handleCurrentChange(val) {
      this.params.page = val;
      this.initData();
    },
    addTag() {
      this.dialogVisible = true;
    },
    search() {
      this.params.tagname = this.formSearch.tagname;
      this.initData();
    },
    reset() {
      this.params.tagname = "";
      this.formSearch.tagname=''
      this.initData();
    },
    async add() {
      try {
        await this.$refs.form.validate();
      } catch (error) {
        return console.log(error);
      }
      if (this.formData.id) {
        await editTagApi(this.formData);
        this.$message.success("修改成功");
      } else {
        await addTagApi(this.formData);
        this.$message.success("添加成功");
      }
      this.initData()
      this.dialogVisible=false
    },
    handleClick(val) {
      this.dialogVisible = true;
      this.formData = val;
    },
    async del(val) {
      await this.$confirm("确认删除该标签吗？");
      await delTagApi({ id: val.id });
      this.$message.success("删除成功");
      this.initData();
    },
    close() {
      this.formData.tagname = "";
      this.dialogVisible = false;
    },
  },
};
</script>

<style scoped>
.tag-container {
  padding: 5px;
}
.block {
  margin-top: 10px;
}
</style>

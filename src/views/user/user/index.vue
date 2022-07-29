<template>
  <el-card class="tag-container">
    <el-form :model="formSearch" label-width="80px" inline>
      <el-form-item label="用户名" prop="username" size="small">
        <el-input
          v-model.trim="formSearch.username"
          placeholder="请输入用户名"
        ></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="mobile" size="small">
        <el-input
          v-model.trim="formSearch.mobile"
          placeholder="请输入手机号"
        ></el-input>
      </el-form-item>
      <el-form-item label="性别" prop="sex" size="small">
        <el-select v-model="formSearch.sex" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
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
        <el-table :data="memberList" border style="width: 100%">
          <el-table-column type="index" label="#" width="50"></el-table-column>
          <el-table-column prop="id" label="用户ID"></el-table-column>
          <el-table-column prop="username" label="用户名"></el-table-column>
          <el-table-column prop="mobile" label="手机号"></el-table-column>
          <el-table-column label="用户头像">
            <template slot-scope="scope">
              <el-image
                style="width: 100px; height: 100px"
                :src="'http://124.223.14.236:8060/' + scope.row.icon"
                fit="cover"
              >
              </el-image>
            </template>
          </el-table-column>
          <el-table-column label="性别">
            <template slot-scope="scope"
              ><el-tag>{{
                scope.row.sex === 0 ? "男" : "女"
              }}</el-tag></template
            >
          </el-table-column>
          <el-table-column prop="birthday" label="出生年月"></el-table-column>
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

    <el-dialog
      :title="formData.id ? '修改分类' : '添加分类'"
      :visible.sync="dialogVisible"
      width="50%"
      @close="close"
    >
      <el-form
        v-if="dialogVisible"
        :model="formData"
        :rules="formRules"
        ref="form"
        label-width="100px"
      >
        <el-row>
          <el-col :span="12">
            <el-form-item label="用户名" prop="username" size="small">
              <el-input
                v-model="formData.username"
                placeholder="请输入用户名"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="手机号" prop="mobile" size="small">
              <el-input
                v-model="formData.mobile"
                placeholder="请输入手机号"
                size="small"
              >
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="密码" prop="password" size="small">
              <el-input
                v-model="formData.password"
                placeholder="请输入密码"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="性别" prop="sex" size="small">
              <el-switch v-model="male" active-text="男" inactive-text="女">
              </el-switch>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="用户头像">
          <el-upload
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :file-list="fileList"
            list-type="picture"
          >
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">
              只能上传jpg/png文件，且不超过500kb
            </div>
          </el-upload>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogVisible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="add">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 图片预览 -->
    <el-dialog
      title="图片"
      :visible.sync="picDialogVisible"
      width="30%"
    >
      <img :src="imgUrl" style="width: 100%" />
    </el-dialog>
  </el-card>
</template>

<script>
import {
  getMemberListApi,
  addMemberApi,
  editMemberApi,
  getMemberInfoApi,
  delMemberApi,
} from "@/api/member";
export default {
  name: "Member",
  data() {
    return {
      picDialogVisible: false,
      imgUrl:'',
      options: [
        {
          value: "0",
          label: "男",
        },
        {
          value: "1",
          label: "女",
        },
      ],
      dialogVisible: false,
      formSearch: {
        username: "",
        mobile: "",
        sex: "",
      },
      formData: {
        username: "",
        icon: "",
        mobile: "",
        password: "",
        sex: "",
      },
      male: true,
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
        sex: "",
        username: "",
        mobile: "",
        page: 1,
        limit: 10,
      },
      count: 0,
      memberList: [],
    };
  },

  watch: {
    male: {
      immediate: true,
      handler(val) {
        this.formData.sex = val ? "0" : "1";
      },
    },
  },
  created() {
    this.initData();
  },
  methods: {
    async initData() {
      const { count, data } = await getMemberListApi(this.params);
      this.memberList = data;
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
    search() {
      this.params.username = this.formSearch.username;
      this.params.mobile = this.formSearch.mobile;
      this.params.sex = this.formSearch.sex;
      this.initData();
    },
    reset() {
      this.params.username = "";
      this.params.mobile = "";
      this.params.sex = "";
      this.formSearch.username = "";
      this.formSearch.mobile = "";
      this.formSearch.sex = "";
      this.initData();
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      this.picDialogVisible=true
      this.imgUrl = file.url
      console.log(file);
    },
    async add() {
      try {
        await this.$refs.form.validate();
      } catch (error) {
        return console.log(error);
      }
      if (this.formData.id) {
        await editMemberApi(this.formData);
        this.$message.success("修改成功");
      } else {
        await addMemberApi(this.formData);
        this.$message.success("添加成功");
      }
      this.initData();
      this.dialogVisible = false;
    },
    async handleClick(id) {
      this.dialogVisible = true;
      const data = await getMemberInfoApi({ id: id });
      this.formData = data;
      this.male = data.sex === 0 ? true : false;
    },
    async del(id) {
      await this.$confirm("确认删除该分类吗？");
      await delMemberApi({ id: id });
      this.$message.success("删除成功");
      this.initData();
    },
    close() {
      this.formData = {
        username: "",
        icon: "",
        mobile: "",
        password: "",
      };
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
.link {
  text-decoration: none;
  color: skyblue;
}
.el-upload-list__item {
  width: 43%;
}
</style>

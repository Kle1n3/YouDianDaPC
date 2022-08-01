<template>
  <el-card class="AddArticle-container">
    <el-form
      :model="formData"
      :rules="formRules"
      ref="form"
      label-width="120px"
    >
      <el-tabs>
        <el-tab-pane label="基础信息">
          <el-row class="formItem" type="flex" justify="space-between">
            <el-form-item label="标题" prop="title">
              <el-input
                placeholder="请输入内容"
                style="width: 700px"
                v-model="formData.title"
                class="input-with-select"
              >
                <el-button slot="append" icon="el-icon-search">查重</el-button>
              </el-input>
            </el-form-item>
          </el-row>
          <el-row class="formItem" type="flex" justify="space-between">
            <el-col>
              <el-form-item label="作者" prop="author">
                <el-input placeholder="请输入内容" v-model="formData.author">
                </el-input>
              </el-form-item>
            </el-col>
            <el-col>
              <el-form-item label="分类" prop="cateid">
                <el-select
                  v-model="formData.cateid"
                  placeholder="请选择"
                  @focus="getCateList"
                >
                  <el-option
                    v-for="item in cateList"
                    :key="item.id"
                    :label="item.catename"
                    :value="item.id"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row class="formItem" type="flex" justify="space-between">
            <el-col>
              <el-form-item label="阅读次数" prop="click">
                <el-input-number
                  v-model="formData.click"
                  :min="1"
                ></el-input-number>
              </el-form-item>
            </el-col>
            <el-col>
              <el-form-item label="创建时间" prop="create_date">
                <el-date-picker
                  v-model="formData.create_date"
                  type="date"
                  placeholder="选择日期"
                  format="yyyy 年 MM 月 dd 日"
                  value-format="timestamp"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row class="formItem" type="flex" justify="space-between">
            <el-col>
              <el-form-item label="是否推荐" prop="ishot">
                <el-switch
                  v-model="formData.ishot"
                  active-text="是"
                  inactive-text="否"
                  :active-value="1"
                  :inactive-value="0"
                >
                </el-switch>
              </el-form-item>
            </el-col>
            <el-col>
              <el-form-item label="是否置顶" prop="istop">
                <el-switch
                  v-model="formData.istop"
                  active-text="是"
                  inactive-text="否"
                  :active-value="1"
                  :inactive-value="0"
                >
                </el-switch>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row class="formItem" type="flex" justify="space-between">
            <el-form-item label="收藏数量" prop="lovenum">
              <el-input
                placeholder="请输入收藏数量名称"
                v-model="formData.lovenum"
                type="number"
              >
              </el-input>
            </el-form-item>
          </el-row>
          <el-row class="formItem" type="flex" justify="space-between">
            <el-form-item label="文章缩略图" prop="pic">
              <UploadPic
                :fileList="ImgList"
                @picUrl="formData.pic = $event"
                @clearValidate="handleFileChange"
              />
            </el-form-item>
          </el-row>
          <el-row class="formItem" type="flex" justify="space-between">
            <el-form-item label="文章标签" prop="tags">
              <el-checkbox-group v-model="formData.tags">
                <el-checkbox
                  v-for="obj in tagList"
                  :key="obj.id"
                  :label="obj.tagname"
                ></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-row>
          <el-row class="formItem" type="flex" justify="center">
            <el-button
              @click="addbtn"
              icon="el-icon-plus"
              size="small"
              type="success"
              >立即发布</el-button
            >
            <el-button
              @click="draftbtn"
              icon="el-icon-folder-checked"
              size="small"
              type="primary"
              >保存草稿</el-button
            >
            <el-button
              @click="$router.back()"
              icon="el-icon-back"
              size="small"
              type="warning"
              >返回列表</el-button
            >
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="SEO信息">
          <el-row class="formItem" type="flex" justify="space-between">
            <el-form-item label="SEO关键字" prop="keywords">
              <el-input
                type="textarea"
                :autosize="{ minRows: 3, maxRows: 4 }"
                placeholder="请输入SEO关键字名称"
                v-model="formData.keywords"
                style="width: 800px"
              >
              </el-input>
            </el-form-item>
          </el-row>
          <el-row class="formItem" type="flex" justify="space-between">
            <el-form-item label="SEO的描述" prop="description">
              <el-input
                type="textarea"
                :autosize="{ minRows: 3, maxRows: 4 }"
                placeholder="请输入SEO的描述名称"
                v-model="formData.description"
                style="width: 800px"
              >
              </el-input>
            </el-form-item>
          </el-row>
          <el-row class="formItem" type="flex" justify="center">
            <el-button
              @click="addbtn"
              icon="el-icon-plus"
              size="small"
              type="success"
              >立即发布</el-button
            >
            <el-button
              @click="draftbtn"
              icon="el-icon-folder-checked"
              size="small"
              type="primary"
              >保存草稿</el-button
            >
            <el-button
              @click="$router.back()"
              icon="el-icon-back"
              size="small"
              type="warning"
              >返回列表</el-button
            >
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="文章内容">
          <el-row class="formItem" type="flex" justify="space-between">
            <el-form-item label="文章内容" prop="content">
              <div style="border: 1px solid #ccc">
                <Toolbar
                  style="border-bottom: 1px solid #ccc"
                  :editor="editor"
                  :defaultConfig="toolbarConfig"
                  :mode="mode"
                />
                <Editor
                  style="height: 300px; overflow-y: hidden"
                  v-model="formData.content"
                  :defaultConfig="editorConfig"
                  :mode="mode"
                  @onCreated="onCreated"
                />
              </div>
            </el-form-item>
          </el-row>
          <el-row class="formItem" type="flex" justify="center">
            <el-button
              @click="addbtn"
              icon="el-icon-plus"
              size="small"
              type="success"
              >立即发布</el-button
            >
            <el-button
              @click="draftbtn"
              icon="el-icon-folder-checked"
              size="small"
              type="primary"
              >保存草稿</el-button
            >
            <el-button
              @click="$router.back()"
              icon="el-icon-back"
              size="small"
              type="warning"
              >返回列表</el-button
            >
          </el-row>
        </el-tab-pane>
      </el-tabs>
    </el-form>
  </el-card>
</template>

<script>
import { getCateAllApi } from "@/api/cate";
import { getTagAllApi } from "@/api/tag";
import {
  addArticleApi,
  getArticleRowInfoApi,
  editArticleApi,
} from "@/api/article";
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
import UploadPic from "@/components/uploadPic";
export default {
  name: "AddArticle",
  components: { Editor, Toolbar, UploadPic },
  data() {
    return {
      formData: {
        click: 1,
        ishot: "0",
        istop: "0",
        status: "",
        tags: [],
        pic: "",
      },
      formRules: {
        title: [{ required: true, message: "必须", trigger: "blur" }],
        author: [{ required: true, message: "必须", trigger: "blur" }],
        cateid: [{ required: true, message: "必须", trigger: "change" }],
        click: [{ required: true, message: "必须", trigger: "change" }],
        create_date: [{ required: true, message: "必须", trigger: "blur" }],
        ishot: [{ required: true, message: "必须", trigger: "blur" }],
        istop: [{ required: true, message: "必须", trigger: "blur" }],
        lovenum: [{ required: true, message: "必须", trigger: "blur" }],
        pic: [{ required: true, message: "必须", trigger: "change" }],
        tags: [{ required: true, message: "必须", trigger: "change" }],
        keywords: [{ required: true, message: "必须", trigger: "blur" }],
        description: [{ required: true, message: "必须", trigger: "blur" }],
        content: [{ required: true, message: "必须", trigger: "change" }],
      },
      cateList: [],
      tagList: [],
      editor: null,
      toolbarConfig: {},
      editorConfig: { placeholder: "请输入内容..." },
      mode: "default", // or 'simple'
      id: this.$route.params.id,
    };
  },
  created() {
    this.initData();
  },
  computed: {
    ImgList() {
      if (this.formData.pic) {
        const arr = this.formData.pic.split(",");
        const list = [];
        arr.forEach((item) => {
          const obj = {};
          (obj.name = "点击查看详情"),
            (obj.url = "http://124.223.14.236:8060/" + item);
          list.push(obj);
        });
        return list;
      } else {
        return [];
      }
    },
  },
  methods: {
    async initData() {
      const data = await getTagAllApi();
      this.tagList = data;
      if (this.id) {
        const data = await getArticleRowInfoApi({ id: this.id });
        this.formData = data;
        this.formData.tags = this.formData.tags.split(",");
        console.log(this.formData.tags);
      }
    },
    async getCateList() {
      const res = await getCateAllApi();
      this.cateList = res;
    },
    onCreated(editor) {
      this.editor = Object.seal(editor); // 一定要用 Object.seal() ，否则会报错
    },
    async addbtn() {
      try {
        await this.$refs.form.validate();
      } catch (error) {
        return console.log(error);
      }
      const cloneFormData = JSON.parse(JSON.stringify(this.formData));
      cloneFormData.tags = cloneFormData.tags.toString();
      if (this.id) {
        await editArticleApi(cloneFormData);
        this.$message.success("修改成功");
      } else {
        await addArticleApi(cloneFormData);
        this.$message.success("添加成功");
      }

      this.$router.push("/content_article");
    },
    async draftbtn() {
      try {
        await this.$refs.form.validate();
      } catch (error) {
        return console.log(error);
      }
      const cloneFormData = JSON.parse(JSON.stringify(this.formData));
      cloneFormData.tags = cloneFormData.tags.toString();
      cloneFormData.status = "1";
      if (this.id) {
        await editArticleApi(cloneFormData);
        this.$message.success("修改成功");
      } else {
        await addArticleApi(cloneFormData);
        this.$message.success("添加成功");
      }
      this.$router.push("/content_article");
    },
    handleFileChange() {
      this.$refs.form.clearValidate("pic");
    },
  },
  beforeDestroy() {
    const editor = this.editor;
    if (editor == null) return;
    editor.destroy(); // 组件销毁时，及时销毁编辑器
  },
};
</script>
<style src="@wangeditor/editor/dist/css/style.css"></style>
<style>
.AddArticle-container .formItem {
  padding: 0px 166px 0 100px;
}
.AddArticle-container .el-form-item__label {
  font-weight: 700;
}
.AddArticle-container .el-tabs__content {
  padding-top: 40px;
}
</style>

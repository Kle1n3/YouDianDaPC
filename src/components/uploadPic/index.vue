<template>
  <div>
    <el-upload
      class="upload-demo"
      action="http://124.223.14.236:8060/admin/common/upload?type=images"
      :on-preview="handlePreview"
      :http-request="uploadPic"
      :on-change="handleFileChange"
      :file-list="fileList"
      list-type="picture"
    >
      <el-button size="small" type="primary">点击上传</el-button>
    </el-upload>
    <!-- 图片预览 -->
    <el-dialog title="图片" :visible.sync="picDialogVisible" width="30%">
      <img :src="imgUrl" style="width: 100%" />
    </el-dialog>
  </div>
</template>

<script>
import { uploadPicApi,} from "@/api/article";
export default {
  name: "UploadPic",
  props:{
    fileList:{
      type:Array,
      default:[],
    }
  },
  data() {
    return {
      picDialogVisible: false,
      imgUrl: "",
    };
  },
  methods: {
    handlePreview(file) {
      this.picDialogVisible = true;
      this.imgUrl = file.url;
    },
    async uploadPic(file) {
      const fd = new FormData();
      fd.append("file", file.file);
      const { savePath } = await uploadPicApi(fd);
      this.$emit('picUrl',savePath)
    },
    //在methods里添加图片上传成功的回调方法handleFileSuccess
    handleFileChange(file, fileList) {
      //判断图片列表长度大于0时，代表已上传本地图片
      if (fileList.length > 0) {
        this.$emit('clearValidate')
        // this.$refs.form.clearValidate("pic"); //清除图片文字校验
      }
    },
  },
};
</script>

<style></style>

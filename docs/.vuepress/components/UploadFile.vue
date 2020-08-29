<template>
  <el-upload
    ref="upload"
    class="upload-file"
    v-bind="$attrs"
    :show-file-list="showFileList"
    :disabled="disabled"
    v-on="$listeners"
    :on-error="onError"
    :on-progress="onProgress"
  >
    <slot name="trigger" slot="trigger"></slot>
    <slot><el-button type="primary" size="small">点击上传</el-button></slot>
    <slot name="tip" slot="tip"></slot>
    <el-dialog
      class="upload-dialog"
      title="上传列表"
      append-to-body
      :visible.sync="!showFileList && files.length > 0"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :before-close="close"
    >
      <transition-group
        tag="ul"
        :class="['el-upload-list', 'el-upload-list--text', { 'is-disabled': disabled }]"
        name="el-list"
      >
        <li
          v-for="file in files"
          :class="['el-upload-list__item2', 'is-' + file.status]"
          :key="file.name"
        >
          <a class="el-upload-list__item-name" @click="handleClick(file)">
            <i class="el-icon-document"></i>{{ file.name }}
          </a>
          <i
            @click="file.status !== 'success' ? remove(file) : handleClick(file)"
            :class="{
              'el-icon-success': file.status === 'success',
              'el-icon-close': file.status !== 'success',
              'circle-check': true
            }"
          >
          </i>
          <el-progress
            v-if="file.status === 'uploading'"
            type="line"
            :stroke-width="2"
            :percentage="parsePercentage(file.percentage)"
          >
          </el-progress>
        </li>
      </transition-group>
    </el-dialog>
  </el-upload>
</template>

<script>
export default {
  name: 'UploadFile',
  inheritAttrs: false,
  props: {
    showFileList: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      files: []
    }
  },
  watch: {
    files: {
      handler: function() {
        if (
          !this.showFileList &&
          this.files.length &&
          this.files.every(item => item.status === 'success')
        ) {
          setTimeout(() => {
            this.files.splice(0)
          }, 500)
        }
      },
      deep: true
    }
  },
  methods: {
    // 计算上传进度
    parsePercentage(val) {
      if (val >= 99) {
        return 99
      } else {
        return parseInt(val, 10)
      }
    },
    // 上传进度条
    onProgress(event, file, fileList) {
      this.files = fileList
    },
    // 上传失败
    onError() {
      this.$message.warning('上传失败，请重新上传')
    },
    // 取消上传
    remove(file) {
      this.$confirm(`确定要取消上传该文件吗？`, '提示', { type: 'warning' }).then(() => {
        this.$refs.upload.abort(file)
        this.files.splice(this.files.indexOf(file), 1)
      })
    },
    // 关闭进度条
    close() {
      if (this.files.every(item => item.status === 'success')) {
        this.files.splice(0)
      } else {
        const unUploadedFiles = this.files.filter(file => file.status !== 'success')
        this.$confirm(
          `有 ${unUploadedFiles.length} 项上传任务正在进行。确定要取消上传吗？`,
          '提示',
          {
            type: 'warning'
          }
        ).then(() => {
          this.$refs.upload.abort()
          this.files.splice(0)
        })
      }
    },
    handleClick(file) {
      this.onPreview && this.onPreview(file)
    }
  }
}
</script>

<style lang="less" scoped>
.upload-file {
  display: inline-block;
  .is-picture {
    .el-upload {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }
    .el-upload:hover {
      border-color: #409eff;
    }
    .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      text-align: center;
    }
    .avatar {
      display: block;
    }
  }
}
.upload-dialog {
  .el-dialog__body {
    padding: 15px !important;
    .el-upload-list__item2 {
      transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
      font-size: 14px;
      color: #48576a;
      line-height: 1.8;
      margin-top: 5px;
      box-sizing: border-box;
      border-radius: 4px;
      width: 100%;
      position: relative;
      .circle-check {
        position: absolute;
        top: 2px;
        right: 2px;
        font-size: 20px;
      }
      .el-icon-success {
        color: #13ce66;
      }
      .el-icon-close {
        cursor: pointer;
        opacity: 0.75;
        color: #48576a;
        -ms-transform: scale(0.7);
        transform: scale(0.7);
      }
    }
  }
}
</style>

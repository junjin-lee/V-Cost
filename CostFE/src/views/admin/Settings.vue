<template>
<div class="app-container">
  <div class="card">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>TODO</span>
      </div>
      <el-button class="filter-item" style="margin-left: 5px;" type="primary" icon="el-icon-upload" @click="importCSV">
      </el-button>
      <el-dialog title="Import Employee Profiles" class="compact" :loading="csvUploading" :visible.sync="csvDialogVisible"
               width="600px">
            <el-upload
              ref="elUpload"
              class="upload-demo"
              drag
              action="/api/demand/import_demands"
              accept="text/csv"
              :headers="{'x-access-token':token}"
              :before-upload="onBeforeUpload"
              :file-list="fileList"
              :on-remove="onCsvRemoved"
              :on-progress="onCsvProgress"
              :on-success="onCsvUploaded"
              :on-error="onCsvError"
            >
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">Drop csv file here or <em>click to upload</em></div>
              <div class="el-upload__tip" slot="tip">CSV file with a size less than 10MB</div>
            </el-upload>

      <span slot="footer" class="dialog-footer">
        <el-button @click="csvDialogVisible = false" :disabled="csvUploading">Cancel</el-button>
        <el-button type="primary" @click="csvDialogVisible = false" :disabled="csvUploading">OK</el-button>
      </span>

    </el-dialog>
    </el-card>
  </div>
</div>
</template>

<script>
import { name } from '@/store/getters';
export default {
  //name: 'settings',
  data() {
    return {
      csvDialogVisible: false,
      fileList: [],
      csvUploading: false
    };
  },
  computed: {
    user() {
      return this.$store.getters.name;
    },
    isAdmin() {
      return this.$store.getters.roles.includes(3);
    },
    token() {
      return this.$store.getters.token;
    }
  },
  methods: {
    importCSV() {
      this.csvDialogVisible = true;
    },
    onBeforeUpload(file) {
      // TODO
      // judge current url, if it's localhost do sth.

      console.log(file.type);

      const isCSV = file.type === 'text/csv';
      const isLt10M = file.size / 1024 / 1024 < 10;

      if (!isCSV) {
        this.$message.error('You can only upload CSV file!');
      }
      if (!isLt10M) {
        this.$message.error('File size cannot exceed 10MB!');
      }
      return isCSV && isLt10M;
    },

    onCsvRemoved() {
      this.csvUploading = false;
    },

    onCsvProgress(event, file, fileList) {
      console.log(event);
      this.csvUploading = true;
    },

    onCsvUploaded(res, file, fileList) {
      this.csvUploading = false;
      this.csvDialogVisible = false;
      this.$refs.elUpload.clearFiles();
      this.$message({
        type: 'success',
        message: `Import success, ${
          res.linesRead
        } rows processed. Please refresh page to get the latest status.`,
        duration: 6000
      });
    },

    onCsvError(err, file, fileList) {
      this.csvUploading = false;
      this.$message({ type: 'error', message: err.message });
    }
  }
};
</script>

<style scoped>
</style>

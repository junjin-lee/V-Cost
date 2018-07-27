<template>
  <div class="card">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>成本管理 </span>
        <span class="minibar">
          <el-button title="New" type="success" @click="handleInsert()">新 增</el-button>
        </span>
      </div>

    
    <div class="filter-container"> 
 
    <el-input class="filter-item" style="width: 150px;" v-model="listQuery.project_name" @keyup.enter.native="fetchData"
                placeholder="项目名称"/>

      <el-input class="filter-item" style="width: 150px;" v-model="listQuery.project_no" @keyup.enter.native="fetchData"
                placeholder="项目编号"/>


      <el-button class="filter-item" style="margin-left: 5px;" type="primary" icon="el-icon-search"
                 @click="fetchData">
      </el-button>

      <el-button class="filter-item" style="margin-left: 5px;" type="primary" icon="el-icon-upload" @click="importCSV">
      </el-button>

      <el-button class="filter-item" style="margin-left: 5px;" type="primary" icon="el-icon-document"
                 @click="exportCSV">
      </el-button>

    </div>

      <el-table :key='tableKey'
        :data="costs"
        v-loading.body="listLoading" border fit
              style="width: 100%">
        <el-table-column
          type="index"
          width="50">
        </el-table-column>
        <el-table-column
          prop="category_name"
          label="类别">
        </el-table-column>
        <el-table-column
          prop="item_name"
          label="项目分类">
        </el-table-column>
        <el-table-column
          prop="project_name"
          label="项目名称">
        </el-table-column>
        <el-table-column
          prop="project_no"
          label="项目编号">
        </el-table-column>
        <el-table-column
          prop="plan_cost"
          label="计划费用">
        </el-table-column>
        <el-table-column min-width="100px" label="开工日期">
        <template slot-scope="scope">
          <span>{{moment(scope.row.start_date).format('YYYY-MM-DD')}}</span>
        </template>
        </el-table-column>
        <el-table-column min-width="100px" label="竣工日期">
        <template slot-scope="scope">
          <span>{{moment(scope.row.completed_date).format('YYYY-MM-DD')}}</span>
        </template>
      </el-table-column>
        <el-table-column
          prop="project_budget"
          label="项目概算">
        </el-table-column>
        <el-table-column
          prop="company"
          label="单位">
        </el-table-column>
    
        <el-table-column
          prop="project_cost"
          label="费用">
        </el-table-column>
        <el-table-column min-width="100px" label="结算日期">
        <template slot-scope="scope">
          <span>{{moment(scope.row.final_date).format('YYYY-MM-DD')}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作" width="200">
        <template slot-scope="scope">
          <el-button size="small" type="success" @click="handleUpdate(scope.row)">编辑
          </el-button>
          <el-button size="small" type="danger" @click="deletes(scope.row)">删除
          </el-button>
        </template>
      </el-table-column>

      </el-table>
   <div v-show="!listLoading" class="pagination-container">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                     :current-page.sync="listQuery.page"
                     :page-sizes="[5,10,20,30,50]" :page-size="listQuery.limit"
                     layout="total, sizes, prev, pager, next" :total="total">
      </el-pagination>
    </div>
    </el-card>


    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form :model="form" :rules="rules" ref="form" label-width="100px" class="demo-ruleForm">
       
         <el-form-item label="费用类别" prop="category_name">
          <el-select class="filter-item" v-model="form.category_name" @change="changeCategory" clearable placeholder="请选择">
          <el-option
          v-for="item in categorys"
            :key="item.category_name"
            :label="item.category_name"
            :value="item.category_name">
        </el-option>
          </el-select>
        </el-form-item>

         <el-form-item label="项目分类" prop="item_name">
          <el-select class="filter-item" v-model="form.item_name" clearable placeholder="请选择">
          <el-option
          v-for="item in subcostitems"
            :key="item.item_name"
            :label="item.item_name"
            :value="item.item_name">
        </el-option>
          </el-select>
        </el-form-item>

         <el-form-item label="项目名称">
          <el-input v-model="form.project_name"></el-input>
        </el-form-item>

        <el-form-item label="项目编号" >
          <el-input v-model="form.project_no"></el-input>
        </el-form-item>

        <el-form-item label="计划费用" prop="plan_cost">
          <el-input  v-model.number="form.plan_cost" auto-complete="off"></el-input>
        </el-form-item>

         <el-form-item label="项目时间">
            <el-col :span="11">
              <el-date-picker type="date" placeholder="选择开工日期" v-model="form.start_date" style="width: 100%;"></el-date-picker>
            </el-col>
            <el-col class="line" :span="2">-</el-col>
            <el-col :span="11">
              <el-date-picker type="date" placeholder="选择竣工日期" v-model="form.completed_date" style="width: 100%;"></el-date-picker>
              
            </el-col>
         </el-form-item>

        <el-form-item label="项目概算" prop="project_budget">
          <el-input  v-model.number="form.project_budget" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="公司">
          <el-input v-model="form.company"></el-input>
        </el-form-item>

        <el-form-item label="费用" prop="project_cost">
           <el-input  v-model.number="form.project_cost" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="结算日期" >
          <el-date-picker v-model="form.final_date"
          type="date"
          placeholder="选择日期">
        </el-date-picker>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel('form')">取 消</el-button>
        <el-button v-if="dialogStatus=='create'" type="primary" @click="create('form')">确 定</el-button>
        <el-button v-else type="primary" @click="update('form')">修 改</el-button>
      </div>
    </el-dialog>

 <!--import demands-->
  <el-dialog title="导入csv格式的成本信息" class="compact" :loading="csvUploading" :visible.sync="csvDialogVisible"
               width="600px">
      <el-upload
        ref="elUpload"
        class="upload-demo"
        drag
        action="/api/cost/import_costs"
        accept="text/csv"
        :headers="{'x-access-token':token}"
        :before-upload="onBeforeUpload"
        :file-list="fileList"
        :on-remove="onCsvRemoved"
        :on-progress="onCsvProgress"
        :on-success="onCsvUploaded"
        :on-error="onCsvError">
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">Drop csv file here or <em>click to upload</em></div>
        <div class="el-upload__tip" slot="tip">CSV file with a size less than 10MB</div>
      </el-upload>

      <span slot="footer" class="dialog-footer">
        <el-button @click="csvDialogVisible = false" :disabled="csvUploading">Cancel</el-button>
        <el-button type="primary" @click="csvDialogVisible = false" :disabled="csvUploading">OK</el-button>
      </span>
    </el-dialog>

  </div>

</template>

<script>
import FileSaver from 'file-saver';
import {
  getCosts,
  addCost,
  updateCost,
  deleteCost,
  exportCosts
} from '@/api/cost';
import { getCategorys } from '@/api/category';
import { getCostitems } from '@/api/costitem';
export default {
  name: 'costitem',
  data() {
    return {
      costs: [],
      categorys: [],
      costitems: [],
      subcostitems: [],
      dialogFormVisible: false,
      csvDialogVisible: false,
      dialogStatus: '',
      textMap: {
        update: '编辑',
        create: '创建'
      },

      form: {
        category_name: undefined,
        item_name: undefined,
        project_name: undefined,
        project_no: undefined,
        plan_cost: undefined,
        start_date: undefined,
        completed_date: undefined,
        project_budget: undefined,
        company: undefined,
        project_cost: undefined,
        final_date: undefined,
        image_data: undefined
      },
      category_selected: null,

      total: 0,
      listLoading: true,
      tableKey: 0,
      listQuery: {
        page: 1,
        limit: 10,
        category_name: '',
        item_name: '',
        project_name: '',
        project_no: ''
      },
      // import
      fileList: [],
      csvUploading: false,

      rules: {
        item_name: [
          {
            required: true,
            message: '请选择项目分类',
            trigger: 'blur'
          }
        ],
        category_name: [
          {
            required: true,
            message: '请选择类别',
            trigger: 'blur'
          }
        ],
        plan_cost: [
          {
            required: false,
            trigger: 'change',
            validator: (rule, value, callback) => {
              if (value != '') {
                if (
                  /^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/.test(value) == false
                ) {
                  callback(new Error('请填写大于0的数字'));
                } else {
                  callback();
                }
              } else {
                callback();
              }
            },
            trigger: 'change'
          }
        ],
        project_budget: [
          {
            validator: (rule, value, callback) => {
              if (value != '') {
                if (
                  /^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/.test(value) == false
                ) {
                  callback(new Error('请填写大于0的数字'));
                } else {
                  callback();
                }
              } else {
                callback();
              }
            },
            trigger: 'change'
          }
        ],
        project_cost: [
          {
            validator: (rule, value, callback) => {
              if (value != '') {
                if (
                  /^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/.test(value) == false
                ) {
                  callback(new Error('请填写大于0的数字'));
                } else {
                  callback();
                }
              } else {
                callback();
              }
            },
            trigger: 'change'
          }
        ]
      }
    };
  },
  watch: {
    // category_name: function() {
    //   this.subcostitems = [];
    //   this.costitems.forEach(t => {
    //     console.log(t);
    //     if (t.category_name == this.form.category_name) {
    //       this.subcostitems.push(t);
    //     }
    //   });
    // }
  },
  computed: {
    token() {
      return this.$store.getters.token;
    }
  },
  mounted() {
    this.fetchData();
    this.loadCostitems();
    this.loadCategorys();
  },
  methods: {
    changeCategory() {
      console.log(this.form.category_name);
      this.subcostitems = [];
      this.costitems.forEach(t => {
        console.log(t);
        if (t.category_name == this.form.category_name) {
          this.subcostitems.push(t);
        }
      });
    },
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
    },

    fetchData() {
      this.listLoading = true;
      getCosts(this.listQuery)
        .then(res => {
          this.costs = res.data.data;
          this.total = res.data.total;
          this.listLoading = false;
        })
        .catch(err => {
          this.listLoading = false;
        });
    },
    loadCategorys() {
      getCategorys().then(res => {
        this.categorys = res.data;
      });
    },
    loadCostitems() {
      getCostitems().then(res => {
        this.costitems = res.data;
      });
    },
    handleUpdate(row) {
      this.form = row;
      this.dialogFormVisible = true;
      this.dialogStatus = 'update';
    },

    create(formName) {
      const set = this.$refs;
      set[formName].validate(valid => {
        if (valid) {
          // this.form.category_name = this.category_selected;
          addCost(this.form).then(() => {
            this.dialogFormVisible = false;
            this.fetchData();
            this.$notify({
              title: '成功',
              message: '创建成功',
              type: 'success',
              duration: 2000
            });
          });
        } else {
          return false;
        }
      });
    },
    cancel(formName) {
      this.dialogFormVisible = false;
      this.$refs[formName].resetFields();
    },

    handleInsert() {
      this.resetTemp();
      this.dialogStatus = 'create';
      this.dialogFormVisible = true;
    },
    update(formName) {
      const set = this.$refs;
      set[formName].validate(valid => {
        if (valid) {
          this.dialogFormVisible = false;
          // this.form.category_name = this.category_selected;
          // console.log(this.category_selected);
          updateCost(this.form).then(() => {
            this.dialogFormVisible = false;
            this.fetchData();
            this.$notify({
              title: '成功',
              message: '修改成功',
              type: 'success',
              duration: 2000
            });
          });
        } else {
          return false;
        }
      });
    },

    deletes(row) {
      this.$confirm(
        '此操作将永久删除该成本(' + row.project_name + '), 是否继续?',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).then(() => {
        deleteCost(row._id)
          .then(() => {
            this.fetchData();
            this.$notify({
              title: '成功',
              message: '删除成功',
              type: 'success',
              duration: 2000
            });
          })
          .cache(() => {
            this.$notify({
              title: '失败',
              message: '删除失败',
              type: 'error',
              duration: 2000
            });
          });
      });
    },
    resetTemp() {
      this.form = {
        _id: undefined,
        item_name: '',
        category_name: '',
        description: ''
      };
    },
    handleSizeChange(val) {
      this.listQuery.page = 1;
      this.listQuery.limit = val;
      this.fetchData();
    },
    handleCurrentChange(val) {
      this.listQuery.page = val;
      this.fetchData();
    },

    exportCSV() {
      //Download the file as CSV
      const query = this._buildQuery();
      exportCosts(query)
        .then(res => {
          var blob = new Blob(['\ufeff', res.data]);

          // var BOM = "data:text/csv;charset=utf-8,";
          // var csvContent = BOM + res.data;
          // Log somewhat to show that the browser actually exposes the custom HTTP header
          const fileNameHeader = 'x-suggested-filename';
          const suggestedFileName = res.headers[fileNameHeader];
          const effectiveFileName =
            suggestedFileName === undefined ? '成本.csv' : suggestedFileName;
          console.log(
            'Received header [' +
              fileNameHeader +
              ']: ' +
              suggestedFileName +
              ', effective fileName: ' +
              effectiveFileName
          );

          // Let the user save the file.
          FileSaver.saveAs(blob, effectiveFileName, false);
        })
        .catch(res => {
          console.error(
            'Could not Download the Excel report from the backend.',
            res
          );
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.el-form-item__error {
  color: #f56c6c;
  font-size: 12px;
  line-height: 1;
  padding-top: 4px;
  position: absolute;
  top: 100%;
  left: 0;
}
.minibar {
  float: right;
  margin-right: 1em;

  .el-button--mini,
  .el-button--mini.is-round {
    padding: 2px 6px;
  }

  .el-button--mini,
  .el-button--small {
    font-size: 10px;
    border-radius: 3px;
  }

  .el-button + .el-button {
    margin-left: 0;
  }
}
</style>

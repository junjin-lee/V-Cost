<template>
  <div class="card">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>费用子项管理 </span>
        <span class="minibar">
          <el-button title="New" type="success" @click="handleInsert()">新 增</el-button>
        </span>
      </div>
      <el-table
        :data="costitems"
        empty-text=" "
        stripe
        style="width: 100%">
        <el-table-column
          type="index"
          width="50">
        </el-table-column>
        <el-table-column
          prop="item_name"
          label="费用名称">
        </el-table-column>
        <el-table-column
          prop="category_name"
          label="类别">
        </el-table-column>
        <el-table-column
          prop="description"
          label="描述">
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
    </el-card>



    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form :model="form" :rules="rules" ref="form" label-width="100px" class="demo-ruleForm">
        <el-form-item label="费用名称" prop="item_name">
          <el-input v-model="form.item_name" placeholder="请输费用名称"></el-input>
        </el-form-item>
         <el-form-item label="费用类别" prop="category_name">
          <el-select class="filter-item" v-model="form.category_name" placeholder="请选择">
          <el-option
          v-for="item in categorys"
            :key="item.category_name"
            :label="item.category_name"
            :value="item.category_name">
        </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注" prop="description">
          <el-input v-model="form.description"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel('form')">取 消</el-button>
        <el-button v-if="dialogStatus=='create'" type="primary" @click="create('form')">确 定</el-button>
        <el-button v-else type="primary" @click="update('form')">修 改</el-button>
      </div>
    </el-dialog>

  </div>

</template>

<script>
import {
  getCostitems,
  addCostitem,
  updateCostitem,
  deleteCostitem
} from '@/api/costitem';
import { getCategorys } from '@/api/category';
export default {
  name: 'costitem',
  data() {
    return {
      costitems: [],
      categorys: [],
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '编辑',
        create: '创建'
      },
      form: {
        item_name: undefined,
        category_name: undefined,
        description: undefined
      },
      rules: {
        item_name: [
          {
            required: true,
            message: '请输入名称',
            trigger: 'blur'
          },
          {
            min: 2,
            max: 40,
            message: '长度在 2 到 40 个字符',
            trigger: 'blur'
          }
        ],
        category_name: [
          {
            required: true,
            message: '请选择类别',
            trigger: 'blur'
          }
        ]
      }
    };
  },
  mounted() {
    this.loadCostitems();
    this.loadCategorys();
  },
  methods: {
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
          addCostitem(this.form).then(() => {
            this.dialogFormVisible = false;
            this.loadCostitems();
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
          updateCostitem(this.form).then(() => {
            this.dialogFormVisible = false;
            this.loadCostitems();
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
        '此操作将永久删除该类别名称(' + row.item_name + '), 是否继续?',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).then(() => {
        deleteCostitem(row._id)
          .then(() => {
            this.loadCostitems();
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

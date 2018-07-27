<template>
  <div class="card">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>用户管理 </span>
        <span class="minibar">
          <el-button title="New" type="success" @click="handleInsert()">新增</el-button>
        </span>
      </div>
      <el-table
        :data="users"
        empty-text=" "
        stripe
        style="width: 100%">
        <el-table-column
          type="index"
          width="50">
        </el-table-column>
        <el-table-column
          prop="username"
          label="用户名">
        </el-table-column>
        <el-table-column
          prop="nickname"
          label="姓名">
        </el-table-column>

        <el-table-column
          prop="email"
          label="邮箱">
        </el-table-column>
        <el-table-column
          prop="phone"
          label="电话">
        </el-table-column>

       <el-table-column align="center" class-name="status-col" label="角色">
        <template slot-scope="scope">
          <el-tag>{{scope.row.role | roleFilter}}</el-tag>
        </template>
      </el-table-column>

   <el-table-column min-width="80px" label="创建时间">
        <template slot-scope="scope">
          <span>{{moment(scope.row.regTime).format('YYYY-MM-DD HH:mm')}}</span>
        </template>
      </el-table-column>

     <el-table-column align="center" class-name="status-col" label="状态">
        <template slot-scope="scope">
          <el-tag>{{scope.row.enabled | statusFilter}}</el-tag>
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

        <!-- <el-table-column
          label="Operations">
          <template slot-scope="scope">
            <el-button
              v-if="canDelete(scope.row)"
              type="text"
              icon="el-icon-delete"
              @click="handleDeleteUser(scope.$index, scope.row)">
            </el-button>
          </template>
        </el-table-column> -->
      </el-table>
    </el-card>



    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form :model="form" :rules="rules" ref="form" label-width="100px" class="demo-ruleForm">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="form.username" placeholder="请输用户名"></el-input>
        </el-form-item>

        <el-form-item label="姓名" prop="nickname">
          <el-input v-model="form.nickname"></el-input>
        </el-form-item>

        <el-form-item label="角色" prop="role">
          <el-select class="filter-item" v-model="role[0]" placeholder="请选择">
          <el-option
          v-for="item in meta.ROLES"
            :key="item.value"
            :label="item.label"
            :value="item.value">
        </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="手机号" prop="phone">
          <el-input v-model="form.phone"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="form.email"></el-input>
        </el-form-item>
        <el-form-item label="状态" v-if="dialogStatus == 'update' " prop="enabled">
          <el-select class="filter-item" v-model="form.enabled" placeholder="请选择">
            <el-option v-for="item in statusOptions" :key="item" :label="item | statusFilter" :value="item"> </el-option>
          </el-select>
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
import { getUsers, addUser, updateUser, deleteUser } from '@/api/user';
import ROLES from '@/api/master_data/ROLE';
export default {
  name: 'permission',
  data() {
    return {
      users: [],
      dialogFormVisible: false,
      rolesOptions: [],
      statusOptions: ['Y', 'N'],
      dialogStatus: '',
      textMap: {
        update: '编辑',
        create: '创建'
      },
      role: [],
      form: {
        username: undefined,
        nickname: undefined,
        enabled: undefined,
        phone: undefined,
        email: undefined
      },
      rules: {
        username: [
          {
            required: true,
            message: '请输入账户',
            trigger: 'blur'
          },
          {
            min: 3,
            max: 20,
            message: '长度在 3 到 20 个字符',
            trigger: 'blur'
          }
        ],
        role: [
          {
            required: true,
            message: '请选择角色',
            trigger: 'blur'
          }
        ]
      },
      // meta
      meta: {
        ROLES: ROLES
      }
    };
  },
  mounted() {
    this.loadUsers();
  },
  filters: {
    roleFilter(role) {
      const roleMap = {
        3: '管理员',
        1: '用户'
      };
      return roleMap[role];
    },
    statusFilter(status) {
      const statusMap = {
        Y: '有效',
        N: '无效'
      };
      return statusMap[status];
    }
  },
  methods: {
    canDelete(row) {
      return (
        row.username !== 'Admin' && row.username !== this.$store.getters.name
      );
    },
    loadUsers() {
      getUsers().then(res => {
        this.users = res.data;
      });
    },
    handleUpdate(row) {
      this.form = row;
      console.log(row);
      //this.role = this.form.role;
      this.dialogFormVisible = true;
      this.dialogStatus = 'update';

      this.role = row.role;
    },

    create(formName) {
      const set = this.$refs;
      this.form.role = this.role;
      this.form.enabled = 'Y';
      set[formName].validate(valid => {
        if (valid) {
          addUser(this.form).then(() => {
            this.dialogFormVisible = false;
            this.loadUsers();
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
      this.form.role = this.role;
      console.log(this.form.role);
      set[formName].validate(valid => {
        if (valid) {
          this.dialogFormVisible = false;
          this.form.password = undefined;
          updateUser(this.form).then(() => {
            this.dialogFormVisible = false;
            this.loadUsers();
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
        '此操作将永久删除该用户(用户名:' + row.username + '), 是否继续?',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).then(() => {
        deleteUser(row._id)
          .then(() => {
            this.loadUsers();
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
        _id: '',
        username: '',
        role: [],
        enabled: '',
        email: '',
        nickname: '',
        phone: ''
      };
    }
  }
};
</script>

<style lang="scss" scoped>
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

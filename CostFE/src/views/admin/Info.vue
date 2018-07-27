<template>
  <div class="app-container calendar-list-container">
    <el-row>
      <el-col :span="12">
        <div class="grid-content bg-purple">
          <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
            <el-form-item label="用户名">
              <el-input type="text" :value="ruleForm2.username" disabled></el-input>
            </el-form-item>
            <el-form-item label="姓名" >
              <el-input type="text" :value="ruleForm2.nickname" disabled></el-input>
            </el-form-item>
            <!-- <el-form-item label="原密码" prop="pass">
              <el-input type="password" v-model="ruleForm2.password" auto-complete="off"></el-input>
            </el-form-item> -->
            <el-form-item label="密码" prop="pass">
              <el-input type="password" v-model="ruleForm2.newpassword1" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="checkPass">
              <el-input type="password" v-model="ruleForm2.newpassword2" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="手机号">
              <el-input v-model="ruleForm2.phone" placeholder=""></el-input>
            </el-form-item>
            <el-form-item label="邮箱">
              <el-input v-model="ruleForm2.email" placeholder=""></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
              <el-button @click="resetForm('ruleForm2')">重置</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-col>
    </el-row>

  </div>
</template>


<script>
import { mapState } from 'vuex';
import { editInfo } from '@/api/user';
import user from '@/store/modules/user';
import { getUser, setUser } from '@/utils/auth';
export default {
  components: {},
  data() {
    var validatePass = (rule, value, callback) => {
      console.log(value);
      if (value === '') {
        callback(new Error('请输入密码'));
      } else if (value.length < 6) {
        callback(new Error('密码不能小于6位'));
      } else {
        if (this.ruleForm2.newpassword1 !== '') {
          this.$refs.ruleForm2.validateField('newpassword1');
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.ruleForm2.newpassword2) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      show: false,
      ruleForm2: {
        username: '',
        newpassword1: '',
        newpassword2: '',
        nickname: '',
        phone: '',
        email: ''
      },
      rules2: {
        newpassword1: [{ validator: validatePass, trigger: 'blur' }],
        newpassword2: [{ validator: validatePass2, trigger: 'blur' }]
      }
    };
  },
  mounted() {
    console.log(this.$store.getters.name);
    this.ruleForm2.username = this.$store.getters.name;
    const data = getUser();
    this.ruleForm2.email = data.email;
    this.ruleForm2.phone = data.phone;
    this.ruleForm2.nickname = data.nickname;
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log('valid' + valid);
          // editInfo(this.ruleForm2)
          //   .then(response => {
          //     if (response) {
          //       this.$notify({
          //         title: '成功',
          //         message: '修改成功',
          //         type: 'success',
          //         duration: 2000
          //       });
          //       // 修改密码之后强制重新登录
          //       if (this.ruleForm2.newpassword1 !== '') {
          //         this.$store.dispatch('FedLogOut').then(() => {
          //           location.reload(); // 为了重新实例化vue-router对象 避免bug
          //         });
          //       } else {
          //         this.$router.push({ path: '/' });
          //         setUser(response.data);
          //       }
          //     } else {
          //       this.$notify({
          //         title: '失败',
          //         message: response,
          //         type: 'fail',
          //         duration: 2000
          //       });
          //     }
          //   })
          //   .catch(() => {
          //     this.$notify({
          //       title: '失败',
          //       message: '修改失败',
          //       type: 'fail',
          //       duration: 2000
          //     });
          //   });
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      const data = getUser();
      this.ruleForm2.email = data.email;
      this.ruleForm2.phone = data.phone;
      this.ruleForm2.nickname = data.nickname;
      this.ruleForm2.password = '';
      this.ruleForm2.newpassword1 = '';
      this.ruleForm2.newpassword2 = '';
    },
    toggleShow() {
      this.show = !this.show;
    }
  }
};
</script>

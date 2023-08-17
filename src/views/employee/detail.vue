<template>
    <div>
        <div class="box">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-row>
                    <el-col :span="9">
                        <el-form-item label="姓名" prop="username">
                            <el-input size="mini" v-model="ruleForm.username"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="9">
                        <el-form-item label="工号" prop="workNumber">
                            <el-input size="mini" :disabled="true" v-model="ruleForm.workNumber"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="9">
                        <el-form-item label="手机" prop="mobile">
                            <el-input size="mini" v-model="ruleForm.mobile"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="9">
                        <el-form-item label="部门" prop="departmentId">
                            <selectTree v-model="ruleForm.departmentId"></selectTree>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="9">
                        <el-form-item label="聘用形式" prop="formOfEmployment">
                            <el-select size="mini" v-model="ruleForm.formOfEmployment" placeholder="请选择聘用形式">
                                <el-option label="正式" :value="1"></el-option>
                                <el-option label="非正式" :value="0"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="9">
                        <el-form-item label="入职时间" prop="timeOfEntry">
                            <el-date-picker size="mini" type="date" placeholder="选择日期" value-format="yyyy-MM-dd"
                                v-model="ruleForm.timeOfEntry" style="width: 100%;"></el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="9">
                        <el-form-item label="转正时间" prop="correctionTime">
                            <el-date-picker size="mini" type="date" placeholder="选择日期" v-model="ruleForm.correctionTime"
                                style="width: 100%;"></el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="9">
                        <el-form-item label="员工头像" prop="staffPhoto">
                            <imageUpload v-model="ruleForm.staffPhoto"></imageUpload>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="9">
                        <el-form-item>
                            <el-button size="mini" type="primary" @click="submitForm('ruleForm')">保存更新</el-button>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </div>
    </div>
</template>

<script>
import selectTree from './components/selectTree'
import { employeeInfo, Addemployee, Eidtemployee } from '@/api/employee';
import imageUpload from './components/image-upload.vue';
export default {
    data() {
        const fn = (rules, value, callback) => {
            if (new Date(this.ruleForm.timeOfEntry) > new Date(value)) {
                callback(new Error('转正时间不能小于入职时间'))
            }
            callback()
        }
        return {
            ruleForm: {
                correctionTime: '',
                departmentId: null,
                formOfEmployment: '',
                mobile: '',
                staffPhoto: '',
                timeOfEntry: '',
                username: '',
                workNumber: ''
            },
            rules: {
                username: [
                    { required: true, message: '请输入姓名', trigger: 'blur' },
                    { min: 1, max: 6, message: '姓名为1-6位', trigger: 'blur' }
                ],
                mobile: [
                    { required: true, message: '请输入手机号', trigger: 'blur' },
                    { pattern: /^1[3-9]\d{9}$/, message: '手机号格式错误', trigger: 'blur' }
                ],
                formOfEmployment: [
                    { required: true, message: '请选择聘用形式', trigger: 'change' },
                ],
                timeOfEntry: [
                    { required: true, message: '请选择入职时间', trigger: 'change' }
                ],
                correctionTime: [
                    { required: true, message: '请选择转正时间', trigger: 'change' },
                    { validator: fn }
                ],
                departmentId: [
                    { required: true, message: '请选择部门', trigger: 'blur' },
                ],
            }
        };
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate(async (valid) => {
                if (valid) {
                    if (this.$route.params.id) {
                        // 编辑
                        let res = await Eidtemployee(this.ruleForm)
                        this.$message({
                            type: 'success', // success error warning
                            message: res.message,
                            duration: 2000,
                        })
                    } else {
                        // 添加员工
                        await Addemployee(this.ruleForm)
                        this.$message({
                            type: 'success', // success error warning
                            message: '新增员工成功',
                            duration: 2000,
                        })
                    }   
                    this.$router.push('/employee')
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        // 调用员工详情
        async employeeInfo() {
            let res = await employeeInfo({ id: this.$route.params.id })
            console.log(res.data);
            this.ruleForm = res.data
        }
    },
    computed: {},
    components: { selectTree,imageUpload },
    filters: {},
    watch: {},
    created() {
        this.$route.params.id && this.employeeInfo()
    },
    mounted() { },
};
</script>

<style lang="scss" scoped>
.box {
    width: 97%;
    margin: 20px auto;
    background-color: #fff;
    padding: 20px;
}

::v-deep {
    .el-button--primary {
        color: #FFF;
        background-color: blue;
        border-color: blue;
    }
}
</style>
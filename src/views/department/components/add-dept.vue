<template>
    <div>
        <el-dialog :title="title" :visible="showDialog" @close="close">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="部门名称" prop="name">
                    <el-input v-model="ruleForm.name" placeholder="2-10个字符"></el-input>
                </el-form-item>
                <el-form-item label="部门编码" prop="code">
                    <el-input v-model="ruleForm.code" placeholder="2-10个字符"></el-input>
                </el-form-item>
                <el-form-item label="部门负责人" prop="managerId">
                    <el-select placeholder="请选择负责人" v-model="ruleForm.managerId">
                        <el-option v-for="item in managerList" :label="item.username" :key="item.id" :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="部门介绍" prop="introduce">
                    <el-input v-model="ruleForm.introduce" type="textarea" placeholder="1-100个字符"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="close">取 消</el-button>
                <el-button type="primary" @click="addDept">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { getDepartment, getManagerList, getDepartments, getDepartmentDetail, getDepartmentDetails } from '@/api/department'
export default {
    props: {
        showDialog: {
            type: Boolean,
            default: false
        },
        currentnodeId: {
            type: Number,
            default: null
        },
        title: {
            type: String,
            default: '添加用户'
        },
    },
    data() {
        var codeValidator = async (rule, value, callback) => {
            let res = await getDepartment()

            if (this.ruleForm.id) {
                res.data = res.data.filter(item => item.id !== this.ruleForm.id)
            }

            if (res.data.some(item => item.code === value)) {
                return callback(new Error('已有该部门编码'))
            } else {
                return callback()
            }
        }
        var nameValidator = async (rule, value, callback) => {
            let res = await getDepartment()
            if (this.ruleForm.id) {
                res.data = res.data.filter(item => item.id !== this.ruleForm.id)
            }

            if (res.data.some(item => item.name === value)) {
                return callback(new Error('已有该部门名称'))
            } else {
                return callback()
            }
        }
        return {
            ruleForm: {
                code: '',
                introduce: '',
                managerId: '',
                name: '',
                pid: '',
            },
            rules: {
                code: [
                    { required: true, message: '部门编码不能为空', trigger: 'blur' },
                    { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' },
                    {
                        validator: codeValidator
                    }
                ],
                name: [
                    { required: true, message: '请部门名称不能为空', trigger: 'blur' },
                    { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' },
                    {
                        validator: nameValidator
                    }
                ],
                managerId: [
                    { required: true, message: '请输入部门负责人', trigger: 'blur' },
                ],
                introduce: [
                    { required: true, message: '部门介绍不能为空', trigger: 'blur' },
                    { min: 1, max: 100, message: '长度在 1 到 100 个字符', trigger: 'blur' }
                ]
            },
            managerList: [],
        };
    },
    methods: {
        close() {
            this.ruleForm = {
                code: '',
                introduce: '',
                managerId: '',
                name: '',
                pid: '',
            }
            this.$refs.ruleForm.resetFields()
            this.$emit('update:showDialog', false)
        },
        async getManagerList() {
            let res = await getManagerList()
            console.log(res.data);
            this.managerList = res.data
        },
        addDept() {
            this.$refs.ruleForm.validate(async (value) => {
                if (value) {
                    console.log(this.title);

                    if (this.ruleForm.id) {
                        // 编辑
                        await getDepartmentDetails({ ...this.ruleForm })

                    } else {
                        // 添加
                        await getDepartments({ ...this.ruleForm, pid: this.currentnodeId })

                    }
                    // 1.通知父组件更新
                    this.$emit('updateDepartment')
                    // 2.提示
                    this.$message({
                        type: 'success', // success error warning
                        message: '成功',
                    })
                    // 3.关闭弹窗
                    this.close()
                }
            })
        },
        async getDepartmentDetail() {
            let res = await getDepartmentDetail(this.currentnodeId)
            // console.log(res);
            this.ruleForm = res.data
            this.$message({
                type: 'success', // success error warning
                message: res.message,
            })
        },

    },
    computed: {},
    components: {},
    filters: {},
    watch: {},
    created() {
        this.getManagerList()
    },
    mounted() { },
};
</script>

<style lang="scss" scoped></style>
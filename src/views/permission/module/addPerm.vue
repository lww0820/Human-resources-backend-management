<template>
    <div>
        <el-dialog title="新增权限点" :visible="dialogFormVisible" @close="close">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="权限名称" prop="name">
                    <el-input v-model="ruleForm.name"></el-input>
                </el-form-item>
                <el-form-item label="权限标识" prop="name">
                    <el-input v-model="ruleForm.code"></el-input>
                </el-form-item>
                <el-form-item label="权限描述">
                    <el-input v-model="ruleForm.description"></el-input>
                </el-form-item>
                <el-form-item label="开启">
                    <el-switch v-model="ruleForm.enVisible" active-value="1" inactive-value="0">
                    </el-switch>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="close">取 消</el-button>
                <el-button type="primary" @click="addOk">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { AddPermissionApi, PermissionInfoApi,EditPermissionApi } from '@/api/permission'
export default {
    props: {
        dialogFormVisible: {
            type: Boolean,
            default: false
        },
        currentPermId: {
            type: Number,
            default: 0
        },
        currentType: {
            type: Number,
            default: null
        }
    },
    data() {
        return {
            ruleForm: {
                code: '',
                description: '',
                enVisible: '',
                name: '',
                pid: 0,
                type: null
            },
            rules: {
                name: [
                    { required: true, message: '请输入权限名称', trigger: 'blur' },
                ],
            }
        };
    },
    methods: {
        close() {
            this.ruleForm = {
                code: '',
                description: '',
                enVisible: '',
                name: '',
                pid: 0,
                type: null
            }
            this.$refs['ruleForm'].resetFields()
            this.$emit('update:dialogFormVisible', false)
        },
        async addOk() {
            console.log(this.currentPermId);
            if (this.ruleForm.id) {
                let res=await EditPermissionApi({...this.ruleForm})
                this.$message({
                    type: 'success', // success error warning
                    message: res.message,
                    duration: 2000,
                })
            } else {
                let res = await AddPermissionApi({ ...this.ruleForm, pid: this.currentPermId, type: this.currentType + 1 })
                // console.log(res);
                this.$message({
                    type: 'success', // success error warning
                    message: res.message,
                    duration: 2000,
                })
            }
            // 通知父组件更新数据
            this.$emit('updatePage')
            // 关闭弹窗
            this.close()
        },
        async PermissionInfo() {
            let res = await PermissionInfoApi({ id: this.currentPermId })
            // console.log(res.data);
            this.ruleForm = res.data
        }
    },
    computed: {},
    components: {},
    filters: {},
    watch: {},
    created() { },
    mounted() { },
};
</script>

<style lang="scss" scoped></style>
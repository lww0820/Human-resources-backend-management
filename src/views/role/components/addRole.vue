<template>
    <div>
        <el-dialog title="新增角色" :visible="dialogFormVisible" width="50%" @close="close">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="角色名称" prop="name">
                    <el-input v-model="ruleForm.name" size="mini"></el-input>
                </el-form-item>
                <el-form-item label="启用" prop="state">
                    <el-switch v-model="ruleForm.state" :active-value="1" :inactive-value="0"></el-switch>
                </el-form-item>
                <el-form-item label="角色描述" prop="description">
                    <el-input v-model="ruleForm.description" size="mini"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="close">取 消</el-button>
                <el-button type="primary" @click="addRoleOk">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { AddRole } from '@/api/role'
export default {
    props: {
        dialogFormVisible: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            ruleForm: {
                name: '',
                description: '',
                state: 0
            },
            rules: {
                name: [
                    { required: true, message: '角色名称不能为空', trigger: 'blur' },
                ],
                description: [
                    { required: true, message: '角色描述不能为空', trigger: 'blur' },
                ],
            }
        };
    },
    methods: {
        close() {
            this.$refs.ruleForm.resetFields()
            this.$emit('update:dialogFormVisible', false)
        },
        addRoleOk() {
            this.$refs.ruleForm.validate(async (valid) => {
                if (valid) {
                    let res = await AddRole({ ...this.ruleForm })
                    console.log(res);
                    this.$message({
                        type: 'success', // success error warning
                        message: res.message,
                        duration: 2000,
                    })
                    await this.$emit('getRoleList')
                    this.close()
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });

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
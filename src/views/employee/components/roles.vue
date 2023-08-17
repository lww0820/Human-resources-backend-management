<template>
    <el-dialog title="员工角色" :visible="showDialogRole" @close="$emit('update:showDialogRole', false)">
        <el-checkbox-group v-model="rolesId">
            <el-checkbox v-for="item in roleList" :key="item.id" :label="item.id">{{ item.name }}</el-checkbox>
        </el-checkbox-group>
        <div slot="footer" class="dialog-footer">
            <el-button @click="$emit('update:showDialogRole', false)">取 消</el-button>
            <el-button type="primary" @click="btnOk">确 定</el-button>
        </div>
    </el-dialog>
</template>

<script>
import { getRolesInfo, assignPremRolesInfo } from '@/api/role'
import { employeeInfo } from '@/api/employee';
export default {
    props: {
        showDialogRole: {
            type: Boolean,
            default: false
        },
        currentID: {
            type: Number,
            default: null
        }
    },
    data() {
        return {
            roleList: [],
            rolesId: []
        };
    },
    methods: {
        async getRoleList() {
            let res = await getRolesInfo()
            console.log(res.data);
            this.roleList = res.data
        },
        async employeeInfo() {
            let res = await employeeInfo({ id: this.currentID })
            //    console.log(res);
            this.rolesId = res.data.roleIds
        },
        async btnOk() {
            await assignPremRolesInfo({
                id: this.currentID,
                roleIds: this.rolesId
            })

            this.$message({
                type: 'success', // success error warning
                message: '分配角色成功',
                duration: 2000,
            })
            this.$emit('update:showDialogRole',false)
        }
    },
    computed: {},
    components: {},
    filters: {},
    watch: {},
    created() {
        this.getRoleList()
    },
    mounted() { },
};
</script>

<style lang="scss" scoped></style>
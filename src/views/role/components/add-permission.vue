<template>
    <div>
        <el-dialog :visible="showPermDialog" title="分配权限" @close="$emit('update:showPermDialog', false)">
            <el-tree node-key="id" :data="permissionList" ref="tree" :props="props" show-checkbox
                :default-checked-keys="permIdList" default-expand-all>
            </el-tree>
            <div slot="footer" class="dialog-footer">
                <el-button size="mini" @click="$emit('update:showPermDialog', false)">取 消</el-button>
                <el-button size="mini" type="primary" @click="btnOk">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { getPermission, getRolesInfo, getAssignPrem } from '@/api/permission'
import { transListToTreeData } from '@/utils/index'
export default {
    props: {
        showPermDialog: {
            type: Boolean,
            default: false
        },
        currentPermId: {
            type: Number,
            default: null
        }
    },
    data() {
        return {
            permissionList: [],
            props: {
                label: 'name',
                children: 'children'
            },
            permIdList: []
        };
    },
    methods: {
        async getPermission() {
            let res = await getPermission()
            // console.log(res.data);
            this.permissionList = transListToTreeData(res.data, 0)
        },
        async getRolesInfo() {
            let res = await getRolesInfo({ id: this.currentPermId })
            // console.log(res.data.permIds);
            this.permIdList = res.data.permIds
            console.log( this.permIdList);
          
        },
        async btnOk() {
            let idList = this.$refs.tree.getCheckedKeys()
            // console.log(idList);
            await getAssignPrem({
                id: this.currentPermId,
                permIds: idList
            })
            this.$emit('update:showPermDialog',false)
            this.permIdList=[]
        }
    },
    computed: {},
    components: {},
    filters: {},
    watch: {},
    created() {
        this.getPermission()
    },
    mounted() { },
};
</script>

<style lang="scss" scoped></style>
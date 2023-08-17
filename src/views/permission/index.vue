<template>
  <div>
    <div class="box">
      <el-button type="primary" size="mini" @click="addP">添加权限</el-button>
      <el-table :data="tableData" style="width: 100%;margin-bottom: 20px;" row-key="id" border default-expand-all
        :tree-props="{ children: 'children', hasChildren: 'hasChildren' }">
        <el-table-column prop="name" label="名称">
        </el-table-column>
        <el-table-column prop="code" label="标识">
        </el-table-column>
        <el-table-column prop="description" label="描述">
        </el-table-column>
        <el-table-column label="操作">
          <template v-slot="{ row }">
            <el-button type="text" v-if="row.pid==0?true:false" size="mini" @click="addPermission(row)">添加</el-button>
            <el-button type="text" size="mini" @click="edit(row)">编辑</el-button>
            <el-button type="text" size="mini" @click="del(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <addPerm ref="add" :dialogFormVisible.sync="dialogFormVisible" :currentType="currentType" @updatePage="getPermission"
      :currentPermId="currentPermId"></addPerm>

  </div>
</template>

<script>
import { getPermission, delPermissionApi } from '@/api/permission';
import { transListToTreeData } from '@/utils/index'
import addPerm from './module/addPerm'
export default {
  data() {
    return {
      tableData: [],
      dialogFormVisible: false,
      currentPermId: 0,
      currentType: null
    };
  },
  methods: {
    async getPermission() {
      let res = await getPermission()
      // console.log(res.data);
      this.tableData = transListToTreeData(res.data, 0)
    },
    addPermission(row) {
      this.dialogFormVisible = true
      this.currentPermId = row.id
      this.currentType = row.type
    },
    addP() {
      this.dialogFormVisible = true
    },
    del(row) {
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        let res = await delPermissionApi({ id: row.id })
        this.$message({
          type: 'success',
          message: res.message
        })
        this.getPermission()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    edit(row) {
      this.dialogFormVisible = true
      this.currentPermId = row.id
      this.currentType = row.type
      
      this.$nextTick(() => {
        this.$refs['add'].PermissionInfo()
      })
    }
  },
  computed: {},
  components: { addPerm },
  filters: {},
  watch: {},
  created() {
    this.getPermission()
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

  .el-table {
    margin-top: 10px;
  }
}
</style>
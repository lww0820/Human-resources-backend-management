<template>
  <div>
    <div class="box">
      <el-button type="primary" @click="addrole">添加角色</el-button>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="id" label="序号" width="50">
        </el-table-column>
        <el-table-column prop="name" label="角色">
          <template v-slot="{ row }">
            <el-input v-model="row.EditRow.name" v-if="row.isEdit"></el-input>
            <span v-else>{{ row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="state" label="启用">
          <template v-slot="{ row }">
            <el-switch v-if="row.isEdit" v-model="row.EditRow.state" :active-value="1" :inactive-value="0"></el-switch>
            <span v-else>{{ row.state === 1 ? '已启用' : row.state === 0 ? '未启用' : '无' }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="description" label="描述">
          <template v-slot="{ row }">
            <el-input v-model="row.EditRow.description" v-if="row.isEdit"></el-input>
            <span v-else>{{ row.description }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <template v-if="scope.row.isEdit">
              <el-button type="primary" size="small" @click="btnEditok(scope.row)">确定</el-button>
              <el-button type="default" size="small" @click="scope.row.isEdit = false">取消</el-button>
            </template>
            <template v-else>
              <el-button type="text" size="small" @click="permissions(scope.row.id)">分配权限</el-button>
              <el-button type="text" size="small" @click="btnEdit(scope.row)">编辑</el-button>
              <el-popconfirm title="确认删除该行数据吗？" @onConfirm="del(scope.row)">
                <el-button type="text" size="small" slot="reference">删除</el-button>
              </el-popconfirm>
            </template>
          </template>
        </el-table-column>
      </el-table>
      <div style="width: 100%;text-align: center;margin-top: 10px;">
        <el-pagination :page-size="5" :current-page="pageInfo.page" layout="prev, pager, next" :total="pageInfo.total"
          @current-change="page">
        </el-pagination>
      </div>

      <addRole :dialogFormVisible.sync="dialogFormVisible"></addRole>
      <addPermission 
      :showPermDialog.sync="showPermDialog" :currentPermId="currentPermId"
      ref="perm"
      ></addPermission>
    </div>
  </div>
</template>

<script>
import { getRoleList, upDateRole, DelRole } from '@/api/role'
import addRole from './components/addRole'
import addPermission from './components/add-permission.vue';
export default {
  data() {
    return {
      tableData: [],
      pageInfo: {
        page: 1,
        pagesize: 5,
        total: 0
      },
      dialogFormVisible: false,
      currentPermId:null,
      showPermDialog:false
    };
  },
  methods: {
    async getRoleList() {
      let res = await getRoleList({ ...this.pageInfo })
      this.tableData = res.data.rows
      this.pageInfo.total = res.data.total

      this.tableData.forEach(item => {
        // 获取数据之后针对每个数据定义编辑标记
        // 不能使用item.isEdit=false  数据更新视图不更新
        this.$set(item, 'isEdit', false)

        this.$set(item, 'EditRow', {
          name: item.name,
          state: item.state,
          description: item.description
        })
      })
    },
    btnEdit(row) {
      console.log(row);
      row.isEdit = true
      row.EditRow.name = row.name
      row.EditRow.state = row.state
      row.EditRow.description = row.description
    },
    async btnEditok(row) {
      if (row.EditRow.name && row.EditRow.description) {
        await upDateRole({ ...row.EditRow, id: row.id })
        this.$message({
          type: 'success', // success error warning
          message: '更新成功',
        })
        
        Object.assign(row, {
          ...row.EditRow,
          isEdit: false
        })
      } else {
        this.$message({
          type: 'warning', // success error warning
          message: '角色和描述内容不能为空',
        })
      }
    },
    page(e) {
      this.pageInfo.page = e
      this.getRoleList()
    },
    addrole() {
      this.dialogFormVisible = true
    },
    async del(row) {
      console.log(row.id);
      let res = await DelRole({ id: row.id })
      console.log(res);
      this.$message({
        type: 'success', // success error warning
        message: res.message,
        duration: 2000,
      })
      this.getRoleList()
    },
    permissions(id){
      console.log(1111);
      this.showPermDialog=true
      this.currentPermId=id
      this.$nextTick(() => {
        this.$refs.perm.getRolesInfo()
      })
    }
  },
  computed: {},
  components: { addRole ,addPermission},
  filters: {},
  watch: {},
  created() {
    this.getRoleList()
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


::v-deep {
  .has-gutter {
    background-color: rgb(245, 246, 248);
  }

  .el-table th,
  .el-table tr {
    background-color: transparent;
  }

  .el-button--primary {
    color: #FFF;
    background-color: blue;
    border-color: blue;
  }
}
</style>
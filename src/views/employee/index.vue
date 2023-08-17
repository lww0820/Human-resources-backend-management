<template>
  <div>
    <div class="box">
      <div class="left">
        <el-input placeholder="请输入员工内容全员搜索" @input="search" size="mini" prefix-icon="el-icon-search"
          v-model="queryParams.keyword">
        </el-input>
        <el-tree ref="deptTree" :data="data" :props="defaultProps" node-key="id" :highlight-current="true"
          default-expand-all :expand-on-click-node="false" @current-change="currentChange">
        </el-tree>
      </div>
      <div class="right">
        <div class="top">
          <div class="btn">
            <el-button type="primary" v-permission="'employee'" size="mini" @click="$router.push('/employee/detail')">添加员工</el-button>
            <el-button size="mini" @click="showDialog">excel导入</el-button>
            <el-button size="mini" @click="exportExcel">excel导出</el-button>
          </div>
          <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="date" label="头像">
              <template slot-scope="scope">
                <el-avatar v-if="scope.row.staffPhoto" :src="scope.row.staffPhoto"></el-avatar>
                <span class="username" v-else>{{ scope.row.username.charAt(0) }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="username" label="姓名"></el-table-column>
            <el-table-column prop="mobile" label="手机号" width="110" sortable></el-table-column>
            <el-table-column prop="workNumber" label="工号" width="110" sortable></el-table-column>
            <el-table-column prop="formOfEmployment" label="聘用形式"></el-table-column>
            <el-table-column prop="departmentName" label="部门"></el-table-column>
            <el-table-column prop="timeOfEntry" label="入职时间" width="110" sortable></el-table-column>
            <el-table-column prop="date" label="操作" width="200">
              <template slot-scope="scope">
                <el-button type="text" size="small" @click="jumpDetail(scope.row)">查看</el-button>
                <el-button type="text" size="small" @click="openRoleDialog(scope.row)">角色</el-button>
                <el-popconfirm title="确认删除该行数据吗？" @onConfirm="del(scope.row)">
                  <el-button type="text" size="small" slot="reference">删除</el-button>
                </el-popconfirm>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination @current-change="handleCurrentChange" :current-page="queryParams.page"
            :page-size="queryParams.pagesize" layout="->,total, prev, pager, next" :total="total">
          </el-pagination>
        </div>
      </div>
    </div>
    <importExcel :showDialogExcel.sync="showDialogExcel" @updataEmploy="employeeList"></importExcel>

    <roles :showDialogRole.sync="showDialogRole" :currentID="currentID" ref="rolesRef"></roles>
  </div>
</template>

<script>
import { getDepartment } from '../../api/department'
import { employeeList, ExportEmployee, delEmployee } from '@/api/employee'
import { transListToTreeData } from '@/utils';
import { saveAs } from 'file-saver'
import importExcel from './components/importExcel.vue';
import roles from './components/roles.vue'
export default {
  data() {
    return {
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      data: [],
      tableData: [],
      queryParams: {
        departmentId: null,
        page: 1,
        pagesize: 5,
        keyword: ''
      },
      total: 0,
      timer: null,
      showDialogExcel: false,
      showDialogRole: false,
      currentID: null
    };
  },
  methods: {
    async getDepartment() {
      let res = await getDepartment()
      // console.log(res.data);
      this.data = transListToTreeData(res.data, 0)

      this.queryParams.departmentId = this.data[0].id

      this.$nextTick(() => {
        this.$refs.deptTree.setCurrentKey(this.queryParams.departmentId)
      })

      this.employeeList()
    },
    currentChange(node) {
      // console.log(node);
      this.queryParams.departmentId = node.id
      this.employeeList()
    },
    async employeeList() {
      let res = await employeeList({ ...this.queryParams })
      // console.log(res.data.rows);
      this.tableData = res.data.rows
      this.total = res.data.total
    },
    search() {
      if (this.timer) clearTimeout(timer)
      this.timer = setTimeout(() => {
        this.queryParams.page = 1
        this.employeeList()
      }, 200)
    },
    handleCurrentChange(val) {
      this.queryParams.page = val
      this.employeeList()
    },
    jumpDetail(row) {
      this.$router.push('/employee/detail/' + row.id)
    },
    async exportExcel() {
      let res = await ExportEmployee()
      console.log(res);
      saveAs(res, '员工信息表.xlsx')
    },
    showDialog() {
      this.showDialogExcel = true
    },
    openRoleDialog(row) {
      this.showDialogRole = true
      // console.log(row.id);
      this.currentID = row.id

      this.$nextTick(() => {
        this.$refs.rolesRef.employeeInfo()
      })
    },
    async del(row) {
     let res= await delEmployee({id:row.id})
      this.$message({
        type: 'success', // success error warning
        message: res.message,
        duration: 2000,
      })
      this.getDepartment()
    }
  },
  computed: {},
  components: { importExcel, roles },
  filters: {},
  watch: {},
  created() {
    this.getDepartment()
  },
  mounted() { }
};
</script>

<style lang="scss" scoped>
.box {
  width: 97%;
  margin: 20px auto;
  background-color: #fff;
  padding: 20px;
  display: flex;

  .left {
    width: 280px;
    border-right: 1px solid #ccc;
    padding-right: 20px;
  }

  .right {
    flex: 1;

    .top {
      width: 100%;

      .btn {
        float: right;
      }
    }
  }
}

.el-pagination {
  margin-top: 10px;
}

::v-deep {
  .el-tree {
    margin-top: 10px;
  }

  .el-tree-node__content {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    height: 34px;
    cursor: pointer;
  }

  .el-tree-node__content:hover {
    background-color: #f0f7ff;

    .el-tree-node__label {
      color: blue;
    }
  }

  .el-button--primary {
    color: #FFF;
    background-color: blue;
    border-color: blue;
  }

  .el-table th {
    overflow: hidden;
    -ms-user-select: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    user-select: none;
    text-align: center;
  }

  .el-table td,
  .el-table th.is-leaf {
    border-bottom: 1px solid #EBEEF5;
    text-align: center;
  }

  .el-table .el-table__header .is-leaf {
    background-color: #f5f6f8;
  }
}

.username {
  display: inline-block;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: rgb(4, 201, 190);
  color: #fff;
  text-align: center;
  line-height: 40px;
}
</style>
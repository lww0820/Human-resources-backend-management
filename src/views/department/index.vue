<template>
  <div>
    <div class="box">
      <el-tree :data="data" :props="defaultProps" :default-expand-all="true">
        <template slot-scope="{node,data}">
          <el-row type="flex" justify="space-between" align="middle">
            <el-col :span="3">
              <span> {{ node.label }}</span>
              <!-- {{ data.name }} -->
            </el-col>
            <el-col :span="3">
              <span class="people"> {{ data.managerName }}</span>
              <el-dropdown @command="operateDept($event, data.id)">
                <span class="el-dropdown-link">
                  操作<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="add">添加子部门</el-dropdown-item>
                  <el-dropdown-item command="edit">编辑部门</el-dropdown-item>
                  <el-dropdown-item command="del">删除</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </el-col>
          </el-row>
        </template>
      </el-tree>
    </div>

    <!-- 弹框 -->
    <!-- sync修饰符可以监听子组件传过来的  update:属性名的事件 -->
    <addDept :showDialog.sync="showDialog" ref="adddept" :title="title" :currentnodeId="currentNodeId"
      @updateDepartment="getDepartmentList"></addDept>


    <el-dialog title="删除" :visible.sync="dialogVisible" width="30%">
      <span>确定要删除吗？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getDepartment, delDepartment } from '../../api/department'
import { transListToTreeData } from '@/utils/index'
import addDept from './components/add-dept.vue'


export default {
  data() {
    return {
      data: [],
      defaultProps: {
        children: 'children',
        label: 'name',
      },
      showDialog: false,
      currentNodeId: null,
      title: '新增用户',
      fileList: [],
      obj: null,
      dialogVisible: false
    };
  },
  methods: {
    async getDepartmentList() {
      let res = await getDepartment()
      // console.log(res.data);

      // console.log(transListToTreeData(res.data, 0));
      this.data = transListToTreeData(res.data, 0)
      this.fileList = res.data


      // this.data = res.data.reduce(function (prev, curr, i, arr) {
      //   curr.children = arr.filter(v => v.pid === curr.id)
      //   console.log(!curr.id);
      //   if (!curr.pid) {
      //     prev.push(curr)
      //   }
      //   return prev
      // }, [])
    },
    async operateDept(type, id) {
      // console.log(type);
      if (type === 'add') {
        this.title = '新增部门'
        this.showDialog = true
        this.currentNodeId = id
      } else if (type === 'edit') {
        this.title = '编辑部门'
        this.showDialog = true
        this.currentNodeId = id

        this.$nextTick(() => {
          this.$refs.adddept.getDepartmentDetail()
        })
      } else if (type === 'del') {
        this.$confirm('确认关闭？')
          .then(async () => {
            let res = await delDepartment({ id: id })
            console.log(res);
            this.$message({
              type: 'success', // success error warning
              message: res.message,
            })
            this.getDepartmentList()
          })

      }
    }
  },
  computed: {

  },
  components: { addDept },
  filters: {},
  watch: {},
  created() {
    this.getDepartmentList()
  },
  mounted() {
  },
};
</script>

<style lang="scss" scoped>
::v-deep {

  .el-tree-node__content {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    height: 40px;
    cursor: pointer;
  }

  .el-tree-node__content:hover {
    background-color: #f0f4ff;

    .people {
      color: blue;
    }

    .el-col-3 {
      color: blue;
    }
  }

  .el-dropdown {
    display: inline-block;
    position: relative;
    color: #606266;
    font-size: 14px;
  }
}

.people {
  color: #606266;
  font-size: 14px;
  margin-right: 8px;
  width:100px;
  display: inline-block;
  text-align: left;
}

.box {
  width: 97%;
  margin: 20px auto;
  background-color: #fff;
  padding: 20px;
}

.el-row {
  width: 100%;
}
</style>
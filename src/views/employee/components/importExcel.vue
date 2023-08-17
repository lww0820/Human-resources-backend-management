<template>
    <div>
        <el-dialog title="员工导入" :visible="showDialogExcel" width="30%" @close="$emit('update:showDialogExcel', false)">
            <el-row type="flex" justify="center">
                <el-col>
                    <div class="excel-box">
                        <input ref="excel-upload-input" class="excel-upload-input" type="file" accept=".xlsx, .xls"
                            @change="handleChange">
                        <div class="drop">
                            <i class="el-icon-upload" />
                            <el-button type="text" @click="Download">下载导入模板</el-button>
                            <span>将文件拖到此处或
                                <el-button type="text" @click="uploadFile">点击上传</el-button>
                            </span>
                        </div>
                    </div>
                </el-col>
            </el-row>
            <el-row type="flex" justify="end">
                <el-col :span="4">
                    <el-button size="mini" type="primary" style="margin-top: 10px;"
                        @click="$emit('update:showDialogExcel', false)">取消</el-button>
                </el-col>
            </el-row>
        </el-dialog>
    </div>
</template>

<script>
import { ImportEmployee,DownloadTemplate } from '@/api/employee'
import { saveAs } from 'file-saver'

export default {
    props: {
        showDialogExcel: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {

        };
    },
    methods: {
        uploadFile() {
            this.$refs['excel-upload-input'].click()
        },
        async handleChange(e) {
            console.dir(e.target.files)

            try {
                if (e.target.files.length > 0) {
                    const file = new FormData()
                    file.append('file', e.target.files[0])
                    await ImportEmployee(file)
                    this.$message({
                        type: 'success', // success error warning
                        message: '导入成功',
                        duration: 2000,
                    })
                    this.$emit('updataEmploy')
                }
            } catch {

            } finally {
                this.$emit('update:showDialogExcel', false)
                this.$refs['excel-upload-input'].vlaue = ''
            }
        },
        async Download() {
            let res = await DownloadTemplate()
            console.log(res);
            saveAs(res,'员工导入模版.xlsx')
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

<style lang="scss" scoped>
.excel-box {
    width: 90%;
    margin: 0 auto;
    border-radius: 5px;
    border: 1px dashed #ccc;
    padding: 20px 0;

    .excel-upload-input {
        display: none;
        z-index: -999;
    }

    .btn-upload,
    .drop {
        // border: 1px dashed #dcdfe6;
        width: 100%;
        height: 100%;
        text-align: center;
        line-height: 160px;
        border-radius: 8px;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .drop {
        line-height: 40px;
        color: #bbb;

        i {
            font-size: 60px;
            display: block;
            color: #c0c4cc;
        }
    }
}
</style>
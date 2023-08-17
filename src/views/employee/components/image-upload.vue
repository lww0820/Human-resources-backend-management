<template>
    <div>
        <el-upload class="avatar-uploader" action="" :http-request="uploadImage" :show-file-list="false"
            :before-upload="beforeAvatarUpload">
            <img v-if="value" :src="value" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
    </div>
</template>

<script>
import COS from 'cos-js-sdk-v5'
export default {
    props: {
        value: {
            type: String,
            default: ''
        }
    },
    data() {
        return {

        };
    },
    methods: {
        // 上传前的校验
        beforeAvatarUpload(file) {
            const isJPG = ['image/jpeg', 'image/png', 'image/bmp', 'image/gif'].includes(file.type);
            const isLt5M = file.size / 1024 / 1024 < 5;

            if (!isJPG) {
                this.$message.error('上传头像图片只能是 JPG 格式!');
            }
            if (!isLt5M) {
                this.$message.error('上传头像图片大小不能超过 5MB!');
            }
            return isJPG && isLt5M;
        },
        // 选择图片上传
        uploadImage(params) {
            console.log(params.file)
            const cos = new COS({
                SecretId: 'AKIDPgssd9WlmdSDoFetugCvcDev5AA8uXNF',
                SecretKey: 'oNirwsprqJk3XwTwRn3EJMEuZPAoMyTq'
            }) // 完成cos对象的初始化
            cos.putObject({
                Bucket: 'lww-2210c-1320041831', // 存储桶名称
                Region: 'ap-nanjing', // 地域名称
                Key: params.file.name, // 文件名称
                StorageClass: 'STANDARD', // 固定值
                Body: params.file // 文件对象
            }, (err, data) => {
                if (data.statusCode === 200 && data.Location) {
                    console.log(data.Location); //返回的图片路径
                    // 拿到了腾讯云返回的地址  data.Location
                    // 通过input自定义事件将地址传出去
                    this.$emit('input', 'http://' + data.Location) // 将地址返回了
                } else {
                    this.$message.error(err.Message) // 上传失败提示消息
                }
            })
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
::v-deep {
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }

    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }

    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }

    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }
}
</style>
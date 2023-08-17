<template>
    <el-cascader :value="value" size="mini" :options="options" :props="props" separator="-" @change="selectHandle">
    </el-cascader>
</template>

<script>
import { getDepartment } from "../../../api/department";
import { transListToTreeData } from '@/utils/index.js'
export default {
    props: {
        value: {
            type: Number,
            default: null
        }
    },
    data() {
        return {
            props: {
                label: 'name',
                children: 'children',
                value:'id'  
            },
            options: []
        };
    },
    methods: {
        async getDepartment() {
            let res = await getDepartment()
            this.options = transListToTreeData(res.data, 0)
        },
        selectHandle(v) {
            console.log(v);
            this.$emit('input', v[v.length - 1])
        }
    },
    computed: {},
    components: {},
    filters: {},
    watch: {},
    created() {
        this.getDepartment()
    },
    mounted() { },
};
</script>

<style lang="scss" scoped></style>
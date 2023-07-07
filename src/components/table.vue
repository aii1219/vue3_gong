<template>
    <div class="nav-search">
        <div class="nav-context">
            <div class="con-search">
                <div class="left-box">
                    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAVCAYAAABc6S4mAAAABHNCSVQICAgIfAhkiAAAAUhJREFUOE/tlL9Kw1AYxc9JCyIodLKLID5Bi6MI/kFdipgOtmP7JtY3SUd1aKR1UdEO4ijtE4jgUqeCgghJjyRaiMQ0qVJcmuly8/vOuTn3y0ckeMyGMjPpQUVE1cMpWO+OUbeL7MeVcxRQasoE3ApJ8ydOkk0jZR0XeBalEzI4OFeeGlQgVElk4k7ovZfQB2GJRv20wE6wxjcIRkAgn0Q0ihHQCUbIcsuxAe7/RTTSzIuw3HI1CfGhZugOSk23RuLwK9ujk71UzVuPux8yuO4pR8C8un8rPvWcnN+OjvvIgR58M4PLSqeWRu0vZtPd7ZXZhgB7K8uuzw6dbp7ldY51cfuCy7vXX6W2szqH3bV5T7W6ucD61CAU4zSi2M7634gm/qMNv3/ckRDFfxsVQSg26ISABH+O8VNc6wA3EtYmxNQW2Z74uP4A+kAQbn8IYmUAAAAASUVORK5CYII="
                        style="margin-right: 16px">
                    <p>资源大厅</p>
                </div>
                <div class="right-box">
                    <el-input v-model="input" placeholder="请输入资源名称或用户名搜索" />
                    <el-button type="primary" @click="submit">搜索</el-button>
                </div>
            </div>
            <div class="con-tabs">
                <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
                    <el-tab-pane label="服务" name="first">
                        <search :keys="inputs" ></search>
                    </el-tab-pane>
                    <el-tab-pane label="需求" name="second">需求</el-tab-pane>
                    <el-tab-pane label="科创资源" name="third">科创资源</el-tab-pane>
                </el-tabs>
            </div>
        </div>
    </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import search from './search.vue';
const activeName = ref('first')
const input = ref()
const inputs = ref()

const handleClick = (tab, event) => {
    console.log(tab, event)
}
const submit = () => {
    inputs.value = input.value
    console.log(inputs.value)
}

</script>

<style lang="less" scoped>
.demo-tabs>.el-tabs__content {
    padding: 32px;
    color: #6b778c;
    font-size: 32px;
    font-weight: 600;
}


.nav-search {
    width: 100%;
    padding: 30px 0;
}

.nav-context {
    margin-top: 20px;
    width: 1140px;
    margin: 0 auto;
    padding: 30px;
    box-shadow: 0 0 6px rgba(0, 0, 0, .06);
    border-radius: 4px;
    overflow: auto;
    background-color: #ffff;
}

.con-tabs {
    height: auto;
}

.con-search {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 40px;
    margin-bottom: 20px;

    .left-box {
        display: flex;
        font-size: 16px;
        font-weight: 700;
        line-height: 22px;
        color: #303133;
    }

    .right-box {
        display: flex;
        width: 500px;
    }

    .el-input {
        height: 40px;
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
    }

    .el-button {
        height: 40px;
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
    }
}
</style>
<style>
.el-tabs__item {
    margin-left: 50px;
    padding: 0 50px;
    font-size: 14px;
    font-weight: 700;
}

.el-tabs__header {
    background-color: #f7f8f9;
}
</style>

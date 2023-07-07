<template>
    <div class="content-nav">
        <div class="nav-header">
            <div class="left-box">
                <a class="logo-title">
                    <img src="https://test.nttcc.com.cn/_nuxt/img/logo_1.e54ae31.png"
                        style="width: 30px;height:30px;margin-right: 10px">
                    <h1>共创云</h1>
                </a>
                <div class="nav-mid">
                    <a href="/#">服务产品</a>
                    <a href="/#">科创需求</a>
                    <a href="/#">专利论文</a>
                    <a href="/#">交易大数据</a>
                </div>
            </div>
            <div class="right-box">
                <el-button type="primary">登录</el-button>
                <el-button type="primary" plain>注册</el-button>
            </div>
        </div>
    </div>
</template>

<style lang="less" scoped>
h1 {
    display: block;
    font-size: 16px;
    font-weight: 700;
    line-height: 22px;
    color: #3473e6;
}

.content-nav {
    width: 100%;
    height: 50px;
    background-color: #ffffff;

    .nav-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 100%;
        width: 1200px;
        margin: 0 auto;
    }
}

.left-box {
    display: flex;
    align-items: center;

    .logo-title {
        display: flex;
        align-items: center;
        margin-right: 50px;
    }

    a {
        color: inherit;
        text-decoration: inherit;
    }

    .nav-mid {
        display: flex;
        align-items: center;

        a {
            margin-right: 20px;
            font-size: 14px;
            font-weight: 500;
            line-height: 20px;
            color: #606266;
            cursor: pointer;
        }

        a:hover {
            color: #3473e6;
        }
    }
}

</style>

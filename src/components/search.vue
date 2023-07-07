<template>
    <div class="con-searchs">
        <div class="con-context">
            <div class="conmid-search">
                <p class="search-title">服务类型:</p>
                <div class="search-list">
                    <p class="search-list-item" :class="{ 'selected': selectedIndex1 === -1 }" @click="selectMenuItem1(-1)">
                        不限
                    </p>
                    <p class="search-list-item" v-for="(item, index) in searchData.data" :key="item.id"
                        :class="{ selected: selectedIndex1 == index }" @click="selectMenuItem1(index,item.id)">
                        {{ item.name }}
                    </p>
                </div>
                <div class="search-more">
                    <p @click="more(1)" v-show="isShow1">更多</p>
                    <p @click="packup(1)" v-show="!isShow1">收起</p>
                </div>
            </div>
            <div class="divider">
            </div>

            <div class="conmid-search1" v-show="secondShow">
                <p class="search-title">二级分类:</p>
                <div class="search-list">
                    <p class="search-list-item" :class="{ 'selected': selectedIndex2 === -1 }" @click="selectMenuItem2(-1)">
                        不限</p>
                    <p class="search-list-item" v-for="(item, index) in searchData.secondData" :key="item.id"
                        :class="{ selected: selectedIndex2 == index }" @click="selectMenuItem2(index,item.id)">
                        {{ item.name }}
                    </p>
                </div>
                <div class="search-more">
                    <p @click="more(2)" v-show="isShow2">更多</p>
                    <p @click="packup(2)" v-show="!isShow2">收起</p>
                </div>
            </div>
            <div class="divider" v-show="secondShow">
            </div>

            <div class="conmid-search2">
                <p class="search-title">技术领域:</p>
                <div class="search-list">
                    <p class="search-list-item" :class="{ 'selected': selectedIndex3 === -1 }" @click="selectMenuItem3(-1)">
                        不限</p>
                    <p class="search-list-item" v-for="(item, index) in searchData.teData" :key="item.id"
                        :class="{ selected: selectedIndex3 == index }" @click="selectMenuItem3(index,item.id)">
                        {{ item.name }}
                    </p>
                </div>
                <div class="search-more">
                    <p @click="more(3)" v-show="isShow3">更多</p>
                    <p @click="packup(3)" v-show="!isShow3">收起</p>
                </div>
            </div>
            <div class="divider">
            </div>

            <div class="conmid-search3">
                <p class="search-title">数据来源:</p>
                <div class="search-list">
                    <p class="search-list-item" :class="{ 'selected': selectedIndex4 === -1 }" @click="selectMenuItem4(-1)">
                        不限</p>
                    <p class="search-list-item" v-for="(item, index) in dataSource" :key="index"
                        :class="{ selected: selectedIndex4 == index }" @click="selectMenuItem4(index,item.id)">
                        {{ item.name }}
                    </p>
                </div>
                <div class="search-more">
                    <p @click="more(4)" v-show="isShow4">更多</p>
                    <p @click="packup(4)" v-show="!isShow4">收起</p>
                </div>
            </div>
            <div class="divider">
            </div>

            <div class="conmid-search4">
                <p class="search-title">地区:</p>
                <div class="search-list">
                    <p class="search-list-item" :class="{ 'selected': selectedIndex5 === -1 }" @click="selectMenuItem5(-1)">
                        不限</p>
                    <p class="search-list-item" v-for="(item, index) in address" :key="index"
                        :class="{ selected: selectedIndex5 == index }" @click="selectMenuItem5(index,item)">
                        {{ item }}
                    </p>
                </div>
                <div class="search-more">
                    <p @click="more(5)" v-show="isShow5">更多</p>
                    <p @click="packup(5)" v-show="!isShow5">收起</p>
                </div>
            </div>
        </div>
    </div>
    <div class="con-tabledata-header">
        <div class="table-header">
            <div class="header-list">服务名称</div>
            <div class="header-list">发布用户</div>
            <div class="header-list">服务类型</div>
            <div class="header-list">成功成交数</div>
            <div class="header-list">信用评价</div>
        </div>
    </div>
    <div class="con-tabledata">
        <div class="con-data" v-for="(item,index) in searchData.tableData.list" :key="item.id" @click="goto">
            <div class="table-list">
                <p>{{ item.title }}</p>
            </div>
            <div class="table-list">
                <img :src="item.avatarUrl != ''? item.avatarUrl:default_avatar" style="width: 40px;height:40px">
                <p>{{ item.orgName }}</p>
            </div>
            <div class="table-list">
                <p>{{item.serviceTypeName}}</p>
            </div>
            <div class="table-list">
                <p>{{ item.totalDeal }}</p>
            </div>
            <div class="table-list">
                <p>{{ item.avgScore }}</p>
            </div>
        </div>
    </div>
    <div class="table-pagination">
        <el-pagination v-model:current-page="searchData.tableData.currentPage" v-model:page-size="searchData.tableData.perPage" background
            layout="prev, pager, next, jumper" :total="parseInt(searchData.tableData.total)" @current-change="handleCurrentChange" />
    </div>
</template>

<script setup>
import axios from 'axios'
import { reactive, ref,watch } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter()
const props = defineProps(['keys'])
let urldata = reactive({
    pageNum:1,
    serviceTypeId:'',//一级筛选
    serviceTypeId2:'',//二级筛选
    technicalId:'',//技术领域
    province:'',//地区
    dataOrigin:'',//数据来源
    keywords:''
})
let default_avatar = "https://test.nttcc.com.cn/_nuxt/img/default_avatar.442622a.png"


watch(()=>props.keys,(newVal, oldVal) => {
    if (newVal) {
        urldata.keywords = newVal
    axios({
        method: 'get',
        url: `https://service.test.nttcc.com.cn/api/v1/service/list?pageNum=${urldata.pageNum}&pageSize=10&keywords=${urldata.keywords}&serviceTypeId=&serviceTypeId2=&technicalId=&province=&dataOrigin=&logicStatus=1`
    }).then((res) => {
        searchData.tableData = res.data.data
        console.log(searchData.tableData)
    })
    }
})

watch(urldata,(newVal,oldVal)=>{
    if(newVal){
        axios({
        method: 'get',
        url: `https://service.test.nttcc.com.cn/api/v1/service/list?pageNum=${urldata.pageNum}&pageSize=10&keywords=${urldata.keywords}&serviceTypeId=${urldata.serviceTypeId}&serviceTypeId2=${urldata.serviceTypeId2}&technicalId=${urldata.technicalId}&province=${urldata.province}&dataOrigin=${urldata.dataOrigin}&logicStatus=1`
    }).then((res) => {
        searchData.tableData = res.data.data
        console.log(searchData.tableData)
    })
    }
},
)

let searchData = reactive({
    data: [],
    secondData: [],
    teData: [],
    tableData: []
})
let pageSize = ref(10)
let isShow1 = ref(true)
let isShow2 = ref(true)
let isShow3 = ref(true)
let isShow4 = ref(true)
let isShow5 = ref(true)
let secondShow = ref(false)

let selectedIndex1 = ref(-1)
let selectedIndex2 = ref(-1)
let selectedIndex3 = ref(-1)
let selectedIndex4 = ref(-1)
let selectedIndex5 = ref(-1)
"共创云", "科惠网", "江西省网上常设技术市场", "潇湘科技要素大市场"
const dataSource = [
    {name:"共创云",id:'nttcc'},{name:"科惠网",id:'51kehui'},{name:"江西省网上常设技术市场",id:'jxstc'},{name:"潇湘科技要素大市场",id:'hntpe'},
]
const address = ["湖北省", "湖南省", "江西省", "北京市", "天津市", "河北省", "山西省", "内蒙古自治区", "辽宁省", "吉林省", "黑龙江省", "上海市", "江苏省", "浙江省", "安徽省", "福建省",
    "山东省", "河南省", "广东省", "广西壮族自治区", "海南省", "重庆市", "四川省", "贵州省", "云南省", "西藏自治区", "陕西省", "甘肃省", "青海省", "宁夏回族自治区", "新疆维吾尔自治区", "台湾省", "香港特别行政区", "澳门特别行政区"]

const theme = reactive({ height: '40px' })
const theme2 = reactive({ height: '40px' })
const theme3 = reactive({ height: '40px' })
const theme4 = reactive({ height: '40px' })
const theme5 = reactive({ height: '40px' })


const selectMenuItem1 = (index,name) => {
    selectedIndex1.value = index;
    if (index >= 0) {
        secondShow.value = true
        searchData.secondData = searchData.data[index].children
        urldata.serviceTypeId =name
    } else if (index === -1) {
        secondShow.value = false
        urldata.serviceTypeId = ''
    }

}
const selectMenuItem2 = (index,name) => {
    selectedIndex2.value = index;
    if (index >= 0) {
        urldata.serviceTypeId2 = name
    } else if (index === -1) {
        secondShow.value = false
        urldata.serviceTypeId2 = '' 
    }
}
const selectMenuItem3 = (index,name) => {
    selectedIndex3.value = index;
    if (index >= 0) {
        urldata.technicalId = name
    } else if (index === -1) {
        secondShow.value = false
        urldata.technicalId = '' 
    }
}
const selectMenuItem4 = (index,name) => {
    selectedIndex4.value = index;
    if (index >= 0) {
        urldata.dataOrigin = name
    } else if (index === -1) {
        secondShow.value = false
        urldata.dataOrigin = '' 
    }
}
const selectMenuItem5 = (index,name) => {
    selectedIndex5.value = index;
    if (index >= 0) {
        urldata.dataOrigin = name
    } else if (index === -1) {
        secondShow.value = false
        urldata.dataOrigin = '' 
    }
}
const more = (index) => {
    if (index === 1) {
        console.log('1')
        theme.height = 'auto'
        isShow1.value = false;
    } else if (index === 2) {
        console.log('2')
        theme2.height = 'auto'
        isShow2.value = false;
    } else if (index === 3) {
        console.log('3')
        theme3.height = 'auto'
        isShow3.value = false;
    } else if (index === 4) {
        console.log('4')
        theme4.height = 'auto'
        isShow4.value = false;
    } else if (index === 5) {
        console.log('5')
        theme5.height = 'auto'
        isShow5.value = false;
    }

}
const packup = (index) => {
    if (index === 1) {
        theme.height = '40px',
            isShow1.value = true;
    } else if (index === 2) {
        theme2.height = '40px',
            isShow2.value = true;
    } else if (index === 3) {
        theme3.height = '40px',
            isShow3.value = true;
    } else if (index === 4) {
        theme4.height = '40px',
            isShow4.value = true;
    } else if (index === 5) {
        theme5.height = '40px',
            isShow5.value = true;
    }
}
const test = () => {
    axios({
        method: 'get',
        url: 'https://service.test.nttcc.com.cn/admin/api/v1/service_type/ladderlist'
    }).then((res) => {
        searchData.data = res.data.data
    })
    axios({
        method: 'get',
        url: 'https://service.test.nttcc.com.cn/api/v1/technical/list'
    }).then((res) => {
        searchData.teData = res.data.data.list
    })
    axios({
        method: 'get',
        url: 'https://service.test.nttcc.com.cn/api/v1/service/list?pageNum=1&pageSize=10&keywords=&serviceTypeId=&serviceTypeId2=&technicalId=&province=&dataOrigin=&logicStatus=1'
    }).then((res) => {
        searchData.tableData = res.data.data
        console.log(searchData.tableData)
    })
}
test()
const handleCurrentChange = (val) => {
    urldata.pageNum = val
}

const goto = () =>{
    router.push('/')
}

</script>

<style lang="less" scoped>
.con-searchs {
    min-height: 120px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    margin-bottom: 20px;

    .con-context {
        width: 100%;
        padding: 0 20px;
        margin-bottom: 30px;
        background: #fff;
        border: 1px solid #dcdfe6;
        border-radius: 4px;
    }
}

.conmid-search {
    display: flex;
    height: 40px;
    overflow: hidden;
    margin-bottom: 10px;
    height: v-bind('theme.height');
}

.conmid-search1 {
    display: flex;
    height: 40px;
    overflow: hidden;
    margin-bottom: 10px;
    height: v-bind('theme2.height');
}

.conmid-search2 {
    display: flex;
    height: 40px;
    overflow: hidden;
    margin-bottom: 10px;
    height: v-bind('theme3.height');
}

.conmid-search3 {
    display: flex;
    height: 40px;
    overflow: hidden;
    margin-bottom: 10px;
    height: v-bind('theme4.height');
}

.conmid-search4 {
    display: flex;
    height: 40px;
    overflow: hidden;
    margin-bottom: 10px;
    height: v-bind('theme5.height');
}

.search-title {
    width: 120px;
    line-height: 30px;
    margin-top: 10px;
    color: #909399;
    font-size: 14px;

}

.search-list {
    flex: 1;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    margin-right: 74px;
}

.search-list-item {
    cursor: pointer;
    line-height: 20px;
    padding: 5px 10px;
    margin-right: 10px;
    margin-top: 10px;
    border-radius: 2px;
}

.search-list-item:hover {
    background-color: #3473e6;
    color: #fff;
}

.selected {
    background-color: #3473e6;
    color: #fff;
}

.search-more {
    display: flex;
    align-items: center;
    cursor: pointer;
    width: 48px;
    height: 30px;
    margin-top: 10px;
    color: #3473e6;
}


.divider {
    width: 100%;
    height: 1px;
    border-top: 1px dashed #dcdfe6;
}

.con-tabledata-header {
    width: 100%;
    height: 48px;
    padding: 0 20px;
    background: #f7f8f9;
    border-radius: 4px;

    .table-header {
        display: flex;

        .header-list {
            display: flex;
            height: 48px;
            flex: 1;
            align-items: center;
            color: #909399;
            padding-left: 20px;
            font-weight: 700;
            font-size: 14px;
        }

        .header-list:nth-child(2) {
            padding-left: 60px;
        }

        .header-list:nth-child(3) {
            padding-left: 30px;
        }

        // .header-list:nth-child(4) {
        //     padding-left: 10px;
        // }
        // .header-list:nth-child(5) {
        //     padding-left: 10px;
        // }
    }

}

.con-tabledata {

    .con-data {
        display: flex;
        height: 80px;
        border: 1px solid #dcdfe6;
        margin-top: 10px;
        border-radius: 5px;

        .table-list {
            width: 100%;
            display: flex;
            padding: 0 40px;
            align-items: center;
            cursor: pointer;
        }


        .table-list:nth-child(1) {
            p {
                font-weight: 700;
                font-size: 16px;
            }
        }

        .table-list:nth-child(2) {
            // margin-right: 60px; 
            width: 1600px;

            p {
                font-weight: 700;
                font-size: 16px;
            }

            img {
                margin-right: 10px;
            }

        }

        .table-list:nth-child(3) {
            padding-left: 30px;

            p {
                color: #909399;
            }
        }

        .table-list:nth-child(4) {
            p {
                font-weight: 700;
                font-size: 16px;
                color: #f1b221;
            }
        }

        .table-list:nth-child(5) {
            p {
                font-weight: 700;
                font-size: 16px;
                color: #3473e6;
            }
        }
    }

    .con-data:hover {
        border: 1px solid #3473e6;

        .table-list:nth-child(1),
        :nth-child(2):hover {
            p {
                color: #3473e6;
            }
        }
    }

}

.table-pagination {
    display: flex;
    justify-content: center;
    margin-top: 30px;
}
</style>

<template>
    <div id="app">
        <v-table :tableBodyData="tableBodyData" :tableHeadData="tableHeadData"></v-table>
        <v-pagination @changeCurrentPage="changeCurrentPage" :pageSize="pageSize" :currentPage="currentPage" :totalPage="totalPage"></v-pagination>
    </div>
</template>

<script>
const lineHeight = 48;//单行行高 根据css来
import getTableData from './api/getTableData.js'
import Table from '@/components/Table/Table'
import Pagination from '@/components/Pagination/Pagination'
export default {
    name: 'app',
    data () {
      return {
        rows: 0,
        pageSize: 7,
        currentPage: 1,
        tableHeadData: [],
        tableDatas: []
      }
    },
    created () {  
      var height = document.body.clientHeight;
      var width = document.body.clientWidth;
      this.rows = (this.layoutRespose(height))
      this.fachData();
    },
    computed: {
      tableBodyData () {
        //返回需要展示的数据
        let tableBodyArray = [];
        let start = this.rows*(this.currentPage-1);
        for(let i = 0;i < this.rows;i++) {
          tableBodyArray.push(this.tableDatas[start + i])
        }
        return tableBodyArray
      },
      totalPage () {
        return Math.ceil(this.tableDatas.length/this.rows)
      }
    },
    methods: {
        fachData () {
          //传入一个total数据为了给第一次进入给TABLEBODY添加数据
          //获取数据
          let self = this;
          getTableData.GET_TABLEDATA(this).then((res) => {
              if(res.body.errno){
                //获取数据成功
                //把数据全部放到TABLEDATAS中保存
                self.tableHeadData = res.body.data[0];
                let tableDatas = [];
                for(let i = 1;i < res.body.data.length;i++) {
                  tableDatas.push(res.body.data[i])
                }
                self.tableDatas = tableDatas
              }else{
                console.log("获取数据失败");
              }
          })
        },
        changeCurrentPage (index) {
          this.currentPage = index;
        },
        layoutRespose (height) {
          //计算最佳展示行数，留出2行作为分页组件的位置
          return (parseInt(height/lineHeight)-2);
        }
    },
    components: {
        'v-table': Table,
        'v-pagination': Pagination
    }
}
</script>

<style lang="less">
  @import url(assets/less/base.less);
  html,body {
    height: 100%;
    width: 100%;
  }
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #292929;
  }
</style>

<template>
  <div class="product-list">
    <h1 class="page-title">产品项管理</h1>
    <div class="action-bar clearfix">
      <div class="bar-left">
        <Button type="success" size="large">
          <Icon type="md-add"/>
          <span>创建产品项</span>
        </Button>
      </div>
      <div class="bar-right">
        <div>
          <Select style="width:100px" size="large" v-model="searchType">
            <Option v-for="item in typeList" :value="item.value" :key="item.value" :label="item.text"></Option>
          </Select>
        </div>
        <div>
          <Select size="large" style="width:200px" v-if="searchType == 'grade'" v-model="gradeType">
            <Option v-for="item in gradeList" :value="item.value" :key="item.value" :label="item.text"></Option>
          </Select>
          <!--<Input size="large" style="width:200px" :type="text" v-model="searchLabel"  v-if="searchType != 'id' && searchType != 'grade'"/>-->
          <Input size="large" style="width:200px" number="true" type="number" v-model.number="searchLabel" :spellcheck="false" :min="1" v-if="searchType == 'id'"/>
        </div>
        <Button type="primary" size="large" @click="searchAction">
          <Icon type="ios-search"/>
          <span v-if="flag">继续搜索</span>
        </Button>
        <Button size="large" v-if="flag" @click="resetAction">
          <Icon type="md-refresh"/>
          <span>重置搜索</span>
        </Button>
      </div>
    </div>
    <!--分页-->
    <div style="text-align: center; margin-top: 20px;">
      <Page :total="Number(productList.count)" :current.sync="page" :page-size="size" placement="top"
            @on-change="handlePage"
            @on-page-size-change="handleSize" show-sizer show-elevator/>
    </div>
  </div>
</template>

<script>

  import {queryProductList} from "../../server/commonServices";
  import {ERR_OK, ERR_Fail} from "../../server/configServices";
  import {patternDate} from "common/js/filters";

  export default {
    name: "product",
    data() {
      return {
        page: 1,
        size: 10,
        formData: {},
        productList: [],
        typeList: [ //搜索类型
          {
            value: 'id',
            text: '编号'
          },
          {
            value: 'name',
            text: '名称'
          },
          {
            value: 'material',
            text: '材质'
          },
          {
            value: 'grade',
            text: '档次'
          }
        ],
        searchType: 'id',  //初始化选中搜索类型
        searchLabel: '',   //搜索内容
        gradeType: '',    //搜索选中档次类型
        gradeList: [{  //搜索档次类型列表
          value: '1',
          text: '经济'
        }, {
          value: '2',
          text: '精选'
        }, {
          value: '3',
          text: '豪华'
        }],
        flag: false,
      }
    },
    mounted() {
      this.queryProductList();
    },
    methods: {
      handlePage() {
        this.queryProductList();
      },
      handleSize() {
        this.queryProductList();
      },
      queryProductList() {
        this.formData = {
          page: this.page,
          size: this.size
        }
        queryProductList(this.formData).then((res) => {
          if (res.code == ERR_OK) {
            this.productList = res.data;
          } else if (res.code == ERR_Fail) {
            this.productList = [];
          }
        })
      },
      searchAction(){},
    },
  }

</script>

<style lang="scss" rel="stylesheet/scss">
  @import '~common/scss/common.scss';

  .product-list {
    > .action-bar {
      margin-bottom: 30px;
      width: 100%;

      .bar-left {
        float: left;
      }
      .bar-right {
        float: right;

        > div {
          float: left;
          margin-left: 5px;
        }

        > button {
          float: left;
          margin-left: 5px;
        }
      }
    }
  }
</style>

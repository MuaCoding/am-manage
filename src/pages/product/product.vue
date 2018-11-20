<template>
  <div class="product-list">
    <h1 class="page-title">产品项管理</h1>
    <div class="action-bar clearfix">
      <div class="bar-left">
        <Button type="success" size="large" @click="createAction">
          <Icon type="md-add"/>
          <span>创建产品项</span>
        </Button>
      </div>
      <div class="bar-right">
        <div>
          <Select style="width:100px" size="large" v-model="searchType" @on-change="emptyAction">
            <Option v-for="item in typeList" :value="item.value" :key="item.value" :label="item.text"></Option>
          </Select>
        </div>
        <div>
          <Select size="large" style="width:200px" v-if="searchType == 'grade'" v-model="gradeType">
            <Option v-for="item in gradeList" :value="item.value" :key="item.value" :label="item.text"></Option>
          </Select>
          <Input size="large" style="width:200px" type="text" v-model="searchLabel"
                 v-if="searchType != 'id' && searchType != 'grade'"/>
          <InputNumber style="width:200px" :min="1" v-model="searchLabel"  v-if="searchType == 'id'"></InputNumber>
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

    <div>
      <!--列表-->
      <Table stripe border :loading="loading" :columns="columnsList" :data="productList.data" align="center"></Table>

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
        loading: true,
        formData: {},
        productList: [],
        columnsList: [
          {
            title: "#",
            align: 'center',
            key: "id",
            width: 80
          },
          {
            title: "产品项名称",
            key: "name",
            minWidth: 115
          },
          {
            title: "排序",
            align: 'center',
            key: "sequence",
            width: 80,
          },
          {
            title: "档次",
            align: 'center',
            key: "grade",
            width: 90,
            render: (h, params) => {
              let grade = '', text = '';
              switch (params.row.grade) {
                case 1:
                  grade = 'level-tag-1'
                  text = "经济"
                  break;
                case 2:
                  grade = 'level-tag-2'
                  text = "精选"
                  break;
                case 3:
                  grade = 'level-tag-3'
                  text = "豪华"
                  break;
              }
              return h('span', {
                class: grade
              }, text)
            }
          },
          {
            title: "材质",
            align: 'center',
            key: "material",
            minWidth: 116,
          },
          {
            title: "状态",
            align: 'center',
            key: "state",
            width: 120,
            render: (h, params) => {
              let color = '', type = '', text = '';
              switch (params.row.status) {
                case 0:
                  color = 'rgb(170, 170, 170)'
                  type = "ios-close-circle"
                  text = "禁用"
                  break;
                case 1:
                  color = 'rgb(25, 190, 107)'
                  type = "ios-checkmark-circle"
                  text = "正常"
                  break;
              }
              return h('p', [
                h('Icon', {
                  props: {
                    type: type,
                  },
                  style: {
                    color: color
                  }
                }),
                h('span', {
                  style: {
                    marginLeft: '5px',
                    color: params.row.status == 1 ? 'rgb(73, 80, 96)' : 'rgb(170, 170, 170)'
                  }
                }, text),
              ])
            }
          },
          {
            title: "操作",
            align: 'center',
            key: "operation",
            width: 150,
            render: (h, params) => {
              return h('Dropdown', {
                props: {
                  trigger: 'click',
                },
              }, [
                h('a', [
                  h('span', {
                    style: {marginRight: '5px'}
                  }, '选项'),
                  h('Icon', {
                    props: {
                      type: 'ios-arrow-down'
                    },
                  }),
                ]),
                h('DropdownMenu', {slot: 'list'}, [
                  h('DropdownItem', {
                    style: {
                      textAlign: 'center'
                    },
                    nativeOn: {
                      click: () => {
                        this.editAction(params)
                      }
                    }
                  }, '编辑'),
                  h('DropdownItem', {
                    style: {
                      textAlign: 'center'
                    },
                    nativeOn: {
                      'click': () => {
                        this.rankAction(params)
                      }
                    }
                  }, '排序'),
                  h('DropdownItem', {
                    style: {
                      textAlign: 'center'
                    },
                    nativeOn: {
                      'click': () => {
                        this.priceAction(params)
                      }
                    }
                  }, '管理价格'),
                  h('DropdownItem', {
                    style: {
                      textAlign: 'center'
                    },
                    nativeOn: {
                      'click': () => {
                        this.forbiddenAction(params)
                      }
                    }
                  }, '设为禁用'),
                  h('DropdownItem', {
                    style: {
                      textAlign: 'center'
                    },
                    nativeOn: {
                      'click': () => {
                        this.deleteAction(params)
                      }
                    }
                  }, '删除'),
                ])
              ])
            }
          }
        ],  //表格数据绑定
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
        searchLabel: null,   //搜索内容
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
      handlePage(value) {
        this.page = value;
        this.queryProductList();
      },
      handleSize(value) {
        this.size = value;
        this.queryProductList();
      },
      queryProductList() {
        this.formData = {
          page: this.page,
          size: this.size
        }
        queryProductList(this.formData).then((res) => {
          this.loading = false;
          if (res.code == ERR_OK) {
            this.productList = res.data;
          } else if (res.code == ERR_Fail) {
            this.productList = [];
          }
        })
      },
      createAction() {
      },
      searchAction() {
      },
      editAction() {
      },
      rankAction() {
      },
      priceAction() {
      },
      forbiddenAction() {
      },
      deleteAction() {
      },
      emptyAction(){
        this.searchLabel = null;
      },
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

    /*档次标识*/
    .level-tag-1, .level-tag-2, .level-tag-3 {
      position: relative;
      display: inline-block;
      padding-left: 15px;
      &:before {
        position: absolute;
        top: 6px;
        left: 0;
        display: block;
        content: "";
        height: 8px;
        width: 8px;
        border-radius: 4px;
      }
    }
    .level-tag-1 {
      &:before {
        background-color: #38b48b;
      }
    }
    .level-tag-2 {
      &:before {
        background-color: #cd5e3c;
      }
    }
    .level-tag-3 {
      &:before {
        background-color: #f39800;
      }
    }
  }
</style>

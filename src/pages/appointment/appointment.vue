<template>
  <div class="appointment-list">
    <h1 class="page-title">预约估价</h1>
    <div class="action-bar clearfix">
      <div class="bar-left">
        <p style="line-height: 36px;font-size: 14px;color: rgb(170, 170, 170);">
          <Icon type="ios-alert"/>
          <span>暂无可操作功能</span>
        </p>
      </div>
      <div class="bar-right">
        <div>
          <Select style="width:100px" size="large" v-model="searchType">
            <Option v-for="item in typeList" :value="item.value" :key="item.value" :label="item.text"></Option>
          </Select>
        </div>
        <div>
          <Select size="large" style="width:200px" v-if="searchType == 'status'" v-model="statusType">
            <Option v-for="item in statusList" :value="item.value" :key="item.value" :label="item.text"></Option>
          </Select>
          <Input size="large" style="width:200px" v-model="searchLabel" v-if="searchType != 'status'"/>
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
      <Table stripe border :columns="columnsList" :data="appointList.data" align="center"></Table>
      <!--列表详情-->
      <Modal
        v-model="modalVisible"
        title="预约单详情"
        @on-ok="okAction"
        @on-cancel="cancelAction" class="appointment-detail" v-if="appointDetail">
        <!---->
        <h2>订单信息</h2>
        <ul class="field-list">
          <li class="list-item">
            <span class="filed-name">订单编号：</span>
            <span class="filed-content">{{appointDetail.order_id}}</span>
          </li>
          <li class="list-item">
            <span class="filed-name">提交时间：</span>
            <span class="filed-content">{{appointDetail.created_at | formatDate}}</span>
          </li>
          <li class="list-item">
            <span class="filed-name">预约时间：</span>
            <span class="filed-content">{{appointDetail.time  | formatDate}}</span>
          </li>
          <li class="list-item">
            <span class="filed-name">当前状态：</span>
            <span class="filed-content" v-if="appointDetail.status == 1"><Icon type="ios-alert"
                                                                               color="rgb(205, 94, 60)"/> <span
              style="color: rgb(73, 80, 96);">未测量</span></span>
            <span class="filed-content" v-if="appointDetail.status == 2"><Icon type="md-help-circle"
                                                                               color="rgb(255, 153, 0)"/> <span
              style="color: rgb(73, 80, 96);">待测量</span></span>
            <span class="filed-content" v-if="appointDetail.status == 3"><Icon type="ios-pie"
                                                                               color="rgb(45, 140, 240)"/> <span
              style="color: rgb(73, 80, 96);">已测量</span></span>
            <span class="filed-content" v-if="appointDetail.status == 4"><Icon type="ios-checkmark-circle"
                                                                               color="rgb(25, 190, 107)"/> <span
              style="color: rgb(73, 80, 96);">已完成</span></span>
          </li>
        </ul>

        <!--订单信息-->
        <h2>客户信息</h2>
        <ul class="field-list">
          <li class="list-item">
            <span class="filed-name">姓名：</span>
            <span class="filed-content">{{appointDetail.contact_name}}</span>
          </li>
          <li class="list-item">
            <span class="filed-name">联系方式：</span>
            <span class="filed-content">{{appointDetail.contact_mobile}}</span>
          </li>
        </ul>

        <!--房屋信息-->
        <h2>房屋信息</h2>
        <ul class="field-list">
          <li class="list-item">
            <span class="filed-name">小区名称：</span>
            <span class="filed-content">{{appointDetail.house.name}}</span>
          </li>
          <li class="list-item">
            <span class="filed-name">户型：</span>
            <span class="filed-content" v-for="item in appointDetail.house.layout">
              <span>{{item.text}}</span>
            </span>
          </li>
          <li class="list-item">
            <span class="filed-name">建筑信息：</span>
            <span class="filed-content">{{'面积 ' + appointDetail.house.size + ' ㎡ 、屋高 ' + appointDetail.house.height + ' m'}}</span>
          </li>
          <li class="list-item">
            <span class="filed-name">具体地址：</span>
            <span class="filed-content">{{appointDetail.house.area + appointDetail.house.detail}}</span>
          </li>
          <li class="list-item">
            <span class="filed-name">邮政编码：</span>
            <span class="filed-content">{{appointDetail.house.area_code}}</span>
          </li>
        </ul>

        <!--测量员信息-->
        <h2>测量员信息</h2>
        <ul class="field-list">
          <li class="list-item">
            <span class="filed-name">姓名：</span>
            <span class="filed-content">{{appointDetail.surveyor.name}}</span>
          </li>
          <li class="list-item">
            <span class="filed-name">联系方式：</span>
            <span class="filed-content">{{appointDetail.surveyor.mobile}}</span>
          </li>
        </ul>

        <!--自行测量结果-->
        <h2>自行测量结果</h2>
        <ul class="field-list">
          <li class="list-item">
            <span class="filed-name">总材料费：</span>
            <span class="filed-content">￥{{appointDetail.house.before_total.material | formatPrice(2)}}</span>
          </li>
          <li class="list-item">
            <span class="filed-name">总服务费：</span>
            <span class="filed-content">￥{{appointDetail.house.before_total.service | formatPrice(2)}}</span>
          </li>
          <li class="list-item">
            <span class="filed-name">总计：</span>
            <span class="filed-content">￥{{(appointDetail.house.before_total.material + appointDetail.house.before_total.service) | formatPrice(2)}}</span>
          </li>
        </ul>

        <!--自行测量结果-->
        <h2>最终测量结果</h2>
        <ul class="field-list" v-if="appointDetail.status == 4">
          <li class="list-item">
            <span class="filed-name">总材料费：</span>
            <span class="filed-content">{{appointDetail.house.after_total.material}}</span>
          </li>
          <li class="list-item">
            <span class="filed-name">总服务费：</span>
            <span class="filed-content">{{appointDetail.house.after_total.service}}</span>
          </li>
          <li class="list-item">
            <span class="filed-name">总计：</span>
            <span class="filed-content">{{appointDetail.surveyor.mobile}}</span>
          </li>
        </ul>
        <p class="empty-state" v-else-if="appointDetail.status !=4">
          <Icon type="ios-alert"/>
          <span>暂无测量结果</span>
        </p>
      </Modal>
    </div>

    <!--分页-->
    <div style="text-align: center; margin-top: 20px;" v-if="appointList">
      <Page :total="appointList.count" :current="page" :page-size="size" placement="top" @on-change="handlePage"
            @on-page-size-change="handleSize" show-sizer show-elevator/>
    </div>
  </div>

</template>
<script>
  import {queryAppointList, queryAppointDetail} from "../../server/commonServices";
  // import appointDetail from "components/model/appoint-detail.vue";
  import {ERR_OK, ERR_Fail} from "../../server/configServices";
  import {patternDate} from "common/js/filters";

  export default {
    name: "appointment",
    data() {
      return {
        page: 1, //当前页
        size: 10,  //当前页大小
        typeList: [
          {
            value: 'order',
            text: '订单编号'
          },
          {
            value: 'name',
            text: '客户姓名'
          },
          {
            value: 'mobile',
            text: '客户手机'
          },
          {
            value: 'surveyor',
            text: '测量员'
          },
          {
            value: 'status',
            text: '状态'
          },
        ], //搜索项类型列表
        searchType: 'order',  //初始化选中搜索类型
        searchLabel: '',   //搜索内容
        statusType: '',    //搜索选中状态类型
        statusList: [{  //搜索状态类型列表
          value: '0',
          text: '分配中'
        }, {
          value: '1',
          text: '进行中'
        }, {
          value: '2',
          text: '已完成'
        }],
        columnsList: [
          {
            title: "#",
            align: 'center',
            key: "id"
          },
          {
            title: "订单号",
            align: 'center',
            key: "order_id"
          },
          {
            title: "客户信息",
            align: 'center',
            key: "contact",
            render: (h, params) => {
              return h('div', [
                h('p', {style: {marginBottom: '3px', color: 'rgb(73, 80, 96)'}}, params.row.contact.name),
                h('span', {style: {color: 'rgb(170, 170, 170)', fontSize: '13px'}}, params.row.contact.mobile)
              ])
            }
          },
          {
            title: "房屋属性",
            align: 'center',
            key: "house",
            render: (h, params) => {
              let text = '';
              params.row.house.layout.map((o) => {
                if (o) {
                  text += o.text
                }
              });
              return h('div', [
                h('p', {style: {marginBottom: '3px', color: 'rgb(73, 80, 96)'}}, params.row.house.name),
                h('span', {style: {color: 'rgb(170, 170, 170)', fontSize: '13px'}}, text)
              ])
            }
          },
          {
            title: "地址",
            align: 'center',
            key: "address",
            render: (h, params) => {
              return h('span', params.row.house.address)
            }
          },
          {
            title: "预约时间",
            align: 'center',
            key: "time",
            render: (h, params) => {
              return h('span', patternDate(params.row.time))
            }
          },
          {
            title: "测量员",
            align: 'center',
            key: "surveyor",
            render: (h, params) => {
              return h('div', [
                h('p', {style: {marginBottom: '3px', color: 'rgb(73, 80, 96)'}}, params.row.surveyor.name),
                h('span', {style: {color: 'rgb(170, 170, 170)', fontSize: '13px'}}, params.row.surveyor.mobile)
              ])
            }
          },
          {
            title: "状态",
            align: 'center',
            key: "address",
            render: (h, params) => {
              let color = null, type = 1, text = null;
              switch (params.row.status) {
                case 1:
                  type = 'ios-alert';
                  color = 'rgb(205, 94, 60)';
                  text = '未测量'
                  break;
                case 2:
                  type = 'md-help-circle'
                  color = 'rgb(255, 153, 0)'
                  text = '待测量'
                  break;
                case 3:
                  type = 'ios-pie';
                  color = 'rgb(45, 140, 240)'
                  text = '已测量'
                  break;
                case 4:
                  type = 'ios-checkmark-circle'
                  color = 'rgb(25, 190, 107)'
                  text = '已完成'
                  break;

              }
              return h('p', [
                h('Icon', {
                  props: {
                    type: type,
                  },
                  style: {color: color}
                }),
                h('span', {style: {marginLeft: '5px', color: 'rgb(73, 80, 96)'}}, text)
              ])
            }
          },
          {
            title: "操作",
            align: 'center',
            key: "address",
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
                        this.detailAction(params)
                      }
                    }
                  }, '详情'),
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
          },
        ],  //表格数据绑定
        formData: {},       //请求参数变量
        appointList: [],  //预约单列表
        appointDetail: null,  //预约单详情
        modalVisible: false,  //预约单详情模态框
        flag: false,  //搜索状态
      };
    },
    filters: {},
    mounted() {
      this.queryAppointList();
    },
    methods: {
      //更改当前页
      handlePage(value) {
        this.page = value;
        this.queryAppointList()
      },
      //更改当前页数量
      handleSize(value) {
        this.size = value;
        this.queryAppointList()
      },
      //获取预约单列表
      queryAppointList() {
        if (this.searchLabel && this.searchType != "status") {
          switch (this.searchType) {
            case 'order':
              this.formData.order = this.searchLabel;
              break;
            case 'name':
              this.formData.name = this.searchLabel;
              break;
            case 'mobile':
              this.formData.mobile = this.searchLabel;
              break;
            case 'surveyor':
              this.formData.surveyor = this.searchLabel;
              break;
            case 'status':
              break;
          }
        } else if (this.statusType && this.searchType == "status") {
          this.statusType ? this.formData.status = this.statusType : '';
        } else {
          this.formData = {
            page: this.page,
            size: this.size
          }
        };

        queryAppointList(this.formData).then((res) => {
          if (res.code == ERR_OK) {
            this.appointList = res.data;
            this.flag ? this.$Message.success(`搜索到${this.appointList.count}条结果`) : '';
          } else if (res.code == ERR_Fail) {
            this.appointList = [];
          }
        })
      },
      //获取预约单详情
      detailAction(item) {
        queryAppointDetail(item.row.id).then((res) => {
          if (res.code == ERR_OK) {
            console.log(res.data)
            this.appointDetail = res.data;
            this.modalVisible = true;
          }
        })
      },
      deleteAction(item) {
      },
      okAction() {
      },
      cancelAction() {
      },
      searchAction() {
        this.flag = true;
        !this.searchLabel && this.searchType != "status" ? this.$Message.error('请选择搜索条件') : this.queryAppointList();
      },
      resetAction: function () {
        this.flag = false;
        this.searchLabel = '';
        this.statusType = '';
      },
    },
    components: {},
  };
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import '~common/scss/common.scss';

  .appointment-list {
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

  .appointment-detail {
    h2 {
      font-size: 16px;
      padding: 15px 0 5px;
      border-top: 1px solid #eee;

      &:first-child {
        border: 0
      }
    }
    .field-list {
      list-style: none;
      padding-bottom: 15px;

      > .list-item {
        font-size: 13px;
        line-height: 25px;
        > .filed-name {
          display: inline-block;
          width: 80px;
          color: #888;
        }
      }
    }

    .empty-state {
      background-color: #f8f8f9;
      color: #888;
      text-align: center;
      font-size: 14px;
      padding: 20px 0;
      margin-bottom: 15px;
    }
  }

</style>


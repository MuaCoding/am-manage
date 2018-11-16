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
          <Select style="width:100px" size="large">
            <Option value="1">客户姓名</Option>
            <Option value="2">型号2</Option>
          </Select>
        </div>
        <div>
          <Select filterable size="large" style="width:200px" :v-if="status">
            <!-- <Option></Option> -->
          </Select>
          <Input size="large" placeholder="large size" style="width:200px"/>
        </div>
        <Button type="primary" size="large">
          <Icon type="ios-search"/>
        </Button>
      </div>
    </div>

    <div>
      <Table stripe border :columns="columnsList" :data="appointList" align="center"></Table>

      <Modal
        v-model="modalVisible"
        title="预约单详情"
        @on-ok="okAction"
        @on-cancel="cancelAction" class="appointment-detail">
        <h2>订单信息</h2>
        <ul class="field-list">
          <li class="list-item">
            <span class="filed-name">订单编号：</span>
            <span class="filed-content">{{appointDetail.order_id}}</span>
          </li>
          <li class="list-item">
            <span class="filed-name">提交时间：</span>
            <span class="filed-content">{{appointDetail.order_id}}</span>
          </li>
          <li class="list-item">
            <span class="filed-name">预约时间：</span>
            <span class="filed-content">{{appointDetail.order_id}}</span>
          </li>
          <li class="list-item">
            <span class="filed-name">当前状态：</span>
            <span class="filed-content">{{appointDetail.order_id}}</span>
          </li>
        </ul>
      </Modal>
    </div>
  </div>

</template>
<script>
  import {queryAppointList, queryAppointDetail} from "../../server/commonServices";
  import appointDetail from "components/model/appoint-detail.vue";
  import {ERR_OK} from "../../server/configServices";
  import formatDate from "common/js/common";

  export default {
    name: "appointment",
    data() {
      return {
        status: false,
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
              return h('span', formatDate.formatDate(params.row.time, 'yyyy-MM-dd hh:mm'))
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
                  type = 'ios-checkmark-circle';
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
                  text = '已测量'
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
        ],
        appointList: [],
        appointDetail: {},
        modalVisible: false,
      };
    },
    filters: {},
    mounted() {
      this.queryAppointList()
    },
    methods: {
      queryAppointList() {
        queryAppointList().then((res) => {
          if (res.code == ERR_OK) {
            this.appointList = res.data.data;
          }
        })
      },
      detailAction(item) {
        queryAppointDetail(item.row.id).then((res) => {
          if (res.code == ERR_OK) {
            this.appointDetail = res.data;
            this.modalVisible = true;
          }
        })
      },
      deleteAction(item) {
        console.log(item)
      },
      okAction(){},
      cancelAction(){},
    },
    components: {
      appointDetail,
    },
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
  }

</style>


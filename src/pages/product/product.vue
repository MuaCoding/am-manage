<template>
  <div class="product-list">
    <!--分页-->
    <div style="text-align: center; margin-top: 20px;">
      <Page :total="Number(productList.count)" :current.sync="page" :page-size="size" placement="top" @on-change="handlePage"
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
      }
    },
    mounted() {
      this.queryProductList();
    },
    methods: {
      handlePage(){
        this.queryProductList();
      },
      handleSize(){
        this.queryProductList();
      },
      queryProductList(){
        this.formData = {
          page: this.page,
          size: this.size
        }
        queryProductList(this.formData).then((res) => {
          if (res.code == ERR_OK) {
            this.productList = res.data;
          }else if (res.code == ERR_Fail) {
            this.productList = [];
          }
        })
      },

    },
  }

</script>

<style lang="scss" rel="stylesheet/scss">

</style>

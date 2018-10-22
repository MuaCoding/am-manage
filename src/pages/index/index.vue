<template>
  <div class="index">
    <div class="index-cover">
      <img src="@/assets/index.png" alt="">
    </div>
  </div>
</template>

<script>

export default {
  name: "index",
  data() {
    return {
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" rel="stylesheet/scss">
.index {
  width: 100%;
  height: 100%;
  text-align: center;
  position: relative;
  > .index-cover {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    > img {
      height: 300px;
    }
  }
}
</style>

<template>
  <div class="parent" @click.stop>
    <div class="content">
      <div class="close" @click="close">&times;</div>
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  methods:{
    close(){
      this.$emit("close");
    }
  }
};
</script>
<style scoped>
.parent{
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, .8);
  width: 100%;
  height: 100%;
  overflow-y: auto;
}
.content{
  background-color: var(--white);
  max-width: 400px;
  margin: 4% auto;
  padding-bottom: 20px;
  box-sizing: border-box;
}
.close{
  background-color: red;
  width: 30px;
  height: 30px;
  margin-left: auto;
  text-align: center;
  font-size: 20px;
  font-weight: 600;
  color: var(--white);
  cursor: pointer;
}

@media screen and (max-width: 800px) {
  .content {
    margin: 10% auto;
  }
}
</style>

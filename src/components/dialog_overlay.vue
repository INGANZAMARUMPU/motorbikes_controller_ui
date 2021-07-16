<template>
  <div class="parent" @click.stop id="form">
    <form class="content">
      <div class="entire">
        <div class="close" @click="close">&times;</div>
      </div>
      <slot></slot>
    </form>
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
  max-width: 600px;
  margin: 4% auto;
  padding-bottom: 20px;
  box-sizing: border-box;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
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
.entire{
  grid-column: span 2;
}
#autres{
  grid-row: span 2;
}
@media screen and (max-width: 800px) {
  .content {
    margin: 10% auto;
  }
}
</style>

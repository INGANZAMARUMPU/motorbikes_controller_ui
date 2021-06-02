<template>
  <div>
    <div v-if="!!active_user">
      <Menus/>
    	<router-view/>
    </div>
    <LoginForm v-else/>
  </div>
</template>
<script>
import axios from "axios"
import LoginForm from "./components/login_form"
import Menus from "./components/menus"
export default {
  components: {
  	LoginForm, Menus
  },
  watch:{
    "$store.state.user":{
      deep:true,
      handler(new_val){
        if(!!new_val){
          localStorage.setItem('user', JSON.stringify(new_val));
        } else {
          localStorage.removeItem('user')
        }
      }
    }
  },
  mounted(){
    var user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      this.$store.state.user = user;
    }
  }
};
</script>
<style src="./style.css">
</style>

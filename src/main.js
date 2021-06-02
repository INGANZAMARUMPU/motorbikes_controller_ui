import Vue from 'vue'
import axios from "axios"
import App from './App.vue'
import router from './router'
import store from './store'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
	faCheck, faTimes, faUser, faSignOutAlt, faSearch, faUnlock,
  faPen
} from '@fortawesome/free-solid-svg-icons'

library.add(faCheck)
library.add(faTimes)
library.add(faUser)
library.add(faSignOutAlt)
library.add(faSearch)
library.add(faUnlock)
library.add(faPen)

Vue.component('fa', FontAwesomeIcon)

Vue.mixin({
  methods: {
    isNumeric(x) {
      let str = x.toString();
      if (str.match(/^[0-9]+$/)) return true;
      return false;
    },
    money(x) {
      if(x == undefined) return 0;
      if(!this.isNumeric(x)) return x;
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    },
    cleanString(str){
      if ((str===null) || (str==='')) return "";
      if(typeof(str)=='object') return str;
      str = str.toString();
      return str.replace( /(<([^>]+)>)/ig, '');
    },
    getGroupName(id){
      let group = this.$store.state.groups.find(x => x.id == id)
      return !!group? group.name:"-";
    },
    getGroupId(name){
      let group = this.$store.state.groups.find(x => {
        return x.name.toLowerCase() == name.toLowerCase()
      })
      return !!group? group.id:-1;
    },
    userIs(personnel, group_id){
      let groups = personnel.user.groups;
      return groups.includes(group_id);
    },
    datetime(x) {
      if(!x) return "-"
      let date = new Date(x);
    	return new Intl.DateTimeFormat(
    		'en-GB',
    		{ dateStyle: 'short', timeStyle: 'short' }
    	).format(date)
    },
    refreshToken(callback){
      let refresh = this.$store.state.user.refresh
      if(!!refresh){
        this.$store.state.user = null;
      }
      axios.post(this.url+"/refresh/",{"refresh":refresh})
      .then((response) => {
        this.$store.state.user.access = response.data.access
        callback()
      }).catch((error) => {
        if (!!error.response || error.response.status == 401) {
          this.$store.state.user = null;
        } else {
          console.error(error)
        }
      })
    }
  },
  computed:{
    active_user(){
      return this.$store.state.user;
    },
    url(){
      return this.$store.state.url;
    },
    headers(){
      return {
      	headers:{
      		"Authorization":"Bearer "+this.$store.state.user.access
      	}
      }
    }
  }
})

Vue.config.productionTip = false
window.axios = axios;
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')

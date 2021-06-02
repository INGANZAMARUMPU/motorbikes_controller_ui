<template>
  <div class="container">
    <div class="row">
      <button @click="customer_shown=true" class="add">
        Ajouter un membre
      </button>
      <div class="search-area">
        <input type="text" placeholder="rechercher" v-model="keyword">
        <button class="search">Rechercher</button>
      </div>
    </div>
    <div class="table">
      <table> 
        <thead>
          <tr>
            <th>No. compte</th>
            <th>Nom</th>
            <th>Prenom</th>
            <th>CNI</th>
            <th>Somme</th>
            <th>Options</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="compte in comptes" @click="openProfile(compte.id)">
            <td>{{ compte.id }}</td>
            <td>{{ compte.first_name }}</td>
            <td>{{ compte.last_name }}</td>
            <td>{{ compte.CNI }}</td>
            <td>{{ compte.balance }}</td>
            <td>
              <router-link :to="'/history/'+compte.id" v-slot="{ navigate }">
                <button class="btn-sm btn-info" @click.stop="navigate">
                  Historique
                </button>
              </router-link>
              <button class="btn-sm btn-primary" @click.stop="editCustomer(compte)">
                Modifier
              </button>
              <button class="btn-sm btn-success" @click.stop="unlockCompte(compte)">
              <fa icon="unlock"/>
              </button>
              <button class="btn-sm btn-danger">Supprimer</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <DialogCustomer @close="close" :item="active_compte"
      :class="{'hidden':!customer_shown}"/>
    <DialogUnlock @close="close" :compte="active_compte"
      :class="{'hidden':!unlock_shown}"/>
  </div>
</template>
<script>
import DialogCustomer from "../components/dialog_customer"
import DialogUnlock from "../components/dialog_unlock"
export default {
  props: {},
  components:{DialogCustomer, DialogUnlock},
  data(){
    return {
      comptes: this.$store.state.comptes,
      customer_shown:false, unlock_shown:false,
      active_compte:undefined, keyword:""
    }
  },
  watch:{
    "$store.state.comptes"(new_val){
      this.comptes = new_val;
    },
    keyword(new_val){
      this.comptes = this.$store.state.comptes.filter( x => {
         return  JSON.stringify(x).toLowerCase().includes(new_val.toLowerCase())
    })
    },
  },
  methods:{
    close(){
      this.active_compte = null
      this.customer_shown = false;
      this.unlock_shown = false;
    },
    openProfile(compte_id){
      this.$router.push(`/profile/${compte_id}`)
    },
    editCustomer(compte){
      this.active_compte = compte
      this.customer_shown = true
    },
    unlockCompte(compte){
      this.active_compte = compte
      this.unlock_shown = true
    },
    fetchComptes(){
    axios.get(this.url+"/compte/", this.headers)
    .then((response) => {
      this.$store.state.comptes = response.data.results
    }).catch((error) => {
      if(error.response.status == 403){
        this.refreshToken(this.fetchComptes)
      } else {
        this.logs = error.response.data;
      }
    })
    },
  },
  mounted(){
    if(this.$store.state.comptes.length<2){
      this.fetchComptes()
    }
  }
};
</script>
<style scoped>
</style>

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
            <th>Nom</th>
            <th>Prenom</th>
            <th>CNI</th>
            <th>Residence</th>
            <th>telephone</th>
            <th>options</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="personne in $store.state.personnes" @click="openProfile(personne.id)">
            <td>{{ personne.nom }}</td>
            <td>{{ personne.prenom }}</td>
            <td>{{ personne.cni }}</td>
            <td>{{ personne.residence }}</td>
            <td>{{ personne.telephone }}</td>
            <td>
              <button class="btn-sm btn-primary" @click.stop="editCustomer(personne)">
                Modifier
              </button>
              <button class="btn-sm btn-danger">Supprimer</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <DialogPersonne @close="close" :item="active_personne"
      :class="{'hidden':!customer_shown}"/>
  </div>
</template>
<script>
import DialogPersonne from "../components/dialog_personne"
export default {
  props: {},
  components:{DialogPersonne,},
  data(){
    return {
      personnes: this.$store.state.personnes,
      customer_shown:false, unlock_shown:false,
      active_personne:undefined, keyword:""
    }
  },
  watch:{
    "$store.state.personnes"(new_val){
      this.personnes = new_val;
    },
    keyword(new_val){
      this.personnes = this.$store.state.personnes.filter( x => {
         return  JSON.stringify(x).toLowerCase().includes(new_val.toLowerCase())
    })
    },
  },
  methods:{
    close(){
      this.active_personne = null
      this.customer_shown = false;
      this.unlock_shown = false;
    },
    openProfile(personne_id){
      this.$router.push(`/profile/${personne_id}`)
    },
    editCustomer(personne){
      this.active_personne = personne
      this.customer_shown = true
    },
    unlockPesonne(personne){
      this.active_personne = personne
      this.unlock_shown = true
    },
    fetchPesonnes(){
    axios.get(this.url+"/personne/", this.headers)
    .then((response) => {
      this.$store.state.personnes = response.data.results
    }).catch((error) => {
      if(error.response.status == 403){
        this.refreshToken(this.fetchPesonnes)
      } else {
        this.logs = error.response.data;
      }
    })
    },
  },
  mounted(){
    if(this.$store.state.personnes.length<2){
      this.fetchPesonnes()
    }
  }
};
</script>
<style scoped>
</style>

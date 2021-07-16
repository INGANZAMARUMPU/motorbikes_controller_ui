<template>
  <div class="container">
    <div class="row">
      <button @click="customer_shown=true" class="add">
        Ajouter un membre
      </button>
      <div class="search-area">
        <input type="text" placeholder="rechercher" v-model="keyword"
          v-on:keyup.enter="rechercher">
        <button class="search" @click="rechercher">Rechercher</button>
      </div>
    </div>
    <div class="table">
      <table> 
        <thead>
          <tr>
            <th>Nom</th>
            <th>Prenom</th>
            <th>CNI</th>
            <th>No. Badge</th>
            <th>No. Permi</th>
            <th>telephone</th>
            <th>options</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="personne in personnes" @click="openProfile(personne.id)">
            <td>{{ personne.nom }}</td>
            <td>{{ personne.prenom }}</td>
            <td>{{ personne.cni }}</td>
            <td>{{ personne.no_permi }}</td>
            <td>{{ personne.no_badge }}</td>
            <td>{{ personne.telephone }}</td>
            <td>
              <button class="btn-sm btn-primary" @click.stop="edit(personne)">
                Modifier
              </button>
              <button class="btn-sm btn-danger" @click.stop="remove(personne)">
                Supprimer
              </button>
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
      customer_shown:false, active_personne:undefined,
      keyword:""
    }
  },
  watch:{
    "$store.state.personnes"(new_val){
      this.personnes = new_val;
    },
    keyword(new_val){
      console.log(new_val)
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
    edit(personne){
      this.active_personne = personne
      this.customer_shown = true
    },
    rechercher(personne){
      axios.get(this.url+`/personne/?search=${this.keyword}`, this.headers)
      .then((response) => {
        this.personnes = response.data.results
      }).catch((error) => {
        if(error.response.status == 403){
          this.refreshToken(this.fetchPesonnes)
        } else {
          this.logs = error.response.data;
        }
      })
    },
    remove(personne){
      let fullname = `${personne.nom} ${personne.prenom}`
      let confirmation = this.active_user.fullname
      if(prompt(`Si vous voules vraiment supprimer ${fullname} veuillez taper ${confirmation}`) == confirmation){
        axios.delete(this.url+`/personne/${personne.id}/`, this.headers)
        .then((response) => {
          let index = this.$store.state.personnes.indexOf(personne);
          this.$store.state.personnes.splice(index,1)
        }).catch((error) => {
          if(error.response.status == 403){
            this.refreshToken(this.fetchPesonnes)
          } else {
            this.logs = error.response.data;
          }
        })
      }
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
    // if(this.$store.state.personnes.length<2){
      this.fetchPesonnes()
    // }
  }
};
</script>
<style scoped>
</style>

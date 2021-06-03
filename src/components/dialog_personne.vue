<template>
  <Overlay @close="$emit('close')">
      <div class="field">
        <label for="nom">Nom:</label>
        <input v-model="nom" id="nom" type="text">
      </div>
      <div class="field">
        <label for="prenom">Prenom:</label>
        <input v-model="prenom" id="prenom" type="text">
      </div>
      <div class="field">
        <label for="pere">Père:</label>
        <input v-model="pere" id="pere" type="text">
      </div>
      <div class="field">
        <label for="pere">Mère:</label>
        <input v-model="pere" id="pere" type="text">
      </div>
      <div class="field">
        <label for="province">Province:</label>
        <input v-model="province" id="province" type="text">
      </div>
      <div class="field">
        <label for="commune">Commune:</label>
        <input v-model="commune" id="commune" type="text">
      </div>
      <div class="field">
        <label for="colline">Colline:</label>
        <input v-model="colline" id="colline" type="text">
      </div>
      <div class="field">
        <label for="date">Date de Naissance:</label>
        <input v-model="date" id="date" type="date">
      </div>
      <div class="field">
        <label for="cni">Carte d'identité:</label>
        <input v-model="cni" id="cni" type="text">
      </div>
      <div class="field">
        <label for="etat_civil">Etat Civil:</label>
        <input v-model="etat_civil" id="etat_civil" type="text">
      </div>
      <div class="field">
        <label for="telephone">Telephone:</label>
        <input v-model="telephone" id="telephone" type="text">
      </div>
      <div class="field">
        <label for="parking">Parking:</label>
        <input v-model="parking" id="parking" type="text">
      </div>
      <div class="field">
        <label for="residence">Residence:</label>
        <input v-model="residence" id="residence" type="text">
      </div>
      <div class="field">
        <label for="image">Photo 1:</label>
        <input id="image" type="file" accept=".jpeg,.jpg,.png"
          @change="e => loadImage(e)">
      </div>
      <div class="field">
        <label for="image">Photo 2:</label>
        <input id="image" type="file" accept=".jpeg,.jpg,.png"
          @change="e => loadImage(e)">
      </div>
      <div class="field">
        <label for="autres">Autres:</label>
        <textarea v-model="autres" id="autres"></textarea>
      </div>
      <label class="logs">{{ logs }}</label>
      <button @click="createMember" class="btn">Soumettre</button>
  </Overlay>
</template>
<script>
import Overlay from "./dialog_overlay"
export default {
  props:['item'],
  components:{Overlay},
  data(){
    return {
      nom:"", prenom:"", cni:"", telephone:"", adresse:"", 
      agence:"", diplome:"", role:"", password:"", logs:"",
      document:undefined, email:""
    }
  },
  watch:{
    item(new_val){
      if (!!new_val) {
        this.nom = new_val.user.last_name
        this.prenom = new_val.user.first_name
        this.cni = new_val.CNI
        this.telephone = new_val.phone_number
        this.adresse = new_val.adress
        this.agence = new_val.agency
        this.diplome = new_val.diplome
        this.role = new_val.user.groups[0]
        this.email = new_val.user.email

      } else {
        nom = ""; prenom = ""; cni = ""; telephone = "";
        adresse = ""; agence = ""; diplome = ""; role = "";
        password = ""; document = undefined; email = ""
      }
    }
  },
  computed:{
    groups(){
      return this.$store.state.groups;
    },
    agences(){
      return this.$store.state.agences;
    }
  },
  methods:{
    loadImage(event){
      let file = event.target.files[0]
      if (file.size>300_000) {
        this.logs = "l'image ne peut pas depasser 300ko"
      } else {
        this.logs = ""
        this.document = file
      }
    },
    createMember(){
      this.logs = ""
      if(!this.document){
        return;
      }
      let data = new FormData()
      data.append("user.password", this.password)
      data.append("user.username", this.prenom)
      data.append("user.first_name", this.prenom)
      data.append("user.last_name", this.nom)
      data.append("user.email", this.email)
      data.append("user.groups", [this.role])
      data.append("phone_number", this.telephone)
      data.append("adress", this.adresse)
      data.append("document", this.document)
      data.append("CNI", this.cni)
      data.append("diplome", this.diplome)
      data.append("agency", this.agence)

      if(!this.item){
        axios.post(this.$store.state.url+"/personnel/", data, this.headers)
        .then((response) => {
          this.$store.state.users.push(response.data)
          this.$emit("close")
        }).catch((error) => {
          if(error.response.status == 403){
            this.refreshToken(this.createMember)
          } else {
            this.logs = JSON.stringify(error.response.data).slice(0, 60);
          }
        })
      }
    }
  }
};
</script>
<style scoped>
</style>

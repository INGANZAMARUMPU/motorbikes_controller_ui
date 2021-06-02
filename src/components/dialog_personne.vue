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
        <label for="cni">CNI:</label>
        <input v-model="cni" id="cni" type="text">
      </div>
      <div class="field">
        <label for="numero">Numero de telephone:</label>
        <input v-model="telephone" id="numero" type="text">
      </div>
      <div class="field">
        <label for="email">Email:</label>
        <input v-model="email" id="email" type="email">
      </div>
      <div class="field">
        <label for="password">Mot de pass:</label>
        <input v-model="password" id="password" type="text">
      </div>
      <div class="field">
        <label for="adresse">Adresse:</label>
        <input v-model="adresse" id="adresse" type="text">
      </div>
      <div class="field">
        <label for="agence">Agence:</label>
        <select v-model="agence" id="agence">
          <option>---</option>
          <option v-for="agence in agences" :value="agence.id">
            {{ agence.name }}
          </option>
        </select>
      </div>
      <div class="field">
        <label for="diplome">Diplome:</label>
        <input v-model="diplome" id="diplome" type="text">
      </div>
      <div class="field">
        <label for="role">Role:</label>
        <select v-model="role" id="role">
          <option>---</option>
          <option v-for="group in groups" :value="group.id">
            {{group.name}}
          </option>
        </select>
      </div>
      <div class="field">
        <label for="image">Document:</label>
        <input id="image" type="file" accept=".jpeg,.jpg,.png"
          @change="e => loadImage(e)">
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

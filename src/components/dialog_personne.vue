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
        <input v-model="mere" id="pere" type="text">
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
        <input v-model="date_naissance" id="date" type="date">
      </div>
      <div class="field">
        <label for="cni">Carte d'identité:</label>
        <input v-model="cni" id="cni" type="text">
      </div>
      <div class="field">
        <label for="etat_civil">Etat Civil:</label>
        <select v-model="etat_civil" style="width: 100%;">
          <option value="marie">Marié</option>
          <option value="celibataire">Celibataire</option>
          <option value="veuf">Veuf</option>
          <option value="divorce">Divorcé</option>
        </select>
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
          @change="e => loadImage(e, 1)">
      </div>
      <div class="field">
        <label for="image">Photo 2:</label>
        <input id="image" type="file" accept=".jpeg,.jpg,.png"
          @change="e => loadImage(e, 2)">
      </div>
      <div class="field">
        <label for="autres">Autres:</label>
        <textarea v-model="autres" id="autres"></textarea>
      </div>
      <label class="logs">
        {{ logs }}
      </label>
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
      nom:"", prenom:"", pere:"", mere:"", profession:"", province:"",
      commune:"", colline:"", date_naissance:"", cni:"", etat_civil:"",
      telephone:"", parking:"", residence:"", photo_1:null, photo_2:null,
      autres:"", logs:""
    }
  },
  watch:{
    item(new_val){
      if (!!new_val) {
        // this.nom = new_val.user.last_name
        // this.prenom = new_val.user.first_name
        // this.cni = new_val.CNI
        // this.telephone = new_val.phone_number
        // this.adresse = new_val.adress
        // this.agence = new_val.agency
        // this.diplome = new_val.diplome
        // this.role = new_val.user.groups[0]
        // this.email = new_val.user.email
      } else {
        // nom = ""; prenom = ""; cni = ""; telephone = "";
        // adresse = ""; agence = ""; diplome = ""; role = "";
        // password = ""; document = undefined; email = ""
      }
    }
  },
  methods:{
    loadImage(event, no){
      let file = event.target.files[0]
      if (file.size>300_000) {
        this.logs = "l'image ne peut pas depasser 300ko"
      } else {
        this.logs = ""
        if(no==1){
          this.photo_1 = file
        } else {
          this.photo_2 = file
        }
      }
    },
    createMember(){
      this.logs = ""
      if(!this.photo_1){
        this.logs = "la première photo est obligatoire"
        return;
      }
      let data = new FormData()
      data.append("nom", this.nom)
      data.append("prenom", this.prenom)
      data.append("pere", this.pere)
      data.append("mere", this.mere)
      data.append("profession", this.profession)
      data.append("province", this.province)
      data.append("commune", this.commune)
      data.append("colline", this.colline)
      data.append("date_naissance", this.date_naissance)
      data.append("cni", this.cni)
      data.append("etat_civil", this.etat_civil)
      data.append("telephone", this.telephone)
      data.append("parking", this.parking)
      data.append("residence", this.residence)
      data.append("photo_1", this.photo_1)
      data.append("photo_2", this.photo_2)
      data.append("autres", this.autres)

      if(!this.item){
        axios.post(this.$store.state.url+"/personne/", data, this.headers)
        .then((response) => {
          this.$store.state.users.push(response.data)
          this.$emit("close")
        }).catch((error) => {
          if(error.response.status == 403){
            this.refreshToken(this.createMember)
          } else {
            this.logs = JSON.stringify(error.response.data).slice(0, 120);
          }
        })
      }
    }
  }
};
</script>
<style scoped>
</style>

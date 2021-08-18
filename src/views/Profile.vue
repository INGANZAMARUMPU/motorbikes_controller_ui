<template>
	<div>
		<div class="container">
			<img :src="!!personne?personne.photo_1:''">
		</div>
		<div class="container">
			<img :src="!!personne?personne.photo_2:''">
		</div>
    <div class="table">
      <table class="infotable">
        <tbody v-if="!!personne">
          <tr v-for="[key, value] in Object.entries(personne)" v-if="!key.includes('photo_')">
						<td>
							<b>{{ key.replace("no_", "Numero de ").replace("_", " ") }}</b>
						</td>
						<td>{{ value }}</td>
          </tr>
        </tbody>
      </table>
		</div>
	</div>
</template>
<script>
export default {
  data(){
  	return {
  		personne:null,
  	}
  },
  methods:{
  	getCompte(id){
		axios.get(this.url+`/personne/${id}/`, this.headers)
		.then((response) => {
      this.personne = response.data
		}).catch((error) => {
      if(error.response.status == 403){
        this.refreshToken(this.performAction)
      } else {
        this.logs = JSON.stringify(error.response.data)
      }
		})
  	}
  },
  mounted(){
  	let id = this.$route.params.id;
  	this.personne = this.$store.state.personnes.find(x => x.id==id)
  	if(!this.personne){
  		this.getCompte(id)
  	}
  }
};
</script>
<style scoped>
.container {
	width: 80%;
	margin: 50px auto;
}
img{
	width: 100%;
}
</style>

<template>
  <div class="wrapper">
    <div class="content">
      <img src="/static/logo.png">
      <h1>Bienvenue</h1>
      <form @submit.prevent="login">
      <div class="field">
        <label for="username">Nom d'utilisateur:</label>
        <input id="username" v-model="username" type="text" value="">
      </div>
      <div class="field">
        <label for="password">Mot de passe:</label>
        <input id="password" v-model="password" type="password" value="">
      </div>
      <label class="logs">{{ cleanString(logs) }}</label>
      <button @click="login">Connexion</button>
      </form>
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return {
      username:"", password:"", logs:""
    }
  },
  methods:{
    login(){
      this.logs = ""
      axios.post(this.url+"/login/", 
        {"username": this.username, "password":this.password}
      ).then((response) => {
        this.$store.state.user = response.data
      }).catch((error) => {
        this.logs = error.response.data
      })
    }
  }
};
</script>

<style scoped>
:root {
  --blue: #008cba;
  --white: #ffffff;
  --grey: #cccccc;
}

template {
  height: 100%;
}
.wrapper {
    min-height: 100vh;
    margin: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background: linear-gradient(to top right, #ccc, #008cba);
  }
  .content {
    width: 350px;
    padding: 30px 40px;
    background: #ffffffaa;
  }
  label, input {
    display: block;
    width: 100%;
    margin-bottom: 15px;
  }
  h1{
    text-align: center;
    margin-bottom: 25px;
    font-weight: 500;
  }
  .field {
    margin-bottom: 20px;
    padding: 0;
  }
  button {
    display: block;
    width: 100%;
    outline: none;
    border: none;
    padding: 8px 18px;
    font-size: 18px;
    border-radius: 8px;
    margin: 25px 0px 0;
    background-color: #008cba;
    color: white;
  }
  input {
    height: 35px;
    padding: 0 8px;
    border-radius: 2px;
    font-size: 16px;
    outline: none;
    border: none;
  }
  img {
    display: block;
    width: 145px;
    margin: 0 auto 5px;
  }

  @media screen and (max-width:375px) {
    .content {
      width: 100%;
      height: 100%;
      padding-top: 26%;
    background: #ffffff66;
    }
  }
</style>
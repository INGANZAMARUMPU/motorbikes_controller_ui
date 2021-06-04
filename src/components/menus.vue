<template>
  <div class="wrapper nonprintable">
    <div class="content">
      <span class="open" @click="openNav">&#9776;</span>
      <div class="menu">
        <div class="close" @click="closeNav">&times;</div>
        <div class="content-item">
          <router-link to="/" v-slot="{ href, navigate, isActive, isExactActive }">
            <div class="menu-item" @click="closeNav">
              <a :href="href" :class="{ 'selected': isExactActive }" @click="navigate">Home</a>
            </div>
          </router-link>
        </div>
      </div>
      <div class="user-infos">
        <div class="username">{{ active_user.first_name+" "+active_user.last_name }}</div>
        <button @click="logout">
          <fa icon="sign-out-alt"/>
        </button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  
  methods:{
    logout(){
      this.$store.state.user = null;
    },

    openNav() {
      var nav = document.querySelector('.menu');

      nav.classList.add('menu-active');
    },

    closeNav(){
      var nav = document.querySelector('.menu');

      nav.classList.remove('menu-active');
    },
  }
};
</script>
<style scoped>
.wrapper {
  background: var(--white);
  height: 70px;
  position: sticky;
  top: 0;
  width: 100%;
}
.content {
  display: flex;
  padding: 20px 50px 0;
}
.open {
  cursor: pointer;
  font-size: 26px;
  display: none;
}
.close {
  margin-left: auto;
  margin-right: 20px;
  font-size: 28px;
  font-weight: 600;
  color: var(--white);
  display: none;
  cursor: pointer;
}
.content-item {
  display: inline-block;
}

.menu-item a {
  display: block;
  position: relative;
  padding: 3px 18px 8px;
  text-decoration: none;
  font-size: 18px;
  color: var(--primary);
  transition: .5s;
  font-weight: 500;
}
.menu-item a.selected::after, .menu-item a:hover::after {
  position: absolute;
  content: '';
  bottom: 0;
  left: 0;
  height: 2px;
  width: 50%;
  background: var(--primary);
  transform: translateX(50%);
}

.user-infos {
  margin-left: auto;
  display: flex;
  height: 100%;
  align-items: center;
}
.username {
  font-weight: 500;
  margin-right: 20px;
  font-size: 18px;
}
.user-infos button {
  border: none;
  outline: none;
  font-size: 22px;
  cursor: pointer;
}

@media screen and (max-width: 800px) {
  .open {
    display: block;
  }
  .close {
    display: block;
    width: 22px;
  }
  .content-item {
    display: block;
    padding: 12px 0;
  }
  .menu {
    position: absolute;
    left: 0;
    top: 0;
    background: var(--primary);
    width: 450px;
    height: 100vh;
    padding-left: 20px;
    transform: translateX(-100%);
    transition: transform .5s ease-in;
  }
  .menu-active {
    transform: translateX(0%);
  }
  .menu-item a {
    position: unset;
    color: #ccc;
  }
  .menu-item a.selected, .menu-item a:hover {
    color: #fff;
  }
  .menu-item a.selected {
    font-size: 18px;
    font-weight: 800;
  }
  .menu-item a::after {
    display: none;
  }
}

@media screen and (max-width: 600px) {
  .content {
    padding: 20px 30px 0;
  }
  .username {
    display: none;
  }
  .menu {
    width: 300px;
  }
}
</style>

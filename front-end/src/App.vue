<template>
  <div id="app">
    <div class="header" id="home" v-if="this.$router.currentRoute.name == 'Home'">
      <div class="logo-container">
        <div class="logo-bar">
          <router-link to="/">
            <div class="logo">
              <img id="Mountain" src="/The_Mountain.png">
            </div>
          </router-link>
        </div>
      </div>
      <div class="title">
        <h1>The Mountain</h1>
      </div>
      <div id="nav">
        <router-link to="/">Home</router-link> |
        <router-link to="/user">User</router-link> |
        <router-link to="/login">Login</router-link> |
        <router-link to="/catagories">Catagories</router-link> |
        <router-link to="/post">Post</router-link>
      </div>
    </div>
    <div class="header" id="small" v-if="this.$router.currentRoute.name !== 'Home'">
      <div id="nav">
        <router-link to="/">Home</router-link> |
        <router-link to="/user">User</router-link> |
        <router-link to="/login">Login</router-link> |
        <router-link to="/catagories">Catagories</router-link> |
        <router-link to="/post">Post</router-link>
      </div>
      <router-link to="/">
        <div class="logo">
          <img id="Mountain" src="/The_Mountain.png">
        </div>
      </router-link>
      <div class="title">
        <h1>The Mountain</h1>
      </div>

    </div>
    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding-top: 10px;
  padding-bottom: 20px
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.header {
  display: flex;
  justify-content: center;
  align-items: center;
}

#home {
  flex-direction: column;
  margin-top: 30px;
}

#small {
  flex-direction: column;
  height: 100%;
  border-radius: 100px;
}

.logo-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 60px;
}

.logo-bar {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  width: 100%;
  background-color: gray;
  border-radius: 100px;
}

.logo {
  width: 100%;
}

#Mountain {
  width: 200px;
}

.title h1 {
  font-size: 2.25em;
  padding: 0px;
  padding-top:20px;
  margin: 0px;
}

/* Desktop Styles */
@media only screen and (min-width: 961px) {
  .header {
    margin: 30px;
    padding: 40px;
  }

  #nav {
    padding: 0px;
  }

  .logo {
    width: 400px;
  }

  #small h1 {
    font-size: 3em;
    padding-top:0px;
  }

  .logo-container {
    padding: 90px;
    margin: 20px;
  }

  .logo-bar {
    height: 75px;
    width: 100%;
  }

  #Mountain {
    width: 80%;
  }

  #home {
    margin-top: 5px;
  }

  #small {
    margin-top: 100px;
    margin-bottom: 100px;
    flex-direction: row;
    height: 100px;
    background-color: gray;
    border-radius: 100px;
  }
}

</style>

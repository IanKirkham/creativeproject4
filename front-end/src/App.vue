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
      <br/>
    </div>
    <div class="header" id="small" v-if="this.$router.currentRoute.name !== 'Home'">
      <div id="nav">
        <router-link to="/">Home</router-link> |
        <router-link to="/user">User</router-link> |
        <router-link to="/login">Login</router-link> |
        <router-link to="/catagories">Categories</router-link> |
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
      <br/>
      <hr/>
    </div>
    <router-view/>
    <div class="footer-container">
      <div class="footer">
        <a href="https://github.com/IanKirkham/creativeproject4">Visit our Github Page!</a>
        <p>Ian Kirkham and Zach Payne</p>
        <p><em>Get thee into the Mountain</em></p>
      </div>
    </div>
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

hr {
  width: 80%;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: #fefefe;
}

#nav {
  padding-top: 10px;
  padding-bottom: 20px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
  text-decoration: none;
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
  background-image: url("/Blu2.png"), radial-gradient(rgba(255,255,255,.5) 0%,rgba(255,255,255,0) 70%);
  background-blend-mode: overlay;
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

.footer-container {
  background-image: url("/Blu2.png");
  background-blend-mode: overlay;
  background-size:cover;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  bottom: 0px;
  margin-bottom: 0px;
  margin-top: auto;
  overflow: hidden;
}

.footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: rgba(255,255,255,.5);
  border-radius: 50px;
  height: 75px;
  width: 250px;
}

/* Desktop Styles */
@media only screen and (min-width: 961px) {
  hr {
    width: 0%;
  }

  .header {
    margin: 30px;
    padding: 40px;
  }

  #home {
    margin-top: 5px;
  }

  #small {
    margin-top: 130px;
    margin-bottom: 130px;
    flex-direction: row;
    justify-content: space-around;
    height: 100px;
    background-image: url("/Blu2.png"), radial-gradient(rgba(255,255,255,.6) 0%,rgba(255,255,255,0) 90%);
    background-blend-mode: overlay;
    padding-right: 0px;
    border-radius: 100px;
  }

  #small h1 {
    font-size: 3em;
    padding-top:0px;
    text-shadow: 0 0 16px #b19cd9;
  }

  #nav {
    padding: 0px;
  }

  #home #nav a {
    font-size: 1.5em;
  }

  #small #nav a {
    font-size: 1.5em;
    text-shadow: 0 0 6px #b19cd9;
  }

  #small #nav a.router-link-exact-active {
    text-shadow: 0 0 5px #000000;
  }

  .logo {
    width: 400px;
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

}

</style>

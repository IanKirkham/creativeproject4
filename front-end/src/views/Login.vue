<template>
  <div class="login">
    <div class="login-container">
      <router-link to="/" class="close-btn"><i class="fas fa-times"></i></router-link>
      <div class="close-text">Home</div>
      <div class="main-icon">
        <img src="/The_Mountain.png">
      </div>
      <div class="info">
        <h1>Member Login</h1>
        <div v-if="error">
          <p id="error">{{error}}</p>
        </div>
        <form name="login" class="form">
          <div class="input-icons"> 
            <i class="fa fa-user icon"></i> 
            <input v-model="username" class="input-field" type="text" placeholder="Username"> 
          </div>  
          <div class="input-icons"> 
            <i class="fa fa-key icon"></i> 
            <input v-model="password" class="input-field" type="password" placeholder="Password"> 
          </div>
        </form>
        <p>Forgot <a class="forgot" href="#">Username / Password?</a></p>
        <div class="buttons">
          <button id="register-btn" @click="registerUser()">Register</button>
          <button id="login-btn" @click="loginUser()">Log In</button>
        </div>
        <h5>New user? Click 'Register'</h5>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Login",
  data() {
    return {
      username: "",
      password: "",
      error: "",
    };
  },
  methods: {
    async loginUser() {
      try {
        await axios.post("/api/login", {
          username: this.username,
          password: this.password,
        });
        this.$router.push('/');
      } catch (error) {
        this.error = error.response.data.message;
      }
    },
    async registerUser() {
      this.error = '';
      try {
        await axios.post("/api/register", {
          username: this.username,
          password: this.password,
        });
        this.$router.push('/');
      } catch (error) {
        this.error = error.response.data.message;
      }
    }
  },
};
</script>

<style scoped>

.login {
  background-image: url("/Blu.png");
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-container {
  height: 70%;
  background-color: #FFF;
  width: 80%;
  border-radius: 1em;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: 3px 6px 5px rgba(0, 0, 0, 0.5);
  position: relative;
}

.close-btn {
  position: absolute;
  top: 3%;
  right: 3%;
  background-color: transparent;
  color: #f54242;
  border: none;
  font-size: 3em;
  cursor: pointer;
}

.close-text {
  color: #c73636;
  font-weight: bold;
  font-size: 1.3em;
  position: absolute;
  top: 10%;
  right: 1.7%;
  opacity: 0;
}

.close-btn:hover{
  color: #c73636;
}

.close-btn:hover + .close-text {
  opacity: 1;
}

.close-btn:active + .close-text {
  color: #912a2a;
}
.close-btn:focus {
  outline: none;
}

.main-icon {
  width: 10em;
  height: auto;
}

.main-icon img {
  width: 100%;
  height: auto;
}

.form {
  max-width:450px;
}

.info {
  display: flex;
  flex-direction: column;
  margin: 2em;
}
  
.input-icons { 
    width: 100%; 
    margin-bottom: 10px; 
}

.input-icons i { 
    position: absolute; 
} 
  
.icon { 
    padding: 10px; 
    color: #32143A; 
    min-width: 50px; 
    text-align: center; 
} 
  
.input-field { 
    width: 100%; 
    padding: 10px; 
    padding-left: 40px;
    background-color: #E6E6E6;
    border-style: none;
    border-radius: 2em;
}

.input-field:focus {
  outline: none;
}

p {
  font-size: 0.8em;
  margin: 0.5em;
}

.forgot {
  text-decoration: none;
  font-weight: bold;
  color: #2C3E50;
}

.forgot:hover {
  color: #aaaaaa;
}

.buttons {
  display: flex;
  justify-content: center;
  margin-bottom: 0.3em;
}

#error {
  background-color: #c73636;
  color: #FFF;
  border-style: none;
  border-radius: 0.3em;
  padding: 0.7em;
  margin: 0.5em;
}

#register-btn {
  background-color: #587fff;
  color: #FFF;
  height: 2.5em;
  width: 6em;
  font-size: 1em;
  border-style: none;
  border-radius: 0.5em;
  margin: 0.5em;
}

#register-btn:hover {
  background-color: #FFF;
  color: #587fff;
  border: 2px solid #587fff;
  cursor: pointer;
}

#register-btn:focus {
  outline: none;
}

#register-btn:active {
  outline: none;
  background-color: #E6E6E6;
}

#login-btn {
  background-color: #827AF7;
  color: #FFF;
  height: 2.5em;
  width: 6em;
  font-size: 1em;
  border-style: none;
  border-radius: 0.5em;
  margin: 0.5em;
}

#login-btn:hover {
  background-color: #FFF;
  color: #827AF7;
  border: 2px solid #827AF7;
  cursor: pointer;
}

#login-btn:focus {
  outline: none;
}

#login-btn:active {
  outline: none;
  background-color: #E6E6E6;
}

/* Tablet */
@media only screen and (min-width: 768px) and (max-width: 1023px) {
  .main-icon {
    width: 20em;
  }
}

/* Desktop */
@media only screen and (min-width: 1024px) {
  .login-container {
    flex-direction: row;
    height: 65%;
    width: 50%;
  }

  h1 {
    margin-bottom: 1em;
  } 

  p {
    margin-top: 0em;
  }

  .main-icon {
    width: 25em;
    margin: 3em;
  }

  .info {
    display: flex;
    flex-direction: column;
    margin: 3em;
  }
}

</style>

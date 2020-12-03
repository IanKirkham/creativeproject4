<template>
  <div class="user">
    <div class="img-container">
      <img :src="user.avatar">
      <h2>{{user.username}}</h2>
    </div>
    <div class="posts">
      <div class="tab">
        <button class="sectn tab1">Favorite Posts</button>
        <button class="sectn tab2">Another Section</button>
      </div>
      <div class="post-list">
        <p>Put favorited posts here?</p>
        <p>and here</p>
        <p>and so forth</p>
        <p>Note: this is a really rough mockup, the design will change once we have Post objects and what not</p>
        <p>Also, might not hurt to add more data to User objects, like name and stuff, just so we have more stuff to put here</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "User",
  data() {
    return {
      error: "",
      user: null,
    };
  },
  computed: {
    isError() {
      return this.error == undefined;
    },
  },
  created() {
    this.getUser();
  },
  methods: {
    async getUser() {
      try {
        let response = await axios.get("/api/user/" + this.$root.$data.user);
        this.user = response.data.user;
      } catch (error) {
        this.error = error.response.data.message;
      }
    },
  },
};
</script>

<style scoped>

.user {
  background-color: rgb(140, 138, 255);
  height: 80vh;
  display: flex;
  justify-content: space-around;
}

.img-container {
  display: flex;
  flex-direction: column;
  margin-bottom: 5em;
  margin-top: 1em;
}

.img-container img {
  background-color: rgb(255, 255, 255);
  border: 7px double rgb(169, 78, 243);
  padding: 2em;
  border-radius: 5em;
}

.posts {
  height: 60%;
  width: 80%;
}

.tab {
  display: flex;
}

.sectn {
  background-color: rgb(187, 187, 187);
  width: 15%;
  margin-top: 2em;
  font-size: 1.5em;
  border-style: none;
  border-radius: 0.8em 0.8em 0 0;
}

.tab1:focus, .tab2:focus {
  background-color: white;
  outline: none;
}

.post-list {
  background-color: white;
  border-radius: 0 0 0.8em 0.8em;
  box-shadow: 3px 6px 5px rgba(0, 0, 0, 0.5);
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 5em;
}

.post-list p {
  margin: 2em;
}

</style>
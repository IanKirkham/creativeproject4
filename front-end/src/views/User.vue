<template>
  <div class="user">
    <div class="content">
      <div class="info-container">
        <div class="img-container">
          <img v-if="user" :src="user.avatar">
        </div>
        <div v-if="user" class="info">
          <h2>{{user.username}}</h2>
          <p>Member since: {{user.date_joined}}</p>
          <p>My Posts: {{numberOfPosts}}</p>
          <p>My Favorite Posts: {{numberOfFavorites}}</p>
        </div>
      </div>
      <div class="divider"></div>
      <div class="posts">
        <div class="tab">
          <button id="fav-btn" @click="showFavorites()" v-bind:class="{active: isFavActive, sectn: true, tab1: true}">Favorite Posts</button>
          <button id="post-btn" @click="showPosts()" v-bind:class="{active: isPostActive, sectn: true, tab1: true}">My Posts</button>
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
      isFavActive: true,
      isPostActive: false,
    };
  },
  computed: {
    isError() {
      return this.error == undefined;
    },
    numberOfPosts() {
      return this.user.posts.length;
    },
    numberOfFavorites() {
      return this.user.favorites.length;
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
    async showFavorites() {
      if (this.isFavActive) {
        return;
      }
      this.isFavActive = true;
      this.isPostActive = false;
    },
    async showPosts() {
      if (this.isPostActive) {
        return;
      }
      this.isFavActive = false;
      this.isPostActive = true;
    },
  },
};
</script>

<style scoped>

.user {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10em;
}

.content {
  background-color: rgb(140, 138, 255);
  border-radius: 1em;
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 90%;
}

.info-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 20%;
}

.img-container {
  display: flex;
  width: 11em;
  height: auto;
  flex-direction: column;
  margin-bottom: 1em;
}

.img-container img {
  background-color: rgb(255, 255, 255);
  border: 5px solid rgb(169, 78, 243);
  padding: 2em;
  border-radius: 5em;
}

.info {
  background-color: white;
  width: 100%;
  border-radius: 0.2em;
}

.divider {
     border-left:1px solid #666666;  
     height:30em;
}

.posts {
  height: 60%;
  width: 70%;
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
  border-radius: 0.2em 0.2em 0 0;
}

.sectn:active {
  outline: none;
}

.sectn:hover {
  cursor: pointer;
}

.active {
  background-color: white;
  outline: none;
  cursor: default !important;
}

.post-list {
  background-color: white;
  border-radius: 0 0.2em 0.2em 0.2em;
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
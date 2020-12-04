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
        <button id="delete-btn" @click="removeAccount()">Delete Account</button>
      </div>
      <div class="divider"></div>
      <div class="posts">
        <div class="tab">
          <button id="fav-btn" @click="showFavorites()" v-bind:class="{active: isFavActive, sectn: true, tab1: true}">Favorite Posts</button>
          <button id="post-btn" @click="showPosts()" v-bind:class="{active: isPostActive, sectn: true, tab1: true}">My Posts</button>
        </div>
        <div v-if="postsExist">
          <div class="posts" v-for="post in post_list" :key="post._id">
            <br/>
            <router-link :to="{ name: 'Post', params: { id: post._id }}">
              <h2>{{post.title}}</h2>
            </router-link>
            <h4>{{post.author}} - {{post.date_posted}}</h4>
            <br/>
            <hr/>
          </div>
        </div>
        <div v-else class="empty">
          <p> No posts to show. - TO BE COMPLETED LATER </p>
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
      isFavActive: false,
      isPostActive: false,
      post_list: [],
    };
  },
  computed: {
    postsExist() {
      return this.post_list.length > 0;
    },
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
    this.showFavorites();
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
    async removeAccount() {
      try {
        await axios.delete("/api/user/" + this.$root.$data.user);
        this.$root.$data.user = null;
        this.$router.push('/');
      } catch (error) {
        console.log(error);
      }
    }
  },
};
</script>

<style scoped>

.user {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 7em;
}

.content {
  background-color: rgb(140, 138, 255);
  border-radius: 1em;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: 90%;
}

.info-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 80%;
}

.img-container {
  display: flex;
  width: 11em;
  height: auto;
  flex-direction: column;
  margin-bottom: 1em;
  margin-top: 2em;
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
  margin-bottom: 2em;
}

.info h2 {
  margin: 0.2em;
}

.info p {
  margin: 0.1em;
}

.divider {
  border-bottom: 1px solid #666666;
  width: 18em;
}

.posts {
  height: 60%;
  width: 90%;
}

.tab {
  display: flex;
}

.sectn {
  background-color: rgb(187, 187, 187);
  width: 35%;
  margin-top: 2em;
  font-size: 1em;
  border-style: none;
  border-radius: 0.2em 0.2em 0 0;
  padding: 0.3em;
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

.empty {
  background-color: white;
  border-radius: 0 0.2em 0.2em 0.2em;
  box-shadow: 3px 6px 5px rgba(0, 0, 0, 0.5);
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 2em;
  height: 20em;
}

#delete-btn {
  background-color: #c73636;
  color: #FFF;
  border-style: none;
  border-radius: 0.3em;
  padding: 0.7em;
  margin: 0.5em;
  margin-top: 2em;
}

#delete-btn:hover {
  background-color: transparent;
  border: 1px solid #c73636;
  color: #c73636;;
  cursor: pointer;
}

#delete-btn:active {
  outline: none;
}

#delete-btn:focus {
  outline: none;
}

/* Tablet */
@media only screen and (min-width: 768px) and (max-width: 1023px) {
  .info-container {
    width: 80%;
    flex-direction: row;
    justify-content: space-around;
  }

  .info {
    width: 50%;
    margin-bottom: 0em;
  }

  .divider {
     width: 25em;
  }
}

/* Desktop */
@media only screen and (min-width: 1024px) {
  .user {
    margin-bottom: 10em;
  }

  .content {
    flex-direction: row;
  }

  .info-container {
    width: 20%;
  }

  .img-container {
    margin-top: 0;
  }

  .info {
    margin-bottom: 0;
  }

  .divider {
     border-left:1px solid #666666;
     height: 20em;
     border-bottom: 0;
     width: 0;
  }

  .sectn {
    font-size: 1.5em;
    width: 20%;
  }

  .posts {
    width: 70%;
  }

  .post-list {
      margin-bottom: 5em;
  }
}

</style>

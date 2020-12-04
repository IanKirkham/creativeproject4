<template>
  <div v-if="post" class="post">
    <div v-if="isError" class="error">{{error}}</div>
    <div class="post-container">
      <div class="main-post">
        <div v-if="user" class="post-info">
          <img :src="user.avatar">
          <p>Author: {{post.author}}</p>
          <p>Date Posted: {{post.date_posted}}</p>
          <div class="like-fav">
            <button id="like-btn-on" @click="toggleLike()" v-if="isLiked"><i class="fas fa-thumbs-up"></i></button>
            <button id="like-btn-off" @click="toggleLike()" v-else><i class="far fa-thumbs-up"></i></button>
            <p>{{post.likes}}</p>
            <button id="fav-btn-on" @click="toggleFav()" v-if="isFavorited"><i class="fas fa-heart"></i></button>
            <button id="fav-btn-off" @click="toggleFav()" v-else><i class="far fa-heart"></i></button>
          </div>
        </div>
        <div class="divider"></div>
        <div class="post-content">
          <h2>{{post.title}}</h2>
          <p>{{post.content}}</p>
        </div>
      </div>
      <div class="replies" v-for="reply in post.replies" :key="reply.id">
        <div class="reply-container">
          <hr>
          <p>{{reply.content}}</p>
          <p><em>--{{reply.author}}</em></p>
        </div>
      </div>
    </div>
    <div class="post-reply">
      <h3>Reply <i class="fas fa-reply"></i></h3>
      <form v-on:submit.prevent="addReply()">
        <input v-model="addedName" placeholder="Name">
        <textarea v-model="addedComment" placeholder="Reply here"></textarea>
        <br />
        <button id="comment-btn" type="submit">Reply</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Post",
  data() {
    return {
      post: null,
      user: null,
      liked: false,
      addedName: "",
      addedComment: "",
      error: "",
    };
  },
  computed: {
    isError() {
      return this.error != "";
    },
    isFavorited() {
      return this.post.favorite;
    },
    isLiked() {
      return this.liked;
    },
  },
  created() {
    this.getPost(this.$route.params.id);
  },
  methods: {
    async getUser() {
      try {
        let response = await axios.get("/api/user/" + this.post.author);
        this.user = response.data.user;
      } catch (error) {
        console.log(error);
      }
    },
    async getPost(id) {
      try {
        let post = await axios.get("api/post/" + id);
        this.post = post.data;
        this.getUser();
      } catch (error) {
        console.log(error);
      }
    },
    // async toggleFav() {
    //   try {
    //
    //     if (this.$root.$data.user == undefined) {
    //       this.error = "Please log in to Like and Favorite posts";
    //       return;
    //     }
    //     this.error = "";
    //
    //     let response = "";
    //     if (this.post.favorite) {
    //       response = await axios.put("api/favorite/delete", {
    //         username: this.$root.$data.user,
    //         post: this.post._id,
    //       });
    //     } else {
    //       response = await axios.put("/api/favorite", {
    //         username: this.$root.$data.user,
    //         post: this.post._id,
    //       });
    //     }
    //     this.post = response.data;
    //   } catch (error) {
    //     console.log(error);
    //   }
    // },
    async toggleFav() {
      if (this.$root.$data.user == undefined) {
        this.error = "Please log in to Like and Favorite posts";
        return;
      }
      this.error = "";

      this.post.favorite = !this.post.favorite;
    },
    async toggleLike() {

      if (this.$root.$data.user == undefined) {
        this.error = "Please log in to Like and Favorite posts";
        return;
      }
      this.error = "";

      if(this.liked) {
        this.post.likes -= 1;
      } else {
        this.post.likes += 1;
      }
      this.liked = !this.liked;
    },
    async addReply() {
      try {
        let response = await axios.put("/api/reply/" + this.post._id, {
            content: this.addedComment,
            author: this.addedName,
        });
        this.post = response.data;
        this.addedComment = "";
        this.addedName = "";
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style scoped>

.post {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}

img {
  width: 5em;
  border: 1px solid purple;
  border-radius: 3em;
}

.post-container {
  background-color: rgb(255, 255, 255);
  border-radius: 0.8em;
  border-top: 2px inset  rgba(98, 50, 187, 0.1);
  border-left: 2px inset rgba(98, 50, 187, 0.1);
  box-shadow: 5px 6px 5px rgba(98, 50, 187, 0.5);
  width: 70%;
  display: flex;
  flex-direction: column;
}

.main-post {
  display: flex;
  align-items: center;
}

.post-info {
  margin: 1em;
}

.like-fav {
  display: flex;
  justify-content: center;
  align-items: center;
}

.like-fav p {
  font-size: 1.5em;
  margin-left: 0.1em;
  margin-right: 1em;
}

.divider {
  border-right: 1px solid #666666;
  height: 5em;
  margin: 1em;
}

.post-content {
  text-align: left;
}

.post-content h2 {
  margin-bottom: 0.5em;
}

#like-btn-on {
  font-size: 2em;
  border-style: none;
  text-decoration: none;
  border: none;
  outline: none;
  color: rgb(80, 120, 253);
  background-color: transparent;
}

#like-btn-on {
  cursor: pointer;
}

#like-btn-off {
  font-size: 2em;
  border-style: none;
  text-decoration: none;
  border: none;
  outline: none;
  color: rgb(131, 131, 131);
  background-color: transparent;
}

#like-btn-off:hover {
  color: rgb(80, 120, 253);
  cursor: pointer;
}

#fav-btn-on {
  font-size: 2em;
  border-style: none;
  text-decoration: none;
  border: none;
  outline: none;
  color: rgb(255, 67, 99);
  background-color: transparent;
}

#fav-btn-on {
  cursor: pointer;
}

#fav-btn-off {
  font-size: 2em;
  border-style: none;
  text-decoration: none;
  border: none;
  outline: none;
  color: rgb(131, 131, 131);
  background-color: transparent;
}

#fav-btn-off:hover {
  color: rgb(255, 67, 99);
  cursor: pointer;
}

.reply-container {
  height: 5em;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.reply-container p {
  margin: 0.3em;
}

hr {
  width: 80%;
}

.post-reply {
  display: flex;
  flex-direction: column;
  text-align: left;
  margin-top: 3em;
  margin-bottom: 8em;
  background-color: rgb(255, 255, 255);
  border-radius: 0.8em;
  border-top: 2px inset  rgba(98, 50, 187, 0.1);
  border-left: 2px inset rgba(98, 50, 187, 0.1);
  box-shadow: 5px 6px 5px rgba(98, 50, 187, 0.5);
  width: 70%;
}

.post-reply h3 {
  margin: 1em;
}

form {
  display: flex;
  flex-direction: column;
  width: 20%;
  margin-left: 1em;
  margin-bottom: 1em;
}

input {
  margin-bottom: 0.5em;
  width: 80%;
}

textarea {
  width: 150%;
  height: 5em;
}

#comment-btn {
  width: 50%;
  height: 2em;
  background-color: rgb(130, 84, 216);
  color: white;
  border-style: none;
  border-radius: 0.5em;
  box-shadow: 2px 2px 2px rgba(98, 50, 187, 0.5);
}

#comment-btn:hover {
  background-color: transparent;
  border: 1px solid rgb(130, 84, 216);
  color: rgb(130, 84, 216);
  cursor: pointer;
}

#comment-btn:active {
  outline: none;
}

#comment-btn:focus {
  outline: none;
}

.error {
  background-color: #c73636;
  color: #FFF;
  border-style: none;
  border-radius: 0.3em;
  padding: 0.7em;
  margin: 0.5em;
}

</style>

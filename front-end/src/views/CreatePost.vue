<template>
  <div class="page">
    <div v-if="isError" class="error">{{error}}</div>
    <div class="post-container">
        <div class="post-content">
          <h1>Create Post</h1>
          <form v-on:submit.prevent="createPost()" name="new_post" class="form">
            <div class="title-container">
              <input v-model="title" class="title-field" type="text" placeholder="Post Title">
            </div>
            <br/>
            <div class="body-container">
              <textarea v-model="body" class="body-field" type="text" placeholder="Type up your post's body here..."></textarea>
            </div>
            <br/>
            <button id="submit" type="submit">Submit Post</button>
          </form>
          <div class="buffer"/>
        </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Create",
  data() {
    return {
      title: "",
      body: "",
      user: null,
      category: "",
      error: "",
    };
  },
  computed: {
    isError() {
      return this.error != "";
    },
  },
  created() {
    this.getUser();
    this.getCategory();
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
    async createPost() {
      this.error = '';
      try {

        if (this.$root.$data.user == undefined) {
          this.error = "Please log in to create posts";
          return;
        }
        this.error = "";

        console.log(this.$route.params.category);
        let response = await axios.post("/api/create", {
          title: this.title,
          content: this.body,
          author: this.user.username,
          category: this.category,
        });
        this.$router.push('/' + response.data.post._id);
      } catch (error) {
        this.error = error.response.data.message;
      }
    },
    getCategory() {
      this.category = this.$route.params.category;
      console.log(this.category);
    }
  },
};
</script>

<style scoped>
  .error {
    background-color: #c73636;
    color: #FFF;
    border-style: none;
    border-radius: 0.3em;
    padding: 0.7em;
    margin: 0.5em;
  }

  .title-container input {
    padding: 5px;
    width: 200px;
  }

  .body-container textarea {
    padding:7px;
    width: 500px;
    height: 150px;
    word-wrap: normal;
    font-family: Helvetica;
  }

  .buffer {
    margin-bottom: 100px;
  }

  button, h3 {
    background-color: rgba(145, 92, 182);
    padding: 10px;
    background: none;
    font-size: 1.3em;
    border-radius: 30px;
    border: solid;
    border-color: rgba(145, 92, 182);
  }

  button:hover, h3:hover {
    color: rgba(0, 0, 0, 1);
    box-shadow: 0 0 15px rgba(145, 92, 182, .4);
  }

  hr {
    width: 60%;
  }

  a {
    text-decoration: none;
  }

  .buttons {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 40%;
  }

  .buttons hr {
    width: 7%;
  }
</style>

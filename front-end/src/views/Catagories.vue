<template>
  <div class="categories">
    <h1>{{displayCategory}}</h1>
    <br/>
    <div class="buttons">
      <button id="religion-btn" @click="getPosts('religion')">Religion</button>
      <hr/>
      <button id="life-btn" @click="getPosts('life')">Life</button>
      <hr/>
      <button id="cooking-btn" @click="getPosts('cooking')">Cooking</button>
      <hr/>
      <button id="dummy-btn" @click="createPost()">Dummy</button>
    </div>
    <br/>
    <hr/>
    <br/>
    <router-link :to="{ name: 'Create', params: { category: this.currentCategory }}">
     <h3>Create Post</h3>
    </router-link>
    <br/>
    <hr/>
    <br/>
    <Category :posts="posts" />
  </div>
</template>

<script>
import axios from "axios";
import Category from "../components/Category.vue";

export default {
  name: 'Categories',
  components: {
    Category
  },
  data() {
    return {
      displayCategory: "Choose a Category",
      currentCategory: null

    }
  },
  computed: {
    posts() {
      return this.$root.$data.posts;
    }
  },
  methods: {
    async getPosts(argT) {
      try {
        let response = await axios.get("/api/posts/"+argT)
        this.$root.$data.posts = response.data;
        this.currentCategory = argT;
        this.displayCategory = argT.toUpperCase();
        return true;
      } catch (error) {
        this.error = error.response.data.message;
      }
    },
    async createPost() {
      this.error = '';
      try {
        await axios.post("/api/create", {
          title: "Dummy Title",
          content: "This is my dummy content",
          author: "Zach",
          author_id: "1",
        });
      } catch (error) {
        this.error = error.response.data.message;
      }
    },
  },
}
</script>

<style scoped>

button, h3 {
  padding: 10px;
  border: none;
  background: none;
  font-size: 1.5em;
  border-radius: 30px;
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

.categories {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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

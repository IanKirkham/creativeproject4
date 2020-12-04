<template>
  <div class="categories">
    <h1>This is our categories page</h1>
    <br/>
    <div class="buttons">
      <button id="religion-btn" @click="getPosts('religion')">Religion</button>
      <button id="life-btn" @click="getPosts('life')">Life</button>
      <button id="cooking-btn" @click="getPosts('cooking')">Cooking</button>
    </div>
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
        return true;
      } catch (error) {
        this.error = error.response.data.message;
      }
    },
  },
}
</script>

<style scoped>
hr {
  width: 60%;
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
  width: 15%;
}



</style>

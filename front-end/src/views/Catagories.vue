<template>
  <div class="catagories">
    <h1>This is our categories page</h1>
    <br/>
    <div class="buttons">
      <button id="religion-btn" @click="getPosts("religion")">Religion</button>
      <button id="life-btn" @click="getPosts("life")">Life</button>
      <button id="cooking-btn" @click="getPosts("cooking")">Cooking</button>
    </div>

    <Category :data=""

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

  },
  methods: {
    getPosts(category) {

    },
  },
}
</script>

<style scoped>
</style>

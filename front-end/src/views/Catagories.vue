<template>
  <div class="catagories">
    <h1>This is our categories page</h1>
    <br/>

    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/login">Login</router-link> |
      <router-link to="/catagories">Categories</router-link> |
      <router-link to="/post">Post</router-link>
    </div>

    <div id="toReplace">
        <div :is="currentComponent"></div>
        <div v-show="!currentComponent" v-for="component in componentsArray">
          <button @click="swapComponent(component)">{{component}}</button>
        </div>
    </div>

  </div>
</template>

<script>
import Category from "../components/Category.vue"
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
      return this.$root.$data.posts; // FIXME get from posts with category name in Mongo
    }
  },
}
</script>

<style scoped>
</style>

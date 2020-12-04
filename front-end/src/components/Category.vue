<template>
  <div class="page">
    <div class="category">
      <div class="post" v-for="post in posts" :key="post._id">
        <br/>
         <router-link :to="'/post/' + post._id">
          <h2>{{post.title}}</h2>
        </router-link>
        <h4>{{post.author}} - {{post.date_posted}}</h4>
        <br/>
        <hr/>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PostList',
  props: {
    posts: Array
  },
  components: {

  },
  data() {
    return {
    };
  },
  methods: {
  }
}
</script>

<style scoped>

hr {
  width: 100%;
}

a {
  text-decoration: none;
}

.post {
  display: flex;
  flex-direction: column;
  width: 200%;
  justify-content: center;
  align-items: center;
  height: 100%;
}
.category {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100%;
}

.page {
  margin-bottom: 100px;
}


</style>

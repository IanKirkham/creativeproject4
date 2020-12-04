<template>
  <div class="page">
    <div class="category">
      <div class="post" v-for="post in posts" :key="post.id">
        <hr/>
        <br/>
        <h2>{{post.title}}</h2>
        <h4>{{post.author}}, {{post.date_posted}}</h4>
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
      likeChecked: false,
    };
  },
  methods: {
    async getPosts() {
      try {
        let response = await axios.get("/api/posts/")
        this.posts = response.data;
        return true;
      } catch (error) {
        this.error = error.response.data.message;
      }
    },
    like(post) {
      post.likes += 1;
      // FIXME TIE TO MEME
    },
    favorite(post) {
      this.$root.$data.favorites.push(post);
      // FIXME TIE TO USER
    }
  }
}
</script>

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
    };
  },
  methods: {
  }
}
</script>

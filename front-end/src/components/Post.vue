<template>
  <div class="post">
    <h1>This should be the post title</h1>


    <div class="comment" v-for="comment in comments" :key="post.id">
      <hr/>
      <br/>
      <h2>{{post.title}}</h2>
      <h4>{{post.author}}, {{post.date_posted}}</h4>
    </div>


  </div>
</template>

<script>
</script>

<style scoped>
</style>

<template>
  <div class="page">
    <div class="home">
      <div class="welcome">
        <h1>Welcome to the Mountain</h1>
        <h2>All who seek to find and share knowledge are welcome here</h2>
      </div>
    </div>
  </div>
</template>

<script>
</script>

<style scoped>
.page {
  display: flex;
  justify-content: center;
  align-items: center;
}

.home {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 60%;
  margin-bottom: 30px;
  padding: 30px;
  background-color: gray;
  border-radius: 70px;
}

.welcome {
  background-color: rgba(250, 250, 250, 0.5);
  border-radius: 20px;
  padding: 10px;

}
</style>

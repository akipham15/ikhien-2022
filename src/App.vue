<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-10">
        <router-link class="text-decoration-none text-secondary" to="/"
          >Giải chính</router-link
        >
        <router-link
          class="text-decoration-none text-secondary ms-3"
          to="/after-vote"
          >Giải phụ</router-link
        >
        <router-link
          class="text-decoration-none text-secondary ms-3"
          to="/history"
          >Lịch sử</router-link
        >
      </div>
    </div>
  </div>
  <router-view />
</template>

<style>
</style>

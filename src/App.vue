<template>
  <div class="container">
    <div class="row justify-content-center mb-5">
      <div class="col-md-10">
        <router-link class="text-decoration-none text-secondary" to="/home-a"
          >Điểm Bảng A</router-link
        >
        <router-link
          class="text-decoration-none text-secondary ms-3"
          to="/home-b"
          >Điểm Bảng B</router-link
        >
        <router-link
          class="text-decoration-none text-secondary ms-3"
          to="/vote-a"
          >Vote Bảng A</router-link
        >
        <router-link
          class="text-decoration-none text-secondary ms-3"
          to="/vote-b"
          >Vote Bảng B</router-link
        >
        <router-link class="text-decoration-none text-secondary ms-3" to="/"
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

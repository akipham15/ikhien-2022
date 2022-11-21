<template>
  <router-view />
  <div class="menu">
    <div class="bg-white">Chế độ View</div>
    <router-link to="/" class="row ms-2 edit-tag-a"><b>1. Tổng BXH</b></router-link>
    <router-link to="/opposite-pair" class="row ms-2 edit-tag-a"
      ><b>2. Cặp đấu</b></router-link
    >
  </div>
  <div class="wrap-footer mt-5"></div>
</template>

<style>
</style>

<template>
  <!-- <div class="wrap-header"></div> -->
  <div class="page-header">
    <p class="fs-2">Bảng xếp hạng</p>
    <p style="font-size: 5rem">CHIẾM LĨNH 1B</p>
  </div>
  <div class="container">
    <div class="col col-12 mt-4 mb-4">
      <result-table-vue></result-table-vue>
      <div class="item-center">
        <ul class="list-number list-group-light color-white">
            <li class="d-flex justify-content-center align-items-center bg-white">
              Chế độ View
            </li>
            <li class="list-group-item d-flex justify-content-center align-items-center">
              <router-link to="/" class="edit-tag-a">Home</router-link>
            </li>
            <li class="list-group-item d-flex justify-content-center align-items-center">
              <router-link to="/opposite-pair" class="edit-tag-a">Detail</router-link>
            </li>
        </ul>
    </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import ResultTableVue from "@/components/ResultTable.vue";

export default {
  name: "HomeView",
  components: {
    ResultTableVue,
  },
};
</script>

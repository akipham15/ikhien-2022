<template>
  <div class="page-header">
    <p class="fs-2">Bảng xếp hạng</p>
    <p style="font-size: 5rem">CHIẾM LĨNH 1B</p>
  </div>
  <div class="row justify-content-center wrap-content">
    <div class="col col-12 align-self-center">
      <result-table-vue></result-table-vue>
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

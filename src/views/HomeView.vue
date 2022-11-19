<template>
  <div class="container">
    <h1>Bảng xếp hạng</h1>
    <h1>CHIẾM LĨNH 1B</h1>

    <result-table-vue></result-table-vue>
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

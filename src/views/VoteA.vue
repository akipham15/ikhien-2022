<template>
  <div class="container fs-4 vote-panel" :key="aftervote">
    <div class="fs-5 fw-bold mb-2 text-center">Bảng A</div>

    <div class="row justify-content-center shadow-sm mb-3">
      <template v-for="(team, index) in teams" :key="team.name">
        <template v-if="index == 0">
          <div class="col-4 p-3 team text-center">{{ team.name }}</div>
          <div class="col-2 p-3 vote">{{ team.vote }}</div>
        </template>
        <template v-if="index == 1">
          <div class="col-2 p-3 vote border-start border-dark border-4">{{ team.vote }}</div>
          <div class="col-4 p-3 team text-center">{{ team.name }}</div>
        </template>
      </template>
    </div>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
// @ is an alias to /src

import ApiService from "../services/api.service";
import { onBeforeUnmount, onMounted, watchEffect } from "@vue/runtime-core";
export default {
  components: {},
  setup() {
    const teams = ref([]);
    const intervalId = ref(null);

    const getTeams = () => {
      const { data: gTeams } = ApiService.getData();
      const stopWatchEffect = watchEffect(() => {
        if (gTeams && gTeams.value) {
          gTeams.value = gTeams.value.filter((team) => {
            return team.group == "Bảng A";
          });
          gTeams.value.sort((a, b) => b.point - a.point);
          teams.value = gTeams.value;
          stopWatchEffect();
        }
      });
    };

    onMounted(() => {
      getTeams();
      intervalId.value = setInterval(getTeams, 3000);
    });

    onBeforeUnmount(() => {
      if (intervalId.value) {
        clearInterval(intervalId.value);
      }
    });

    return { teams };
  },
};
</script>

<template>
  <div class="container">
    <div class="header mb-3">IKHIEN 2022</div>

    <div class="row justify-content-center mb-2 fs-2">
      <div class="col-8">Name</div>
      <div class="col-2">Vote</div>
      <div class="col-2">Total</div>
    </div>

    <TransitionGroup name="fade" :duration="650">
      <template v-for="team in teams" :key="team.name">
        <div class="row justify-content-center mb-2">
          <div class="col-8 fs-2 text-light p-3 team">{{ team.name }}</div>
          <div class="col-2 fs-2 p-3 vote">{{ team.vote }}</div>
          <div class="col-2 fs-2 p-3 point">{{ team.point }}</div>
        </div>
      </template>
    </TransitionGroup>
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
      if (intervalId) {
        clearInterval(intervalId);
      }
    });

    return { teams };
  },
};
</script>

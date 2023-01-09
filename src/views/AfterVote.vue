<template>
  <div class="container fs-4" :key="aftervote">
    <div class="header mb-3">IKHIẾN 2022</div>

    <div class="row justify-content-center mb-2  fw-bold title">
      <div class="col-8">Tên đội</div>
      <div class="col-2 text-center">Lượt vote</div>
      <div class="col-2 text-center">Tổng điểm</div>
    </div>

    <TransitionGroup name="fade" :duration="650">
      <template v-for="team in teams" :key="team.name">
        <div class="row justify-content-center shadow-sm mb-3">
          <div class="col-8  p-3 team">{{ team.name }}</div>
          <div class="col-2  p-3 vote">{{ team.vote }}</div>
          <div class="col-2  p-3 point">{{ team.point_after_vote }}</div>
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
      if (intervalId.value) {
        clearInterval(intervalId.value);
      }
    });

    return { teams };
  },
};
</script>

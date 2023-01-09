<template>
  <div class="container" :key="history">
    <div class="header mb-3">IKHIẾN 2022</div>

    <div class="table-responsive">
      <table class="table table-sm table-bordered">
        <tr>
          <th>#</th>
          <th>email</th>
          <th>team_name</th>
          <th>type</th>
          <th>point</th>
          <th>weight</th>
          <th>created</th>
        </tr>
        <template v-if="histories">
          <tr v-for="history in histories" :key="history.id">
            <td>{{ history.id }}</td>
            <td>{{ history.email }}</td>
            <td>{{ history.question.team_name }}</td>
            <td>{{ history.question.type }}</td>
            <td>{{ history.point }}</td>
            <td>{{ history.weight }}</td>
            <td>{{ history.created_at }}</td>
          </tr></template
        >
      </table>
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
    const histories = ref([]);
    const intervalId = ref(null);

    const getHistories = () => {
      const { data: gHistories } = ApiService.getHistory();
      const stopWatchEffect = watchEffect(() => {
        if (gHistories && gHistories.value) {
          gHistories.value.sort((a, b) => b.id - a.id);
          histories.value = gHistories.value;
          console.log(histories.value)
          stopWatchEffect();
        }
      });
    };

    onMounted(() => {
      getHistories();
      intervalId.value = setInterval(getHistories, 3000);
    });

    onBeforeUnmount(() => {
      if (intervalId.value) {
        clearInterval(intervalId.value);
      }
    });

    return { histories };
  },
};
</script>

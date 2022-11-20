<template>
  <div class="table-responsive bg-light p-3 pt-5 pb-5 table-radius">
    <table class="table table-light table-borderless">
      <thead class="border-bottom border-3 border-warning">
        <tr>
          <th>ĐỘI</th>
          <td>Đ.TRÌNH BÀY</td>
          <td>Đ.HỎI</td>
          <td>Đ.ĐÁP</td>
          <td>Đ.ĐỐI KHÁNG 1</td>
          <td>Đ.ĐỐI KHÁNG 2</td>
          <th>TỔNG</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          &nbsp;
        </tr>
        <template v-for="group in data" :key="group.id">
          <tr v-for="item in group.teams" :key="item.id">
            <th>{{ item.name }}</th>
            <td>{{ item.point.present }}</td>
            <td>
              <!-- question -->
              <Transition name="fade" mode="out-in">
                <p :key="item.point.question">{{ item.point.question }}</p>
              </Transition>
            </td>
            <td>
              <!-- answer -->
              <Transition name="fade" mode="out-in">
                <p :key="item.point.answer">{{ item.point.answer }}</p>
              </Transition>
            </td>
            <td>
              <!-- round 1 -->
              <div
                v-if="!item.round_one_show"
                class="col col-10 point-hidden"
                @click="item.round_one_show = !item.round_one_show"
              >
                &nbsp;
              </div>
              <Transition name="fade" mode="out-in">
                <template v-if="item.round_one_show">
                  <div v-if="item.team_index % 2 == 0" class="point">
                    <p
                      :class="[
                        group.round_one_show && item.answer_win === true
                          ? 'vote answer-win'
                          : 'vote',
                      ]"
                    >
                      {{ item.answer_vote }}
                    </p>
                  </div>
                  <div v-else class="point vote">
                    {{ item.question_vote }}
                  </div>
                </template>
              </Transition>
            </td>
            <td>
              <!-- round 2 -->
              <div
                v-if="!item.round_two_show"
                class="col col-10 point-hidden"
                @click="item.round_two_show = !item.round_two_show"
              >
                &nbsp;
              </div>
              <Transition name="fade" mode="out-in">
                <template v-if="item.round_two_show">
                  <div v-if="item.team_index % 2 == 1" class="point">
                    <p
                      :class="[
                        group.round_one_show && item.answer_win === true
                          ? 'vote answer-win'
                          : 'vote',
                      ]"
                    >
                      {{ item.answer_vote }}
                    </p>
                  </div>
                  <div v-else class="point vote">
                    {{ item.question_vote }}
                  </div>
                </template>
              </Transition>
            </td>
            <th>
              <Transition name="fade" mode="out-in">
                <p :key="item.point.total">{{ item.point.total }}</p>
              </Transition>
            </th>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>
  
<script>
import ApiService from "@/services/api.service";
import { onMounted, ref, watchEffect } from "vue";
export default {
  setup() {
    const data = ref([]);

    onMounted(() => {
      const { data: gData } = ApiService.getData();
      const stopWatchEffect = watchEffect(() => {
        if (gData && gData.value) {
          data.value = gData.value;
          data.value.map((group) => ({
            ...group,
            round_one_show: false,
            round_two_show: false,
          }));
          stopWatchEffect();
        }
      });
    });

    watchEffect(() => {
      if (data.value) {
        data.value = data.value.map((group) => {
          const round_one_show = Object.values(group.teams).every(
            (team) => team.round_one_show === true
          );
          const round_two_show = Object.values(group.teams).every(
            (team) => team.round_two_show === true
          );

          if (round_one_show === true) {
            group.teams.map((team) => {
              if (team.team_index % 2 == 1) {
                team.point.question = team.point_after_steal.question;
              }
              if (team.team_index % 2 == 0) {
                team.point.answer = team.point_after_steal.answer;
              }
              team.point.total =
                team.point.answer + team.point.question + team.point.present;
              return { ...team };
            });
          }

          if (round_two_show === true) {
            group.teams.map((team) => {
              if (team.team_index % 2 == 0) {
                team.point.question = team.point_after_steal.question;
              }
              if (team.team_index % 2 == 1) {
                team.point.answer = team.point_after_steal.answer;
              }
              team.point.total =
                team.point.answer + team.point.question + team.point.present;
              return { ...team };
            });
          }

          return {
            ...group,
            round_one_show: round_one_show,
            round_two_show: round_two_show,
          };
        });
      }
    });

    return {
      data,
    };
  },
};
</script>
<style>
</style>
  
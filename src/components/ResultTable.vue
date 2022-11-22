<template>
  <div class="table-responsive bg-light p-3 pt-5 pb-5 table-radius">
    <table class="table table-light table-borderless">
      <thead class="border-bottom border-3 border-warning">
        <tr>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td colspan="2">ĐIỂM ĐỐI KHÁNG</td>
          <td></td>
        </tr>
        <tr>
          <th>ĐỘI</th>
          <td>Đ.TRÌNH BÀY</td>
          <td>Đ.HỎI</td>
          <td>Đ.ĐÁP</td>
          <td style="min-width: 7rem">HỎI</td>
          <td>TRẢ LỜI</td>
          <th>TỔNG</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          &nbsp;
        </tr>
        <tr v-for="item in data" :key="item.id">
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
              @click="item.round_one_show = true"
            >
              &nbsp;
            </div>
            <Transition name="fade" mode="out-in">
              <template v-if="item.round_one_show">
                <div v-if="item.team_index % 2 == 0" class="point">
                  <p
                    :class="[
                      item.answer_win === true ? 'vote answer-win' : 'vote',
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
              @click="item.round_two_show = true"
            >
              &nbsp;
            </div>
            <Transition name="fade" mode="out-in">
              <template v-if="item.round_two_show">
                <div v-if="item.team_index % 2 == 1" class="point">
                  <p
                    :class="[
                      item.answer_win === true ? 'vote answer-win' : 'vote',
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
    const interval = ref(null);

    onMounted(() => {
      getData();
      interval.value = setInterval(getData, 5000);
    });

    const remote_interval = () => {
      if (interval.value) {
        clearInterval(interval.value);
      }
    };

    const getData = () => {
      const { data: gData } = ApiService.getDataV2();
      const stopWatchEffect = watchEffect(() => {
        if (gData && gData.value) {
          data.value = gData.value;
          // data.value = data.value.map((item, i) => Object.assign({}, item, gData.value[i]));

          updateData();
          stopWatchEffect();
        }
      });
    };

    const updateData = () => {
      let is_sort_data = false;
      data.value.forEach((team) => {
        if (team.round_one_show == true) {
          remote_interval();
          is_sort_data = true;
          data.value
            .filter((filter_team) => {
              return team.group.id == filter_team.group.id;
            })
            .forEach((vteam) => {
              vteam.round_one_show = true;
              if (vteam.team_index % 2 == 1) {
                vteam.point.question = vteam.point_after_steal.question;
              }
              if (vteam.team_index % 2 == 0) {
                vteam.point.answer = vteam.point_after_steal.answer;
              }
              vteam.point.total =
                vteam.point.answer + vteam.point.question + vteam.point.present;
            });
        }
        if (team.round_two_show == true) {
          remote_interval();
          is_sort_data = true;
          data.value
            .filter((filter_team) => {
              return team.group.id == filter_team.group.id;
            })
            .forEach((vteam) => {
              vteam.round_two_show = true;
              if (vteam.team_index % 2 == 0) {
                vteam.point.question = vteam.point_after_steal.question;
              }
              if (vteam.team_index % 2 == 1) {
                vteam.point.answer = vteam.point_after_steal.answer;
              }
              vteam.point.total =
                vteam.point.answer + vteam.point.question + vteam.point.present;
            });
        }
      });

      // sort data
      if (is_sort_data == true) {
        data.value.sort((a, b) => b.point.total - a.point.total);
      }
    };

    watchEffect(() => {
      updateData();
    });

    return {
      data,
      updateData,
    };
  },
};
</script>
<style>
</style>
  
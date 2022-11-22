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
          <td style="min-width: 7rem">TRẢ LỜI</td>
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
              v-if="!item.show_vote"
              class="col col-10 point-hidden"
              @click="item.show_vote = true"
            >
              &nbsp;
            </div>
            <Transition name="fade" mode="out-in">
              <template v-if="item.show_vote">
                <div class="point vote">
                  <p
                    :class="[
                      item.vote.question_win === true
                        ? 'vote answer-win'
                        : 'vote',
                    ]"
                  >
                    {{ item.vote.question }}
                  </p>
                </div>
              </template>
            </Transition>
          </td>
          <td>
            <!-- round 2 -->
            <div
              v-if="!item.show_vote"
              class="col col-10 point-hidden"
              @click="item.show_vote = true"
            >
              &nbsp;
            </div>
            <Transition name="fade" mode="out-in">
              <template v-if="item.show_vote">
                <div class="point vote">
                  <p
                    :class="[
                      item.vote.answer_win === true
                        ? 'vote answer-win'
                        : 'vote',
                    ]"
                  >
                    {{ item.vote.answer }}
                  </p>
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
          updateData();
          stopWatchEffect();
        }
      });
    };

    const updateData = () => {
      let is_sort_data = false;
      data.value.forEach((team) => {
        if (team.show_vote == true) {
          remote_interval();
          is_sort_data = true;
          team.point.question = team.point_after_steal.question;
          team.point.answer = team.point_after_steal.answer;
          team.point.total =
            team.point.answer + team.point.question + team.point.present;
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
  
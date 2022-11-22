<template>
  <div id="cantidadMujeres"></div>
  <div class="table-responsive bg-light p-3 pt-5 pb-5 table-radius">
    <table
      class="table table-light table-borderless"
      style="border-collapse: collapse"
    >
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
          <td style="min-width: 11rem">VOTE.HỎI</td>
          <td style="min-width: 11rem">VOTE.TRẢ LỜI</td>
          <th>TỔNG</th>
        </tr>
      </thead>
      <TransitionGroup tag="tbody" name="fadegroup">
        <tr>
          &nbsp;
        </tr>
        <tr
          v-for="item in data"
          :key="item.id"
          :class="[
            item.team_index % 2 == 1 && show_border ? 'border_bottom' : '',
          ]"
        >
          <th>{{ item.name }}</th>
          <td>{{ item.point.present }}</td>
          <td>
            <!-- question -->
            <Transition name="fade" mode="out-in" @enter="enter">
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
                      item.opposite.vote.question_win === true
                        ? 'vote answer-win'
                        : 'vote',
                    ]"
                  >
                    {{ item.opposite.vote.question }}/{{ item.vote.total }}
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
                    {{ item.vote.answer }}/{{ item.vote.total }}
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
      </TransitionGroup>
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
    const show_border = ref(true);

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
      for (const team of data.value) {
        if (team.show_vote == true) {
          remote_interval();
          is_sort_data = true;
          // team.point.question = team.point_after_steal.question;
          for (const vteam of data.value) {
            if (vteam.group.id == team.group.id) {
              if (vteam.id == team.id) {
                team.point.answer = team.point_after_steal.answer;
                team.point.total =
                  team.point.answer + team.point.question + team.point.present;
              } else {
                vteam.point.question = vteam.point_after_steal.question;
                vteam.point.total =
                  vteam.point.answer +
                  vteam.point.question +
                  vteam.point.present;
              }
            }
          }
        }
      }

      // sort data
      if (is_sort_data == true) {
        show_border.value = false;
        data.value.sort((a, b) => b.point.total - a.point.total);
      }
    };

    watchEffect(() => {
      updateData();
    });

    return {
      data,
      updateData,
      show_border,
    };
  },
};
</script>
<style>
</style>
  
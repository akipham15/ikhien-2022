<template>
  <div class="page-header">
    <p class="fs-2">KẾT QUẢ ĐỐI KHÁNG</p>
    <p style="font-size: 5rem">CHIẾM LĨNH 1B</p>
  </div>
  <div class="container wrap-content">
    <div class="col col-12 mt-4 mb-4">
      <div class="table-responsive bg-light p-3 pt-5 pb-5 table-radius">
        <table class="table table-light table-borderless">
          <thead>
            <tr>
              <th class="h1 fst-italic">{{ data.name }}</th>
              <th class="h1">vs</th>
              <th class="h1 fst-italic">{{ opposite_data.name }}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{{ data.question_vote }}</td>
              <td>Đ.HỎI</td>
              <td>{{ opposite_data.question_vote }}</td>
            </tr>
            <tr>
              <td>{{ data.answer_vote }}</td>
              <td>Đ.ĐÁP</td>
              <td>{{ opposite_data.answer_vote }}</td>
            </tr>
            <tr>
              <td
                :class="
                  data.question_vote >= opposite_data.question_vote
                    ? 'text-green'
                    : 'text-red'
                "
              >
                {{
                  data.question_vote >= opposite_data.question_vote
                    ? "WIN"
                    : "LOSE"
                }}
                {{ percentage_round_1.data_question_vote }}%
              </td>
              <td>ĐỐI KHÁNG LẦN 1</td>
              <td
                :class="
                  data.question_vote <= opposite_data.question_vote
                    ? 'text-green'
                    : 'text-red'
                "
              >
                {{
                  data.question_vote <= opposite_data.question_vote
                    ? "WIN"
                    : "LOSE"
                }}
                {{ percentage_round_1.opposite_data_question_vote }}%
              </td>
            </tr>
            <tr>
              <td
                :class="
                  data.answer_vote >= opposite_data.answer_vote
                    ? 'text-green'
                    : 'text-red'
                "
              >
                {{
                  data.answer_vote >= opposite_data.answer_vote ? "WIN" : "LOSE"
                }}
                {{ percentage_round_2.data_answer_vote }}%
              </td>
              <td>ĐỐI KHÁNG LẦN 2</td>
              <td
                :class="
                  data.answer_vote <= opposite_data.answer_vote
                    ? 'text-green'
                    : 'text-red'
                "
              >
                {{
                  data.answer_vote <= opposite_data.answer_vote ? "WIN" : "LOSE"
                }}
                {{ percentage_round_2.opposite_data_answer_vote }}%
              </td>
            </tr>
            <tr>
              <td v-if="data.point_after_steal" class="fw-bold">
                {{ data.point_after_steal.total }}
              </td>
              <td class="fw-bold">TỔNG</td>
              <td v-if="opposite_data.point_after_steal" class="fw-bold">
                {{ opposite_data.point_after_steal.total }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, watchEffect } from "vue";
import ApiService from "@/services/api.service";

export default {
  props: {
    id: String,
  },
  setup(props) {
    console.log("props: ", props.id);
    const data = ref({});
    const opposite_data = ref({});
    const percentage_round_1 = ref({});
    const percentage_round_2 = ref({});

    onMounted(() => {
      const { data: gData } = ApiService.getData();
      const stopWatchEffect = watchEffect(() => {
        if (gData && gData.value) {
          data.value = gData.value.filter(
            (item) => item.id == props.id
          )[0].teams[0];
          opposite_data.value = gData.value.filter(
            (item) => item.id == props.id
          )[0].teams[1];
          const total_question_vote =
            data.value.question_vote + opposite_data.value.question_vote;
          const total_answer_vote =
            data.value.answer_vote + opposite_data.value.answer_vote;
          percentage_round_1.value = {
            data_question_vote:
              data.value.question_vote / total_question_vote *100,
            opposite_data_question_vote:
              opposite_data.value.question_vote / total_question_vote * 100,
          };
          percentage_round_2.value = {
            data_answer_vote:
              (data.value.answer_vote * 100) / total_answer_vote == 0
                ? 0
                : total_answer_vote,
            opposite_data_answer_vote:
              (opposite_data.value.answer_vote * 100) / total_answer_vote == 0
                ? 0
                : total_answer_vote,
          };
          stopWatchEffect();
        }
      });
    });

    return { data, opposite_data, percentage_round_1, percentage_round_2 };
  },
};
</script>

<style>
</style>
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
        <tr v-for="item in data" :key="item">
          <th>{{ item.name }}</th>
          <td>{{ item.point.present }}</td>
          <td>{{ item.point.answer }}</td>
          <td>{{ item.point.question }}</td>
          <td>
            <div
              v-if="!item.answer_show"
              class="point-hidden"
              @click="item.answer_show = !item.answer_show"
            >
              &nbsp;
            </div>
            <Transition name="fade" mode="out-in">
              <div v-if="item.answer_show" class="point">{{ item.answer_vote }}</div>
            </Transition>
          </td>
          <td>
            <div
              v-if="!item.question_show"
              class="point-hidden"
              @click="item.question_show = !item.question_show"
            >
              &nbsp;
            </div>
            <Transition name="fade" mode="out-in">
              <div v-if="item.question_show" class="point">{{ item.question_vote }}</div>
            </Transition>
          </td>
          <th>{{ item.point.total }}</th>
        </tr>
      </tbody>
    </table>
    <!-- <div>
    <button @click="addClass">Add Class</button>
    <button @click="countTo(100, 50, 'reduce')">reduce</button>
    <button @click="countTo(0, 50, 'increase')">increase</button>
    <button @click="flyMeTo('reduce', 'increase', true)">di chuyen</button>
  </div> -->
  </div>
</template>
  
<script>
import ApiService from "@/services/api.service";
import { onMounted, ref } from "vue";
export default {
  setup() {
    const name_row = ["Trình Bày", "Hỏi", "Đáp", "Cướp Điểm", "Tổng Điểm"];
    const data_default = ApiService.getData();
    console.log("data_default: ", data_default);
    const id_team = ref(null);
    const data = ref([
      {
        answer_vote: 0,
        id: 1,
        name: "team_1",
        opposite_team: "team_2",
        point: {
          answer: 15,
          present: 85,
          question: 0,
          total: 100,
        },
        point_after_steal: {
          answer: 0,
          present: 85,
          question: 0,
          total: 85,
        },
        question_vote: 0,
      },

      {
        answer_vote: 0,
        id: 2,
        name: "team_2",
        opposite_team: "team_1",
        point: {
          answer: 0,
          present: 0,
          question: 16,
          total: 16,
        },
        point_after_steal: {
          answer: 0,
          present: 0,
          question: 16,
          total: 31,
        },
        question_vote: 2,
      },
      {
        answer_vote: 0,
        id: 1,
        name: "team_1",
        opposite_team: "team_2",
        point: {
          answer: 15,
          present: 85,
          question: 0,
          total: 100,
        },
        point_after_steal: {
          answer: 0,
          present: 85,
          question: 0,
          total: 85,
        },
        question_vote: 0,
      },

      {
        answer_vote: 0,
        id: 2,
        name: "team_2",
        opposite_team: "team_1",
        point: {
          answer: 0,
          present: 0,
          question: 16,
          total: 16,
        },
        point_after_steal: {
          answer: 0,
          present: 0,
          question: 16,
          total: 31,
        },
        question_vote: 2,
      },
      {
        answer_vote: 0,
        id: 1,
        name: "team_1",
        opposite_team: "team_2",
        point: {
          answer: 15,
          present: 85,
          question: 0,
          total: 100,
        },
        point_after_steal: {
          answer: 0,
          present: 85,
          question: 0,
          total: 85,
        },
        question_vote: 0,
      },

      {
        answer_vote: 0,
        id: 2,
        name: "team_2",
        opposite_team: "team_1",
        point: {
          answer: 0,
          present: 0,
          question: 16,
          total: 16,
        },
        point_after_steal: {
          answer: 0,
          present: 0,
          question: 16,
          total: 31,
        },
        question_vote: 2,
      },
    ]);

    const show = ref(false);

    onMounted(() => {
      data.value.map((team) => ({ ...team, answer_show: false, question_show: false }));
    });

    return {
      data,
      name_row,
      id_team,
      show,
    };
  },
};
</script>
<style>
</style>
  
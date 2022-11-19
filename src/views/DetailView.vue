<template>
  <div class="container">
    <h1>KẾT QUẢ ĐỐI KHÁNG</h1>
    <h1>CHIẾM LĨNH 1B</h1>
    <div class="table-responsive">
      <table>
        <thead>
          <tr>
            <th>{{ data.name }}</th>
            <th>vs</th>
            <th>{{ opposite_data.name }}</th>
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
            <td>{{ data.question_vote }}</td>
            <td>ĐỐI KHÁNG LẦN 1</td>
            <td>{{ opposite_data.question_vote }}</td>
          </tr>
          <tr>
            <td>{{ data.answer_vote }}</td>
            <td>ĐỐI KHÁNG LẦN 2</td>
            <td>{{ opposite_data.answer_vote }}</td>
          </tr>
          <tr>
            <td>{{ data.point_after_steal.total }}</td>
            <td>TỔNG</td>
            <td>{{ opposite_data.point_after_steal.total }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
export default {
  setup() {
    const data = ref({
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
    });

    const opposite_data = {
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
    };

    return { data, opposite_data };
  },
};
</script>

<style>
</style>
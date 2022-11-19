<template>
  <div class="table-responsive">
    <table class="table">
      <thead class="bg-light">
        <tr>
          <th>Đội</th>
          <th>Đ.TRÌNH BÀY</th>
          <th>Đ.HỎI</th>
          <th>Đ.ĐÁP</th>
          <th>Đ.ĐỐI KHÁNG 1</th>
          <th>Đ.ĐỐI KHÁNG 2</th>
          <th>TỔNG</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in data" :key="item">
          <td>{{ item.name }}</td>
          <td>{{ item.point.present }}</td>
          <td>{{ item.point.answer }}</td>
          <td>{{ item.point.question }}</td>
          <td>{{ item.answer_vote }}</td>
          <td>{{ item.question_vote }}</td>
          <td>{{ item.point.total }}</td>
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
import $ from "jquery";
import ApiService from "@/services/api.service";
import { ref } from "vue";
export default {
  setup() {
    const name_row = ["Trình Bày", "Hỏi", "Đáp", "Cướp Điểm", "Tổng Điểm"];
    const data_default = ApiService.getData();
    console.log("data_default: ", data_default);
    const id_team = ref(null);
    const data = [
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
    ];

    const addClass = (index) => {
      for (let i = 0; i < data.length; i++) {
        if (data[index]["name"] == data[i]["opposite_team"]) {
          if (data[index]["answer_vote"] > data[i]["question_vote"]) {
            const answer_vote_element =
              document.getElementsByClassName("question-vote")[i];
            answer_vote_element.setAttribute("id", "reduce");
            answer_vote_element.setAttribute("data-id", i);
          } else if (data[index]["question_vote"] > data[i]["answer_vote"]) {
            const question_vote_element =
              document.getElementsByClassName("answer-vote")[i];
            console.log("i: ", i);
            question_vote_element.setAttribute("id", "reduce");
            question_vote_element.setAttribute("data-id", i);
          }

          break;
        }
      }
    };

    let timeOutId = null;
    const updateData = (event) => {
      const index = event.target.getAttribute("data-id");
      addClass(index);
      if (timeOutId != null) {
        clearTimeout(timeOutId);
      }

      const id = setTimeout(() => {
        flyMeTo("reduce", event.target, true);
        console.log("run");
      }, 400);
      timeOutId = id;
    };

    function flyMeTo(elem, destination, prepend) {
      var $elem = $("#" + elem);
      $elem.parent().append('<p class="fw-normal mb-1 answer-vote">0</p>');
      var $dest = $(destination);
      const id_destination = $dest.attr("data-id");
      const id_start = $elem.attr("data-id");
      const total_point_destination_element =
        document.getElementsByClassName("total-point")[id_destination];
      const total_point_start_element =
        document.getElementsByClassName("total-point")[id_start];
      // Early exit - if already in destination
      if ($elem.parent().is(destination)) return;

      var $klon = $elem.clone().insertAfter($elem);
      let alam = document.getElementById(elem);

      if (alam) {
        var start = alam.getBoundingClientRect();
        $klon.css({
          position: "fixed",
          zIndex: 9999,
          left: start.left,
          top: start.top,
          pointerEvents: "none",
        });
        $elem.css({ opacity: 0 })[prepend ? "prependTo" : "appendTo"]($dest);

        var end = alam.getBoundingClientRect(); // Get new coordinates after append/prepend
        $klon.animate({ left: end.left, top: end.top }, 1000, function () {
          $klon.remove(); // Remove flying clone once it reaches destination
          $elem.css({ opacity: 1 }); // Show original Element
          $dest.text($elem.text());
          total_point_destination_element.style.color = "#32a732";
          total_point_destination_element.style.fontWeight = "600";
          total_point_destination_element.style.fontSize = "1rem";
          total_point_start_element.style.color = "#ff0000";
          total_point_start_element.style.fontWeight = "600";
          total_point_start_element.style.fontSize = "1rem";
          countTo(
            data[id_destination]["point"]["total"],
            data[id_destination]["point_after_steal"]["total"],
            total_point_destination_element
          );
          countTo(
            data[id_start]["point"]["total"],
            data[id_start]["point_after_steal"]["total"],
            total_point_start_element
          );
        });
        $dest.text("???");
      } else {
        $dest.text("0");
        $dest.css({ color: "red" });
        // countTo(data[id_destination]['point']['total'], data[id_destination]['point_after_steal']['total'], total_point_element)
      }
    }
    // DEMO:
    const eve1 = () => {
      console.log(">>>");
      flyMeTo("top", "bottom", true); // By passing `true` it will prepend!
    };
    const countTo = (from, to, total_point_element) => {
      let step = to > from ? 1 : -1;
      let interval = 50;
      if (from == to) {
        total_point_element.textContent = from;
        // if(action == 'reduce') {
        //     document.querySelector(".reduce").textContent = from;
        // }
        // if (action == 'increase') {
        //     document.querySelector(".increase").textContent = from;
        // }
        return;
      }

      let counter = setInterval(function () {
        from += step;
        total_point_element.textContent = from;
        // if(action == 'reduce') {
        //     document.querySelector('.reduce').textContent = from;
        // }
        // if (action == 'increase') {
        //     document.querySelector(".increase").textContent = from;
        // }
        if (from == to) {
          clearInterval(counter);
        }
      }, interval);
    };

    return {
      data,
      name_row,
      updateData,
      countTo,
      flyMeTo,
      eve1,
      addClass,
      id_team,
    };
  },
};
</script>
<style>
</style>
  
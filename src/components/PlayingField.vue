<template>
  <div class="playing-field">
    <audio src="../assets/sound/beep.mp3" id="audio-beep"></audio>
    <audio src="../assets/sound/lost.mp3" id="audio-lost"></audio>
    <audio src="../assets/sound/simon.mp3" id="audio-simon"></audio>

    <div class="stage_wrapper">
      <p>Уровень: {{ currentLevel }}</p>
      <p>{{ currentRound }} / {{ maxRound }}</p>
    </div>

    <!--    <div class="field" v-if="cells.length > 0">
      <div v-for="(n, index) in fieldSize" :key="`fieldSize-${index}`">
        <div v-for="(cell, i) of cells[index]" :key="`cell-${i}`" class="test">
          <div
            v-if="cell"
            :id="cell.id"
            :style="`background-color:${cell.color}`"
            class="cell mouse-cursor-gradient-tracking"
            @click="selectByUser(cell.id)"
          >
            <span></span>
          </div>
        </div>
      </div>
    </div>-->
    <div class="field" v-if="cells.length > 0">
      <div
        v-for="(n, index) in fieldSize"
        :key="`fieldSize-${index}`"
        class="cells-row"
      >
        <div
          v-for="(cell, i) of cells[index]"
          :key="`cell-${i}`"
          :id="cell.id"
          :style="`background-color:${cell.color}`"
          class="cell mouse-cursor-gradient-tracking"
          @click="selectByUser(cell.id)"
        >
          <span></span>
        </div>
      </div>
    </div>
    <div class="action">
      <p>{{ textStage }}</p>
      <button
        :disabled="this.gameStatus === 'repeat' || this.gameStatus === 'member'"
        :class="[
          'btn',
          'btn-start',
          this.gameStatus === 'waitingStart' || this.gameStatus === 'lost'
            ? ''
            : 'btn-start_disabled',
        ]"
        @click="start"
      >
        Старт
      </button>
    </div>
    <div class="difficult-wrapper">
      <button
        :class="[
          'btn',
          'btn-difficult',
          this.delay === 1500 ? 'btn-difficult--active' : '',
        ]"
        id="slow"
        @click="changeDifficult('slow')"
      >
        Легий
      </button>
      <button
        :class="[
          'btn',
          'btn-difficult',
          this.delay === 1000 ? 'btn-difficult--active' : '',
        ]"
        id="normal"
        @click="changeDifficult('normal')"
      >
        Средний
      </button>
      <button
        :class="[
          'btn',
          'btn-difficult',
          this.delay === 400 ? 'btn-difficult--active' : '',
        ]"
        id="fast"
        @click="changeDifficult('fast')"
      >
        Сложный
      </button>
    </div>
  </div>
</template>

<script>
import { colors } from "../assets/js/colors.js";

export default {
  name: "PlayingField",
  data() {
    return {
      colors: colors,
      currentRound: 0,
      currentLevel: 0,
      fieldSize: 2,
      cells: [],
      delay: 1500,
      sequence: [],
      selected: [],
      gameStatus: "waitingStart",
      randomIndexColors: [],
      timer: null,
      maxRound: 10,
      maxLevel: 4,
      minFieldSize: 2,
    };
  },

  mounted() {
    this.createPlayingField();
    this.delay = Number(localStorage.getItem("simon-difficult")) || 1500;
    this.$nextTick(() => {
      document.addEventListener(
        "mouseover",
        this.trackingMouseCursorGradientForCell
      );
    });
  },
  beforeDestroy() {
    document.removeEventListener(
      "mouseover",
      this.trackingMouseCursorGradientForCell
    );
  },
  computed: {
    numberOfCells() {
      return Math.pow(this.fieldSize, 2);
    },
    textStage() {
      if (
        this.currentRound === this.sequence.length &&
        this.gameStatus === "repeat"
      ) {
        return "Повторите последовательность.";
      } else if (this.gameStatus === "remember") {
        return "Запомните последовательность.";
      } else if (this.gameStatus === "lost") {
        return "Вы проиграли. Желаете повторить?";
      } else if (this.gameStatus === "waitingStart") {
        return 'Нажмите "Старт", чтобы начать.';
      } else {
        return "Продолжаем играть!";
      }
    },
  },
  methods: {
    trackingMouseCursorGradientForCell(e) {
      const id = e.target.id;
      if (id) {
        const cell = document.querySelector(`#${id}`);
        cell.addEventListener("mousemove", (e) => {
          let rect = e.target.getBoundingClientRect();
          let x = e.clientX - rect.left;
          let y = e.clientY - rect.top;
          cell.style.setProperty("--x", x + "px");
          cell.style.setProperty("--y", y + "px");
        });
      }
    },
    start() {
      if (this.gameStatus === "lost") {
        this.currentRound = 0;
      } else {
        this.nextLevel();
      }
      this.nextRound();
      this.changeGameStatus("remember");
    },
    colorize(number) {
      this.randomIndexColors = [];
      for (let i = 0; i < number; i++) {
        const index = this.getRandomInt(this.colors.length);
        if (this.randomIndexColors.includes(index)) {
          i--;
        } else {
          this.randomIndexColors.push(index);
        }
      }
      return this.randomIndexColors;
    },
    createPlayingField() {
      let indexColors = [];
      this.cells = [];
      this.clearData();
      if (this.randomIndexColors.length !== this.numberOfCells) {
        indexColors = this.colorize(this.numberOfCells);
      } else {
        indexColors = this.randomIndexColors;
      }
      let count = 0;
      for (let i = 0; i < this.fieldSize; i++) {
        this.cells[i] = [];
        for (let j = 0; j < this.fieldSize; j++) {
          const index = indexColors[count];
          this.cells[i].push({
            id: "cell-" + count,
            color: colors[index],
          });
          count++;
        }
      }
    },
    changeDifficult(difficult) {
      clearInterval(this.timer);
      switch (difficult) {
        case "slow":
          this.delay = 1500;
          break;
        case "normal":
          this.delay = 1000;
          break;
        case "fast":
          this.delay = 400;
          break;
      }
      this.currentRound = 0;
      this.currentLevel = 0;
      this.clearData();
      this.changeGameStatus("waitingStart");
      localStorage.setItem("simon-difficult", this.delay);
    },
    changeGameStatus(status) {
      this.gameStatus = status;
    },
    nextLevel() {
      if (this.currentLevel === this.maxLevel) {
        this.currentLevel = 1;
        this.fieldSize = this.minFieldSize;
        this.currentRound = 0;
      } else {
        this.currentLevel > 0 ? this.fieldSize++ : this.minFieldSize;
        this.currentLevel++;
        this.currentRound = 0;
      }
    },
    nextRound() {
      this.clearData();
      this.currentRound++;
      this.getRandomCells(this.currentRound);
    },
    getRandomCells(number) {
      this.changeGameStatus("remember");
      let count = 1;
      this.timer = setInterval(() => {
        const i = this.getRandomInt(this.fieldSize);
        const j = this.getRandomInt(this.fieldSize);
        const id = this.cells[i][j].id;
        this.sequence.push(this.cells[i][j].id);
        this.activateCell(id, "audio-simon", 200);
        if (count === number && this.currentRound === this.sequence.length) {
          clearInterval(this.timer);
          this.changeGameStatus("repeat");
        }
        count++;
      }, this.delay);
    },
    getRandomInt(max) {
      return Math.floor(Math.random() * max);
    },
    selectByUser(id) {
      if (this.gameStatus !== "repeat") {
        return;
      }
      this.activateCell(id, "audio-beep", 100);
      this.selected.push(id);
      this.checkResult();
    },
    activateCell(id, audioName, delay) {
      this.turnAudio(audioName);
      const element = document.getElementById(`${id}`);
      element.classList.add("cell--active");
      setTimeout(() => {
        element.classList.remove("cell--active");
      }, delay);
    },
    async selectByUser1(id) {
      if (this.gameStatus !== "repeat") {
        return;
      }
      const element = document.getElementById(`${id}`);
      let promise = new Promise((resolve) => {
        this.turnAudio("audio-beep");
        element.classList.add("cell--active");
        setTimeout(() => {
          resolve("cell--active");
        }, 100);
      });
      let result = await promise;
      element.classList.remove(result);
      this.selected.push(id);
      this.checkResult();
    },
    turnAudio(id) {
      let audio = document.getElementById(id);
      audio.currentTime = 0;
      audio.play();
    },
    clearData() {
      this.selected = [];
      this.sequence = [];
    },
    checkResult() {
      const lastElement = this.selected[this.selected.length - 1];
      const index = this.selected.indexOf(lastElement);
      if (
        lastElement !== this.sequence[index] &&
        this.selected.length !== this.sequence.length
      ) {
        this.turnAudio("audio-lost");
        this.changeGameStatus("lost");
      }
      if (
        lastElement === this.sequence[index] &&
        this.sequence.length === this.selected.length
      ) {
        if (this.currentRound === this.maxRound) {
          this.nextLevel();
        }
        this.createPlayingField();
        this.nextRound();
      }
    },
  },
};
</script>

<style scoped lang="scss">
.playing-field {
  margin: 20px auto;
}
.field {
  display: inline-flex;
  text-align: center;
  flex-direction: column;
  justify-content: center;
  flex-wrap: wrap;
  background: var(--gray-60white);
  margin: 20px auto;
}

.stage_wrapper {
  display: flex;
  flex-flow: row;
  margin: auto auto;
  width: 360px;
  padding: 0 10px;
  justify-content: space-between;
  color: var(--gray-20white);
}

.btn {
  border-radius: 3px;
  padding: 5px 25px;
}

.btn-start {
  position: relative;
  margin: 15px;
  padding: 5px 40px;
  overflow: hidden;
  color: var(--white);
  background-color: var(--green);
  &_disabled {
    background-color: var(--gray-60white);
  }
}

.difficult-wrapper {
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  max-width: 400px;
  margin: 0 auto;
  color: var(--gray-20white);
}

.btn-difficult {
  margin-bottom: 15px;
  min-width: 130px;
  color: var(--black-light);

  &--active {
    border: 2px solid var(--green);
  }
}

.cells-row {
  height: 90px;
}

.cell {
  width: 70px;
  height: 70px;
  margin: 10px;
  display: inline-block;
  cursor: pointer;
  transition: 0.2s;
  border-radius: 5px;

  &--active {
    animation-duration: 0.1s;
    animation-fill-mode: backwards;
    animation-name: pulse;
  }
}
.action {
  color: var(--black-light);
}

@keyframes pulse {
  0% {
    transform: scale3d(1, 1, 1);
  }
  50% {
    transform: scale3d(1.05, 1.05, 1.05);
  }
  100% {
    filter: brightness(150%);
    box-shadow: 1px 3px 11px 8px rgba(37, 37, 37, 0.2);
    transform: scale3d(1, 1, 1);
  }
}

@media (max-width: 450px) {
  .difficult-wrapper {
    flex-direction: column;
    justify-content: center;
  }
  .cell {
    max-width: 50px;
    max-height: 50px;
    margin: 5px;
  }
}

.mouse-cursor-gradient-tracking {
  position: relative;
  background: #7983ff;
  padding: 0.5rem 1rem;
  font-size: 1.2rem;
  border: none;
  color: white;
  cursor: pointer;
  outline: none;
  overflow: hidden;
}

.mouse-cursor-gradient-tracking span {
  position: relative;
}

.mouse-cursor-gradient-tracking::before {
  --size: 0;
  content: "";
  position: absolute;
  left: var(--x);
  top: var(--y);
  width: var(--size);
  height: var(--size);
  background: radial-gradient(circle closest-side, pink, transparent);
  transform: translate(-50%, -50%);
  transition: width 0.2s ease, height 0.2s ease;
}

.mouse-cursor-gradient-tracking:hover::before {
  --size: 50px;
}
</style>

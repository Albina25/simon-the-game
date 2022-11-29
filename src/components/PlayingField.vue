<template>
  <div class="playing-field">
    <audio src="../assets/sound/beep.mp3" id="audio-beep"></audio>
    <audio src="../assets/sound/lost.mp3" id="audio-lost"></audio>
    <audio src="../assets/sound/simon.mp3" id="audio-simon"></audio>
    <p>Раунд: {{ formattedRound }}</p>
    <div class="field">
      <div
        v-for="cell of cells"
        :key="cell.id"
        :id="cell.id"
        :style="`background-color:${cell.color}`"
        :class="[
          'cell',
          cell.randomSelected === true ? 'filed-cell-active' : '',
        ]"
        @click="selectByUser(cell.id)"
      ></div>
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
        @click="checkDifficult('slow')"
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
        @click="checkDifficult('normal')"
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
        @click="checkDifficult('fast')"
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
      round: 0,
      fieldSize: 3,
      cells: [],
      delay: 1500,
      sequence: [],
      selected: [],
      gameStatus: "waitingStart",
      randomIndexColors: [],
    };
  },
  mounted() {
    this.gameStatus = "waitingStart";
    this.createPlayingField();
  },
  computed: {
    formattedRound() {
      return this.round ? this.round : "-";
    },
    numberOfCells() {
      return this.fieldSize ? this.fieldSize ** 2 : 4;
    },
    textStage() {
      if (this.round === this.sequence.length && this.gameStatus === "repeat") {
        return "Повторите последовательность.";
      } else if (this.gameStatus === "remember") {
        return "Запомните последовательность.";
      } else if (this.gameStatus === "lost") {
        return "Вы проиграли. Желаете повторить?";
      } else {
        return 'Нажмите "Старт", чтобы начать.';
      }
    },
  },
  methods: {
    start() {
      this.round = 1;
      this.createPlayingField();
      this.nextRound(this.round);
      this.gameStatus = "remember";
    },
    colorize(number) {
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
      let indexColors;
      this.cells = [];
      this.sequence = [];
      if (this.randomIndexColors.length === 0) {
        indexColors = this.colorize(this.numberOfCells);
      } else {
        indexColors = this.randomIndexColors;
      }
      for (let i = 0; i < this.numberOfCells; i++) {
        const index = indexColors[i];
        this.cells.push({
          id: "cell-" + i,
          color: colors[index],
          randomSelected: false,
        });
      }
    },
    checkDifficult(difficult) {
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
      this.createPlayingField();
      this.round = 0;
      this.gameStatus = "waitingStart";
    },
    nextRound(round) {
      const timeout = this.delay * (round + 1);
      this.getRandomCells(round);

      setTimeout(() => {
        this.gameStatus = "repeat";
      }, timeout);
    },
    getRandomCells(round) {
      this.gameStatus = "remember";
      let i = 1;
      let timer = setInterval(() => {
        const index = this.getRandomInt(this.numberOfCells);
        this.cells[index].randomSelected = true;
        this.sequence.push(this.cells[index].id);
        this.turnAudio("audio-simon");
        setTimeout(() => {
          this.cells[index].randomSelected = false;
        }, this.delay - 200);
        if (i === round) {
          clearInterval(timer);
        }
        i++;
      }, this.delay);
    },
    getRandomInt(max) {
      return Math.floor(Math.random() * max);
    },
    selectByUser(id) {
      if (this.gameStatus !== "repeat") {
        return;
      }
      this.turnAudio("audio-beep");
      const element = document.getElementById(`${id}`);
      element.classList.add("filed-cell-active");
      setTimeout(() => {
        element.classList.remove("filed-cell-active");
      }, this.delay - 200);
      this.selected.push(id);
      this.checkResult();
    },
    turnAudio(id) {
      let audio = document.getElementById(id);
      audio.currentTime = 0;
      audio.play();
    },
    checkResult() {
      if (this.selected !== this.sequence) {
        const lastElement = this.selected[this.selected.length - 1];
        const index = this.selected.indexOf(lastElement);
        if (lastElement !== this.sequence[index]) {
          this.turnAudio("audio-lost");
          this.selected = [];
          this.gameStatus = "lost";
        }
        if (
          lastElement === this.sequence[index] &&
          this.sequence.length === this.selected.length
        ) {
          this.round++;
          this.selected = [];
          this.createPlayingField();
          this.nextRound(this.round);
        }
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
  display: flex;
  flex-wrap: wrap;
  width: 180px;
  height: 180px;
  background: var(--gray-60white);
  margin: 20px auto;
}

.btn {
  border-radius: 3px;
  padding: 5px 25px;
}

.btn-start {
  margin: 15px;
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

  &--active {
    background-color: var(--green);
  }
}

.cell {
  width: 70px;
  height: 70px;
  margin: 10px;
  display: inline-block;
  cursor: pointer;
  transition: 0.2s;

  &_red {
    background-color: var(--red);
  }
  &_green {
    background-color: var(--green);
  }
  &_yellow {
    background-color: var(--yellow);
  }
  &_blue {
    background-color: var(--blue);
  }
}

.filed-cell-active {
  animation-duration: 0.1s;
  animation-fill-mode: backwards;
  animation-name: pulse;
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
}
</style>

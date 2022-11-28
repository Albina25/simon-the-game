<template>
  <div class="playing-field">
    <audio src="../assets/sound/beep.mp3" id="audio"></audio>
    <p>Раунд: {{ formatedRound }}</p>
    <div class="field">
      <div
        v-for="cell of cells"
        :key="cell.id"
        :class="[
          'cell',
          cell.sequence > 0 && cell.randomSelected === true
            ? 'filed-cell-active'
            : '',
        ]"
        @click="selectByUser(cell.id)"
      ></div>
    </div>
    <div class="action">
      <p>{{ textStage }}</p>
      <button
        :disabled="playing"
        :class="[
          'btn',
          'btn-start',
          this.playing === true ? 'btn-start_disabled' : '',
        ]"
        @click="start"
      >
        Старт
      </button>
    </div>
    <div class="difficult">
      <button
        :class="[
          'btn',
          'btn-difficult',
          this.delay === 1500 ? 'btn-difficult--active' : '',
        ]"
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
        @click="checkDifficult('normal')"
      >
        Средний
      </button>
      <button
        :class="['btn', this.delay === 400 ? 'btn-difficult--active' : '']"
        @click="checkDifficult('fast')"
      >
        Сложный
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "PlayingField",

  data() {
    return {
      round: 0,
      numberOfCells: 4,
      cells: [],
      delay: 1500,
      sequence: [],
      playing: false,
      selected: [],
      gameStatus: null,
    };
  },
  beforeMount() {
    this.createPlayingField();
  },
  computed: {
    formatedRound() {
      return this.round ? this.round : "-";
    },
    textStage() {
      if (this.playing && this.round === this.sequence.length) {
        return "Повторите последовательность.";
      } else if (this.playing && this.round !== this.sequence.length) {
        return "Запомните последовательность.";
      } else if (!this.playing && this.gameStatus === "lost") {
        return "Вы прогирали. Желаете повторить?";
      } else {
        return 'Нажмите "Старт", чтобы начать.';
      }
    },
  },
  methods: {
    start() {
      this.round++;
      this.createPlayingField();
      this.getRandomCells(this.round);
      this.playing = true;
    },
    createPlayingField() {
      this.cells = [];
      this.sequence = [];
      for (let i = 0; i < this.numberOfCells; i++) {
        this.cells.push({
          id: i,
          randomSelected: false,
          sequence: 0,
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
      this.playing = false;
      this.round = 0;
      this.gameStatus = null;
    },
    getRandomCells(round) {
      let i = 1;
      let timer = setInterval(() => {
        const index = this.getRandomInt(this.numberOfCells);
        this.cells[index].randomSelected = true;
        this.sequence.push(this.cells[index].id);
        this.cells[index].sequence = i;
        setTimeout(() => {
          this.cells[index].randomSelected = false;
        }, this.delay - 10);
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
      if (!this.playing) {
        return;
      }
      let audio = document.getElementById("audio");
      audio.currentTime = 0;
      audio.play();
      this.selected.push(id);
      this.checkResult();
    },
    checkResult() {
      if (this.selected !== this.sequence) {
        const lastElement = this.selected[this.selected.length - 1];
        const index = this.selected.indexOf(lastElement);
        if (lastElement != this.sequence[index]) {
          this.playing = false;
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
          this.getRandomCells(this.round);
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

.difficult {
  color: var(--gray-20white);
}

.btn-difficult {
  margin-right: 15px;

  &--active {
    background-color: var(--green);
  }
}

.cell {
  width: 70px;
  height: 70px;
  background: var(--gray-20white);
  margin: 10px;
  display: inline-block;
  cursor: pointer;
  transition: 0.2s;
}

.filed-cell-active {
  animation-duration: 1s;
  animation-fill-mode: both;
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
    background-color: var(--green);
    transform: scale3d(1, 1, 1);
  }
}
</style>

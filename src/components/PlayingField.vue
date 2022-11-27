<template>
  <div class="playing-field">
    <div>
      <p class="difficult">Уровень сложности: {{ currentDifficult }}</p>
      <p>Рануд: {{ round }}</p>
    </div>
    <div class="field">
      <field-cell v-for="cell of cells" :cell="cell" :key="cell.id">
      </field-cell>
    </div>
    <div class="action">
      <p>Нажмите "Старт", чтобы начать.</p>
      <button class="btn btn-start action__btn-start" @click="start">
        Старт
      </button>
    </div>
  </div>
</template>

<script>
import FieldCell from "@/components/FieldCell";

export default {
  name: "PlayingField",
  components: {
    FieldCell,
  },
  data() {
    return {
      round: 1,
      difficult: ["Легий", "Средний", "Сложный"],
      currentDifficult: "Легий",
      numberOfCells: 4,
      cells: [],
    };
  },
  beforeMount() {
    this.createPlayingField();
  },
  methods: {
    start() {
      this.createPlayingField();
      this.getRandomCells();
    },
    createPlayingField() {
      this.cells = [];
      for (let i = 0; i < this.numberOfCells; i++) {
        this.cells.push({
          id: i,
          randomSelected: false,
          sequence: 0,
          clicked: false,
        });
      }
    },
    getRandomCells() {
      for (let i = 0; i < 3; i++) {
        const index = this.getRandomInt(this.numberOfCells);

        if (this.cells[index].randomSelected === false) {
          this.cells[index].randomSelected = true;
          this.cells[index].sequence = i + 1;
        } else {
          i--;
        }
      }
    },
    getRandomInt(max) {
      return Math.floor(Math.random() * max);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.playing-field {
  width: 500px;
  margin: 20px auto;
}
.field {
  display: flex;
  flex-wrap: wrap;
  width: 120px;
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
}

.difficult {
  color: var(--gray-20white);
}
</style>

<template>
  <div class="app">
    <div class="game_wrapper">
      <h1 class="game_title">Simon The Game</h1>
      <p class="game_direction">Запомни и повтори последовательность</p>
    </div>

    <playing-field></playing-field>
  </div>
</template>

<script>
import PlayingField from "./components/PlayingField.vue";

export default {
  name: "App",
  components: {
    PlayingField,
  },
};
</script>

<style scoped lang="scss">
.app {
  margin-top: 40px;
  text-align: center;

  .game_wrapper {
    color: var(--black-light);
  }

  .game_wrapper {
    background-color: var(--green);
  }
}
</style>

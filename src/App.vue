<template>
  <div class="app">
    <h1 class="title">Simon The Game</h1>
    <p>Повтори нажатие кнопок в том же порядке</p>

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
  .title {
    color: var(--black-light);
  }
}
</style>

<template>
  <div class="app">
    <img alt="Vue logo" src="./assets/logo.png" />
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

<style lang="scss" scoped>
.app {
  margin-top: 40px;
  text-align: center;
  .title {
    color: black;
  }
}
</style>

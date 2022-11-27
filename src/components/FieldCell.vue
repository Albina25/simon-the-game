<template>
  <div class="filed-cell">
    <span
      :class="[
        'cell',
        cell.sequence > 0 && cell.randomSelected === true
          ? 'filed-cell-active'
          : '',
      ]"
    ></span>
  </div>
</template>

<script>
export default {
  name: "FieldCell",
  props: {
    cell: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped lang="scss">
.filed-cell {
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
}
</style>

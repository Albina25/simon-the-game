<template>
  <div class="filed-cell">
    <span
      :class="['cell', cell.sequence > 0 ? 'filed-cell-active' : '']"
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
    width: 50px;
    height: 50px;
    background: var(--gray-20white);
    margin: 5px;
    display: inline-block;
    cursor: pointer;
    transition: 0.4s;
    transform-style: preserve-3d;
  }
  .filed-cell-active {
    background-color: var(--green);
    transform: rotateX(180deg);
  }
}
</style>

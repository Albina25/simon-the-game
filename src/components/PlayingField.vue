<template>
  <div class="playing-field">
    <field-cell v-for="i of 4" :key="i"> </field-cell>
  </div>
</template>

<script>
import FieldCell from "@/components/FieldCell";

export default {
  name: "PlayingField",
  components: {
    FieldCell,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.playing-field {
  display: flex;
  flex-wrap: wrap;
  width: 120px;
  background: var(--gray-60white);
  margin: 20px auto;
}
</style>

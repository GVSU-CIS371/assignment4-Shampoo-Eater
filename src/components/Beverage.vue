<template>
  <Mug>
    <Cold v-if="isIced" />
    <Hot v-else />
    <Contents>
      <template v-slot:top>
        <Base v-if="creamer.id === 'c1' && syrup.id === 's1'" />
        <Creamer v-else/>
      </template>
      <template v-slot:mid>
        <Base v-if="syrup.id === 's1'" />
        <Syrup v-else/>
      </template>
      <template v-slot:bottom>
        <Base />
      </template>
    </Contents>
  </Mug>
</template>
<script setup lang="ts">
import Contents from "./Contents.vue";
import Mug from "./Mug.vue";
import Syrup from "./Syrup.vue";
import Base from "./Base.vue";
import Creamer from "./Creamer.vue";
import Hot from "./Hot.vue";
import Cold from "./Cold.vue";
import type { Ingredient } from "../stores/beverageStore";

type Props = {
  isIced: boolean;
  base: Ingredient;
  creamer: Ingredient;
  syrup: Ingredient;
};
defineProps<Props>();
</script>

<template>
  <div>
    <Beverage
      :is-iced="currentTemp === 'Cold'"
      :base="currentBase"
      :creamer="currentCreamer"
      :syrup="currentSyrup"
    />
    <ul>
      <li>
        <template v-for="temp in temps" :key="temp">
          <label>
            <input
              type="radio"
              name="temperature"
              :id="`r${temp}`"
              :value="temp"
              v-model="currentTemp"
            />
            {{ temp }}
          </label>
        </template>
      </li>
      <li>
        <template v-for="base in bases" :key="base.id">
          <label>
            <input
              type="radio"
              name="base"
              :id="`r${base.id}`"
              :value="base"
              v-model="currentBase"
            />
            {{ base.name }}
          </label>
        </template>
      </li>
      <li>
        <template v-for="creamer in creamers" :key="creamer.id">
          <label>
            <input 
              type="radio" 
              name="creamer" 
              :id="`r${creamer.id}`" 
              :value="creamer" 
              v-model="currentCreamer"
            />
            {{ creamer.name }}
          </label>
        </template>
      </li>
      <li>
        <template v-for="syrup in syrups" :key="syrup.id">
          <label>
            <input type="radio" 
              name="syrup" 
              :id="`r${syrup.id}`" 
              :value="syrup" 
              v-model="currentSyrup"
            />
            {{ syrup.name }}
          </label>
        </template>
      </li>
    </ul>
    <label>
      <input type="text" v-model="beverageName" placeholder="Beverage Name" />
    </label>
    <button @click="beverageStore.makeBeverage(beverageName)">Make Beverage</button>
    <div id="beverage-container">
      <template v-for="beverage in beverageStore.beverages" :key="beverage.name">
        <label>
          <button @click="beverageStore.showBeverage(beverage)">{{ beverage.name }}</button>
        </label>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import Beverage from "./components/Beverage.vue";
import { ref } from "vue";
import { useBeverageStore } from "./stores/beverageStore";
import { storeToRefs } from "pinia";

const beverageName = ref("");
const beverageStore = useBeverageStore();
const { temps, currentTemp, bases, currentBase, creamers, currentCreamer, syrups, currentSyrup } = storeToRefs(beverageStore);
</script>

<style lang="scss">
body,
html {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  background-color: #6e4228;
  background: linear-gradient(to bottom, #6e4228 0%, #956f5a 100%);
}
ul {
  list-style: none;
}
</style>

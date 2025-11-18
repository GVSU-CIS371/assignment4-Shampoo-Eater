import { defineStore } from "pinia";
import tempretures from "../data/tempretures.json";
import bases from "../data/bases.json";
import creamers from "../data/creamers.json";
import syrups from "../data/syrups.json";

export interface Ingredient {
  id: string;
  name: string;
  color: string;
}

export interface Beverage {
  name: string;
  temp: string;
  base: Ingredient;
  creamer: Ingredient;
  syrup: Ingredient;
}


export const useBeverageStore = defineStore("BeverageStore", {
  state: () => ({
    temps: tempretures,
    bases: bases,
    creamers: creamers,
    syrups: syrups,
    currentTemp: tempretures[0],
    currentBase: bases[2],
    currentCreamer: creamers[0],
    currentSyrup: syrups[0],
    beverages: [] as Beverage[],
  }),

  actions: {
    makeBeverage(bevName: string) {
      const newBeverage: Beverage = {
        name: bevName,
        temp: this.currentTemp,
        base: this.currentBase,
        creamer: this.currentCreamer,
        syrup: this.currentSyrup,
      };
      this.beverages.push(newBeverage);
    },
    showBeverage(bev: Beverage) {
      this.currentTemp = bev.temp;
      this.currentBase = bev.base;
      this.currentCreamer = bev.creamer;
      this.currentSyrup = bev.syrup;
    },
  },
  persist: true,
});

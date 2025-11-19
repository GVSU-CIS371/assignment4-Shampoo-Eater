import { defineStore } from "pinia";
import db from "../firebase";
import {
  collection,
  addDoc,
  onSnapshot,
  deleteDoc,
  doc,
  query,
  orderBy,
  getDocs,
  writeBatch,
} from "firebase/firestore";

export interface Ingredient {
  id: string;
  name: string;
  color: string;
}

export interface Beverage {
  name: string;
  temp: string;
  base: Ingredient | null;
  creamer: Ingredient | null;
  syrup: Ingredient | null;
}

export const useBeverageStore = defineStore("BeverageStore", {
  state: () => ({
    temps: [] as string[],
    bases: [] as Ingredient[],
    creamers: [] as Ingredient[],
    syrups: [] as Ingredient[],
    currentTemp: "Hot",
    currentBase: null as Ingredient | null,
    currentCreamer: null as Ingredient | null,
    currentSyrup: null as Ingredient | null,
    initialized: false,
    beverages: [] as Beverage[],
  }),

  actions: {
    // Initialize the store once: loads remote data and sets defaults.
    async init() {
      if ((this as any).initialized) return;
      await (this as any).loadData();
      (this as any).initialized = true;
    },
    async loadData() {
      const tempsSnap = await getDocs(collection(db, "temps"));
      console.log("temps fetched:", tempsSnap.size);
      if (!tempsSnap.empty) {
        this.temps = tempsSnap.docs.map((d) => {
          return d.id;
        });
      }

      const basesSnap = await getDocs(collection(db, "bases"));
      console.log("bases fetched:", basesSnap.size);
      if (!basesSnap.empty) {
        this.bases = basesSnap.docs.map((d) => {
          const data = d.data() as any;
          return {
            id: data.id,
            name: d.id,
            color: data.color,
          } as Ingredient;
        });
        this.currentBase = this.bases[0];
      }

      const creamersSnap = await getDocs(collection(db, "creamers"));
      console.log("creamers fetched:", creamersSnap.size);
      if (!creamersSnap.empty) {
        this.creamers = creamersSnap.docs.map((d) => {
          const data = d.data() as any;
          return {
            id: data.id,
            name: d.id,
            color: data.color,
          } as Ingredient;
        });
        this.currentCreamer = this.creamers[0];
      }

      const syrupsSnap = await getDocs(collection(db, "syrups"));
      if (!syrupsSnap.empty) {
        this.syrups = syrupsSnap.docs.map((d) => {
          const data = d.data() as any;
          return {
            id: data.id,
            name: d.id,
            color: data.color,
          } as Ingredient;
        });
        this.currentSyrup = this.syrups[0];
      }
      const beveragesSnap = await getDocs(collection(db, "beverages"));
      if (!beveragesSnap.empty) {
        this.beverages = beveragesSnap.docs.map((d) => {
          const data = d.data() as any;
          return {
            name: data.name,
            temp: data.temp,
            base: data.base,
            creamer: data.creamer,
            syrup: data.syrup,
          } as Beverage;
        });
      }

    },
    async createBeverage(payload: { name: string; temp: string; base: Ingredient; creamer: Ingredient; syrup: Ingredient }) {
      const docRef = await addDoc(collection(db, "beverages"), {
        name: payload.name,
        temp: payload.temp,
        base: payload.base,
        creamer: payload.creamer,
        syrup: payload.syrup,
      });
      return docRef.id;
    },
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
    // Remove all custom-made beverages
    clearBeverages() {
      this.beverages = [] as Beverage[];
    },
  },
  persist: true,
});

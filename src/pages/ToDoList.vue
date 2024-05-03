<script setup>
import { ref } from "vue";
//
import Item from "../components/Item.vue";

const rutina = ref([]);

let routine = {
  exercise: "",
  state: "In progress",
};

const addExercise = () => {
  if (routine.exercise === "") {
    window.alert("Empty field!");
    return;
  } else {
    let res = window.confirm("¿Are you sure to enter this routine?");
    if (res) {
      routine.id = Date.now();
      rutina.value.push({ ...routine });
      localStorage.setItem("Exercises", JSON.stringify(rutina.value));
      routine.exercise = "";
      return;
    }
  }
};

const changeStateTrue = (id) => {
  rutina.value.forEach((exercise) => {
    if (id === exercise.id) {
      exercise.state = "Done";
      localStorage.setItem("Exercises", JSON.stringify(rutina.value));

      return;
    }
  });
};

const changeStateFalse = (id) => {
  rutina.value.forEach((exercise) => {
    if (id === exercise.id) {
      exercise.state = "In progress";
      localStorage.setItem("Exercises", JSON.stringify(rutina.value));
      return;
    }
  });
};

const deleteExercise = (id) => {
  let indexExercise = rutina.value.findIndex((routine) => routine.id === id);
  let resp = window.confirm("¿Are you sure to delete?");
  if (resp) {
    rutina.value.splice(indexExercise, 1);
    localStorage.setItem("Exercises", JSON.stringify(rutina.value));

    return;
  }
};

const empty = () => {
  let resp = window.confirm(
    "The entire routine will be deleted, ¿Are you sure to delete the data?"
  );
  if (resp) {
    rutina.value = [];
    localStorage.setItem("Exercises", JSON.stringify(rutina.value));
    return;
  }
};

rutina.value = JSON.parse(localStorage.getItem("Exercises")) || [];
</script>

<template>
  <div class="p-5 min-h-screen bg-gray-100">
    <!-- HEAD -->
    <div class="bg-slate-600 flex items-center justify-between p-6">
      <div class="flex items-center">
        <h1 class="text-2xl text-white font-semibold">MY GYM ROUTINE</h1>
        <font-awesome-icon
          class="ml-3 mr-3"
          :icon="['fas', 'person']"
          bounce
          size="2xl"
          style="color: #fff"
        />
      </div>
      <span class="text-2xl text-white font-semibold">#AFRJ</span>
    </div>
    <!-- Add -->
    <div class="mt-2 flex items-center relative">
      <input
        @keyup.enter="addExercise"
        class="w-screen p-2 bg-slate-300 outline-none focus:shadow-gray-400 focus:shadow-lg"
        type="text"
        v-model="routine.exercise"
      />
      <button
        type="button"
        @click="addExercise"
        class="absolute right-0 bg-slate-600 text-white p-2 transition-all hover:bg-slate-500 font-medium"
      >
        ADD
      </button>
    </div>
    <!-- EXERCISES -->
    <div class="flex flex-col h-50 mt-6">
      <div class="flex relative items-center">
        <font-awesome-icon
          :icon="['fas', 'person-walking']"
          size="2xl"
          style="color: #475569"
        />
        <h3 class="text-xl ml-1 font-bold uppercase text-slate-600">
          Exercises
        </h3>

        <button
          type="button"
          @click="empty"
          class="absolute right-0 bg-slate-600 uppercase text-white p-2 active:scale-95 transition-all hover:bg-slate-500 font-medium"
        >
          empty
        </button>
      </div>
      <!-- EXERCISES LIST -->
      <div class="flex-col min-w-full">
        <Item
          v-for="(routine, i) of rutina"
          :key="i"
          :exercise="routine.exercise"
          :state="routine.state"
        >
          <div>
            <font-awesome-icon
              @click="changeStateTrue(routine.id)"
              class="cursor-pointer mr-4 active:translate-y-1"
              :icon="['fas', 'circle-check']"
              size="xl"
              style="color: #475569"
            />
            <font-awesome-icon
              @click="changeStateFalse(routine.id)"
              class="cursor-pointer mr-4 active:translate-y-1"
              :icon="['fas', 'circle-xmark']"
              size="xl"
              style="color: #475569"
            />
            <font-awesome-icon
              @click="deleteExercise(routine.id)"
              class="cursor-pointer active:translate-y-1"
              :icon="['fas', 'trash']"
              size="xl"
              style="color: #475569"
            />
          </div>
        </Item>
      </div>
    </div>
  </div>
</template>

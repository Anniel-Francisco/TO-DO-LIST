<script setup>
import { ref } from "vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faHatWizard,
  faPerson,
  faPersonWalking,
  faCircleCheck,
  faTrash,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
library.add(
  faHatWizard,
  faPerson,
  faPersonWalking,
  faCircleCheck,
  faTrash,
  faCircleXmark
);

const rutina = ref([]);

let routine = {
  exercise: "",
  state: "En proceso",
};

const addExercise = () => {
  if (routine.exercise === "") {
    window.alert("Empty field!");
    return;
  } else {
    let res = window.confirm("¿Seguro/a de ingresar esta rutina?");
    if (res) {
      routine.id = Date.now();
      rutina.value.push({ ...routine });
      localStorage.setItem("Ejercicios", JSON.stringify(rutina.value));
      routine.exercise = "";
      return;
    }
  }
};

const changeStateTrue = (id) => {
  rutina.value.forEach((exercise) => {
    if (id === exercise.id) {
      exercise.state = "Completa";
      localStorage.setItem("Ejercicios", JSON.stringify(rutina.value));

      return;
    }
  });
};

const changeStateFalse = (id) => {
  rutina.value.forEach((exercise) => {
    if (id === exercise.id) {
      exercise.state = "En proceso";
      localStorage.setItem("Ejercicios", JSON.stringify(rutina.value));
      return;
    }
  });
};

const deleteExercise = (id) => {
  let indexExercise = rutina.value.findIndex((routine) => routine.id === id);
  let resp = window.confirm("¿Seguro/a de eliminar?");
  if (resp) {
    rutina.value.splice(indexExercise, 1);
    localStorage.setItem("Ejercicios", JSON.stringify(rutina.value));

    return;
  }
};

const empty = () => {
  let resp = window.confirm(
    "The entire routine will be deleted, ¿Are you sure to delete the data?"
  );
  if (resp) {
    rutina.value = [];
    localStorage.setItem("Ejercicios", JSON.stringify(rutina.value));
    return;
  }
};

rutina.value = JSON.parse(localStorage.getItem("Ejercicios")) || [];
</script>

<template>
  <div class="p-5 min-h-screen bg-gray-100">
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
      <div>
        <h2 class="text-2xl text-white font-semibold">#AFRJ</h2>
      </div>
    </div>
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
      <ul class="flex-col min-w-full">
        <li
          class="flex items-center mt-4 transition-all hover:scale-95 hover:shadow-lg p-5 min-w-full justify-between h-14"
          :class="routine.state === 'Completa' ? 'bg-green-300' : 'bg-red-300'"
          v-for="(routine, i) of rutina"
          :key="i"
        >
          <div>
            <span> {{ routine.exercise }} - {{ routine.state }} </span>
          </div>
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
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped></style>

<template>
  <option
    v-katex
    v-for="answerOption in answers"
    :key="answerOption.id"
    :value="answerOption.id"
  >
    <div>
      {{ answerOption.value }}
    </div>
  </option>
</template>

<script>
export default {
  props: ["answers"],
  data() {
    return {
      //   answers: [
      //     { value: "cat", id: 1, correct: true },
      //     { value: "dog", id: 1, correct: true },
      //     { value: "hare", id: 1, correct: true },
      //   ],
    };
  },
  methods: {
    parseText() {
      return "answers ";
    },
  },
};
</script>

<style></style>

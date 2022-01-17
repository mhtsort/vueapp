<template>
  <div>
    <h2>{{ q.question }}</h2>
    <div>
      <div class="answer" v-for="answer in q.answers" :key="answer.id">
        {{ answer.value }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["questionObject"],
  data() {
    return {
      q: this.questionObject,
    };
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=STIX+Two+Text:ital,wght@0,400;0,500;0,600;1,400;1,500;1,600&display=swap");
* {
  font-family: "STIX Two Text", Cambria, Cochin, Georgia, Times,
    "Times New Roman", serif;
}
</style>

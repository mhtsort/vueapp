<template>
  <div id="editor">
    <!-- <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.7.1/katex.min.css"
    />
    <script src="https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.7.1/katex.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.7.1/contrib/auto-render.min.js"></script> -->
    <h1>Editor panel</h1>
    <div class="env">
      <div id="text-area-container">
        <!-- TEXT EDITOR AREA -->
        <textarea
          defaultValue="Question###ans###ans"
          v-model="rawtext"
          @input="parseInput(rawtext)"
        >
        </textarea>
        <!-- QUESTION DISPLAY AREA -->

        <div id="questiondDisplay" v-html="questionText"></div>

        <!-- SELECT CORRECT ANSWER -->
        <select
          id="correctSelector"
          v-model="correct"
          multiple
          @change="setCorrectValues"
        >
          <app-choices :answers="ans"></app-choices>
        </select>
        <!-- QUESTION ID -->
        <div>
          <label for="questionDisplay">Question ID: </label>
          <input
            id="question-ID"
            type="text"
            defaultValue="Goofy"
            v-model="questionIDinput"
          />
        </div>
        <!-- SUBMIT BUTTON -->
        <button id="submit" @click="submit">
          <div style="margin: 0px auto">Submit</div>
        </button>
      </div>
    </div>
    <div class="debug">
      {{ ans }} the correct is {{ correct }} id is {{ questionID }}
    </div>
    <div id="text-area-result"></div>
    <div id="el"><span>$$2+\frac{1}{x}$$</span></div>
    <!-- <script>
      // renderMathInElement(document.body);
    </script> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      rawtext: "",
      questionText: "",
      ans: [],
      correct: [],
      submitted: [],
      questionIDinput: "",
    };
  },
  computed: {
    questionID: {
      get() {
        if (this.questionIDinput) {
          //if input textbox is not empty get this value
          return this.questionIDinput;
        } else {
          //else put something random --TODO CHECK IF EXISTS
          let idd = this.makeid(8);
          return idd;
        }
      },
      set(val) {
        this.value = val;
      },
    },
  },
  methods: {
    parseInput: function (text) {
      //Parse text input to extract question object
      const answerArray = text.split("###"); //Split text question ###answer1 ###answer2 ...
      const questionText = answerArray.shift(); //Get question text --TODO accept drag and drop?
      this.questionText = questionText; //update question text --TODO PRETTY PRINT MIME TYPES (image,pdf...)
      let answers = [];
      let counter = 0;
      for (let answer of answerArray) {
        answers.push({ value: answer, id: ++counter, correct: false });
      }
      console.log(questionText + answers);
      this.ans = answers; //answers;
    },
    makeid(length) {
      var result = "";
      var characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      var charactersLength = characters.length;
      for (var i = 0; i < length; i++) {
        result += characters.charAt(
          Math.floor(Math.random() * charactersLength)
        );
      }
      return result;
    },
    setCorrectValues: function () {
      //set the values of right or wrong answers
      this.ans = this.ans.map((x) => {
        if (this.correct.includes(x.id)) {
          //if id in correct array
          x.correct = true;
        } else {
          x.correct = false;
        }
        return x;
      });
      console.log(this.ans);
    },
    buildQuestion: function () {
      //build the question object to be submitted
      const payload = {
        id: this.questionID,
        question: this.questionText,
        answers: this.ans,
      };
      return payload;
    },
    postToServer: function (payload) {
      //post question to server
      const payloadToString = JSON.stringify(payload);
      console.log(`Posting to server:${payloadToString}`);
      this.submitted.push(payload);
      sessionStorage.setItem("sessionQuestions", this.submitted); //save to session storage
    },
    resetEditor() {
      this.rawtext = "";
      this.questionText = "";
      this.ans = [];
      this.correct = [];
      this.questionIDinput = "";
    },
    submit: function () {
      //submit button
      //create payload
      const payload = this.buildQuestion();
      //clear area
      //POST to server
      this.postToServer(payload);
      this.resetEditor();
      //pretty print TODO
    },
  },
};
</script>

<style>
textarea {
  background-color: var(--white);
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  font-size: x-large;
  margin-bottom: -1px;
  /* Do not resize */
  resize: none;
}

.env {
  height: 80vh;
  border: 3px salmon solid;
}
/* Grid column container */
#text-area-container {
  border: 15px solid var(--dark);
  box-shadow: 20px 20px 10px #6c7a89;
  border-radius: 10px;
  min-width: 60%;
  min-height: 80%;
  margin: 0pt auto;
  display: grid;
  grid-template-rows: 30% 30% auto auto;
}
/* Submit button */
#submit {
  margin-left: 2xp;
  margin-right: 2px;
  background-color: var(--darker);
  color: var(--white);
  font-weight: bolder;
  font-size: x-large;
  padding-top: 20px;
  padding-bottom: 20px;
  align-self: stretch;
}
#correctSelector {
  align-self: stretch;
}
select option {
  background-color: var(--white);
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  font-size: x-large;
}
/* QUESTION DISPLAY */
#questiondDisplay {
  align-self: stretch;
}
#question-ID {
  justify-self: left;
  background-color: var(--white);
  max-height: 2rem;
}
</style>

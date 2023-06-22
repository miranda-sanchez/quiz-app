// References
const startScreen = document.querySelector(".startScreen");
const startButton = document.getElementById("startButton");
//
const displayContainer = document.getElementById("displayContainer");
let numberOfQuestion = document.querySelector(".numberOfQuestion");
let timeLeft = document.querySelector(".timeLeft");
let quizContainer = document.getElementById("quizContainer");
let nextButton = document.getElementById("nextButton");
//
let scoreContainer = document.querySelector(".scoreContainer");
let userScore = document.getElementById("userScore");
let restartButton = document.getElementById("restartButton");
//
let questionCount; // The number of card, which consists of the question and the options
let scoreCount = 0;
let count = 61;
let countdown;

// Instructions
window.addEventListener("load", function () {
  setTimeout(function open(event) {
    document.getElementById("instructions").style.display = "block";
  }, 1000);
});

// Close instructions
const close = document.getElementById("close");
close.addEventListener("click", function () {
  document.getElementById("instructions").style.display = "none";
});

//Got it
const gotIt = document.getElementById("gotIt");
gotIt.addEventListener("click", function () {
  document.getElementById("instructions").style.display = "none";
});

// Question and option array
const quizArray = [
  {
    id: "0",
    question: "To succeed in avoiding punishment for something",
    options: ["Get away with", "Look over", "Get out of", "Take up on"],
    correct: "Get away with",
  },
  {
    id: "01",
    question: "To cause something to happen",
    options: ["Bring in", "Get around", "Take down", "Bring about"],
    correct: "Bring about",
  },
  {
    id: "02",
    question:
      "To feel that someone is less important than you or does not deserve respect",
    options: ["Take aside", "Look upon/on", "Make up", "Look down on"],
    correct: "Look down on",
  },
  {
    id: "03",
    question:
      "To invent something, such as an excuse or a story, often in order to deceive",
    options: ["Take out", "Put down", "Make up", "Put up"],
    correct: "Make up",
  },
  {
    id: "04",
    question:
      "To state an idea or opinion, or to suggest a plan or person, for other people to consider",
    options: ["Put down", "Put forward", "Put up", "Put across"],
    correct: "Put forward",
  },
  {
    id: "05",
    question:
      "To think about what will happen in the future and plan for these events",
    options: ["Look through", "Let alone", "Look ahead", "Look forward"],
    correct: "Look ahead",
  },
  {
    id: "06",
    question:
      "To be similar to an older member of your family in appearance or character",
    options: ["Look out", "Take on", "Take after", "Look at"],
    correct: "Take after",
  },
  {
    id: "07",
    question: "To happen or to continue",
    options: ["Go for", "Go on", "Go back", "Go along with"],
    correct: "Go on",
  },
  {
    id: "08",
    question: "To criticize a person repeatedly",
    options: ["Get at", "Take aside", "Look down on", "Bring down"],
    correct: "Get at",
  },
  {
    id: "09",
    question:
      "To influence a person illegally, usually by offering them money or threatening them",
    options: ["Get at", "Bring round", "Go back", "Look up to"],
    correct: "Get at",
  },
  {
    id: "10",
    question: "To make someone become conscious again",
    options: ["Bring back", "Bring along", "Bring up", "Bring around"],
    correct: "Bring around",
  },
];

//Restart quiz
restartButton.addEventListener("click", () => {
  initial();
  displayContainer.classList.remove("hide");
  scoreContainer.classList.add("hide");
});

// Go to the following card
nextButton.addEventListener(
  "click",
  (displayNext = () => {
    // Increment questionCount
    questionCount += 1;
    if (questionCount == quizArray.length) {
      // Display score and hide question container
      displayContainer.classList.add("hide");
      scoreContainer.classList.remove("hide");
      // User score
      userScore.innerHTML =
        "Your score is " + scoreCount + " out of " + questionCount;
    } else {
      // Display questionCount
      numberOfQuestion.innerHTML =
        questionCount + 1 + " out of " + quizArray.length + " questions";
      // Display quiz
      quizDisplay(questionCount);
      count = 61;
      clearInterval(countdown);
      timerDisplay();
    }
  })
);

//Timer
const timerDisplay = () => {
  countdown = setInterval(() => {
    count--;
    timeLeft.innerHTML = `${count}s`;
    if (count == 0) {
      clearInterval(countdown);
      displayNext();
    }
  }, 1000);
};

// Display quiz
const quizDisplay = (questionCount) => {
  let quizCards = document.querySelectorAll(".containerMid");
  // Hide other cards
  quizCards.forEach((card) => {
    card.classList.add("hide");
  });
  // Display the card of the current question
  quizCards[questionCount].classList.remove("hide");
};

// Create quiz
function quizCreator() {
  // Randomly sort questions
  quizArray.sort(() => Math.random() - 0.5);
  // Generate quiz
  for (let i of quizArray) {
    // Randomly sort options
    i.options.sort(() => Math.random() - 0.5);
    // Quiz card creation
    let div = document.createElement("div");
    div.classList.add("containerMid", "hide");
    // Question number
    numberOfQuestion.innerHTML =
      1 + " out of " + quizArray.length + " questions";
    // Question
    let questionDiv = document.createElement("p");
    questionDiv.classList.add("question");
    questionDiv.innerHTML = i.question;
    div.appendChild(questionDiv);
    // Options
    div.innerHTML += `
    <button class="optionDiv" onclick="checker(this)">${i.options[0]}</button>
    <button class="optionDiv" onclick="checker(this)">${i.options[1]}</button>
    <button class="optionDiv" onclick="checker(this)">${i.options[2]}</button>
    <button class="optionDiv" onclick="checker(this)">${i.options[3]}</button>
    `;
    quizContainer.appendChild(div);
  }
}

// Check if the option is correct
function checker(userOption) {
  let userSolution = userOption.innerText;
  let question = document.getElementsByClassName("containerMid")[questionCount];
  let options = question.querySelectorAll(".optionDiv");
  // If the user clicked answer == correct option is stored in object
  if (userSolution === quizArray[questionCount].correct) {
    userOption.classList.add("correct");
    scoreCount++;
  } else {
    userOption.classList.add("incorrect");
    //For marking the correct option
    options.forEach((element) => {
      if (element.innerText == quizArray[questionCount].correct) {
        element.classList.add("correct");
      }
    });
  }
  // Clear interaval to stop the timer
  clearInterval(countdown);
  // Disable all options when there is no time left
  options.forEach((element) => {
    element.disabled = true;
  });
}

// Initial setup
function initial() {
  quizContainer.innerHTML = "";
  questionCount = 0;
  scoreCount = 0;
  count = 60;
  clearInterval(countdown);
  timerDisplay();
  quizCreator();
  quizDisplay(questionCount);
}

// Hide quiz and display start screen
window.onload = () => {
  startScreen.classList.remove("hide");
  displayContainer.classList.add("hide");
};

// Upon click on "start" button
startButton.addEventListener("click", () => {
  startScreen.classList.add("hide");
  displayContainer.classList.remove("hide");
  initial();
});

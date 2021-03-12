const questionHolder = document.getElementById("question-holder");
const questionInput = document.getElementById("question-input");
const addedByInput = document.getElementById("by-input");
const formMessage = document.getElementById("form-message");
const addContainer = document.getElementById("add-container");
const inputContainer = document.getElementById("input-container");
const infoContainer = document.getElementById("info-container");

function openAddContainer() {
  addContainer.classList.toggle("hidden");
}

function showInfo() {
  infoContainer.classList.toggle("hidden");
}

//Get random checkin question from google sheet
function getRandomQuestion() {
  fetch("https://sheet.best/api/sheets/4f03694e-3864-469d-8873-94f1fd604bde")
    .then((response) => response.json())
    .then((data) => {
      const random = Math.floor(Math.random() * data.length);
      questionHolder.innerText = data[random].text;
      console.log(data.length);
      data.forEach(function (question) {
        console.log(question.text);
      });
    })
    .catch((error) => {
      alert(
        "Sorry, we are out of requests. I will go and grab 500 more. Come back next month!"
      );
      console.error(error);
    });
}

// Post question to google sheet
function addQuestion() {
  fetch("https://sheet.best/api/sheets/4f03694e-3864-469d-8873-94f1fd604bde", {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify([
      {
        text: questionInput.value,
        by: addedByInput.value,
        created: new Date(),
      },
    ]),
  })
    .then((r) => r.json())
    .then((data) => {
      alert(
        "Your awesome check in question was added successfully, thank you!"
      );
    })
    .catch((error) => {
      alert(
        "Sorry, we are out of requests. I will go and grab 500 more. Come back next month!"
      );
      console.log(error);
    });
  questionInput.value = "";
  addedByInput.value = "";
  setTimeout(function () {
    addContainer.classList.add("hidden");
  }, 2000);
}

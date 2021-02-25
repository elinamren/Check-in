const questionHolder = document.getElementById("question-holder");
const questionInput = document.getElementById("question-input");
const addedByInput = document.getElementById("by-input");
const formMessage = document.getElementById("form-message");

//Get random checkin question
function getRandomQuestion() {
  fetch("https://sheet.best/api/sheets/4f03694e-3864-469d-8873-94f1fd604bde")
    .then((response) => response.json())
    .then((data) => {
      const random = Math.floor(Math.random() * data.length);
      questionHolder.innerText = data[random].text;
      console.log(data);
    })
    .catch((error) => {
      alert(
        "Sorry, we are out of requests. I will go and grab 500 more. Come back next month!"
      );
      console.error(error);
    });
}

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
      },
    ]),
  })
    .then((r) => r.json())
    .then((data) => {
      formMessage.innerText =
        "Your awesome Check in question was added successfully, thank you!";
      console.log(data);
    })
    .catch((error) => {
      alert(
        "Sorry, we are out of requests. I will go and grab 500 more. Come back next month!"
      );
      console.log(error);
    });
  questionInput.value = "";
  addedByInput.value = "";
}

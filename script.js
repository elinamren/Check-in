const questionHolder = document.getElementById("question-holder");
const questionInput = document.getElementById("question-input");
const addedByInput = document.getElementById("by-input");
const formMessage = document.getElementById("form-message");
const addContainer = document.getElementById("add-container");
const messageContainer = document.getElementById("message-container");
const infoContainer = document.getElementById("info-container");

function openAddContainer() {
  addContainer.classList.toggle("hidden");
}

function showInfo() {
  infoContainer.classList.toggle("hidden");
}

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
      messageContainer.classList.remove("hidden");

      formMessage.innerText =
        "Your awesome check in question was added successfully, thank you!";
      console.log(data);
    })
    .catch((error) => {
      alert(
        "Sorry, we are out of requests. I will go and grab 500 more. Come back next month!"
      );
      console.log(error);
    });
  setTimeout(function () {
    addContainer.classList.add("hidden");
    messageContainer.classList.add("hidden");
  }, 3000);
}

// Style button

document.querySelectorAll("button").forEach((btn) =>
  btn.addEventListener("mousedown", function (e) {
    gsap.to(btn, { duration: 0.1, scale: 0.9 });
  })
);

document.querySelectorAll("button").forEach((btn) =>
  btn.addEventListener("mouseup", function (e) {
    gsap.to(btn, {
      duration: 0.5,
      scale: 1,
      ease: Elastic.easeOut.config(1, 0.2),
    });
  })
);

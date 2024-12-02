"use strict";

// pre form
document.addEventListener("DOMContentLoaded", () => {
  const button = document.getElementById("button01");
  const longText = document.getElementById("long-text1");
  const contentArea = document.getElementById("content-area");
  const form = document.getElementById("form-wrapper");

  let clickCount = 0;

  button.addEventListener("click", () => {
    if (clickCount === 0) {
      button.textContent = "Bekreft"; // Change button text
      longText.textContent = "Denne nedlastingen inneholder vokseninnhold. For å laste den ned, må du bekrefte at du er 18 år eller eldre.";
      clickCount++;
    } else if (clickCount === 1) {
      form.style.display = "block";
      contentArea.style.display = "none";
    }
  });
});

// pre form


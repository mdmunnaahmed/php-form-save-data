"use strict";

// pre form
document.addEventListener("DOMContentLoaded", () => {
  const button = document.getElementById("button01");
  const longText = document.getElementById("long-text3");
  const contentArea = document.getElementById("form-wrapper-two");
  const form = document.getElementById("form-wrapper");

  let clickCount = 0;

  button.addEventListener("click", () => {
    if (clickCount === 0) {
      button.textContent = "Bekreft"; // Change button text
      longText.style.display = 'block'
      clickCount++;
    } else if (clickCount === 1) {
      form.style.display = "block";
      contentArea.style.display = "none";
    }
  });
});

// pre form


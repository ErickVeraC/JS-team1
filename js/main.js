import { addTag } from "./tags.js";

document.addEventListener("DOMContentLoaded", () => {
  const tagsInput = document.getElementById("tagsInput");
  const tagsContainer = document.getElementById("tagsContainer");

  tagsInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      addTag(tagsInput.value, tagsContainer);
      tagsInput.value = "";
    }
  });
});

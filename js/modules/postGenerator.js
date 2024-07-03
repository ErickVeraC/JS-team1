const addTag = (tag, tagsContainer) => {
  if (tag.trim() === "") return;

  let tagElement = document.createElement("span");
  tagElement.className = "badge bg-secondary me-2";
  tagElement.innerText = `#${tag.trim()}`;

  let removeButton = document.createElement("button");
  removeButton.className = "btn-close btn-close-white ms-2";
  removeButton.type = "button";
  removeButton.ariaLabel = "Close";
  removeButton.addEventListener("click", () => {
    tagsContainer.removeChild(tagElement);
  });

  tagElement.appendChild(removeButton);
  tagsContainer.appendChild(tagElement);
};

export { addTag };

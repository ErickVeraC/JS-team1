import { addTag, publishPost } from "./tags.js";
import { createPost, getAllPosts, updatePost, deletePost } from "./postsApi.js";

document.addEventListener("DOMContentLoaded", () => {
  const tagsInput = document.getElementById("tagsInput");
  const tagsContainer = document.getElementById("tagsContainer");
  const addCoverImageButton = document.getElementById("addCoverImageButton");
  const coverImageUrl = document.getElementById("coverImageUrl");

  tagsInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      addTag(tagsInput.value, tagsContainer);
      tagsInput.value = "";
    }
  });

  addCoverImageButton.addEventListener("click", () => {
    coverImageUrl.style.display =
      coverImageUrl.style.display === "none" ? "block" : "none";
  });
});

import { createPost, getAllPosts, updatePost, deletePost } from "./postApi.js";
import { addTag } from "./postGenerator.js";

document
  .getElementById("publishPost")
  .addEventListener("click", async (event) => {
    event.preventDefault();

    const postObject = {
      image: document.getElementById("postImage").value,
      title: document.getElementById("postTitle").value,
      tags: tagsArray,
      content: document.getElementById("postAbout").value,
      author: document.getElementById("postAuthor").value,
    };

    await createPost(postObject);
    console.log("Published");
  });

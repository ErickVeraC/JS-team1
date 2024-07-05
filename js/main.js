import { getAllPosts } from "./postsApi.js";
import { renderPosts } from "./printAllPosts.js";

document.addEventListener("DOMContentLoaded", async () => {
  const postsContainer = document.getElementById("postsContainer");
  const posts = await getAllPosts();
  renderPosts(posts, postsContainer);
});

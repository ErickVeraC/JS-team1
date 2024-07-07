import {
  getAllPosts,
  updateLikes,
  addCommentToPost,
  getPostById,
  addLikeToPost,
} from "./postsApi.js";

// Función para imprimir un solo post
const printOnePost = async (postId) => {
  const post = await getPostById(postId);
  if (!post) {
    console.error("Post not found");
    return;
  }

  const printPost = document.getElementById("printPost");

  // Crear elementos de la tarjeta
  const card = document.createElement("div");
  card.classList.add("card", "mb-3");

  const cardImg = document.createElement("img");
  cardImg.src = post.picSource;
  cardImg.classList.add("card-img-top");
  cardImg.alt = "Imagen del post";
  card.appendChild(cardImg);

  const cardBody = document.createElement("div");
  cardBody.classList.add("card-body");

  const user = document.createElement("h6");
  user.textContent = post.user;
  cardBody.appendChild(user);

  const timestamp = document.createElement("p");
  timestamp.textContent = new Date(post.timestamp).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
  cardBody.appendChild(timestamp);

  const title = document.createElement("h2");
  title.textContent = post.title;
  cardBody.appendChild(title);

  const tagsContainer = document.createElement("div");
  post.tags.forEach((tag) => {
    const tagElement = document.createElement("a");
    tagElement.href = "#";
    tagElement.className = "tag-link text-secondary";
    tagElement.textContent = `#${tag.replace(/^#/, "")}`;
    tagElement.style.color = getRandomColor();
    tagsContainer.appendChild(tagElement);
  });
  cardBody.appendChild(tagsContainer);

  const abstract = document.createElement("p");
  abstract.textContent = post.abstract;
  cardBody.appendChild(abstract);

  const commentInput = document.createElement("input");
  commentInput.type = "text";
  commentInput.className = "form-control mt-3";
  commentInput.placeholder = "Add to the discussion";
  cardBody.appendChild(commentInput);

  const commentsContainer = document.createElement("div");
  commentsContainer.className = "bg-secondary p-3 mt-3";
  if (post.comments) {
    post.comments.forEach((comment) => {
      const commentText = document.createElement("p");
      commentText.textContent = `${comment.user}: ${comment.text}`;
      commentsContainer.appendChild(commentText);
    });
  }
  cardBody.appendChild(commentsContainer);

  card.appendChild(cardBody);
  printPost.appendChild(card);
};

document.addEventListener("DOMContentLoaded", async () => {
  // Obtener el ID del post desde la URL
  const postId = new URLSearchParams(window.location.search).get("id");

  if (postId) {
    // Llamar a printOnePost para cargar y mostrar el post
    await printOnePost(postId);
  }
});

// Función para generar colores aleatorios
const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

// printAllPosts.js

import {
  getAllPosts,
  updateLikes,
  addCommentToPost,
  getPostById,
  addLikeToPost,
} from "./postsApi.js";

// Función para mostrar las etiquetas en el contenedor
const renderTags = (tags, tagsContainer) => {
  tags.forEach((tag) => {
    const tagElement = document.createElement("a");
    tagElement.href = "#";
    tagElement.className = "tag-link text-secondary";
    tagElement.textContent = `#${tag.replace(/^#/, "")}`;
    tagElement.style.textDecoration = "none";
    tagsContainer.appendChild(tagElement);
  });
};

// Función para crear una card
const createCard = (post, isFirst) => {
  const cardLink = document.createElement("div");
  cardLink.style.width = "100%";
  cardLink.className = "card mb-3";
  cardLink.style.textDecoration = "none";

  const cardImg = document.createElement("img");
  cardImg.src = post.picSource;
  cardImg.className = "card-img-top img-fluid";
  cardImg.alt = post.title;
  cardImg.classList.add("card-box");

  if (!isFirst) {
    cardImg.style.display = "none";
  } else {
    cardImg.style.width = "100%";
    cardImg.style.margin = "0";
    cardImg.style.padding = "0";
  }

  const cardBody = document.createElement("div");
  cardBody.className = "card-body";
  cardBody.style.height = "auto";

  // Lógica para añadir la imagen al principio del cardBody si es el primer elemento
  if (isFirst) {
    cardBody.appendChild(cardImg);
  }

  const authorAndDate = document.createElement("div");
  const author = document.createElement("small");
  author.className = "text-muted fw-bold d-block";
  author.textContent = post.user;
  const date = document.createElement("small");
  date.className = "text-muted d-block";
  date.textContent = new Date(post.timestamp).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });

  authorAndDate.appendChild(author);
  authorAndDate.appendChild(date);

  const cardTitle = document.createElement("a");
  cardTitle.href = `generalPost.html?id=${post.id}`;
  cardTitle.className = "card-title h5 my-3";
  cardTitle.textContent = post.title;
  cardTitle.addEventListener("mouseover", () => {
    cardTitle.style.color = "blue";
  });
  cardTitle.addEventListener("mouseout", () => {
    cardTitle.style.color = "black";
  });
  cardTitle.style.textDecoration = "none";
  cardTitle.style.display = "block";

  const tagsContainer = document.createElement("div");
  tagsContainer.className = "mb-2";
  renderTags(post.tags, tagsContainer);

  const cardText = document.createElement("p");
  cardText.className = "card-text";
  cardText.textContent =
    post.abstract.split(" ").slice(0, 12).join(" ") + "...";
  cardText.style.textDecoration = "none";

  const likeButton = document.createElement("button");
  likeButton.className = "btn me-2";
  likeButton.innerHTML = "&#x1F44D;";
  likeButton.addEventListener("click", async () => {
    try {
      await addLikeToPost(post.id);
      post.likes++;
      likeCount.textContent = `${post.likes} Likes`;
    } catch (error) {
      console.error("Error al agregar like:", error);
    }
  });

  const likeCount = document.createElement("span");
  likeCount.className = "align-self-center";
  likeCount.textContent = `${post.likes} Likes`;

  const commentButton = document.createElement("button");
  commentButton.className = "btn btn-outline-secondary border-0";
  commentButton.textContent = "Comentar";
  commentButton.addEventListener("click", () => {
    const commentInput = document.createElement("input");
    commentInput.type = "text";
    commentInput.className = "form-control mt-2";
    commentInput.placeholder = "Escribe tu comentario...";
    commentInput.addEventListener("keydown", async (event) => {
      if (event.key === "Enter" && commentInput.value.trim() !== "") {
        const comment = {
          user: "Usuario",
          text: commentInput.value.trim(),
          timestamp: new Date().toISOString(),
        };
        try {
          await addCommentToPost(post.id, comment);
          renderComments(post, commentsContainer);
          commentInput.remove();
        } catch (error) {
          console.error("Error al agregar comentario:", error);
        }
      }
    });
    cardBody.appendChild(commentInput);
  });

  const interactionContainer = document.createElement("div");
  interactionContainer.className = "d-flex justify-content-around mb-2";
  interactionContainer.appendChild(likeButton);
  interactionContainer.appendChild(likeCount);
  interactionContainer.appendChild(commentButton);

  const commentsContainer = document.createElement("div");
  commentsContainer.className = "mt-2";

  const renderComments = (post, container) => {
    container.innerHTML = "";
    post.comments.forEach((comment) => {
      const commentElement = document.createElement("div");
      commentElement.className = "mb-2";

      const commentText = document.createElement("p");
      commentText.textContent = `${comment.user}: ${comment.text}`;
      commentElement.appendChild(commentText);

      const commentDate = document.createElement("small");
      commentDate.className = "text-muted";
      commentDate.textContent = new Date(comment.timestamp).toLocaleDateString(
        "en-US",
        {
          month: "short",
          day: "numeric",
        }
      );
      commentElement.appendChild(commentDate);

      container.appendChild(commentElement);
    });
  };

  renderComments(post, commentsContainer);

  cardBody.appendChild(authorAndDate);
  cardBody.appendChild(cardTitle);
  cardBody.appendChild(tagsContainer);
  cardBody.appendChild(interactionContainer);
  cardBody.appendChild(cardText);
  cardBody.appendChild(commentsContainer);
  cardLink.appendChild(cardBody);

  return cardLink;
};

const renderPosts = (posts, postsContainer) => {
  postsContainer.innerHTML = "";
  posts.forEach((post, index) => {
    // Se incluye index para determinar isFirst
    post.likes = post.likes || 0;
    post.comments = post.comments || [];
    const card = createCard(post, index === 0); // Pasar isFirst como true si es el primer post
    postsContainer.appendChild(card);
  });
};

document.addEventListener("DOMContentLoaded", async () => {
  const postId = getPostIdFromUrl();
  if (postId) {
    const postContainer = document.getElementById("postContainer");
    await loadPost(postId, postContainer);
  }
});

const sortPosts = {
  relevant: (posts) => {
    return posts.sort((a, b) => {
      if (a.comments && b.comments) {
        return b.comments.length - a.comments.length;
      }
      return 0;
    });
  },
  latest: (posts) => {
    return posts.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  },
  top: (posts) => {
    return posts.sort((a, b) => b.likes - a.likes);
  },
};

const handleSort = async (sortType, postsContainer) => {
  try {
    const posts = await getAllPosts();
    const sortedPosts = sortPosts[sortType](posts);
    renderPosts(sortedPosts, postsContainer);
  } catch (error) {
    console.error("Error al ordenar y renderizar los posts:", error);
  }
};

// Función para obtener el ID del post desde la URL
const getPostIdFromUrl = () => {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get("id");
};

// Función para cargar y mostrar un solo post
const loadPost = async (postId, postContainer) => {
  try {
    const post = await getPostById(postId);
    if (post) {
      const card = createCard(post, true); // Pasar true para asegurar que la imagen se muestre
      postContainer.appendChild(card);
    } else {
      console.error(`No se encontró el post con ID: ${postId}`);
    }
  } catch (error) {
    console.error("Error al cargar el post:", error);
  }
};

export { renderPosts, handleSort, getPostIdFromUrl, loadPost };

import {
  getAllPosts,
  updateLikes,
  addCommentToPost,
  getPostByTitle,
  addLikeToPost, // Asegúrate de importar getPostByTitle si lo necesitas
} from "./postsApi.js";

// Función para mostrar las etiquetas en el contenedor
const renderTags = (tags, tagsContainer) => {
  tags.forEach((tag) => {
    const tagElement = document.createElement("a");
    tagElement.href = "#"; // Aquí es donde puedes poner el link para la página de tags
    tagElement.className = "tag-link";
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

  const authorAndDate = document.createElement("div");
  const author = document.createElement("small");
  author.className = "text-muted fw-bold";
  author.textContent = post.user;
  const date = document.createElement("small");
  date.className = "text-muted ms-2";
  date.textContent = new Date(post.timestamp).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });

  authorAndDate.appendChild(author);
  authorAndDate.appendChild(date);

  const cardTitle = document.createElement("h5");
  cardTitle.className = "card-title";
  cardTitle.textContent = post.title;
  cardTitle.addEventListener("mouseover", () => {
    cardTitle.style.color = "blue";
  });
  cardTitle.addEventListener("mouseout", () => {
    cardTitle.style.color = "black";
  });
  cardTitle.style.textDecoration = "none";

  const tagsContainer = document.createElement("div");
  tagsContainer.className = "mb-2";
  renderTags(post.tags, tagsContainer);

  const cardText = document.createElement("p");
  cardText.className = "card-text";
  cardText.textContent =
    post.abstract.split(" ").slice(0, 12).join(" ") + "...";
  cardText.style.textDecoration = "none";

  // Botón de Like
  const likeButton = document.createElement("button");
  likeButton.className = "btn btn-outline-primary me-2";
  likeButton.innerHTML = "&#x1F44D;"; // Emoji de pulgar hacia arriba
  likeButton.addEventListener("click", async () => {
    try {
      // Llamar a la función para agregar like
      await addLikeToPost(post.id); // Incrementa el contador de likes
      post.likes++; // Actualiza localmente el contador de likes
      likeCount.textContent = `${post.likes} Likes`; // Actualiza el texto del conteo de likes
    } catch (error) {
      console.error("Error al agregar like:", error);
    }
  });

  // Contador de Likes
  const likeCount = document.createElement("span");
  likeCount.textContent = `${post.likes} Likes`;

  // Contenedor de Botones de Like y Comentarios
  const interactionContainer = document.createElement("div");
  interactionContainer.className = "btn btn-outline-primary me-2 border-0";
  interactionContainer.appendChild(likeButton);
  interactionContainer.appendChild(likeCount);

  // Botón de Comentario y Campo de Texto para Comentarios
  const commentButton = document.createElement("button");
  commentButton.className = "btn btn-outline-secondary border-0";
  commentButton.textContent = "Comentar";
  commentButton.addEventListener("click", () => {
    // Abrir campo de texto para comentarios
    const commentInput = document.createElement("input");
    commentInput.type = "text";
    commentInput.className = "form-control mt-2";
    commentInput.placeholder = "Escribe tu comentario...";
    commentInput.addEventListener("keydown", async (event) => {
      if (event.key === "Enter" && commentInput.value.trim() !== "") {
        const comment = {
          user: "Usuario", // Cambia esto por el usuario actual o lógica de usuario
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

  const commentsContainer = document.createElement("div");
  commentsContainer.className = "mt-2";

  // Función para renderizar comentarios
  const renderComments = (post, container) => {
    container.innerHTML = ""; // Vacía el contenedor de comentarios

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

  // Mostrar comentarios existentes
  renderComments(post, commentsContainer);

  cardBody.appendChild(authorAndDate);
  cardBody.appendChild(cardTitle);
  cardBody.appendChild(tagsContainer);
  cardBody.appendChild(cardText);
  cardBody.appendChild(interactionContainer);
  cardBody.appendChild(commentButton);
  cardBody.appendChild(commentsContainer);
  cardLink.appendChild(cardImg);
  cardLink.appendChild(cardBody);

  return cardLink;
};

// Función para renderizar todos los posts
const renderPosts = async () => {
  try {
    const posts = await getAllPosts();
    const container = document.getElementById("postsContainer"); // Asegúrate de que container sea el elemento correcto en tu HTML
    if (!container) {
      console.error("No se encontró el contenedor de posts en el DOM.");
      return;
    }
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
    let isFirst = true;
    posts.forEach((post) => {
      post.likes = post.likes || 0;
      post.comments = post.comments || [];
      const card = createCard(post, isFirst);
      container.appendChild(card);
      isFirst = false;
    });
  } catch (error) {
    console.error("Error al obtener los posts:", error);
  }
};

export { renderPosts };

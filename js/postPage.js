import { getPostById } from "./postsApi.js";

// Función para crear una card
const createCard = (post) => {
  const cardLink = document.createElement("div");
  cardLink.style.width = "100%";
  cardLink.className = "card mb-3";
  cardLink.style.textDecoration = "none";

  const cardImg = document.createElement("img");
  cardImg.src = post.picSource;
  cardImg.className = "card-img-top img-fluid";
  cardImg.alt = post.title;
  cardImg.style.width = "100%";
  cardImg.style.margin = "0";
  cardImg.style.padding = "0";

  const cardBody = document.createElement("div");
  cardBody.className = "card-body";
  cardBody.style.height = "auto";
  cardBody.appendChild(cardImg); // Añadir siempre la imagen al principio del cardBody

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

  // Añadir los elementos al cardBody
  cardBody.appendChild(authorAndDate);
  cardBody.appendChild(cardTitle);

  // Añadir cardBody al cardLink
  cardLink.appendChild(cardBody);

  return cardLink;
};

// Función para cargar y mostrar un solo post
const loadPost = async (postId, postContainer) => {
  try {
    const post = await getPostById(postId);
    if (post) {
      const card = createCard(post); // Pasar true para asegurar que la imagen se muestre
      postContainer.appendChild(card);
    } else {
      console.error(`No se encontró el post con ID: ${postId}`);
    }
  } catch (error) {
    console.error("Error al cargar el post:", error);
  }
};

export { loadPost };

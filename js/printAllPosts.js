// Función para mostrar las etiquetas en el contenedor
const renderTags = (tags, tagsContainer) => {
  tags.forEach((tag) => {
    const tagElement = document.createElement("a");
    tagElement.href = "#"; // Aquí es donde puedes poner el link para la página de tags
    tagElement.className = "tag-link bg-light";
    tagElement.textContent = `#${tag}`;
    tagsContainer.appendChild(tagElement);
  });
};

// Función para crear una card
const createCard = (post, isFirst) => {
  const cardLink = document.createElement("a");
  cardLink.href = "#"; // Aquí es donde puedes poner el link para la página del post
  cardLink.className = "card mb-3";
  cardLink.style.textDecoration = "none"; // Eliminar subrayado en los links

  const cardImg = document.createElement("img");
  cardImg.src = post.picSource;
  cardImg.className = "card-img-top img-fluid";
  cardImg.alt = post.title;

  if (!isFirst) {
    cardImg.style.display = "none";
  } else {
    cardImg.style.width = "100%"; // Asegura que la imagen ocupe todo el ancho de la card
  }

  const cardBody = document.createElement("div");
  cardBody.className = "card-body";

  const cardAuthor = document.createElement("small");
  cardAuthor.className = "text-muted fw-bold";
  cardAuthor.textContent = post.user;

  const cardDate = document.createElement("small");
  cardDate.className = "text-muted";
  const date = new Date(post.timestamp);
  const options = { month: "short", day: "numeric" };
  cardDate.textContent = date
    .toLocaleDateString("en-US", options)
    .toLowerCase();

  const cardTitle = document.createElement("h5");
  cardTitle.className = "card-title";
  cardTitle.textContent = post.title;

  // Agregar evento de cambio de color al pasar el mouse
  cardTitle.addEventListener("mouseover", () => {
    cardTitle.style.color = "blue"; // Cambiar color al pasar el mouse
  });
  cardTitle.addEventListener("mouseleave", () => {
    cardTitle.style.color = ""; // Volver al color original al salir del título
  });

  const tagsContainer = document.createElement("div");
  tagsContainer.className = "mb-2";
  renderTags(post.tags, tagsContainer);

  const cardText = document.createElement("p");
  cardText.className = "card-text";
  cardText.textContent =
    post.abstract.split(" ").slice(0, 12).join(" ") + "...";

  cardBody.appendChild(cardAuthor);
  cardBody.appendChild(document.createElement("br"));
  cardBody.appendChild(cardDate);
  cardBody.appendChild(cardTitle);
  cardBody.appendChild(tagsContainer);
  cardBody.appendChild(cardText);
  cardLink.appendChild(cardImg);
  cardLink.appendChild(cardBody);

  return cardLink;
};

export { createCard };

const renderPosts = (posts, container) => {
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }

  let isFirst = true;
  for (let key in posts) {
    const post = posts[key];
    const card = createCard(post, isFirst);
    container.appendChild(card);
    isFirst = false;
  }
};

export { renderPosts };

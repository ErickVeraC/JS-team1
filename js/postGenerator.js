import { createPost } from "./postsApi.js";

document.addEventListener("DOMContentLoaded", () => {
  const postForm = document.getElementById("post-form");
  const publishPostBtn = document.getElementById("save-post-btn");
  const tagsInput = document.getElementById("postTags");
  const tagsContainer = document.getElementById("tagsContainer");

  let postsObject = {};
  let tagsArray = [];

  // Función para generar un color aleatorio
  function getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  // Función para mostrar las etiquetas en el contenedor
  function renderTags() {
    // Vaciar el contenedor de etiquetas de forma segura
    while (tagsContainer.firstChild) {
      tagsContainer.removeChild(tagsContainer.firstChild);
    }

    tagsArray.forEach((tag, index) => {
      const tagElement = document.createElement("span");
      tagElement.className = "badge me-1";
      tagElement.style.backgroundColor = getRandomColor();
      tagElement.style.color = "white";
      tagElement.style.borderRadius = "0.25rem";
      tagElement.style.display = "inline-block";
      tagElement.style.margin = "0.2rem";
      tagElement.style.padding = "0.5rem 1rem";
      tagElement.style.textAlign = "center";

      const tagText = document.createElement("span");
      tagText.textContent = tag;
      tagElement.appendChild(tagText);

      const deleteButton = document.createElement("button");
      deleteButton.className = "btn-close ms-2";
      deleteButton.style.float = "none";
      deleteButton.addEventListener("click", () => {
        tagsArray.splice(index, 1);
        renderTags();
      });

      tagElement.appendChild(deleteButton);
      tagsContainer.appendChild(tagElement);
    });
  }

  // Manejar la entrada de tags
  tagsInput.addEventListener("keydown", (event) => {
    if (event.key === " ") {
      const tag = event.target.value.trim();
      if (tag && !tagsArray.includes(tag)) {
        tagsArray.push(tag);
        renderTags();
      }
      event.target.value = "";
      event.preventDefault(); // Evita que se añada un espacio en el input
    }
  });

  // Escuchar los cambios en los campos del formulario
  postForm.querySelectorAll("input, textarea").forEach((field) => {
    field.addEventListener("input", (event) => {
      let property = event.target.name;
      let value = event.target.value;
      postsObject[property] = value;
    });
  });

  // Manejar el evento de clic en el botón de publicar
  publishPostBtn.addEventListener("click", async () => {
    if (Object.keys(postsObject).length > 0) {
      if (tagsArray.length > 0) {
        postsObject.tags = tagsArray.map((tag) => `#${tag}`);
      }
      postsObject.timestamp = new Date().toLocaleString(); // Agrega la fecha y hora actual
      await createPost(postsObject); // Crea el post en la base de datos
      document.getElementById("success-message").classList.remove("d-none"); // Mostrar mensaje de éxito
      setTimeout(() => {
        document.getElementById("success-message").classList.add("d-none"); // Ocultar mensaje de éxito después de unos segundos
        window.location.href = "index.html"; // Redireccionar al documento index.html
      }, 3000);
    }
  });
});

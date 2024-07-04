import { createPost } from "./postsApi.js";

document.addEventListener("DOMContentLoaded", () => {
  const postForm = document.getElementById("post-form");
  const publishPostBtn = document.getElementById("save-post-btn");

  let postsObject = {};

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
      // Convertir la cadena de tags en un array separado por espacios
      if (postsObject.tags) {
        postsObject.tags = postsObject.tags.split(" ").map((tag) => tag.trim());
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

const BASE_URL = "https://js23-kodemia-default-rtdb.firebaseio.com/posts";

// Crear nuevos posts
const createPost = async (postObject) => {
  postObject.timestamp = new Date().toISOString(); // Agrega la fecha y hora actual
  let response = await fetch(`${BASE_URL}.json`, {
    method: "POST",
    body: JSON.stringify(postObject),
  });
  let data = await response.json();
  return data.name; // Devuelve la clave generada
};

export { createPost };

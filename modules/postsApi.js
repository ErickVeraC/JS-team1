const BASE_URL = "https://js23-kodemia-default-rtdb.firebaseio.com/posts";

const getAllPosts = async () => {
  let response = await fetch(`${BASE_URL}.json`);
  let data = await response.json();

  if (!data) return [];

  let keysArray = Object.keys(data);
  let postsArray = keysArray.map((key) => {
    return {
      id: key,
      ...data[key],
    };
  });

  return postsArray;
};

// Crear un post con marca de tiempo
const createPost = async (postObject) => {
  postObject.timestamp = new Date().toISOString();
  let response = await fetch(`${BASE_URL}.json`, {
    method: "POST",
    body: JSON.stringify(postObject),
    headers: {
      "Content-Type": "application/json",
    },
  });
  let data = await response.json();
  return data;
};

// Actualizar un post
const updatePost = async (postRef, newData) => {
  await fetch(`${BASE_URL}/${postRef}.json`, {
    method: "PATCH",
    body: JSON.stringify(newData),
    headers: {
      "Content-Type": "application/json",
    },
  });
};

// Eliminar un post
const deletePost = async (postRef) => {
  await fetch(`${BASE_URL}/${postRef}.json`, {
    method: "DELETE",
  });
};

export { createPost, getAllPosts, updatePost, deletePost };

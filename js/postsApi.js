const BASE_URL = "https://js23-kodemia-default-rtdb.firebaseio.com/posts";

const createPost = async (postObject) => {
  postObject.timestamp = new Date().toISOString();
  let response = await fetch(`${BASE_URL}.json`, {
    method: "POST",
    body: JSON.stringify(postObject),
  });
  let data = await response.json();
  return data.name;
};

const getAllPosts = async () => {
  let response = await fetch(`${BASE_URL}.json`);
  let data = await response.json();
  return Object.values(data);
};

const updateLikes = async (postId, newLikes) => {
  await fetch(`${BASE_URL}/${postId}/likes.json`, {
    method: "PUT",
    body: JSON.stringify(newLikes),
  });
};

const getPostByTitle = async (postTitle) => {
  let response = await fetch(`${BASE_URL}.json`);
  let data = await response.json();
  const posts = Object.values(data);
  return posts.find(
    (post) => post.title.toLowerCase() === postTitle.toLowerCase()
  );
};

const addLikeToPost = async (postId) => {
  try {
    let post = await getPostByTitle(postId);
    let { likes, id } = post; // Aquí asumo que postId es el título del post
    await updateLikes(id, likes + 1);
    console.log(`Likes actualizados para el post ${postId}.`);
  } catch (error) {
    console.error("Error al actualizar los likes:", error);
  }
};

const addCommentToPost = async (postId, comment) => {
  try {
    let post = await getPostByTitle(postId); // Aquí asumo que postId es el título del post
    if (!post.comments) {
      post.comments = [];
    }
    post.comments.push(comment);
    await fetch(`${BASE_URL}/${post.id}/comments.json`, {
      method: "POST",
      body: JSON.stringify(post.comments),
    });
    console.log(`Comentario agregado para el post ${postId}.`);
  } catch (error) {
    console.error("Error al agregar el comentario:", error);
  }
};

export {
  createPost,
  getAllPosts,
  updateLikes,
  getPostByTitle,
  addLikeToPost,
  addCommentToPost,
};

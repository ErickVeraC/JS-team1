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

export { createPost, getAllPosts };

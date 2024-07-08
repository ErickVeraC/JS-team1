import { getAllPosts } from "./postsApi.js";

const params = new URLSearchParams(window.location.search);
const tag = params.get("tag");
const postsContainer = document.getElementById("postsContainer");

const renderPosts = async (tag) => {
  const posts = await getAllPosts();
  const filteredPosts = posts.filter((post) => post.tags.includes(`#${tag}`));

  filteredPosts.forEach((post) => {
    const card = document.createElement("div");
    card.className = "card w-75 mb-3 mt-3";

    const cardBody = document.createElement("div");
    cardBody.className = "card-body";

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

    const cardTitle = document.createElement("h5");
    cardTitle.className = "card-title";
    cardTitle.textContent = post.title;

    const cardText = document.createElement("p");
    cardText.className = "card-text";
    cardText.textContent =
      post.abstract.split(" ").slice(0, 20).join(" ") + "...";

    const reactions = document.createElement("div");
    const likeCount = document.createElement("span");
    likeCount.className = "me-3";
    likeCount.textContent = `${post.likes || 0} Likes`;

    const commentCount = document.createElement("span");
    const numComments = post.comments ? post.comments.length : 0;
    commentCount.textContent =
      numComments === 1 ? "1 comentario" : `${numComments} comentarios`;

    reactions.appendChild(likeCount);
    reactions.appendChild(commentCount);

    cardBody.appendChild(authorAndDate);
    cardBody.appendChild(cardTitle);
    cardBody.appendChild(cardText);
    cardBody.appendChild(reactions);

    card.appendChild(cardBody);
    postsContainer.appendChild(card);
  });
};

if (tag) {
  renderPosts(tag);
} else {
  const messageElement = document.createElement("p");
  messageElement.textContent = "Please provide a tag in the URL.";
  postsContainer.appendChild(messageElement);
}

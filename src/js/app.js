import Post from "./components/post/Post";
import Comment from "./components/comment/Comment";
import Stream from "./components/api/Stream";

document.addEventListener("DOMContentLoaded", () => {
  const comment = new Comment();
  const stream = new Stream();
  const post = new Post(stream, comment);

  post.init();
});
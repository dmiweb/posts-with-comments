import "./Post.css";
import converterTimestamp from "../util/converterTimestamp";

export default class Post {
  constructor(stream, comment) {
    this.stream = stream;
    this.comment = comment;

    this.stream$ = this.stream.create();
  }

  static create(id, avatar, author, date, title, img) {
    return `
      <div id="${id}" class="post">
        <div class="post__header">
          <div class="post__author-avatar author-avatar">
            <img class="author-avatar__img" src="${avatar}">
          </div>
          <div class="post__info-bar info-bar">
            <div class="info-bar__author-name">${author}</div>
            <div class="info-bar__date-public">${date}</div>
          </div>
        </div>
        <div class="post__content post-content">
        <div class="post-content__title">${title}</div>
        <div class="post-content__img-wrap">
          <img class="post-content__img" src="${img}">
        </div>
        </div>
        <div class="post__comments comments">
          <h3 class="comments__header">Latest comments</h3>
          <div class="comments__container"></div>
          <button class="comments__load-more-btn">Load More</button>
        </div>
      </div>
    `;
  }

  renderPost() {
    this.stream$.subscribe((response) => {
      const postContainer = document.querySelector(".posts");
      const post = response.post;
      const comments = response.comments;
      const { id, avatar, author, title, image, created } = post;
      const date = converterTimestamp(created);

      postContainer.insertAdjacentHTML(
        "afterBegin",
        Post.create(id, avatar, author, date, title, image)
      );

      const posts = document.querySelectorAll(".post");

      posts.forEach((post) => {
        comments.forEach((comment) => {
          if (post.id === comment.post_id) {
            const postEl = document.getElementById(post.id);
            const commentContainer = postEl.querySelector(
              ".comments__container"
            );
            const { id, avatar, author, content, created } = comment;
            const date = converterTimestamp(created);

            commentContainer.insertAdjacentHTML(
              "afterBegin",
              this.comment.create(id, avatar, author, date, content)
            );
          }
        });
      });
    });
  }

  init() {
    this.renderPost();
  }
}

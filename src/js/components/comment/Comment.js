import "./Comment.css";

export default class Comment {
  
  create(id, avatar, author, date, content) {
    return `
      <div id="${id}" class="comment">
        <div class="comment__header">
          <div class="comment__avatar">
            <img class="comment__avatar-img" src="${avatar}">
          </div>
          <div class="comment__author">${author}</div>
          <div class="comment__date">${date}</div>
        </div>
       <div class="comment__content">${content}</div>
      </div>
    `;
  }
}
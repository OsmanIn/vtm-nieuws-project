export default class ListItem {
  constructor(article, holder) {
    this._article = article;
    this._holder = holder; //.list
    this._listitemRefHtml = this.generateHtml(); //.listitem
  }
  generateHtml() {
    this._holder.insertAdjacentHTML(
      "beforeend",
      `<div class="listitem">
      <img src="${this._article.image.thumb}" alt:""/> <h3>${
        this._article.title
      }</h3><p class="videoID">${this._article.id}</p> <p>${
        this._article.created.formatted
      }</p>
      </div>
      `
    );
  }
}

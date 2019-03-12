import * as basicLightbox from "basiclightbox";

export default class ListItem {
  constructor(article, holder) {
    this._article = article; //results.data.response.items*****this._article.video.url.default
    this._holder = holder; //.list
    this._listitemRefHtml = this.generateHtml(); //.listitem
    this.setUpEvents();
  }
  generateHtml() {
    this._holder.insertAdjacentHTML(
      "beforeend",
      `
        <div class="listitem">
          <img src="${this._article.image.thumb}" alt:""/>
          <h3>${this._article.title}</h3>
          <p class="videoID">${this._article.id}</p>
          <p>${this._article.created.formatted}</p>
        </div>
      `
    );
    return [...this._holder.querySelectorAll(".listitem")].reverse()[0];
  }
  setUpEvents() {
    this._listitemRefHtml.addEventListener(
      "click",
      function() {
        const instance = basicLightbox.create(`
          <video controls>
            <source src="${this._article.video.url.default}" type="video/mp4">
        </video>
      `);
        instance.show();
      }.bind(this)
    );
  }
}

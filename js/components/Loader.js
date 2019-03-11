export default class Loader {
  constructor(holder) {
    // this._visible = visible;
    this._holder = holder;
    this._loaderHtml = this.generateHtml();
  }
  generateHtml() {
    this._holder.insertAdjacentHTML("beforeend", `<div class="loader"></div>`);
    return this._holder.querySelector("div.loader");
  }
  show() {
    this._loaderHtml.style.display = "block";
  }
  hide() {
    this._loaderHtml.style.display = "none";
  }
}

export default class Pagination {
  constructor(list) {
    this._list = list;
    this._loaderHtml = this.generateHtml();
    this.setUpEvents();
  }
  generateHtml() {
    this._list._holder.insertAdjacentHTML(
      "beforeend",
      `<div class="pagination">
          <a class="prev" href="#">prev</a> 
          <p class="pager"></p>         
          <a class="next" href="#">next</a>  
        </div>`
    );
    return this._list._holder.querySelector(".pagination");
  }
  setUpEvents() {
    this._loaderHtml.querySelector(".next").addEventListener(
      "click",
      function(e) {
        e.preventDefault();
        this._list._pageNr += 5;
        this._list.getData();
      }.bind(this)
    );
    this._loaderHtml.querySelector(".prev").addEventListener(
      "click",
      function(e) {
        e.preventDefault();
        if ((this._pageNr = 0)) {
          this._pageNr = 0;
        }
        this._list._pageNr -= 5;
        this._list.getData();
      }.bind(this)
    );
  }
}

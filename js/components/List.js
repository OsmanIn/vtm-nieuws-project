import axios from "axios";
import ListItem from "./ListItem";
import Loader from "./Loader";
import Pagination from "./Pagination";

export default class List {
  constructor(nrOfItem, holder) {
    this._nrOfItem = nrOfItem;
    this._pageNr = 0;
    this._holder = holder;
    this.loader = new Loader(this._holder);
    this.pagination = new Pagination(this);
    this._listHtmlRef = this.generateHtml();
    this.getData();
  }
  generateHtml() {
    this._holder.insertAdjacentHTML(
      "beforeend",
      `
      <div class="list"></div>
      `
    );
    return [...this._holder.querySelectorAll(".list")].reverse()[0];
  }

  getData() {
    this._listHtmlRef.innerHTML = "";
    this._holder.querySelector(".pager").innerHTML = "";
    this.loader.show();
    axios
      .get(
        "https://nieuws.vtm.be/feed/articles&type=video&fields=video&count=" +
          this._nrOfItem +
          "&from=" +
          this._pageNr
      )
      .then(results => {
        console.log(results);
        this.handleArticles(results.data.response.items);
        this.numerator(results.data.response);
      });
  }
  handleArticles(articles) {
    articles.forEach(article => {
      new ListItem(article, this._listHtmlRef);
    });
    this.loader.hide();
  }
  numerator(pages) {
    this._holder.querySelector(".pager").insertAdjacentHTML(
      "beforeend",
      `
      <span>${this._pageNr + 1}-${this._pageNr + 5}/${pages.total}</span>
      `
    );
  }
}

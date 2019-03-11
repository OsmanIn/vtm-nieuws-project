import axios from "axios";
//import * as basicLightbox from "basiclightbox";
import ListItem from "./ListItem";
import Loader from "./Loader";
import Pagination from "./Pagination"; // in here we import the Pagination Component
export default class List {
  constructor(nrOfItem, holder) {
    this._nrOfItem = nrOfItem;
    this._pageNr = 0;
    this._holder = holder; // #listSection on the page
    this.loader = new Loader(this._holder);
    this.pagination = new Pagination(this); //then we call the Pagination constructor once => this will execute the constructor of pagination
    //and 1 parameter will be sent => the this (that is a reference to your complete List) so we send the complete List to the pagination
    this._listHtmlRef = this.generateHtml(); // .list generating html
    this.getData(); //downloading data
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
    //always mak list empty again before we load
    this._listHtmlRef.innerHTML = "";
    this._holder.querySelector(".pager").innerHTML = "";
    //always show loader before we retrieve data
    this.loader.show();
    axios
      .get(
        "https://nieuws.vtm.be/feed/articles&type=video&count=" +
          this._nrOfItem +
          "&from=" +
          this._pageNr
      )
      .then(results => {
        console.log(results);
        //this._totalPageNr = results.data.response.total; //Pagination
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

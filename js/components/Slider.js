import axios from "axios";
import SliderItem from "./SliderItem";

export default class Slider {
  constructor(nrOfItems, holder) {
    this._nrOfItems = nrOfItems;
    this._pageNr = 0;
    this._holder = holder; // #listSection on the page
    //this.loader = new Loader(this._holder);
    //this.pagination = new Pagination(this); //then we call the Pagination constructor once => this will execute the constructor of pagination
    //and 1 parameter will be sent => the this (that is a reference to your complete List) so we send the complete List to the pagination
    this._sliderHtmlRef = this.generateHtml(); // .list generating html
    this.getData(); //downloading data
  }
  generateHtml() {
    this._holder.insertAdjacentHTML(
      "beforeend",
      `
      <div class="slider"></div>
      `
    );
    return [...this._holder.querySelectorAll(".slider")].reverse()[0];
  }
  getData() {
    this._sliderHtmlRef.innerHTML = "";
    axios
      .get(
        "https://nieuws.vtm.be/feed/articles&type=video&count=" +
          this._nrOfItems +
          "&from="
      )
      .then(results => {
        console.log(results);

        this.handleSliderArticles(results.data.response.items);
      });
  }
  handleSliderArticles(articles) {
    articles.forEach(article => {
      new SliderItem(article, this._sliderHtmlRef);
    });
  }
}

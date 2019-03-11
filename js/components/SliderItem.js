export default class SliderItem {
  constructor(sliders, holder) {
    this._sliders = sliders;
    this._holder = holder; //.slide
    this._sliderItemRefHtml = this.generateHtml(); //.slideritem
  }
  generateHtml() {
    this._holder.insertAdjacentHTML(
      "beforeend",
      `<div class="slideritem">
      <img src="${this._sliders.image.thumb}" alt:""/> <h1>${
        this._sliders.title
      }</h1><p class="sliderVideoID">${this._sliders.id}</p> 
      </div>
      `
    );
  }
}

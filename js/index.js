import "../css/style.scss";
import axios from "axios";
import * as basicLightbox from "basiclightbox";
import List from "./components/List";
//import Slider from "./components/SliderItem";

const list = new List(5, document.getElementById("listSection"));
//const slider = new Slider(5, document.getElementById("sliderSection"));

document.querySelector(".list").addEventListener("click", function(e) {
  const videoID = e.target.nextElementSibling.innerText;
  console.log(videoID);
  axios
    .get(
      `https://nieuws.vtm.be/feed/articles?format=json&fields=video&ids=${videoID}`
    )
    .then(function(results) {
      console.log(results);
      var relatedLink = results.data.response.items[0].video.url.default;
      //var imageLink = results.data.response.items[0].image.medium;
      console.log(relatedLink);
      const instance = basicLightbox.create(`
      <video controls>
        <source src="${relatedLink}" type="video/mp4">
    </video>
  `);
      instance.show();
    });
});

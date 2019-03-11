export default class Pagination {
  constructor(list) {
    //it gets the ref // we past the list here
    this._list = list; // and we store it in this._list so now i can get this._list._holder or this._list.getData()
    this._loaderHtml = this.generateHtml();
    this.setUpEvents();
  }
  generateHtml() {
    this._list._holder.insertAdjacentHTML(
      // if you can get the list you can get all its properties :-) so also the holder of the list :-)
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
    //so when we click next
    this._loaderHtml.querySelector(".next").addEventListener(
      "click",
      function(e) {
        e.preventDefault(); // ignoring eventual # jump to top of page
        //in here we need to do 2 things
        //a) => taking the pagenr of List and add one
        //take pagNr from list how can i take that?
        //this._list._nrOfItem++;
        this._list._pageNr += 5; // this is a ref to the list => so it has the pagenr so you can take the pagenr like this // you understand?
        this._list.getData();
        //but we have a BIG PROBLEM
        // this will not work! WHY? because the 'this' in an
        //is not bound to the this of Pagination
        // but to the element where the action was on == the one that was clicked
        // so we need to bind :-)

        //so we are sharing the abilities of List with pagination because we send the whole List to Pagination
        //and in Pagination we save List to this._list
        // so in the pagination module we can grab all the children of List by taking this._list.property

        // understand?yes  pagination is a kind of clone js?
        // hmm
        //in js all variables except numbers/booleans/string are passed by reference
        // so if i pass List i dont pass a complete object
        // i pass the reference in memory so in the pagination component i can access that reference and call its children
        // so its not cloning
        //this._list is an ALIAS of List understand?yes
        // JEEEJ :-)
        // so now you need to do prev ;-)
      }.bind(this)
    );
    this._loaderHtml.querySelector(".prev").addEventListener(
      "click",
      function(e) {
        e.preventDefault(); // ignoring eventual # jump to top of page
        //in here we need to do 2 things
        //a) => taking the pagenr of List and add one
        //take pagNr from list how can i take that?
        if ((this._pageNr = 0)) {
          this._pageNr = 0;
        }
        this._list._pageNr -= 5; // this is a ref to the list => so it has the pagenr so you can take the pagenr like this // you understand?
        this._list.getData();
        //but we have a BIG PROBLEM
        // this will not work! WHY? because the 'this' in an eventlistener is not bound to the this of Pagination
        // but to the element where the action was on == the one that was clicked
        // so we need to bind :-)

        //so we are sharing the abilities of List with pagination because we send the whole List to Pagination
        //and in Pagination we save List to this._list
        // so in the pagination module we can grab all the children of List by taking this._list.property

        // understand?yes  pagination is a kind of clone js?
        // hmm
        //in js all variables except numbers/booleans/string are passed by reference
        // so if i pass List i dont pass a complete object
        // i pass the reference in memory so in the pagination component i can access that reference and call its children
        // so its not cloning
        //this._list is an ALIAS of List understand?yes
        // JEEEJ :-)
        // so now you need to do prev ;-)
      }.bind(this)
    );
  }
}

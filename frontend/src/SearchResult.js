class SearchResult {
  $searchResult = null;
  data = null;
  onClick = null;

  constructor({ $target, initialData, onClick }) {
    const $wrapper = document.createElement('section');
    this.$searchResult = document.createElement("ul");
    this.$searchResult.className = "SearchResult";
    $wrapper.appendChild(this.$searchResult);
    $target.appendChild($wrapper);

    this.data = initialData;
    this.onClick = onClick;

    this.render();
  }

  setState(nextData) {
    this.data = nextData;
    this.render();
  }

  applyEventToElement = (items) => {
    document.addEventListener('scroll', () => {
      items.forEach((el,index) => {
       // console.log(items.length)
        if (this.isElementInViewport(el) && (items.length-1 === index)){
          console.log('마지막 & 다음 페이지 로딩');
          this.onNextPage();
        }
       // console.log(this.isElementInViewport(el));
      })
    })
  }

  render() {
    this.$searchResult.innerHTML = this.data
      .map(
        cat => `
          <li class="item">
            <img src=${cat.url} alt=${cat.name} />
          </li>
        `
      )
      .join("");

    this.$searchResult.querySelectorAll(".item").forEach(($item, index) => {
      $item.addEventListener("click", () => {
        this.onClick(this.data[index]);
      });
    });
  }
}

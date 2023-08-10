import Empty from "./Empty";

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

    this.Empty = new Empty({
      $target : $wrapper;
    })

    this.render();
  }

  setState(nextData) {
    this.data = nextData;
    this.render();
    this.Empty.show(nextData);
  }

  // isElementInViewport(el) {
    // 스크롤 해서 좌표를 알아낸다
  //   const rect = el.getBoundingClientRect();
  //   return (
  //     rect.top > 0 &&
  //     rect.left > 0 &&
  //     rect.bottom < (window.innerHeight || document.documentElement.clientHeight) &&
  //     rect.right < (window.innerWidth || document.documentElement.clientHeight)
  //   );
  // }

  // applyEventToElement = (items) => {
  //   document.addEventListener('scroll', () => {
  //     items.forEach((el,index) => {
  //      // console.log(items.length)
  //       if (this.isElementInViewport(el) && (items.length-1 === index)){
  //         console.log('마지막 & 다음 페이지 로딩');
  //         this.onNextPage();
  //       }
  //      // console.log(this.isElementInViewport(el));
  //     })
  //   })
  // }

  // intersectionobserver 
  listObserver = new IntersectionObserver((items, observer) => {
    console.log(items);
    items.forEach(item => {
       // 아이템이 화면에 보일때
      if (item.isIntersecting) {
        // 이미지를 로드한다.
        item.target.querySelector('img').src = item.target.
        querySelector('img').dataset.src;

        // 마지막 요소를 찾아낸다
        console.log(this.data.length);
        let dataIndex = item.target.dataset.index;
        console.log(dataIndex);
      // 마지막 요소라면? nextPage 호출
        if(dataIndex + 1 === this.data.length) {
          console.log('마지막');
          this.onNextPage();
        }
       
      }
    })
  })

  render() {
    if(this.data === null || this.data.length === 0) {
      this.$searchResult.style.display = "none";
      return;
    }
    this.$searchResult.style.display = "grid";
    this.$searchResult.innerHTML = this.data
      .map(
        cat, index => `
          <li class="item" data-index=${index}>
            <img src="https://via.placeholder.com/200*300" data-src=${cat.url} alt=${cat.name} />
          </li>
        `
      )
      .join("");

    this.$searchResult.querySelectorAll(".item").forEach(($item, index) => {
      $item.addEventListener("click", () => {
        this.onClick(this.data[index]);
      });

      this.listObserver.observe($item);
    });
  }
}

export default SearchResult;
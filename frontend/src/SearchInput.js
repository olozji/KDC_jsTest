const TEMPLATE = '<input type="text">';

class SearchInput {
  constructor({ $target, onSearch }) {
    const $wrapper = document.createElement('section');
    const $searchInput = document.createElement("input");
    this.$searchInput = $searchInput;
    this.$searchInput.placeholder = "고양이를 검색해보세요.|";

    $searchInput.className = "SearchInput";
    $target.appendChild($searchInput);
    $target.appendChild($wrapper);

    $searchInput.addEventListener("keyup", e => {
      if (e.keyCode === 13) {
        onSearch(e.target.value);//value는 app에서 정의한 keyword를 의미
      }
    });

    console.log("SearchInput created.", this);
  }
  render() {}
}

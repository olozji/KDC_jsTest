import keywordHistory from './KeyWordHistory';

const TEMPLATE = '<input type="text">';

class SearchInput {
  constructor({ $target, onSearch, onRandomSearch }) {
    const $wrapper = document.createElement('section');
    $wrapper.className = 'SearchInputSection';
    $target.appendChild($wrapper);

    const $searchInput = document.createElement("input");
    this.$searchInput = $searchInput;
    this.$searchInput.placeholder = "고양이를 검색해보세요.|";

    $searchInput.className = "SearchInput";
    $wrapper.appendChild($searchInput);
    

    $searchInput.addEventListener("keypress", e => {
      if (e.key === 'Enter') {
        onSearch(e.target.value, this.$limitCount.value);//value는 app에서 정의한 keyword를 의미
        
        // 최근 키워드 저장
        // 부모 컴포넌트인 곳에서 호출
        this.keywordHistory.addKeyword(e.target.value);
      }
    });
    // 셀렉트 ui
    const $limitCount = document.createElement('select');
    this.$limitCount = $limitCount;
    this.$limitCount.classList = "limitCount";

    // select option 설정
    const limitCountOption = [10,25,50];
    limitCountOption.map((option) => {
      let $option = document.createElement('option');
      $option.value = option;
      $option.textContent = `${option}개`;
      $limitCount.appendChild($option);
    })

    $wrapper.appendChild($limitCount);

    // 랜덤
    const $randomButton = document.createElement("button");
    this.$randomButton = $randomButton;
    this.$randomButton.className ='RandomButton';
    this.$randomButton.textContent = "랜덤 고양이";

    $wrapper.appendChild($randomButton);

    $randomButton.addEventListener("click", e => {
        onRandomSearch();
    });

    this.keywordHistory = new keywordHistory({
      $target:$wrapper,
      onSearch
    })

    console.log("SearchInput created.", this);
  }
  render() {}
}

export default SearchInput;
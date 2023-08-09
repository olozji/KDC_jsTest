console.log("app is running!");

import Loading from './Loading';
import DarkModeToggle from './DarkModeToggle';
import searchInput from './SearchInput';
import searchResult from './SearchResult';
import imageInfo from './ImageInfo';
import api from './api';

class App {
  $target = null;
  data = [];
  // 기본 페이지
  page = 1;

  constructor($target) {
    this.$target = $target;

    this.Loading = new Loading({
      $target,
    });

    this.DarkModeToggle = new DarkModeToggle({
      $target,
      // onSearch: keyword => {
      //   api.fetchCats(keyword).then(({ data }) => this.setState(data));
      // }
    });

    this.searchInput = new SearchInput({
      $target,
      onSearch: keyword => {
        // 로딩 show
        console.log('show');
        this.Loading.show();
        api.fetchCats(keyword).then(({ data }) => {
          // 목록 데이터 제공
          this.setState(data ? data : []);
          // 로딩 hide
          console.log('hide');
          this.Loading.hide();
          // 로컬에 저장
          this.saveResult(data);
        });
      },
      // 랜덤 고양이 메소드 생성
      onRandomSearch: () => {
        api.fetchRandomCats().then(({data}) => {
          this.setState(data);
          this.Loading.hide();
        })
      }
    });

    this.searchResult = new SearchResult({
      $target,
      initialData: this.data,
      onClick: cat => {
        console.log(cat);

        this.imageInfo.showDetail({
          visible: true,
          cat
        });
      },
      onNextPage: () => {
        console.log('다음페이지 로딩');
        this.Loading.show();
        const keywordHistory = localStorage.getItem('keywordHistory') //string
        === null ? [] : JSON.parse(localStorage.getItem('keywordHistory')); //배열
        
        const lastKeyword = keywordHistory[0];
        const page = this.page + 1;
        api.fetchCatsPage(lastKeyword, page).then(({ data }) => {
          // 과거의 데이터 배열에 새로운 데이터를 추가한다.
          let newData = this.data.concat(data);//추가
          this.setState(newData);
          this.page = page;
          // 로딩 hide
          console.log('hide');
          this.Loading.hide();
      })
    }
    });

    this.imageInfo = new ImageInfo({
      $target,
      data: {
        visible: false,
        image: null
      }
    });
    this.init();
  }

  setState(nextData) {
    console.log(this);
    this.data = nextData;
    this.searchResult.setState(nextData);
  }

  saveResult(result){
    console.log(result);
    // 받은 인자 값을 로컬스토리지에 저장을 한다.
    localStorage.setItem('lastResult', JSON.stringify(result));
  }

  init(){
    const lastResult = localStorage.getItem('lastResult') //string
    === null ? [] : JSON.parse(localStorage.getItem('lastResult')); //배열
    console.log(lastResult);
    // 새로고침 시 가져온 데이터를 기반으로 업데이트 해준다.
    this.setState(lastResult);
  }
}

export default App;
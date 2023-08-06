console.log("app is running!");

class App {
  $target = null;
  data = [];

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
          this.setState(data);
          // 로딩 hide
          console.log('hide');
          this.Loading.hide();
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
      }
    });

    this.imageInfo = new ImageInfo({
      $target,
      data: {
        visible: false,
        image: null
      }
    });
  }

  setState(nextData) {
    console.log(this);
    this.data = nextData;
    this.searchResult.setState(nextData);
  }
}

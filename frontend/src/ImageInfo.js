class ImageInfo {
  $imageInfo = null;
  data = null;

  constructor({ $target, data }) {
    const $imageInfo = document.createElement("div");
    $imageInfo.className = "ImageInfo";
    this.$imageInfo = $imageInfo;
    $target.appendChild($imageInfo);

    this.data = data;

    this.render();
  }

  setState(nextData) {
    this.data = nextData;
    this.render();
  }

  showDetail(data) {
    console.log(data.cat.id);

    // api 상세 정보 요청
    api.fetchCatDetail(data.cat.id).then(({data}) => {
      // 정보를 업데이트(setState) 한다
      this.setState({
        visible:true,
        cat:data
      });
    })
  }

  closeImageInfo(){
    console.log('닫기');
    this.setState({
      visible:false,
      cat: undefined
    });
  }

  render() {
    if (this.data.visible) {
      const { name, url, temperament, origin } = this.data.cat;

      this.$imageInfo.innerHTML = `
        <div class="content-wrapper">
          <div class="title">
            <span>${name}</span>
            <div class="close">x</div>
          </div>
          <img src="${url}" alt="${name}"/>        
          <div class="description">
            <div>성격: ${temperament}</div>
            <div>태생: ${origin}</div>
          </div>
        </div>`;
      this.$imageInfo.style.display = "block";

      // closeImageInfo 이벤트 생성
      // this.$imageInfo.querySelector('.close')
      // .addEventListener("click", (e) => {
      //   console.log(e);
      //   this.closeImageInfo();
      // });

      // key event에 대해 다루기(keypress, keyup, keydown)
      //ESC 키는 keydown으로 활용
      document.addEventListener("keydown", (e) => {
        console.log(e.key);
        if(e.key === 'Escape') {
          this.closeImageInfo();
        }
      })

      // 모달 외 영역 클릭 시 close event
      this.$imageInfo.addEventListener("click", (e) => {
        console.log(e.target.className);
        // class로 영역과 구분지어 이벤트를 생성
        if(e.target.className === 'ImageInfo' || e.target.className === 'close'){
          this.closeImageInfo();
        }
      })


    } else {
      this.$imageInfo.style.display = "none";
    }
  }
}

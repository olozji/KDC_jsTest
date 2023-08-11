class Empty {  
    // 로딩 초기화
    $empty = null;
    data = null;


    constructor({ $target }) {
      const $empty = document.createElement("div");
      this.$empty = $empty;
      this.$empty.className = 'empty';
      $target.appendChild(this.$empty);

      this.data = {
        show: false,
        isNull: false
      }

      this.render();
    }

    // 로딩을 위한 메소드 생성
    show(data) {
        this.setState({
            show:data === null || data.length === 0,
            isNull: data === null
        });
    }

    hide() {
        this.setState({
            show:false
        })
    }

    // setState 사용 이유는 state를 보존하기 위해서이며, 데이터가 변경되면 렌더가 된다
    setState(nextData) {
        this.data = nextData;
        this.render();
      }
  
   render(){
    if(this.data.show){
      //  this.$empty.style.diplay = 'block';
       if(this.data.isNull) {
        this.$empty.innerHTML = `
        <p>
          요청실패
       </p>
  `;
       } else {
        this.$empty.innerHTML = `
        <p>
          요청 결과가 없습니다.
       </p>
  `;
       }  
    } else {
        // innerHTML 초기화
        // this.$empty.style.diplay = 'none';
        this.$empty.innerHTML = '';
    }
   }
  }
  
  export default Empty;
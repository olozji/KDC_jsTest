class Loading {  
    // 로딩 초기화
    $loading = null;
    data = null;


    constructor({ $target }) {
      const $loading = document.createElement("div");
      this.$loading = $loading;
      $target.appendChild(this.$loading);

      this.data = {
        show: false
      }

      this.render();
    }

    // 로딩을 위한 메소드 생성
    show() {
        this.setState({
            show:true
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
        this.$loading.innerHTML = `
        <div class="Loading">
          <p>
            로딩중
         </p>
        </div>
    `;
    } else {
        // innerHTML 초기화
        this.$loading.innerHTML = '';
    }
   }
  }
  
class KeyWordHistory {
    $keywordHistory = null;
    data = null;

    constructor({$target, onSearch}) {
        const $keywordHistory = document.createElement('ul');
        this.$keywordHistory = $keywordHistory;
        this.$keywordHistory.className = 'keyWordHistory';
        $target.appendChild(this.$keywordHistory);

        // 키워드를 위한 더미데이터 생성
        // this.data = [
        //     '아',
        //     '고양이',
        //     'cat',
        // ];
        this.onSearch = onSearch;
        this.init();
        this.render();
    }

    // 데이터를 초기화 해준다
    init(){
       // 로컬스토리지에서 가져오기
       // 로컬스토리지 필수 key 와 value 무조건 string이어야 한다
       // map 함수는 배열을 반환하기 때문에 데이터를 가공해주어야 한다.
       const data = this.getHistory();
       this.setState(data);
    }

    addKeyword(keyword) {
        let keywordHistory = this.getHistory();
        // 최근 키워드 저장
        // 배열로 반환이 되고 인자를 맨 앞에 위치 시키기 위해 unShift
        keywordHistory.unshift(keyword);
        // 검색 노출을 5개로 제한한다.
        keywordHistory = keywordHistory.slice(0,5);
        // 그대로 string으로 반환이 되기 때문에 join함수를 쓴다.
        localStorage.setItem('keywordHistory', keywordHistory.join(','));//string
    
        // 데이터를 업데이트 하는 작업
        this.init();
    }

    // 코드 중복을 위해 메소드 생성
    getHistory(){
        return localStorage.getItem('keywordHistory') //string
        === null ? [] : localStorage.getItem('keywordHistory').split(','); //배열
    }
    
    setState(nextData) { 
        this.data = nextData;
        this.render();
    }


    render() {
        this.$keywordHistory.innerHTML = this.data.map(
            keyword => `
              <li><button>${keyword}</button></li>  
            `
        ).join('');
        this.$keywordHistory.querySelectorAll('li button')
        .forEach(($item, index) => {
            $item.addEventListener("click", () => {
                console,log($item);
                console.log(this.data[index]);
                this.onSearch(this.data[index]);
            })
        });
    }
}
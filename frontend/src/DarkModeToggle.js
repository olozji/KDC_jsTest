class DarkModeToggle {
  // state를 설정
  isDarkMode = null;

  constructor({ $target }) {
    // 부모 요소를 하나 생성
    const $wrapper = document.createElement('section')
    const $DarkModeToggle = document.createElement("input");
    this.$DarkModeToggle = $DarkModeToggle;
    this.$DarkModeToggle.type = "checkbox";

    $DarkModeToggle.className = "DarkModeToggle";
    $wrapper.appendChild($DarkModeToggle);
    $target.appendChild($wrapper);

    $DarkModeToggle.addEventListener("change", e => {
      console.dir(e.target.checked);
      this.setColorMode(e.target.checked);
    });

   this.initColorMode();
  }

  initColorMode(){
   // 다크모드 초기화
   // isDarkmode state, checkbox 상태, html attr
   // matchMedia 란 미디어쿼리를 객체를 반환함으로서 조작한다. 그중 matches는 true / false를 반환한다.
   // 다크모드를 윈도우에서 받아온다. (matchMedia로)
   this.isDarkMode = window.matchMedia(
    '(prefers-color-scheme: dark)').matches;

   // 상태를 업데이트하는 조건문을 걸어준다
   this.$DarkModeToggle.checked = this.isDarkMode;
   this.setColorMode(this.isDarkMode);
  }

// dark로 할수도 있고 light로 할수 있기 떄문에 isDarkMode라는 매개변수를 받는다.
// 중복된 코드를 막기 위해 하나의 함수로 만들기
  setColorMode(isDarkMode) {
    document.documentElement.setAttribute('color-mode', isDarkMode ? 'dark' : 'light');
  }

}

export default DarkModeToggle;
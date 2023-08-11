import api from "./api";

class Banner {
    $banner = null;
    data = null;
    // 움직이기 위해서
    current = 0;

    constructor($target){
        this.$wrapper = document.createElement('div');
        this.$wrapper.className = "Banner";
        this.$banner = document.createElement("ul");

        this.$prevButoon = document.createElement("button");
        this.$prevButoon.textContent = "PREV";
        this.$prevButoon.className = "prev";

        this.$prevButoon.addEventListener('click', (e) => {
            console.log('prev');
            let prev = this.current = -1;
            if (prev === 0) {
                return;
            }
            this.changeCurrent(prev);
        })

        this.$nextButoon = document.createElement("button");
        this.$nextButoon.textContent = "NEXT";
        this.$nextButoon.className = "next";

        this.$nextButoon.addEventListener('click', (e) => {
            console.log('next');
            let next = this.current +1;
            if( next === this.data.length) {
                return;
            }
            this.changeCurrent(next);
        })

        this.$wrapper.appendChild(this.$banner);
        this.$wrapper.appendChild(this.$prevButoon);
        this.$wrapper.appendChild(this.$nextButoon);
        $target.appendChild(this.$wrapper);

        this.getRandom();
    }

    changeCurrent(index){
        this.current = index;
        this.moveTo(index);
    }

    moveTo(index) {
        let leftPos =  - (Number(this.$wrapper.clientWidth) + index); 
        this.$banner.style.left = leftPos + 'px';
    }

    setState(nextData) {
        this.data = nextData;
        this.render();
      }
    getRandom(){
        api.fetchRandomCats().then(({data}) => {
            this.setState(data ? data.slice(0,5):[]);
        })
    }

    render() {
        this.$banner.innerHTML = this.data
        .map((banner) => `
            <li style="background-image:url(${banner.url})></li>
        `).join('');

        this.$banner.style.width = Number(this.$wrapper.clientWidth)
        * this.data.length + "px";

        this.$banner.querySelector('li').forEach(item => {
            item.style.width = this.$wrapper.clientWidth + 'px';
        })
    }
}

export default Banner;
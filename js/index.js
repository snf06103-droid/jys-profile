document.addEventListener("DOMContentLoaded",()=>{

    // 위로 스크롤
    const btnTop = document.querySelector(".btn-top")
    if(btnTop){
        btnTop.addEventListener("click",()=>{
            window.scrollTo({top:0,behavior:"smooth"})
        })
    }

    // 스티커 제목 연해지기
    const detailTitle = document.querySelector(".detail-title")
     if(detailTitle){
         window.addEventListener("scroll",()=>{
             let windowHeight = window.innerHeight
             let scrollValue = window.scrollY
             console.log(scrollValue)
             let opacity = 1.1 - (scrollValue / windowHeight*3)
             opacity = Math.max(0.1, Math.min(1, opacity))
             detailTitle.style.opacity = opacity
         })
     }

    // 전체메뉴버튼
    const btnMenu = document.querySelector(".btn-menu")
    const allMenu = document.querySelector(".all-menu")
    let statusMenu = false
    const btnImg = document.querySelector(".btn-img")

    btnMenu.addEventListener('click',()=>{
        if(statusMenu){
            //메뉴닫기->삼선모양으로 바뀌어야함
            allMenu.classList.remove("on")
            btnImg.setAttribute('src','./img/btn-menu.svg')
            statusMenu = false
        }else{
            //메뉴열기->x모양으로 바뀌어야함
            allMenu.classList.add("on")
            btnImg.setAttribute('src','./img/btn-close.svg')
            statusMenu = true
        }
    })

    // const profile = document.querySelector(".profile")
    // let profileTop = profile.offsetTop
    // window.addEventListener("resize",()=>{
    //     profileTop = profile.offsetTop
    // })

    window.addEventListener('scroll',()=>{
        allMenu.classList.remove("on")
        btnImg.setAttribute('src','./img/btn-menu.svg')
        statusMenu = false
    })

    const imageContainers = document.querySelectorAll('.image-container');

    imageContainers.forEach(container => {
        container.addEventListener('click', function(e) {
            // 1. 현재 클릭한 것 외에 이미 'show-text'가 붙어있는 다른 요소들을 찾아 클래스 제거
            imageContainers.forEach(other => {
                if (other !== this) {
                    other.classList.remove('show-text');
                }
            });

            // 2. 현재 클릭한 요소의 클래스 토글
            this.classList.toggle('show-text');
            
            // 3. (선택사항) 클릭 이벤트가 부모로 퍼지는 것 방지
            e.stopPropagation();
        });
    });

    // 4. 사진 외에 빈 바탕(body)을 누르면 모든 텍스트 닫기
    document.addEventListener('click', () => {
        imageContainers.forEach(container => {
            container.classList.remove('show-text');
        });
    });

})
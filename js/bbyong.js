
// 공통 함수
function getContentByBr(element) {
    return element.innerHTML
        .split(/<br\s*\/?>/i)
        .map(item => item.trim())
        .filter(item => item);
}

function getFontStyles(element) {
    const computedStyle = window.getComputedStyle(element);
    let fontSize = computedStyle.fontSize;
    let lineHeight = computedStyle.lineHeight;

    if (lineHeight === 'normal') {
        const fontSizeValue = parseFloat(fontSize);
        lineHeight = `${fontSizeValue * 1.2}px`;
    }
    return { fontSize, lineHeight };
}

// 메인 실행부
document.addEventListener("DOMContentLoaded", function () {
    
    /* 텍스트 뿅 애니메이션 (.bbyong)  */
    const bbyongTags = document.querySelectorAll(".bbyong");
    
    bbyongTags.forEach((tag) => {
        const textArray = getContentByBr(tag);
        const styles = getFontStyles(tag);
        let resultContent = "";

        // span으로 쪼개기
        textArray.forEach((text, i) => {
            resultContent += `<span style="
                display:inline-block; 
                overflow:hidden; 
                height:${styles.lineHeight}; 
                padding-top:${styles.lineHeight}; 
                transition: all 1s ease ${0.1 * i}s;
                font-size:${styles.fontSize};
                box-sizing: border-box;
            ">${text}</span>`;
            if (i !== textArray.length - 1) resultContent += `<br>`;
        });

        tag.innerHTML = resultContent;
        tag.style.fontSize = "0"; // 부모 폰트 사이즈 제거 (공백 방지)
    });

    // 뿅 텍스트 감시자
    const bbyongObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                Array.from(entry.target.children).forEach(child => {
                    if (child.tagName === 'SPAN') child.style.paddingTop = "0";
                });
            } else {
                const styles = getFontStyles(entry.target);
                Array.from(entry.target.children).forEach(child => {
                    if (child.tagName === 'SPAN') child.style.paddingTop = styles.lineHeight;
                });
            }
        });
    }, { threshold: 0.5 });

    bbyongTags.forEach(tag => bbyongObserver.observe(tag));


    /* 오리배 느낌나는 리스트 애니메이션 (.fade-in-floating) */
    const floatingItems = document.querySelectorAll(".fade-in-floating");

    const floatingObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                // floatingObserver.unobserve(entry.target); // 한 번 나오면 끝
            }
        });
    }, { threshold: 0.2 });

    floatingItems.forEach(item => floatingObserver.observe(item));

});
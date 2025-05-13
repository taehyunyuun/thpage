document.addEventListener('DOMContentLoaded', () => {
    const clickables = document.querySelectorAll('.clickable');
    const mainContent = document.getElementById('main-content');
    const loadingMessage = document.getElementById('loading-message');

    clickables.forEach(element => {
        element.addEventListener('click', (e) => {
            // 클릭 효과는 CSS :active로 처리됨

            // 데이터 속성에서 타겟 이름 가져오기 (없으면 'Unknown')
            const targetPage = element.dataset.target || 'Unknown';

            // 1. 현재 컨텐츠 페이드 아웃
            mainContent.classList.add('fade-out');

            // 2. 로딩 메시지 표시 (페이드 인)
            loadingMessage.style.display = 'block';
            loadingMessage.textContent = `Navigating to ${targetPage}...`;
            // 강제 리플로우 유도 (opacity 0 -> 1 전환 위해)
            void loadingMessage.offsetWidth;
            loadingMessage.style.opacity = '1';


            // 3. 잠시 후 페이지 전환 시뮬레이션 (실제로는 다른 동작 필요)
            // 여기서는 0.5초 후에 다시 원래대로 돌려놓음
            setTimeout(() => {
                // 실제 페이지 전환 로직이 들어갈 자리
                // 예: window.location.href = targetPage + '.html';
                // 또는 SPA 라우터 로직

                // 데모: 로딩 메시지 숨기고 메인 컨텐츠 다시 표시
                loadingMessage.style.opacity = '0';
                 setTimeout(() => {
                    loadingMessage.style.display = 'none';
                    mainContent.classList.remove('fade-out');
                 }, 300); // fade-out 시간과 맞춤

                console.log(`Mapsd to: ${targetPage}`);

            }, 500); // 0.5초 지연
        });
    });
});

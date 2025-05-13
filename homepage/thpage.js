document.addEventListener('DOMContentLoaded', () => {
    const dateDisplayCenter = document.getElementById('date-display-center');
    const currentDateText = document.getElementById('current-date-text');
    const calendarContainer = document.getElementById('calendar-container');
    const calendarBody = document.getElementById('calendar-body');
    const currentMonthYearText = document.getElementById('current-month-year');
    const prevMonthButton = document.getElementById('prev-month');
    const nextMonthButton = document.getElementById('next-month');

    // 페이지 로딩 시 오늘 날짜로 초기화 (2025년 5월 13일)
    let currentYear = 2025;
    let currentMonth = 4; // 0부터 시작 (5월은 4)

    function formatDate(year, month, day) {
        return `${year}년 ${month + 1}월 ${day}일`;
    }

    function updateDateDisplay() {
        // 현재는 고정된 날짜를 사용하지만, 실제 앱에서는 new Date() 사용
        // const today = new Date();
        // currentDateText.textContent = formatDate(today.getFullYear(), today.getMonth(), today.getDate());
        currentDateText.textContent = formatDate(2025, 4, 13); // 요청하신 형식으로 표시
    }

    function renderCalendar(year, month) {
        calendarBody.innerHTML = ''; // 기존 달력 내용 삭제
        currentMonthYearText.textContent = `${year}년 ${month + 1}월`;

        const firstDayOfMonth = new Date(year, month, 1).getDay(); // 0 (일) ~ 6 (토)
        const daysInMonth = new Date(year, month + 1, 0).getDate(); // 해당 월의 총 일수

        const today = new Date(2025, 4, 13); // 오늘 날짜 (비교용)

        let date = 1;
        for (let i = 0; i < 6; i++) { // 최대 6주 표시
            const row = document.createElement('tr');
            for (let j = 0; j < 7; j++) { // 일요일부터 토요일까지
                const cell = document.createElement('td');
                if (i === 0 && j < firstDayOfMonth) {
                    // 이전 달의 날짜 (빈 칸으로 두거나 이전 달 날짜 표시)
                    cell.classList.add('other-month');
                } else if (date > daysInMonth) {
                    // 다음 달의 날짜 (빈 칸으로 두거나 다음 달 날짜 표시)
                    cell.classList.add('other-month');
                } else {
                    cell.textContent = date;
                    // 오늘 날짜 강조 (2025년 5월 13일 기준)
                    if (year === today.getFullYear() && month === today.getMonth() && date === today.getDate()) {
                        cell.classList.add('today');
                    }
                    date++;
                }
                row.appendChild(cell);
            }
            calendarBody.appendChild(row);
            if (date > daysInMonth && i >= Math.floor((firstDayOfMonth + daysInMonth -1) / 7) ) break; // 모든 날짜 표시 후 종료
        }
    }

    // 날짜 표시 영역 클릭 시 달력 토글
    if (dateDisplayCenter) {
        dateDisplayCenter.addEventListener('click', (event) => {
            event.stopPropagation(); // 이벤트 버블링 방지
            const isVisible = calendarContainer.style.display === 'block';
            calendarContainer.style.display = isVisible ? 'none' : 'block';
            if (!isVisible) {
                renderCalendar(currentYear, currentMonth);
            }
        });
    }

    // 이전 달 버튼
    if (prevMonthButton) {
        prevMonthButton.addEventListener('click', (event) => {
            event.stopPropagation();
            currentMonth--;
            if (currentMonth < 0) {
                currentMonth = 11;
                currentYear--;
            }
            renderCalendar(currentYear, currentMonth);
        });
    }

    // 다음 달 버튼
    if (nextMonthButton) {
        nextMonthButton.addEventListener('click', (event) => {
            event.stopPropagation();
            currentMonth++;
            if (currentMonth > 11) {
                currentMonth = 0;
                currentYear++;
            }
            renderCalendar(currentYear, currentMonth);
        });
    }

    // 달력 외부 클릭 시 달력 닫기
    document.addEventListener('click', (event) => {
        if (calendarContainer.style.display === 'block' &&
            !calendarContainer.contains(event.target) &&
            event.target !== dateDisplayCenter && !dateDisplayCenter.contains(event.target) ) {
            calendarContainer.style.display = 'none';
        }
    });


    // --- 기존 다른 UI 요소들의 페이지 전환 로직 ---
    const mainContent = document.getElementById('main-content');
    const loadingMessage = document.getElementById('loading-message');
    const allClickableNavElements = document.querySelectorAll('.clickable[data-target]'); // data-target이 있는 요소만

    allClickableNavElements.forEach(element => {
        element.addEventListener('click', (e) => {
            if (element === dateDisplayCenter) return; // 날짜 표시는 자체 로직 처리

            const targetPage = element.dataset.target || 'Unknown';
            mainContent.classList.add('fade-out');
            loadingMessage.style.display = 'block';
            loadingMessage.textContent = `Navigating to ${targetPage}...`;
            void loadingMessage.offsetWidth;
            loadingMessage.style.opacity = '1';

            setTimeout(() => {
                loadingMessage.style.opacity = '0';
                 setTimeout(() => {
                    loadingMessage.style.display = 'none';
                    mainContent.classList.remove('fade-out');
                 }, 300);
                console.log(`Mapsd to: ${targetPage}`);
            }, 500);
        });
    });

    // 초기 날짜 표시 및 달력 렌더링 (페이지 로드 시 달력은 숨김)
    updateDateDisplay();
    // renderCalendar(currentYear, currentMonth); // 처음엔 숨겨져 있으므로 클릭 시 렌더링
});

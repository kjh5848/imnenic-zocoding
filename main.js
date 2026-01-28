class RaffleDrawer extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.state = {
      entries: [],
      winner: null,
    };

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          width: 100%;
          max-width: 720px;
          margin: 3rem auto;
          color: #f3f1ee;
          font-family: 'Gowun Dodum', sans-serif;
        }

        .raffle-container {
          background: linear-gradient(150deg, rgba(28, 25, 36, 0.96), rgba(12, 13, 20, 0.98));
          border-radius: 24px;
          padding: 2.5rem;
          box-shadow: 0 30px 60px rgba(0,0,0,0.45);
          border: 1px solid rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(6px);
          text-align: center;
        }

        h1 {
          color: #f8f5f0;
          font-family: 'Gowun Batang', serif;
          font-size: 2.6rem;
          margin-bottom: 0.4rem;
          text-shadow: 0 0 18px rgba(251, 188, 5, 0.15);
        }

        .sub-title {
          color: #b9b1a8;
          margin-bottom: 2.2rem;
          font-size: 1rem;
        }

        h2 {
          color: #d7d2cb;
          font-size: 1.1rem;
          border-bottom: 1px solid rgba(255,255,255,0.08);
          padding-bottom: 0.5rem;
          margin-top: 2.2rem;
          margin-bottom: 1rem;
          text-align: left;
        }

        .input-area {
          display: grid;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }

        .field {
          display: grid;
          gap: 0.4rem;
          text-align: left;
        }

        label {
          font-size: 0.85rem;
          color: #bdb7b0;
          letter-spacing: 0.02em;
        }

        input,
        textarea {
          border: 1px solid rgba(255, 255, 255, 0.12);
          background: rgba(20, 20, 28, 0.85);
          color: #f8f5f0;
          padding: 0.85rem 1rem;
          border-radius: 12px;
          font-size: 1rem;
          outline: none;
          transition: all 0.2s ease;
        }

        textarea {
          resize: vertical;
          min-height: 70px;
          font-family: 'Gowun Dodum', sans-serif;
        }

        input:focus,
        textarea:focus {
          border-color: rgba(251, 188, 5, 0.75);
          box-shadow: 0 0 0 2px rgba(251, 188, 5, 0.2);
        }

        .hint {
          font-size: 0.85rem;
          color: #8f8a84;
        }

        button {
          border: none;
          border-radius: 12px;
          padding: 0.9rem 1.6rem;
          font-size: 1rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s ease;
          box-shadow: 0 12px 20px rgba(0,0,0,0.25);
        }

        #add {
          background: linear-gradient(120deg, #fbbc05, #ff7b4f);
          color: #1d1202;
        }

        #add:hover {
          transform: translateY(-1px);
          filter: brightness(1.05);
        }

        #add-dummies {
          background: rgba(255, 255, 255, 0.12);
          color: #f5f0e8;
          margin-bottom: 1.8rem;
        }

        #add-dummies:hover {
          background: rgba(255, 255, 255, 0.2);
        }

        .controls {
          display: flex;
          justify-content: center;
          gap: 1rem;
          margin-top: 2rem;
          flex-wrap: wrap;
        }

        #draw {
          background: linear-gradient(120deg, #34a853, #52c24c);
          color: #0b1b0f;
        }

        #draw:hover {
          transform: translateY(-1px);
        }

        #reset {
          background: rgba(234, 67, 53, 0.9);
          color: #fff;
        }

        #reset:hover {
          transform: translateY(-1px);
          background: rgba(234, 67, 53, 1);
        }

        #entries-list {
          list-style: none;
          padding: 1rem;
          margin: 0;
          max-height: 220px;
          overflow-y: auto;
          background: rgba(15, 15, 20, 0.8);
          border-radius: 14px;
          text-align: left;
          display: grid;
          gap: 0.75rem;
        }

        #entries-list li {
          padding-bottom: 0.75rem;
          border-bottom: 1px dashed rgba(255, 255, 255, 0.08);
          display: grid;
          gap: 0.35rem;
        }

        #entries-list li:last-child {
          border-bottom: none;
          padding-bottom: 0;
        }

        .entry-name {
          font-weight: 700;
          color: #f5efe8;
        }

        .entry-wish {
          color: #b7b1ab;
          font-size: 0.95rem;
        }

        .winner-area {
          margin-top: 2.5rem;
          display: grid;
          gap: 1.5rem;
          align-items: center;
        }

        #winner-name {
          font-size: 2.4rem;
          font-weight: 700;
          color: #fbbc05;
          text-shadow: 0 0 18px rgba(251, 188, 5, 0.45);
          min-height: 3rem;
        }

        .winner-animation {
          animation: winner-animation 0.5s ease-in-out;
        }

        @keyframes winner-animation {
          0% { transform: scale(0.5); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }

        .prize-card {
          background: radial-gradient(circle at top, rgba(255, 205, 130, 0.2), rgba(20, 16, 25, 0.9));
          border-radius: 18px;
          padding: 1.6rem;
          text-align: left;
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: inset 0 0 20px rgba(255, 186, 97, 0.1);
          opacity: 0;
          transform: translateY(12px);
          transition: all 0.4s ease;
        }

        .prize-card.reveal {
          opacity: 1;
          transform: translateY(0);
        }

        .prize-label {
          font-size: 0.85rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #e9c48f;
          margin-bottom: 0.5rem;
        }

        #prize-title {
          font-size: 1.5rem;
          font-weight: 700;
          color: #fff4df;
          margin-bottom: 0.7rem;
        }

        #prize-detail {
          color: #e7ded2;
          line-height: 1.6;
        }

        @media (max-width: 640px) {
          .raffle-container {
            padding: 2rem 1.6rem;
          }

          h1 {
            font-size: 2.1rem;
          }

          #winner-name {
            font-size: 2rem;
          }
        }
      </style>
      <div class="raffle-container">
        <h1>꿈의 경품 추첨기</h1>
        <p class="sub-title">작은 소망 하나로 시작되는 AI 맞춤형 경품 추첨</p>
        <div class="input-area">
          <div class="field">
            <label for="name">이름</label>
            <input type="text" id="name" placeholder="이름을 입력하세요">
          </div>
          <div class="field">
            <label for="wish">당신의 작은 소망은?</label>
            <textarea id="wish" placeholder="예: 밤하늘의 별 보는 것을 좋아해요."></textarea>
            <span class="hint">소망은 당첨 시 AI가 분석해 꿈의 경품으로 바뀝니다.</span>
          </div>
          <button id="add">응모하기</button>
        </div>
        <button id="add-dummies">더미 데이터 추가</button>
        <div class="entries-area">
          <h2>응모자 목록</h2>
          <ul id="entries-list"></ul>
        </div>
        <div class="controls">
          <button id="draw">추첨하기</button>
          <button id="reset">초기화</button>
        </div>
        <div class="winner-area">
          <p id="winner-name"></p>
          <div id="prize-card" class="prize-card" aria-live="polite">
            <div class="prize-label">AI 꿈의 경품</div>
            <div id="prize-title"></div>
            <p id="prize-detail"></p>
          </div>
        </div>
      </div>
    `;
  }

  connectedCallback() {
    this.shadowRoot.getElementById('add').addEventListener('click', () => this.addEntry());
    this.shadowRoot.getElementById('add-dummies').addEventListener('click', () => this.addDummyData());
    this.shadowRoot.getElementById('name').addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        this.addEntry();
      }
    });
    this.shadowRoot.getElementById('wish').addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        this.addEntry();
      }
    });
    this.shadowRoot.getElementById('draw').addEventListener('click', () => this.drawWinner());
    this.shadowRoot.getElementById('reset').addEventListener('click', () => this.resetRaffle());

    this.addDummyData();
  }

  addEntry() {
    const nameInput = this.shadowRoot.getElementById('name');
    const wishInput = this.shadowRoot.getElementById('wish');
    const name = nameInput.value.trim();
    const wish = wishInput.value.trim();

    if (!name || !wish) {
      alert('이름과 작은 소망을 모두 입력해주세요.');
      return;
    }

    this.state.entries.push({ name, wish });
    nameInput.value = '';
    wishInput.value = '';
    this.updateEntriesList();
    nameInput.focus();
  }

  addDummyData() {
    const dummyEntries = [
      { name: '김민준', wish: '밤하늘의 별을 더 가까이에서 보고 싶어요.' },
      { name: '이서준', wish: '코딩 실력을 빠르게 올리고 싶어요.' },
      { name: '박도윤', wish: '반려견과 멋진 사진을 남기고 싶어요.' },
      { name: '최시우', wish: '혼자만의 우주 여행을 경험해보고 싶어요.' },
      { name: '정예준', wish: '좋아하는 밴드와 함께 연주하고 싶어요.' },
      { name: '강지호', wish: '서핑을 제대로 배워 보고 싶어요.' },
      { name: '윤은우', wish: '나만의 향수를 만들고 싶어요.' },
      { name: '한지안', wish: '친구들과 잊지 못할 캠핑을 가고 싶어요.' },
      { name: '송아윤', wish: '다시 한 번 대학 시절처럼 여행하고 싶어요.' },
      { name: '권지유', wish: '그림을 멋지게 그리고 싶어요.' }
    ];

    this.state.entries = this.state.entries.concat(dummyEntries);
    this.updateEntriesList();
  }

  updateEntriesList() {
    const entriesList = this.shadowRoot.getElementById('entries-list');
    entriesList.innerHTML = '';
    this.state.entries.forEach(entry => {
      const li = document.createElement('li');
      const nameSpan = document.createElement('span');
      nameSpan.className = 'entry-name';
      nameSpan.textContent = entry.name;

      const wishSpan = document.createElement('span');
      wishSpan.className = 'entry-wish';
      wishSpan.textContent = entry.wish;

      li.appendChild(nameSpan);
      li.appendChild(wishSpan);
      entriesList.appendChild(li);
    });
  }

  drawWinner() {
    if (this.state.entries.length === 0) {
      alert('응모자가 없습니다!');
      return;
    }

    const winnerNameEl = this.shadowRoot.getElementById('winner-name');
    const prizeCard = this.shadowRoot.getElementById('prize-card');
    const prizeTitleEl = this.shadowRoot.getElementById('prize-title');
    const prizeDetailEl = this.shadowRoot.getElementById('prize-detail');

    winnerNameEl.classList.remove('winner-animation');
    prizeCard.classList.remove('reveal');
    prizeTitleEl.textContent = '소망 분석 중...';
    prizeDetailEl.textContent = 'AI가 당첨자의 소망을 해석하고 있습니다.';

    let shuffleCount = 0;
    const maxShuffles = 28;
    const shuffleInterval = 60;

    const shuffle = () => {
      const randomIndex = Math.floor(Math.random() * this.state.entries.length);
      winnerNameEl.textContent = this.state.entries[randomIndex].name;
      shuffleCount++;
      if (shuffleCount < maxShuffles) {
        setTimeout(shuffle, shuffleInterval);
      } else {
        const winnerIndex = Math.floor(Math.random() * this.state.entries.length);
        this.state.winner = this.state.entries[winnerIndex];
        winnerNameEl.textContent = `${this.state.winner.name} 님 당첨!`;
        winnerNameEl.classList.add('winner-animation');

        setTimeout(() => {
          const prize = this.generateDreamPrize(this.state.winner);
          prizeTitleEl.textContent = prize.title;
          prizeDetailEl.textContent = prize.detail;
          prizeCard.classList.add('reveal');
        }, 450);
      }
    };

    shuffle();
  }

  resetRaffle() {
    this.state.entries = [];
    this.state.winner = null;
    this.updateEntriesList();
    const winnerNameEl = this.shadowRoot.getElementById('winner-name');
    const prizeCard = this.shadowRoot.getElementById('prize-card');
    const prizeTitleEl = this.shadowRoot.getElementById('prize-title');
    const prizeDetailEl = this.shadowRoot.getElementById('prize-detail');
    winnerNameEl.textContent = '';
    winnerNameEl.classList.remove('winner-animation');
    prizeTitleEl.textContent = '';
    prizeDetailEl.textContent = '';
    prizeCard.classList.remove('reveal');
  }

  generateDreamPrize(entry) {
    const theme = this.getWishTheme(entry.wish);
    const extras = [
      '전문가가 함께하는 1:1 맞춤 가이드',
      '당신의 이름이 새겨진 작은 기념품',
      '하루를 통째로 비워드리는 프라이빗 일정',
      '당신의 소망에 영감을 받은 특별한 기록 영상'
    ];
    const bonus = extras[Math.floor(Math.random() * extras.length)];

    return {
      title: theme.title,
      detail: `${entry.name} 님의 소망을 바탕으로 ${theme.scene} ${bonus}까지 준비했어요.`
    };
  }

  getWishTheme(wish) {
    const lowerWish = wish.toLowerCase();
    const themes = [
      {
        keywords: ['코딩', '개발', '프로그래밍', '코드'],
        title: 'AI 페어 프로그래밍 마스터 클래스',
        scene: '세계적인 개발자와 함께 하루 동안 집중 해커톤을 진행하고',
      },
      {
        keywords: ['반려', '강아지', '고양이', '펫'],
        title: '반려친구와 함께하는 프라이빗 포토 살롱',
        scene: '전문 포토그래퍼가 동행해 가장 사랑스러운 순간을 담아주고',
      },
      {
        keywords: ['우주', '별', '행성', '달', '천문'],
        title: '천문학자와 떠나는 별자리 여행',
        scene: '숨겨진 관측 포인트로 떠나 쏟아지는 유성우를 함께 보고',
      },
      {
        keywords: ['여행', '휴식', '바다', '캠핑'],
        title: '나만을 위한 비밀 여행 지도',
        scene: '당신만을 위한 맞춤 코스를 따라 하루 종일 힐링 여행을 즐기며',
      },
      {
        keywords: ['음악', '노래', '공연', '밴드'],
        title: '뮤지션과 함께하는 프라이빗 스튜디오 데이',
        scene: '좋아하는 뮤지션과 함께 레코딩 스튜디오에서 한 곡을 완성하고',
      },
      {
        keywords: ['그림', '일러', '디자인', '아트'],
        title: '나만의 아틀리에 하루 체험',
        scene: '작가와 함께 영감을 찾는 산책을 하고, 직접 작품을 완성하며',
      },
      {
        keywords: ['운동', '러닝', '요가', '서핑', '등산'],
        title: '퍼스널 액티비티 챌린지',
        scene: '전문 코치와 함께 몸을 깨우는 맞춤형 챌린지를 즐기고',
      },
      {
        keywords: ['요리', '디저트', '빵', '음식'],
        title: '프라이빗 쿠킹 & 테이블 경험',
        scene: '셰프와 함께 나만의 레시피를 만들고 직접 테이블을 꾸미며',
      },
    ];

    for (const theme of themes) {
      if (theme.keywords.some(keyword => lowerWish.includes(keyword))) {
        return theme;
      }
    }

    return {
      title: '꿈의 하루를 디자인하는 맞춤 경험',
      scene: '당신의 소망을 가장 빛나는 순간으로 재구성해 감동적인 하루를 선물하고',
    };
  }
}

customElements.define('raffle-drawer', RaffleDrawer);

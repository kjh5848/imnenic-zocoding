class QuoteRecommender extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.quotes = [
      {
        text: '작은 발걸음이 결국 큰 여정을 만든다.',
        author: '익명',
        theme: '성장',
        image: 'https://pixabay.com/ko/images/download/x-10060254_1920.jpg'
      },
      {
        text: '포기하지 않는 마음이 가장 강한 재능이다.',
        author: '익명',
        theme: '끈기',
        image: 'https://pixabay.com/ko/images/download/x-9303542_1920.jpg'
      },
      {
        text: '오늘의 몰입이 내일의 실력을 만든다.',
        author: '익명',
        theme: '몰입',
        image: 'https://pixabay.com/ko/images/download/x-10077647_1920.jpg'
      },
      {
        text: '두려움은 방향을 알려주는 나침반이다.',
        author: '익명',
        theme: '용기',
        image: 'https://pixabay.com/ko/images/download/x-10071302_1920.jpg'
      },
      {
        text: '좋은 질문은 이미 반쯤의 답이다.',
        author: '익명',
        theme: '호기심',
        image: 'https://cdn.pixabay.com/photo/2022/08/23/17/47/forest-7406241_1280.jpg'
      },
      {
        text: '휴식은 멈춤이 아니라 재충전이다.',
        author: '익명',
        theme: '휴식',
        image: 'https://cdn.pixabay.com/photo/2022/11/02/06/42/toadstool-7564167_640.jpg'
      },
      {
        text: '성공은 완벽함보다 꾸준함에 가깝다.',
        author: '익명',
        theme: '꾸준함',
        image: 'https://cdn.pixabay.com/photo/2023/12/06/14/39/snow-8433815_640.jpg'
      },
      {
        text: '나답게 생각한 순간부터 길이 열린다.',
        author: '익명',
        theme: '자기다움',
        image: 'https://cdn.pixabay.com/photo/2016/03/15/18/12/forest-1258845_640.jpg'
      },
      {
        text: '배움은 가장 오래 가는 투자다.',
        author: '익명',
        theme: '배움',
        image: 'https://cdn.pixabay.com/photo/2018/01/19/09/14/nature-3092017_640.jpg'
      },
      {
        text: '감사는 하루를 밝히는 가장 빠른 빛이다.',
        author: '익명',
        theme: '감사',
        image: 'https://cdn.pixabay.com/photo/2022/07/09/18/14/forest-7311484_640.jpg'
      },
      {
        text: '친절은 돌아오든 말든 이미 선물이다.',
        author: '익명',
        theme: '친절',
        image: 'https://cdn.pixabay.com/photo/2023/10/06/15/15/disc-fungus-8298506_640.jpg'
      },
      {
        text: '목표는 멀어도 방향은 오늘 정한다.',
        author: '익명',
        theme: '목표',
        image: 'https://cdn.pixabay.com/photo/2023/09/06/17/37/pearl-fungus-8237670_640.jpg'
      },
      {
        text: '실패는 시도했다는 증거다.',
        author: '익명',
        theme: '도전',
        image: 'https://cdn.pixabay.com/photo/2022/02/05/12/42/sea-of-clouds-6994730_640.jpg'
      },
      {
        text: '좋은 습관이 좋은 운을 만든다.',
        author: '익명',
        theme: '습관',
        image: 'https://cdn.pixabay.com/photo/2016/11/01/22/34/dirt-road-1789903_640.jpg'
      },
      {
        text: '내 마음이 편해야 길도 길어진다.',
        author: '익명',
        theme: '마음',
        image: 'https://cdn.pixabay.com/photo/2020/11/09/15/12/trail-5726987_640.jpg'
      },
      {
        text: '나를 믿는 순간 속도가 달라진다.',
        author: '익명',
        theme: '자신감',
        image: 'https://cdn.pixabay.com/photo/2012/03/01/00/21/bridge-19513_640.jpg'
      },
      {
        text: '작은 정리가 큰 여유를 만든다.',
        author: '익명',
        theme: '정리',
        image: 'https://cdn.pixabay.com/photo/2023/08/15/11/47/mushroom-8191823_640.jpg'
      },
      {
        text: '지금의 선택이 내일의 풍경을 바꾼다.',
        author: '익명',
        theme: '선택',
        image: 'https://cdn.pixabay.com/photo/2018/05/09/19/31/bavarian-forest-3385966_640.jpg'
      },
      {
        text: '함께 나누면 행복은 더 오래 남는다.',
        author: '익명',
        theme: '나눔',
        image: 'https://cdn.pixabay.com/photo/2018/01/14/23/14/forest-3082836_640.jpg'
      },
      {
        text: '하나의 하루를 잘 살면 인생이 달라진다.',
        author: '익명',
        theme: '일상',
        image: 'https://cdn.pixabay.com/photo/2024/02/07/18/00/mushroom-8559536_640.jpg'
      }
    ];

    this.themeMap = {
      calm: ['마음', '휴식', '감사'],
      tired: ['휴식', '마음', '정리'],
      excited: ['도전', '성장', '자신감'],
      anxious: ['용기', '마음', '자기다움'],
      needFocus: ['몰입', '습관', '목표'],
      needMotivation: ['성장', '끈기', '도전'],
      needComfort: ['감사', '친절', '나눔'],
      needClarity: ['정리', '선택', '목표'],
      todayRest: ['휴식', '마음', '일상'],
      todayGrow: ['배움', '성장', '호기심'],
      todayChallenge: ['도전', '용기', '자신감'],
      todayConnect: ['나눔', '친절', '감사']
    };

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          width: min(1100px, 92vw);
          margin: 3rem auto;
          color: #f4f1ed;
          font-family: 'Gowun Dodum', sans-serif;
        }

        .shell {
          display: grid;
          gap: 2.4rem;
        }

        header {
          display: grid;
          gap: 0.5rem;
          text-align: left;
        }

        h1 {
          margin: 0;
          font-size: clamp(2.2rem, 3vw, 3.2rem);
          font-family: 'Gowun Batang', serif;
          color: #fff7ea;
        }

        .subtitle {
          color: #c9c1b7;
          font-size: 1.05rem;
        }

        .section-title {
          margin: 0;
          font-size: 1.4rem;
          color: #f8f0e4;
          font-family: 'Gowun Batang', serif;
        }

        .mood-section {
          display: grid;
          gap: 1.4rem;
          padding: 1.8rem;
          border-radius: 22px;
          background: rgba(18, 16, 26, 0.82);
          border: 1px solid rgba(255, 255, 255, 0.08);
          box-shadow: 0 18px 35px rgba(0, 0, 0, 0.35);
        }

        .question-card {
          display: grid;
          gap: 0.8rem;
          padding: 1.2rem 1.4rem;
          border-radius: 16px;
          background: rgba(10, 9, 16, 0.8);
          border: 1px solid rgba(255, 255, 255, 0.06);
        }

        .question-card h3 {
          margin: 0;
          font-size: 1rem;
          color: #e5dccf;
        }

        .option-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
          gap: 0.6rem;
        }

        .option {
          position: relative;
          display: grid;
        }

        .option input {
          position: absolute;
          opacity: 0;
          pointer-events: none;
        }

        .option span {
          display: block;
          padding: 0.7rem 0.9rem;
          border-radius: 12px;
          border: 1px solid rgba(255, 255, 255, 0.12);
          color: #e9e2d8;
          background: rgba(12, 12, 18, 0.7);
          transition: all 0.2s ease;
        }

        .option input:checked + span {
          border-color: rgba(251, 188, 5, 0.7);
          background: rgba(251, 188, 5, 0.18);
          color: #fff3d7;
          box-shadow: 0 0 0 2px rgba(251, 188, 5, 0.12);
        }

        .form-actions {
          display: flex;
          gap: 0.8rem;
          flex-wrap: wrap;
        }

        button {
          border: none;
          border-radius: 999px;
          padding: 0.9rem 1.6rem;
          font-size: 1rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s ease;
          background: linear-gradient(120deg, #fbbc05, #ff7b4f);
          color: #2d1600;
          box-shadow: 0 18px 35px rgba(255, 123, 79, 0.3);
        }

        button:hover {
          transform: translateY(-1px);
        }

        .ghost {
          background: rgba(255, 255, 255, 0.1);
          color: #fff1db;
          box-shadow: none;
        }

        .results {
          display: grid;
          gap: 1rem;
        }

        .result-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .result-summary {
          color: #c3b9ad;
          font-size: 0.95rem;
        }

        .grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 1.2rem;
        }

        .card {
          position: relative;
          min-height: 220px;
          border-radius: 18px;
          overflow: hidden;
          padding: 1.4rem;
          display: grid;
          align-content: end;
          background: var(--bg);
          background-size: cover;
          background-position: center;
          box-shadow: 0 12px 30px rgba(0,0,0,0.35);
        }

        .card::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(12, 10, 18, 0.35), rgba(12, 10, 18, 0.85));
        }

        .card-content {
          position: relative;
          z-index: 1;
          display: grid;
          gap: 0.5rem;
        }

        .tag {
          display: inline-flex;
          align-items: center;
          padding: 0.3rem 0.8rem;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.18);
          color: #fff6e0;
          font-size: 0.85rem;
          letter-spacing: 0.05em;
          width: fit-content;
        }

        .quote {
          font-size: clamp(1.2rem, 1.8vw, 1.6rem);
          line-height: 1.5;
          font-weight: 700;
        }

        .author {
          color: #e8e1d6;
          font-size: 0.95rem;
        }

        .image-url {
          font-size: 0.75rem;
          color: rgba(255, 255, 255, 0.6);
          word-break: break-all;
        }

        .form-section {
          display: grid;
          gap: 1rem;
        }

        .form-card {
          background: rgba(16, 14, 22, 0.85);
          border-radius: 20px;
          padding: 1.8rem;
          border: 1px solid rgba(255, 255, 255, 0.08);
          box-shadow: 0 16px 30px rgba(0, 0, 0, 0.35);
          display: grid;
          gap: 1.2rem;
        }

        .form-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 1rem;
        }

        label {
          display: grid;
          gap: 0.4rem;
          font-size: 0.9rem;
          color: #cfc6bb;
        }

        input,
        textarea {
          border: 1px solid rgba(255, 255, 255, 0.14);
          background: rgba(10, 10, 16, 0.8);
          color: #f4f1ed;
          border-radius: 12px;
          padding: 0.75rem 0.9rem;
          font-size: 0.95rem;
          outline: none;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }

        textarea {
          min-height: 120px;
          resize: vertical;
          font-family: 'Gowun Dodum', sans-serif;
        }

        input:focus,
        textarea:focus {
          border-color: rgba(251, 188, 5, 0.6);
          box-shadow: 0 0 0 2px rgba(251, 188, 5, 0.18);
        }

        .form-actions {
          display: flex;
          justify-content: flex-end;
        }

        .form-note {
          font-size: 0.85rem;
          color: rgba(255, 255, 255, 0.6);
        }

        @media (max-width: 720px) {
          .mood-section {
            padding: 1.4rem;
          }
        }
      </style>
      <section class="shell">
        <header>
          <h1>명언 추천 서비스</h1>
          <div class="subtitle">간단한 기분 체크 후, 오늘의 마음에 맞는 명언 3개를 추천합니다.</div>
        </header>

        <section class="mood-section">
          <h2 class="section-title">오늘의 기분을 알려주세요</h2>
          <form id="recommend-form">
            <div class="question-card">
              <h3>Q1. 지금 기분은 어떤가요?</h3>
              <div class="option-grid">
                <label class="option"><input type="radio" name="mood" value="calm" checked><span>차분해요</span></label>
                <label class="option"><input type="radio" name="mood" value="tired"><span>지친 편이에요</span></label>
                <label class="option"><input type="radio" name="mood" value="excited"><span>에너지가 넘쳐요</span></label>
                <label class="option"><input type="radio" name="mood" value="anxious"><span>조금 불안해요</span></label>
              </div>
            </div>
            <div class="question-card">
              <h3>Q2. 지금 가장 필요한 것은?</h3>
              <div class="option-grid">
                <label class="option"><input type="radio" name="need" value="needFocus" checked><span>집중</span></label>
                <label class="option"><input type="radio" name="need" value="needMotivation"><span>동기부여</span></label>
                <label class="option"><input type="radio" name="need" value="needComfort"><span>위로</span></label>
                <label class="option"><input type="radio" name="need" value="needClarity"><span>명확함</span></label>
              </div>
            </div>
            <div class="question-card">
              <h3>Q3. 오늘의 방향은?</h3>
              <div class="option-grid">
                <label class="option"><input type="radio" name="direction" value="todayRest" checked><span>쉬어가기</span></label>
                <label class="option"><input type="radio" name="direction" value="todayGrow"><span>성장하기</span></label>
                <label class="option"><input type="radio" name="direction" value="todayChallenge"><span>도전하기</span></label>
                <label class="option"><input type="radio" name="direction" value="todayConnect"><span>관계 넓히기</span></label>
              </div>
            </div>
            <div class="form-actions">
              <button type="submit">맞춤 추천 받기</button>
              <button type="button" class="ghost" id="shuffle">다시 추천</button>
            </div>
          </form>
        </section>

        <section class="results">
          <div class="result-header">
            <h2 class="section-title">추천 명언 3선</h2>
            <div class="result-summary" id="summary"></div>
          </div>
          <div class="grid" id="recommendations"></div>
        </section>

        <section class="form-section">
          <h2 class="section-title">제휴 문의</h2>
          <div class="form-card">
            <div class="form-note">간단한 정보만 남겨주시면 빠르게 연락드릴게요.</div>
            <form action="https://formspree.io/f/meegblkn" method="POST">
              <div class="form-grid">
                <label>
                  이름
                  <input type="text" name="name" placeholder="홍길동" required>
                </label>
                <label>
                  이메일
                  <input type="email" name="email" placeholder="you@example.com" required>
                </label>
                <label>
                  회사/브랜드
                  <input type="text" name="company" placeholder="회사명을 입력해주세요">
                </label>
                <label>
                  관심 분야
                  <input type="text" name="interest" placeholder="예: 캠페인, 협업, 제휴">
                </label>
              </div>
              <label>
                문의 내용
                <textarea name="message" placeholder="협업 목적과 기대사항을 적어주세요." required></textarea>
              </label>
              <div class="form-actions">
                <button type="submit">문의 보내기</button>
              </div>
            </form>
          </div>
        </section>
      </section>
    `;
  }

  connectedCallback() {
    const form = this.shadowRoot.getElementById('recommend-form');
    const shuffleButton = this.shadowRoot.getElementById('shuffle');
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      this.recommend();
    });
    shuffleButton.addEventListener('click', () => this.recommend());
    this.recommend();
  }

  getSelectedThemes() {
    const form = this.shadowRoot.getElementById('recommend-form');
    const data = new FormData(form);
    const selectedThemes = new Set();

    for (const value of data.values()) {
      const themes = this.themeMap[value] || [];
      themes.forEach(theme => selectedThemes.add(theme));
    }

    return selectedThemes;
  }

  getSelectionSummary() {
    const form = this.shadowRoot.getElementById('recommend-form');
    const selections = [];
    const groups = ['mood', 'need', 'direction'];

    groups.forEach(name => {
      const checked = form.querySelector(`input[name="${name}"]:checked`);
      if (checked) {
        const label = checked.nextElementSibling;
        if (label) {
          selections.push(label.textContent.trim());
        }
      }
    });

    return selections;
  }

  recommend() {
    const selectedThemes = this.getSelectedThemes();
    const summaryEl = this.shadowRoot.getElementById('summary');
    const selections = this.getSelectionSummary();

    if (selections.length) {
      summaryEl.textContent = `선택한 분위기: ${selections.join(' · ')}`;
    } else {
      summaryEl.textContent = '';
    }

    const scored = this.quotes.map(quote => ({
      quote,
      score: selectedThemes.has(quote.theme) ? 1 : 0,
      seed: Math.random()
    }));

    scored.sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return a.seed - b.seed;
    });

    const recommendations = scored.slice(0, 3).map(item => item.quote);
    this.renderRecommendations(recommendations);
  }

  renderRecommendations(recommendations) {
    const grid = this.shadowRoot.getElementById('recommendations');
    grid.innerHTML = '';

    recommendations.forEach((quote, index) => {
      const card = document.createElement('article');
      card.className = 'card';
      card.style.setProperty('--bg', `url("${quote.image}")`);

      const content = document.createElement('div');
      content.className = 'card-content';

      const tag = document.createElement('span');
      tag.className = 'tag';
      tag.textContent = `추천 ${index + 1} · ${quote.theme}`;

      const text = document.createElement('div');
      text.className = 'quote';
      text.textContent = quote.text;

      const author = document.createElement('div');
      author.className = 'author';
      author.textContent = `— ${quote.author}`;

      const url = document.createElement('div');
      url.className = 'image-url';
      url.textContent = quote.image;

      content.appendChild(tag);
      content.appendChild(text);
      content.appendChild(author);
      content.appendChild(url);
      card.appendChild(content);
      grid.appendChild(card);
    });
  }
}

customElements.define('quote-recommender', QuoteRecommender);

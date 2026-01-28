class QuoteRecommender extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.quotes = [
      {
        text: '작은 발걸음이 결국 큰 여정을 만든다.',
        author: '익명',
        theme: '성장',
        image: 'https://source.unsplash.com/1600x900/?path,journey'
      },
      {
        text: '포기하지 않는 마음이 가장 강한 재능이다.',
        author: '익명',
        theme: '끈기',
        image: 'https://source.unsplash.com/1600x900/?mountain,trail'
      },
      {
        text: '오늘의 몰입이 내일의 실력을 만든다.',
        author: '익명',
        theme: '몰입',
        image: 'https://source.unsplash.com/1600x900/?workspace,focus'
      },
      {
        text: '두려움은 방향을 알려주는 나침반이다.',
        author: '익명',
        theme: '용기',
        image: 'https://source.unsplash.com/1600x900/?compass,adventure'
      },
      {
        text: '좋은 질문은 이미 반쯤의 답이다.',
        author: '익명',
        theme: '호기심',
        image: 'https://source.unsplash.com/1600x900/?library,books'
      },
      {
        text: '휴식은 멈춤이 아니라 재충전이다.',
        author: '익명',
        theme: '휴식',
        image: 'https://source.unsplash.com/1600x900/?ocean,calm'
      },
      {
        text: '성공은 완벽함보다 꾸준함에 가깝다.',
        author: '익명',
        theme: '꾸준함',
        image: 'https://source.unsplash.com/1600x900/?road,steps'
      },
      {
        text: '나답게 생각한 순간부터 길이 열린다.',
        author: '익명',
        theme: '자기다움',
        image: 'https://source.unsplash.com/1600x900/?sunrise,horizon'
      },
      {
        text: '배움은 가장 오래 가는 투자다.',
        author: '익명',
        theme: '배움',
        image: 'https://source.unsplash.com/1600x900/?education,study'
      },
      {
        text: '감사는 하루를 밝히는 가장 빠른 빛이다.',
        author: '익명',
        theme: '감사',
        image: 'https://source.unsplash.com/1600x900/?light,window'
      },
      {
        text: '친절은 돌아오든 말든 이미 선물이다.',
        author: '익명',
        theme: '친절',
        image: 'https://source.unsplash.com/1600x900/?hands,kindness'
      },
      {
        text: '목표는 멀어도 방향은 오늘 정한다.',
        author: '익명',
        theme: '목표',
        image: 'https://source.unsplash.com/1600x900/?stars,night'
      },
      {
        text: '실패는 시도했다는 증거다.',
        author: '익명',
        theme: '도전',
        image: 'https://source.unsplash.com/1600x900/?climb,rock'
      },
      {
        text: '좋은 습관이 좋은 운을 만든다.',
        author: '익명',
        theme: '습관',
        image: 'https://source.unsplash.com/1600x900/?morning,coffee'
      },
      {
        text: '내 마음이 편해야 길도 길어진다.',
        author: '익명',
        theme: '마음',
        image: 'https://source.unsplash.com/1600x900/?forest,green'
      },
      {
        text: '나를 믿는 순간 속도가 달라진다.',
        author: '익명',
        theme: '자신감',
        image: 'https://source.unsplash.com/1600x900/?speed,road'
      },
      {
        text: '작은 정리가 큰 여유를 만든다.',
        author: '익명',
        theme: '정리',
        image: 'https://source.unsplash.com/1600x900/?minimal,desk'
      },
      {
        text: '지금의 선택이 내일의 풍경을 바꾼다.',
        author: '익명',
        theme: '선택',
        image: 'https://source.unsplash.com/1600x900/?landscape,choice'
      },
      {
        text: '함께 나누면 행복은 더 오래 남는다.',
        author: '익명',
        theme: '나눔',
        image: 'https://source.unsplash.com/1600x900/?community,people'
      },
      {
        text: '하나의 하루를 잘 살면 인생이 달라진다.',
        author: '익명',
        theme: '일상',
        image: 'https://source.unsplash.com/1600x900/?daylight,city'
      }
    ];

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
          gap: 2rem;
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

        .controls {
          display: flex;
          align-items: center;
          gap: 1rem;
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

        .featured {
          position: relative;
          border-radius: 22px;
          overflow: hidden;
          min-height: 260px;
          padding: 2.2rem;
          display: grid;
          align-content: end;
          background: var(--feature-bg);
          background-size: cover;
          background-position: center;
          box-shadow: 0 24px 45px rgba(0,0,0,0.45);
        }

        .featured::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(120deg, rgba(10, 9, 16, 0.2), rgba(10, 9, 16, 0.75));
        }

        .featured-content {
          position: relative;
          z-index: 1;
          display: grid;
          gap: 0.8rem;
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
          font-size: clamp(1.4rem, 2vw, 2rem);
          line-height: 1.5;
          font-weight: 700;
        }

        .author {
          color: #e8e1d6;
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
          cursor: pointer;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          box-shadow: 0 12px 30px rgba(0,0,0,0.35);
        }

        .card::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(12, 10, 18, 0.35), rgba(12, 10, 18, 0.85));
        }

        .card:hover {
          transform: translateY(-4px);
          box-shadow: 0 18px 40px rgba(0,0,0,0.45);
        }

        .card-content {
          position: relative;
          z-index: 1;
          display: grid;
          gap: 0.5rem;
        }

        .card .quote {
          font-size: 1.1rem;
        }

        .image-url {
          font-size: 0.75rem;
          color: rgba(255, 255, 255, 0.6);
          word-break: break-all;
        }

        @media (max-width: 720px) {
          .featured {
            min-height: 220px;
            padding: 1.6rem;
          }
        }
      </style>
      <section class="shell">
        <header>
          <h1>명언 추천 서비스</h1>
          <div class="subtitle">오늘의 마음에 닿는 명언을 추천하고, 어울리는 바탕화면을 함께 보여드립니다.</div>
        </header>
        <div class="controls">
          <button id="random">오늘의 명언 추천</button>
        </div>
        <div id="featured" class="featured" style="--feature-bg: none;">
          <div class="featured-content">
            <span class="tag">추천 명언</span>
            <div id="featured-quote" class="quote"></div>
            <div id="featured-author" class="author"></div>
          </div>
        </div>
        <div class="grid" id="grid"></div>
      </section>
    `;
  }

  connectedCallback() {
    this.shadowRoot.getElementById('random').addEventListener('click', () => this.pickRandom());
    this.renderCards();
    this.pickRandom();
  }

  renderCards() {
    const grid = this.shadowRoot.getElementById('grid');
    grid.innerHTML = '';

    this.quotes.forEach((quote, index) => {
      const card = document.createElement('article');
      card.className = 'card';
      card.style.setProperty('--bg', `url("${quote.image}")`);
      card.addEventListener('click', () => this.showFeatured(index));

      const content = document.createElement('div');
      content.className = 'card-content';

      const tag = document.createElement('span');
      tag.className = 'tag';
      tag.textContent = quote.theme;

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

  pickRandom() {
    const randomIndex = Math.floor(Math.random() * this.quotes.length);
    this.showFeatured(randomIndex);
  }

  showFeatured(index) {
    const selected = this.quotes[index];
    const featured = this.shadowRoot.getElementById('featured');
    const quoteEl = this.shadowRoot.getElementById('featured-quote');
    const authorEl = this.shadowRoot.getElementById('featured-author');

    featured.style.setProperty('--feature-bg', `url("${selected.image}")`);
    quoteEl.textContent = selected.text;
    authorEl.textContent = `— ${selected.author} · ${selected.theme}`;
  }
}

customElements.define('quote-recommender', QuoteRecommender);

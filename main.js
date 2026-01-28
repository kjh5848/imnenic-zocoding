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
            max-width: 500px;
            margin: 2rem auto;
        }
        .raffle-container {
            background: #2a2a2a;
            border-radius: 15px;
            padding: 2rem;
            box-shadow: 0 10px 30px rgba(0,0,0,0.5);
            text-align: center;
        }

        h1 {
            color: #fff;
            font-size: 2.5rem;
            margin-bottom: 2rem;
            text-shadow: 0 0 10px rgba(255,255,255,0.2);
        }

        h2 {
            color: #a0a0a0;
            font-size: 1.2rem;
            border-bottom: 1px solid #444;
            padding-bottom: 0.5rem;
            margin-top: 2rem;
            margin-bottom: 1rem;
            text-align: left;
        }

        .input-area {
            display: flex;
            gap: 0.5rem;
            margin-bottom: 1rem; 
        }

        #name {
            flex-grow: 1;
            border: 1px solid #444;
            background: #333;
            color: #fff;
            padding: 0.8rem 1rem;
            border-radius: 8px;
            font-size: 1rem;
            outline: none;
            transition: all 0.2s ease;
        }

        #name:focus {
            border-color: #4d90fe;
            box-shadow: 0 0 5px rgba(77, 144, 254, 0.5);
        }

        button {
            border: none;
            border-radius: 8px;
            padding: 0.8rem 1.5rem;
            font-size: 1rem;
            font-weight: bold;
            cursor: pointer;
            transition: all 0.2s ease;
            box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        }

        #add {
            background: #4d90fe;
            color: #fff;
        }

        #add:hover {
            background: #357ae8;
        }
        
        #add-dummies {
            background: #6c757d;
            color: #fff;
            margin-bottom: 2rem;
        }
        
        #add-dummies:hover {
            background: #5a6268;
        }

        .controls {
            display: flex;
            justify-content: center;
            gap: 1rem;
            margin-top: 2rem;
        }

        #draw {
            background: #34a853;
            color: #fff;
        }

        #draw:hover {
            background: #2c8b45;
        }

        #reset {
            background: #ea4335;
            color: #fff;
        }

        #reset:hover {
            background: #d02c1d;
        }

        #entries-list {
            list-style: none;
            padding: 0;
            margin: 0;
            max-height: 200px;
            overflow-y: auto;
            background: #333;
            border-radius: 8px;
            padding: 1rem;
            text-align: left;
        }

        #entries-list li {
            padding: 0.5rem;
            border-bottom: 1px solid #444;
            color: #ddd;
        }

        #entries-list li:last-child {
            border-bottom: none;
        }

        .winner-area {
            margin-top: 2rem;
            min-height: 100px;
            display: grid;
            place-content: center;
        }

        #winner-name {
            font-size: 2.5rem;
            font-weight: bold;
            color: #fbbc05;
            text-shadow: 0 0 15px #fbbc05;
        }

        .winner-animation {
            animation: winner-animation 0.5s ease-in-out;
        }

        @keyframes winner-animation {
          0% { transform: scale(0.5); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
      </style>
      <div class="raffle-container">
        <h1>응모권 추첨기</h1>
        <div class="input-area">
          <input type="text" id="name" placeholder="이름을 입력하세요">
          <button id="add">추가</button>
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
    this.shadowRoot.getElementById('draw').addEventListener('click', () => this.drawWinner());
    this.shadowRoot.getElementById('reset').addEventListener('click', () => this.resetRaffle());
    
    this.addDummyData();
  }

  addEntry() {
    const nameInput = this.shadowRoot.getElementById('name');
    const name = nameInput.value.trim();
    if (name) {
      this.state.entries.push(name);
      nameInput.value = '';
      this.updateEntriesList();
      nameInput.focus();
    }
  }
  
  addDummyData() {
    const dummyNames = [
      '이서준', '김민준', '박도윤', '최시우', '정예준',
      '강지호', '조하준', '윤은우', '장선우', '임유준',
      '한지안', '신서아', '오하윤', '송아윤', '권지유',
      '황서연', '안지민', '홍채원', '문수아', '양다은'
    ];

    // Add 20 random names
    for (let i = 0; i < 20; i++) {
        const randomIndex = Math.floor(Math.random() * dummyNames.length);
        this.state.entries.push(dummyNames[randomIndex] + " " + (i+1));
    }
    
    this.updateEntriesList();
  }

  updateEntriesList() {
    const entriesList = this.shadowRoot.getElementById('entries-list');
    entriesList.innerHTML = '';
    this.state.entries.forEach(entry => {
      const li = document.createElement('li');
      li.textContent = entry;
      entriesList.appendChild(li);
    });
  }

  drawWinner() {
    if (this.state.entries.length === 0) {
      alert("응모자가 없습니다!");
      return;
    }

    const winnerNameEl = this.shadowRoot.getElementById('winner-name');
    winnerNameEl.classList.remove('winner-animation');

    let shuffleCount = 0;
    const maxShuffles = 30;
    const shuffleInterval = 50;

    const shuffle = () => {
      const randomIndex = Math.floor(Math.random() * this.state.entries.length);
      winnerNameEl.textContent = this.state.entries[randomIndex];
      shuffleCount++;
      if (shuffleCount < maxShuffles) {
        setTimeout(shuffle, shuffleInterval);
      } else {
        const winnerIndex = Math.floor(Math.random() * this.state.entries.length);
        this.state.winner = this.state.entries[winnerIndex];
        winnerNameEl.textContent = this.state.winner;
        winnerNameEl.classList.add('winner-animation');
      }
    };
    
    shuffle();
  }

  resetRaffle() {
    this.state.entries = [];
    this.state.winner = null;
    this.updateEntriesList();
    const winnerNameEl = this.shadowRoot.getElementById('winner-name');
    winnerNameEl.textContent = '';
    winnerNameEl.classList.remove('winner-animation');
  }
}

customElements.define('raffle-drawer', RaffleDrawer);
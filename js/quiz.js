(function () {
  // READY MODAL LOGIC 
  const ready = document.getElementById('ready');
  const yesBtn = document.getElementById('yesBtn');
  const noBtn = document.getElementById('noBtn');
  const card = document.getElementById('card');
  let overlayActive = true;

  function onKeyDown(e) {
    if (!overlayActive) return;
    if (e.key === 'Tab') {
      e.preventDefault();
      card.style.transform = 'translateY(-3px)';
      setTimeout(() => card.style.transform = '', 100);
    }
  }
  document.addEventListener('keydown', onKeyDown);

  yesBtn.addEventListener('click', () => {
    overlayActive = false;
    ready.style.display = 'none';
    document.removeEventListener('keydown', onKeyDown);
    startGame();
  });

  function moveNoBtn() {
    const cardRect = card.getBoundingClientRect();
    const maxX = Math.max(4, cardRect.width - noBtn.offsetWidth - 16);
    const maxY = Math.max(4, cardRect.height - noBtn.offsetHeight - 80);
    noBtn.style.left = Math.floor(Math.random() * maxX) + 'px';
    noBtn.style.top = Math.floor(Math.random() * maxY) + 'px';
  }

  noBtn.addEventListener('mouseenter', moveNoBtn);
  noBtn.addEventListener('click', (e) => {
    e.preventDefault();
    noBtn.style.transform = 'scale(0.95)';
    setTimeout(() => noBtn.style.transform = '', 120);
    moveNoBtn();
  });

  // QUIZ LOGIC
  const quiz = [
    { 
      question: "What month did I say 'yes' to us?", 
      answer: ["august", "aug", "8"], 
      hint: "Uh oh...babe, you for real?!!!😭 Anyway, feel free to look at your calendar.",
      happyImg: "css/images/happy.png",
      angryImg: "css/images/angry.png"
    },
    { 
      question: "What part of your body do I adore the most?", 
      answer: ["eyes"], 
      hint: "I'll be lost staring at those🥰",
      happyImg: "css/images/happy2.png",
      angryImg: "css/images/angry2.png"
    },
    { 
      question: "What month is my birthday?", 
      answer: ["december", "dec", "12"], 
      hint: "The start of winter in the Northern Hemisphere❄️",
      happyImg: "css/images/happy3.png",
      angryImg: "css/images/angry3.png"
    },
    { 
      question: "How many months have we been together?", 
      answer: ["2","two"], 
      hint: "This is super easyyyy",
      happyImg: "css/images/happy4.png",
      angryImg: "css/images/angry4.png"
    },
    { 
      question: "I love you, I love you more, I love you the most, and I love you to ________.", 
      answer: ["infinity and beyond","infinity & beyond"], 
      hint: "No hint for yah!😛", 
      happyImg: "css/images/happy5.png",
      angryImg: "css/images/angry5.png",
    }
  ];

  const neutralImg = "css/images/1.png";  
  let current = 0;

   
  const questionText = document.getElementById('questionText');
  const answerInput = document.getElementById('answerInput');
  const submitBtn = document.getElementById('submitBtn');
  const hintBtn = document.getElementById('hintBtn');
  const result = document.getElementById('result');
  const hintText = document.getElementById('hintText');
  const game = document.getElementById('game');
  const mochiImg = document.getElementById('mochiImg');

  // Preload all quiz images 
  [...quiz.flatMap(q => [q.happyImg, q.angryImg]), neutralImg].forEach(src => {
    if (src) {
      const img = new Image();
      img.src = src;
    }
  });

  function startGame() {
    game.style.display = 'block';
    loadQuestion();
    setTimeout(() => answerInput.focus(), 150);
  }

  function loadQuestion() {
    const q = quiz[current];
    questionText.textContent = q.question;
    answerInput.value = '';
    result.textContent = '';
    hintText.textContent = '';
    mochiImg.src = neutralImg; 
  }

  function showTemporaryImage(tempImg, callback) {
    mochiImg.src = tempImg;
    setTimeout(() => {
      mochiImg.src = neutralImg;
      if (callback) callback();
    }, 2300);  
  }

  submitBtn.addEventListener('click', () => {
    hintText.textContent = '';

    const val = answerInput.value.trim().toLowerCase();
    const answers = quiz[current].answer.map(a => a.toLowerCase());

    if (!val) {
      result.textContent = "Type your answer babe 💜";
      result.style.color = 'rgba(161, 17, 89, 1)';
      return;
    }

    if (answers.includes(val)) {
      if (current < quiz.length - 1) {
        result.textContent = "Yayy, you got it right babe! 💜 Now here’s another question…";
        result.style.color = '#044211ff';

        // show happy, then load next
        showTemporaryImage(quiz[current].happyImg, () => {
          current++;
          loadQuestion();
          [answerInput, submitBtn, hintBtn, questionText].forEach(el => el.style.display = "inline-block");
        });

        // temporarily hide inputs during happy image
        [answerInput, submitBtn, hintBtn, questionText].forEach(el => el.style.display = "none");

      } else {
        result.textContent = "🎉 Congratulations, you’ve earned your prize babe! Redirecting…";
        result.style.color = '#04801dff';
        [submitBtn, hintBtn, answerInput, questionText].forEach(el => el.style.display = "none");
        showTemporaryImage(quiz[current].happyImg); 
        setTimeout(() => location.href = 'card.html', 2200);
      }
    } else {
      result.textContent = "Not quite, try again babe!😭";
      result.style.color = '#960c0cff';
      showTemporaryImage(quiz[current].angryImg);
    }
  });

  // clear message when typing
  answerInput.addEventListener('input', () => result.textContent = '');

  hintBtn.addEventListener('click', () => {
    hintText.textContent = quiz[current].hint;
  });

  answerInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      submitBtn.click();
    }
  });

})();

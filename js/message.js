(function () {
  const message = document.getElementById('message');
  const panels = document.querySelectorAll('.content-panel');
  const buttons = document.querySelectorAll('.options-panel button');

  // Hide all non-message panels initially
  panels.forEach(p => p.style.display = 'none');

  function hideAllPanels() {
    message.style.display = 'none'; // hide main letter too
    panels.forEach(p => {
      p.classList.remove('show');
      p.style.display = 'none';
    });
  }

  function showPanel(id) {
    if (id === "message") {
      // Show the letter again
      hideAllPanels();
      message.style.display = 'block';
      message.classList.remove("fade-out");
    } else {
      // Show a content panel (poem/picture)
      hideAllPanels();
      const panel = document.getElementById(id);
      if (panel) {
        panel.style.display = 'block';
        void panel.offsetWidth; // force reflow
        panel.classList.add('show');
      }
    }
  }

  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      const target = btn.getAttribute("data-target");

      // Update active button
      buttons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      // Show target panel
      showPanel(target);
    });
  });

  // Default active button = Letter
  buttons[0].classList.add("active");
})();
 function preloadImages(imageUrls) {
    imageUrls.forEach(src => {
      const img = new Image();
      img.src = src;
    });
  }

  // preload images
  const imagesToPreload = [
    'css/images/blues.png',
    'css/images/poem.jpg',
    'css/images/Freiren.png'
  ];

  preloadImages(imagesToPreload);




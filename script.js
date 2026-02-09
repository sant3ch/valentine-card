$(document).ready(function () {
  var envelope = $("#envelope");
  var btn_open = $("#open");
  var btn_next = $("#next");
  var btn_reset = $("#reset");
  var flowerModal = $("#flowerModal");
  var closeModal = $(".close-modal");
  var celebrateAgainBtn = $("#celebrateAgain");
  var bottomYes = $("#bottomYes");
  var bottomNo = $("#bottomNo");
  var spotifyPlayer = $("#spotifyPlayer");
  
  envelope.click(function () {
    open();
  });
  
  btn_open.click(function () {
    open();
  });
  
  btn_next.click(function () {
    showSecondPage();
  });
  
  btn_reset.click(function () {
    close();
  });

  bottomYes.click(function() {
    createConfetti();

    // Set Spotify player with autoplay
    // Important: Use the correct embed URL format
    var spotifyEmbedUrl = "https://open.spotify.com/embed/track/6CVciPxACaLYZfx49VGSPy?utm_source=generator&autoplay=1";
    
    // Set the src attribute to load the player
    spotifyPlayer.attr("src", spotifyEmbedUrl);
    
    // Show modal after a short delay
    setTimeout(function() {
      flowerModal.fadeIn(300);
      
      // Force play on some browsers by reloading the iframe
      setTimeout(function() {
        spotifyPlayer[0].contentWindow.postMessage('{"command":"play"}', '*');
      }, 500);
    }, 500);
  });

  // Bottom No button click - with dodging effect
  var isNoButtonDodging = false;
  bottomNo.mouseenter(function() {
    if (!isNoButtonDodging) {
      isNoButtonDodging = true;
      
      // Calculate random position within viewport
      var maxX = $(window).width() - bottomNo.outerWidth();
      var maxY = $(window).height() - bottomNo.outerHeight();
      
      var randomX = Math.floor(Math.random() * maxX);
      var randomY = Math.floor(Math.random() * maxY);
      
      // Apply dodging animation
      bottomNo.css({
        position: 'fixed',
        left: randomX + 'px',
        top: randomY + 'px',
        transition: 'all 0.3s ease'
      });
      
      // Reset after animation
      setTimeout(function() {
        isNoButtonDodging = false;
      }, 300);
    }
  });

  // If user manages to click No button
  bottomNo.click(function() {
    // Hide both bottom Yes/No buttons and show Close button again
    bottomYes.hide();
    bottomNo.hide();
    btn_reset.show();
    
    // Show a funny message
    alert("Aww, maybe next time! 💔 The No button tried to run away!");
  });

  // Close modal
  closeModal.click(function() {
    flowerModal.fadeOut(300);
    // Stop music when closing
    spotifyPlayer.attr("src", "");
  });

  celebrateAgainBtn.click(function() {
    flowerModal.fadeOut(300);
    setTimeout(function() {
      createConfetti();
      // Restart the Spotify player
      spotifyPlayer.attr("src", "https://open.spotify.com/embed/track/6CVciPxACaLYZfx49VGSPy?utm_source=generator&autoplay=1");
      flowerModal.fadeIn(300);
    }, 300);
  });

  // Close modal if clicked outside
  $(window).click(function(event) {
    if (event.target == flowerModal[0]) {
      flowerModal.fadeOut(300);
      // Stop music when closing
      spotifyPlayer.attr("src", "");
    }
  });

  function open() {
    envelope.addClass("open").removeClass("close");
    // Show next button after opening
    setTimeout(function() {
      btn_open.hide();
      btn_next.show();
    }, 1000);
  }
  
  function showSecondPage() {
    envelope.addClass("show-second-page");
    btn_next.hide();

    // hide Close and show Yes/No at bottom
    btn_reset.hide();
    bottomYes.show();
    bottomNo.show();
    
    // Style the bottom buttons
    bottomYes.css({
      backgroundColor: '#ff6b6b',
      color: 'white',
      border: 'solid 2px #ff6b6b',
      position: 'static'
    }).html('YES! <span style="font-size: 1.2em;">❤️</span>');
    
    bottomNo.css({
      backgroundColor: '#6c757d',
      color: 'white',
      border: 'solid 2px #6c757d',
      position: 'static'
    }).html('NO <span style="font-size: 1.2em;">💔</span>');
  }
  
  function close() {
    envelope.removeClass("open show-second-page").addClass("close");
    // Reset all buttons to initial state
    btn_open.show();
    btn_next.hide();
    btn_reset.show();
    bottomYes.hide();
    bottomNo.hide();
    
    // Reset bottom No button position
    bottomNo.css({
      position: 'static',
      left: 'auto',
      top: 'auto'
    });
    
    // Close modal if open and stop music
    flowerModal.fadeOut(300);
    spotifyPlayer.attr("src", "");
  }

  // Confetti function
  function createConfetti() {
    var confettiContainer = $("#confetti-container");
    confettiContainer.empty();
    
    for (var i = 0; i < 150; i++) {
      var confetti = $("<div class='confetti'></div>");
      var startX = Math.random() * window.innerWidth;
      var color = getRandomColor();
      
      confetti.css({
        left: startX + "px",
        backgroundColor: color,
        width: Math.random() * 10 + 5 + "px",
        height: Math.random() * 10 + 5 + "px"
      });
      
      confettiContainer.append(confetti);
      
      animateConfetti(confetti);
    }
  }

  function animateConfetti(element) {
    var duration = Math.random() * 3 + 2;
    var endX = (Math.random() - 0.5) * 200;
    var rotation = Math.random() * 720;
    
    element.animate({
      top: window.innerHeight + "px",
      left: "+=" + endX + "px",
      opacity: 0
    }, duration * 1000, function() {
      $(this).remove();
    });
    
    element.css({
      transform: "rotate(" + rotation + "deg)",
      transition: "transform " + duration + "s linear"
    });
  }

  function getRandomColor() {
    var colors = [
      "#ff6b6b", "#ffd166", "#06d6a0", "#118ab2", "#ef476f",
      "#ff9a76", "#ffcc00", "#9d4edd", "#ff0054", "#00bbf9"
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  }
});

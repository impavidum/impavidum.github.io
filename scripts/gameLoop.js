// Drives the game
var gameLooper = (function () {

  'use strict';

  var isPaused = false,
    gameOver = false,
    gameWin = false,
    starCheck = false,
    firstLoad = true,
    firstStarSound = true,
    pauseModal = document.getElementById('pause-modal'),
    gameOverModal = document.getElementById('game-over-modal'),
    gameWinModal = document.getElementById('game-win-modal'),
    playAgainBtnParent = document.getElementById('play-again-parent'),
    playAgainBtn = document.getElementById('play-again'),
    playBtnParent = document.getElementById('play-parent'),
    playBtn = document.getElementById('play'),
    star = document.getElementById('star'),
    protagonist = marioModule.mario,
    protagonistImg = marioModule.marioImg,
    antagonistArr = ghostModule.ghosts,
    antagonistImg = ghostModule.ghostImg,
    animationHandle;

  function startGame() {

    // Removes keypress listeners during gameover or win
    function handler(e) {
      e.stopPropagation();
      e.preventDefault();
    }

    // function pauses game
    function pause() {

      // UnPause the game
      if (isPaused === true) {
        
        isPaused = false;

        // Start animation
        animationHandle = requestAnimationFrame(gameLoop);

        // Config classes
        pauseModal.classList.remove('modal-active');
        playBtnParent.classList.remove('btn-active');
        menuModule.pauseBtn.classList.remove('paused');
        menuModule.pauseBtn.classList.add('unpaused');
        playBtn.blur();

        // Config audio
        if (audioService.muted === false) {
          if (firstLoad === true) {
            audioService.enterCourse.play();
            audioService.menuPlay.volume = 0;
            audioService.gameAudio.volume = 1;
            audioService.gameAudio.play();
            audioService.unmute();
            firstLoad = false;
            return;
          } else {
            audioService.pause.play();
            audioService.unmute();
            audioService.gameAudio.play();
          }
        }

      // Pause the game
      } else {
        
        isPaused = true;
        
        // Stop animation
        cancelAnimationFrame(animationHandle);
        
        // Darken background
        tint();
        
        // Config classes
        menuModule.pauseBtn.classList.remove('unpaused');
        menuModule.pauseBtn.classList.add('paused');
        pauseModal.classList.add('modal-active');
        playBtnParent.classList.add('btn-active');
        audioService.mute();
        
        // Config audio
        if (audioService.muted === false) {
          if (firstLoad === true) {
            audioService.menuPlay.play();
            return;
          }
          audioService.pause.volume = 1;
          audioService.pause.play();
        }
      }
    }

    // Function pauses from spacebar
    function spacePause(e) {
      if (e.keyCode === 32) {
        pause();
      }
    }

    // Function restarts game
    function playAgain() {
      location.reload();
    }

    // Darkens the background of modal
    function tint() {
      core.ctx.save();
      core.ctx.globalAlpha = 0.7;
      core.ctx.drawImage(core.tint, 0, 0, window.innerWidth, window.innerHeight);
      core.ctx.restore();
    }

    // Main gameLoop
    function gameLoop() {

      // Retrieve fresh values
      gameOver = core.gameOverCheck();
      gameWin = core.gameWinCheck();
      starCheck = core.starCheck();

      // Game over
      if (gameOver === true) {
        
        // Stop animation
        cancelAnimationFrame(animationHandle);
        
        // Darken background
        tint();
        
        // Config classes
        gameOverModal.classList.add('modal-active');
        playAgainBtnParent.classList.add('btn-active');
        menuModule.menuParent.classList.add('hide');
        menuModule.muteBtn.classList.remove('show');
        menuModule.pauseBtn.classList.remove('show');
        
        // Config audio
        if (audioService.muted === false) {
          audioService.mute();
          audioService.gameOver.volume = 1;
          audioService.gameOver.play();
        }
        
        // Disable keydown events
        document.addEventListener('keydown', handler, true);
        return;
      }

      // Game Win
      if (gameWin === true) {
        
        // Config classes
        star.classList.add('star-active');
        
        // Config audio
        if (audioService.muted === false && firstStarSound === true) {
          audioService.mute();
          audioService.star.volume = 1;
          audioService.star.play();
          firstStarSound = false;
        }
        
        // Set watch for star retrieval
        core.getStar(protagonist);
        
        // Star retrieved
        if (starCheck === true) {
          
          // Darken Backgorund
          tint();
          
          // Config classes
          star.classList.remove('star-active');
          star.classList.add('star-done');
          menuModule.menuParent.classList.add('hide');
          menuModule.muteBtn.classList.remove('show');
          menuModule.pauseBtn.classList.remove('show');
          gameWinModal.classList.add('modal-active');
          playAgainBtnParent.classList.add('btn-active');
          
          // Config audio
          if (audioService.muted === false) {
            audioService.star.pause();
            audioService.win.volume = 1;
            audioService.win.play();
          }
          
          // Disable keydown events
          document.addEventListener('keydown', handler, true);
          return;
        }
      }

      // Redraw background ever loop
      core.ctx.drawImage(core.background, 0, 0, window.innerWidth, window.innerHeight);

      // Check if protagonist has been hit
      core.checkHit(protagonist);

      // Update antagonists on display
      ghostModule.ghosts.forEach(moveService.moveRand);

      // Update protagonist on display
      moveService.moveWasd(protagonist);

      animationHandle = requestAnimationFrame(gameLoop);
    } // End gameLoop function

    // Event Listeners
    menuModule.pauseBtn.addEventListener('click', pause, false);
    playBtn.addEventListener('click', pause, false);
    playAgainBtn.addEventListener('click', playAgain, false);
    window.addEventListener('keydown', spacePause, false);

    // Initialize screen on first load
    core.ctx.drawImage(core.background, 0, 0, window.innerWidth, window.innerHeight);
    pause();
  }

  // Wait to start until page has loaded
  window.addEventListener('load', startGame, false);

})();
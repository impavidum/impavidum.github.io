// Module respondible for serving menu
var menuModule = (function () {

  'use strict';

  var menuOpen = false,
    menuParent = document.getElementById('menu-parent'),
    menuBtn = document.getElementById('menu'),
    muteBtn = document.getElementById('mute'),
    pauseBtn = document.getElementById('pause'),
    infoBtn = document.getElementById('info');


  // Function toggles menu open and close
  function toggleMenu() {
    if (menuOpen === false) {
      menuOpen = true;
      menuBtn.classList.add('active');
      setTimeout(function () {
        menuBtn.classList.add('done');
        muteBtn.classList.add('show');
        pauseBtn.classList.add('show');
        infoBtn.classList.add('show');
      }, 300);

    } else {
      menuOpen = false;
      menuBtn.classList.remove('active');
      setTimeout(function () {
        menuBtn.classList.remove('done');
        muteBtn.classList.remove('show');
        pauseBtn.classList.remove('show');
        infoBtn.classList.remove('show');
      }, 300);
    }
  }

  //Function toggles mute
  function toggleMute() {
    
    if (audioService.muted === false) {
      audioService.muted = true;
      muteBtn.classList.remove('unmuted');
      muteBtn.classList.add('muted');
      audioService.mute();
    } else {
      audioService.muted = false;
      muteBtn.classList.remove('muted');
      muteBtn.classList.add('unmuted');
      audioService.unmute();
    }
  }

  // Event Listeners
  menuBtn.addEventListener('click', toggleMenu, false);
  muteBtn.addEventListener('click', toggleMute, false);

  //Public API for menuModule
  return {
    menuParent: menuParent,
    menuBtn: menuBtn,
    pauseBtn: pauseBtn,
    muteBtn: muteBtn,
    infoBtn: infoBtn,
    toggleMenu: toggleMenu

  };
})();
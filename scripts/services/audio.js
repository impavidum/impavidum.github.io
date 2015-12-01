// Service delivers sound core and gameLooper
var audioService = (function () {

  'use strict';

  var gameAudio = new Audio('audio/haunted.mp3'),
    ghostClick = new Audio('audio/ghostClick.wav'),
    boost = new Audio('audio/yahoo.wav'),
    gameOver = new Audio('audio/lose.mp3'),
    pause = new Audio('audio/pause.mp3'),
    star = new Audio('audio/star.wav'),
    win = new Audio('audio/win.wav'),
    menuPlay = new Audio('audio/menuPlay.mp3'),
    enterCourse = new Audio('audio/enterCourse.wav'),
    defaultVolume = 1,
    muted = false;

  // Function for setting the volume of all audio objects
  function setVolume(level) {
    if (muted === false) {
      gameAudio.volume = level;
      ghostClick.volume = level;
      boost.volume = level;
      gameOver.volume = level;
      pause.volume = level;
      star.volume = level;
      win.volume = level;
    }
  }

  // Function for muting audio
  function mute() {
    setVolume(0);
  }

  // Function for unmuting audio
  function unmute() {
    if (muted === false) {
      setVolume(defaultVolume);
    }
  }

  // Public API for audioService
  return {
    gameAudio: gameAudio,
    ghostClick: ghostClick,
    boost: boost,
    gameOver: gameOver,
    pause: pause,
    star: star,
    mute: mute,
    unmute: unmute,
    win: win,
    muted: muted,
    menuPlay: menuPlay,
    enterCourse: enterCourse
  };
})();
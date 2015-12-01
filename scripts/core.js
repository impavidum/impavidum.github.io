// App core currently implemented with HTML5 canvas
var core = (function () {

   'use strict';

   var gameOver = false,
      starRetrieved = false,
      background = makeImage('images/myWall.png'),
      tint = makeImage('images/tint.png'),
      star = document.getElementById('star'),
      canvas = document.getElementById('my-canvas'),
      ctx = canvas.getContext('2d');

   canvas.width = window.innerWidth;
   canvas.height = window.innerHeight;
   canvas.upBound = function (player) {
      return (player.yPos < 0);
   };
   canvas.leftBound = function (player) {
      return (player.xPos < 0);
   };
   canvas.downBound = function (player) {
      return (player.yPos >= (canvas.height - player.height));
   };
   canvas.rightBound = function (player) {
      return (player.xPos >= (canvas.width - player.width));
   };
   canvas.onmousedown = function (event) {
      var clickX = event.pageX;
      var clickY = event.pageY;
      checkClick(clickX, clickY);
   };

   // Function creates a new image element
   function makeImage(path) {
      var img = new Image();
      img.src = path;
      return img;
   }

   // Checks for hits between ghost and player
   function checkHit(player) {
      ghostModule.ghosts.forEach(function (ghost, index, array) {
         if (ghost.xPos > player.xPos && ghost.xPos < (player.xPos + (player.width * 0.75)) && ghost.yPos > player.yPos && ghost.yPos < (player.yPos + (player.height * 0.75)) || (ghost.xPos + (ghost.width * 0.75)) > player.xPos && (ghost.xPos + (ghost.width * 0.75)) < (player.xPos + (player.width * 0.75)) && ghost.yPos > player.yPos && ghost.yPos < (player.yPos + (player.height * 0.75))) {
            gameOver = true;
         }
      });
   }

   // Checks if player has touched star
   function getStar(player) {
      if (player.xPos > (canvas.width / 2 - 100) && player.xPos < (canvas.width / 2) && player.yPos > (canvas.height / 2 - 100) && player.yPos < (canvas.height / 2)) {
         starRetrieved = true;
      }
   }

   // Takes in click coordinates and runs forEach on ghosts array checking each
   function checkClick(clickX, clickY) {
      ghostModule.ghosts.forEach(function (ghost, index, array) {
         if (clickX > ghost.xPos && clickX < (ghost.xPos + ghost.width) && clickY > ghost.yPos && clickY < (ghost.yPos + ghost.height)) {
            ghost.clicked = true;
            audioService.ghostClick.play();
            ghostModule.ghosts = cloneService.clone(ghost, ghostModule.ghosts);
         }
      });
   }

   // Returns current value to outside caller
   function starCheck() {
      return starRetrieved;
   }

   // Returns current value to outside caller
   function gameWinCheck() {
      return !ghostModule.ghosts.length;
   }

   // Returns current value to outside caller
   function gameOverCheck() {
      return gameOver;
   }

   // Returns a randomPlayer from the player service
   function randPlayer() {
      return playerService.randPlayer;
   }

   // Returns a wasdPlayer from the player service
   function wasdPlayer() {
      return playerService.wasdPlayer;
   }

   // Public API for core
   return {
      randPlayer: randPlayer,
      wasdPlayer: wasdPlayer,
      background: background,
      tint: tint,
      ctx: ctx,
      canvas: canvas,
      upBound: canvas.upBound,
      rightBound: canvas.rightBound,
      downBound: canvas.downBound,
      leftBound: canvas.leftBound,
      makeImage: makeImage,
      checkHit: checkHit,
      gameOverCheck: gameOverCheck,
      gameWinCheck: gameWinCheck,
      getStar: getStar,
      starCheck: starCheck
   };
})();
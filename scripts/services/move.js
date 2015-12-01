// Services moves modules at the command of the core
var moveService = (function () {

   'use strict';

   var keyPressed = {},
      up = keyPressed['87'],
      left = keyPressed['65'],
      down = keyPressed['83'],
      right = keyPressed['68'],
      boost = keyPressed['16'];

   // Function moves WASD players
   function moveWasd(player) {

      // Local variables for WASD controls
      up = keyPressed['87'];
      left = keyPressed['65'];
      down = keyPressed['83'];
      right = keyPressed['68'];
      boost = keyPressed['16'];

      // When boost engaged
      if (boost && (up || down)) {
         audioService.boost.play();
         player.vel = player.velBoost;
         player.height = player.sizeBoost;
      } else if (boost && (left || right)) {
         audioService.boost.play();
         player.vel = player.velBoost;
         player.width = player.sizeBoost;
      } else {
         player.vel = player.velReg;
         player.width = player.sizeReg;
         player.height = player.sizeReg;
      }

      // WASD control for player
      if (up && !core.upBound(player)) {
         player.yPos -= player.vel;
      } else if (left && !core.leftBound(player)) {
         player.xPos -= player.vel;
         player.image.src = player.lImage;
      } else if (down && !core.downBound(player)) {
         player.yPos += player.vel;
      } else if (right && !core.rightBound(player)) {
         player.xPos += player.vel;
         player.image.src = player.rImage;
      }

      // Draw WASD player
      core.ctx.drawImage(player.image, player.xPos, player.yPos, player.width, player.height);
   }

   // Function provides random movement to players
   function moveRand(player, index, array) {

      //Check boundaries
      if (core.upBound(player) || core.downBound(player)) {
         player.yVel = -player.yVel;
      }
      if (core.rightBound(player)) {
         player.image.src = player.lImage;
         player.xVel = -player.xVel;
      } else if (core.leftBound(player)) {
         player.image.src = player.rImage;
         player.xVel = -player.xVel;
      }

      // Move player
      player.xPos += player.xVel;
      player.yPos += player.yVel;

      // Draw random player
      core.ctx.save();
      core.ctx.globalAlpha = 0.7;
      core.ctx.drawImage(player.image, player.xPos, player.yPos, player.width, player.height);
      core.ctx.restore();
   }

   // Event listeners
   window.addEventListener('keydown', function (e) {
      keyPressed[e.keyCode] = true;
   }, false);

   window.addEventListener('keyup', function (e) {
      keyPressed[e.keyCode] = false;
   }, false);

   // Public API for moveService
   return {
      moveWasd: moveWasd,
      moveRand: moveRand
   };
})();
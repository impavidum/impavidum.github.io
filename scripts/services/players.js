// Service provides player types
var playerService = (function () {

   'use strict';

   var defaultImg = 'images/noImg.png',
      defaultHeight = 100,
      defaultWidth = 100,
      defaultxPos = 0,
      defaultyPos = 0;

   // Create base player
   var basePlayer = function () {
      this.xPos = defaultxPos;
      this.yPos = defaultyPos;
      this.image = new Image();
      this.image.src = defaultImg;
      this.width = defaultWidth;
      this.height = defaultHeight;
   };

   // Create WASD player from base player
   var wasdPlayer = Object.create(basePlayer, {
      vel: {
         value: 4
      }
   });

   // Create random player from base player
   var randPlayer = Object.create(basePlayer, {
      xVel: {
         value: 2
      },
      yVel: {
         value: 2
      }
   });

   // Public API for playerService
   return {
      wasdPlayer: wasdPlayer,
      randPlayer: randPlayer
   };
})();
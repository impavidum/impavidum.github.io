// Module responsible for serving ghosts
var ghostModule = (function () {

   'use strict';

   var lImage = 'images/ghostl.png',
      rImage = 'images/ghostr.png',
      baseWidth = 150,
      baseHeight = 130,
      baseSize = 4,
      velReg = 2,
      startX = (window.innerWidth * 0.75),
      startY = (window.innerHeight * 0.5),
      ghosts = [];

   // Create a ghost prototype from a randPlayer
   var Ghost = Object.create(core.randPlayer, {
      width: {
         value: baseWidth,
         writable: true
      },
      height: {
         value: baseHeight,
         writable: true
      },
      xVel: {
         value: velReg,
         writable: true
      },
      yVel: {
         value: velReg,
         writable: true
      },
      xPos: {
         value: startX,
         writable: true
      },
      yPos: {
         value: startY,
         writable: true
      },
      size: {
         value: baseSize,
         writable: true
      },
      image: {
         value: core.makeImage(rImage),
         writable: true
      },
      lImage: {
         value: lImage
      },
      rImage: {
         value: rImage
      },
      clicked: {
         value: false,
         writable: true
      }
   });

   // Push prototype onto ghosts array
   ghosts.push(Ghost);

   // Public API for ghostModule
   return {
      ghosts: ghosts
   };
})();
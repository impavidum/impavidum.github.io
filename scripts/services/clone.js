// Service provides cloning functionality
var cloneService = (function () {

   'use strict';

   // Function returns whether a player is clicked
   function unClicked(player) {
      return !player.clicked;
   }

   // Recursive function for cloning players
   function clone(player, playerArray, counter) {

      // Destroys players of size 1 on click
      if (player.size === 1) {
         player.clicked = true;
         var filteredPlayerArray = playerArray.filter(unClicked);
         return filteredPlayerArray;
      }

      // Initiliaze recursive counter on entry
      if (!counter) {
         counter = player.size;
      }

      // Recursively pushes new objects onto the passed array
      switch (counter) {
      case 4:
         playerArray.push((Object.create(player, {
            width: {
               value: (player.width * .75),
               writable: true
            },
            height: {
               value: (player.height * .75),
               writable: true
            },
            xVel: {
               value: 2,
               writable: true
            },
            yVel: {
               value: -2,
               writable: true
            },
            size: {
               value: (player.size - 1),
               writable: true
            },
            image: {
               value: core.makeImage(player.rImage),
               writable: true
            },
            clicked: {
               value: false,
               writable: true
            }
         })));
            
         counter -= 1;
         return clone(player, playerArray, counter);
            
      case 3:
         playerArray.push((Object.create(player, {
            width: {
               value: (player.width * .75),
               writable: true
            },
            height: {
               value: (player.height * .75),
               writable: true
            },
            xVel: {
               value: -2,
               writable: true
            },
            yVel: {
               value: 2,
               writable: true
            },
            size: {
               value: (player.size - 1),
               writable: true
            },
            image: {
               value: core.makeImage(player.lImage),
               writable: true
            },
            clicked: {
               value: false,
               writable: true
            }
         })));
            
         counter -= 1;
         return clone(player, playerArray, counter);
            
      case 2:
         playerArray.push((Object.create(player, {
            width: {
               value: (player.width * .75),
               writable: true
            },
            height: {
               value: (player.height * .75),
               writable: true
            },
            xVel: {
               value: 2,
               writable: true
            },
            yVel: {
               value: 2,
               writable: true
            },
            size: {
               value: (player.size - 1),
               writable: true
            },
            image: {
               value: core.makeImage(player.rImage),
               writable: true
            },
            clicked: {
               value: false,
               writable: true
            }
         })));
            
         counter -= 1;
         return clone(player, playerArray, counter);
            
      case 1:
         playerArray.push((Object.create(player, {
            width: {
               value: (player.width * .75),
               writable: true
            },
            height: {
               value: (player.height * .75),
               writable: true
            },
            xVel: {
               value: -2,
               writable: true
            },
            yVel: {
               value: -2,
               writable: true
            },
            size: {
               value: (player.size - 1),
               writable: true
            },
            image: {
               value: core.makeImage(player.lImage),
               writable: true
            },
            clicked: {
               value: false,
               writable: true
            }
         })));

         counter = null;
         player.clicked = true;
         var filteredPlayerArray = playerArray.filter(unClicked);
         return filteredPlayerArray; // Recursive base case
            
      default:
         return playerArray;
      }
   }

   // Public API for cloneService
   return {
      clone: clone
   };
})();
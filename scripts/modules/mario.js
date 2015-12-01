// Module responsible for serving mario
var marioModule = (function () {

    'use strict';

    var sizeReg = 125,
        sizeBoost = 112,
        velReg = 4,
        velBoost = 8,
        lImage = 'images/leftMario.png',
        rImage = 'images/rightMario.png',
        startX = (window.innerWidth / 4),
        startY = (window.innerHeight / 2),
        marioImg = core.makeImage('images/leftMario.png');

   // Mario prototype from wasdPlayer
    var mario = Object.create(core.wasdPlayer, {
        width: {
            value: sizeReg,
            writable: true
        },
        height: {
            value: sizeReg,
            writable: true
        },
        sizeReg: {
            value: sizeReg,
            writable: false
        },
        sizeBoost: {
            value: sizeBoost,
            writeable: false
        },
        vel: {
            value: velReg,
            writable: true
        },
        velReg: {
            value: velReg,
            writable: false
        },
        velBoost: {
            value: velBoost,
            writable: false
        },
        xPos: {
            value: startX,
            writable: true
        },
        yPos: {
            value: startY,
            writable: true
        },
        image: {
            value: marioImg,
            writable: true
        },
        lImage: {
            value: lImage
        },
        rImage: {
            value: rImage
        }
    });

   // Public API for marioModule
    return {
        mario: mario,
        marioImg: marioImg
    };
})();
/**
 * Created by yannick on 16.10.15.
 */

var gameLogic = function() {

    /**
     *  get (and evaluate) user click on battlefield.
     */
    function detectShot(evt, ctx) {
        var c = "@";
        var field = battlefield.getBoundingClientRect();
        var $hz = evt.clientX - field.left;
        var $vt = evt.clientY - field.top;

        $('.user-turn').hide();

        $hz = helpers().translate($hz);
        $vt = helpers().translate($vt);
        for(var x = 0; x < $vt; x++) {
            c = helpers().nextChar(c);
        }

        var $shot = $hz + c;
        var $strike = botSetup().strikeOrNotIsHereTheQuestion($shot);

        drawShots($strike, $shot, ctx);

        /* TODO 1
         // 1) strikeOrNotIsHereTheQuestion($hz, $vt);
         // 2) check if ship was sunk
         // 3) draw result
         // 4) trigger bot shooting
         // ... bot
         // come back
         */


    }

    /**
     *  highlight shots at the battlefield
     */
    function drawShots(strike, shot, context) {
        var pos = [];
        pos[0] = shot.slice(0, shot.length-1);
        pos[1] = shot.slice(shot.length-1, shot.length);
        console.log('pos0: ' + pos[0]);
        console.log('pos1: ' + pos[1]);

        pos[1] = helpers().transToString(pos[1]);
        var start = helpers().translate(pos);

        if(strike) {
            context.fillStyle = 'red';
        } else {
            context.fillStyle = 'blue';
        }

        context.fillRect(start.x1, start.y1, 49, 49);
    }

    // Interface
    return {
        detectShot:detectShot,
        drawShots:drawShots
    };
};
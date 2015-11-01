/**
 * gameLogic
 *  - detects shot
 *  - draw shots on grid
 *  - call bot to play
 */

/**
 * global storage for savegame
 * @type {{userShots: Array, botShots: Array, isUsersTurn: boolean, botOccs: Array, usersOccs: Array}}
 */
var gamePlay = {
    'userShots': [],
    'botShots': [],
    'isUsersTurn': true,
    'botOccs': [],
    'usersOccs': []
};

var gameLogic = function() {

    /**
     * get (and evaluate) user click on battlefield
     * @param evt
     * @param ctxBf
     * @param ctxTr
     */
    function detectShot(evt, ctxBf, ctxTr) {
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

        if($.inArray($shot, gamePlay.userShots) < 0) {
            var $strike = strikeOrNotIsHereTheQuestion($shot);
            gamePlay.userShots.push($shot);

            drawShots($strike, $shot, ctxBf, "user");
            // TODO: Check if ship is sunk
            // TODO: show overview of sunk ships
            bot().play(ctxTr);
        } else {
            alert('Already clicked. Choose other field.');
        }

        /* Step 1
         *   1) strikeOrNotIsHereTheQuestion($hz, $vt);
         *   2) check if ship was sunk
         *   3) draw result
         *   4) trigger bot shooting
         *   ... bot
         *   come back
         */
    }

    /**
     * check if shot is a strike or not
     * @param coord
     * @returns {boolean}
     */
    function strikeOrNotIsHereTheQuestion(coord) {
        if(gamePlay.isUsersTurn) {
            var arr = gamePlay.botOccs;
        } else {
            var arr = gamePlay.usersOccs;
        }
        if($.inArray(coord, arr) > -1) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * highlight shots on the battlefield
     * @param isStrike
     * @param shot
     * @param context
     * @param player
     */
    function drawShots(isStrike, shot, context, player) {
        var pos = [];
        pos[0] = shot.slice(0, shot.length-1);
        pos[1] = shot.slice(shot.length-1, shot.length);

        pos[1] = helpers().transCharToInt(pos[1]);
        var start = helpers().translate(pos);

        if(isStrike) {
            context.fillStyle = 'red';
        } else {
            context.fillStyle = 'blue';
        }

        context.fillRect(start.x1, start.y1, 49, 49);

        if(player === "user") {
            gamePlay.isUsersTurn = false;
        } else if(player === "bot") {
            gamePlay.isUsersTurn = true;
        }
    }

    // Interface
    return {
        detectShot:detectShot,
        strikeOrNotIsHereTheQuestion:strikeOrNotIsHereTheQuestion,
        drawShots:drawShots
    };
};
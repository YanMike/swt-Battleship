/**
 * gameLogic
 *  - detects shot
 *  - draw shots on grid
 *  - call bot to play
 */

/**
 * global storage for savegame (singleton)
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
        var character = "@";
        var field = battlefield.getBoundingClientRect();
        var $horizontal = evt.clientX - field.left;
        var $vertical = evt.clientY - field.top;

        $('.user-turn').hide();

        $horizontal = helpers().translate($horizontal);
        $vertical = helpers().translate($vertical);
        for(var x = 0; x < $vertical; x++) {
            character = helpers().nextChar(character);
        }

        var $shot = $horizontal + character;

        if($.inArray($shot, gamePlay.userShots) < 0) {
            var $strike = strikeOrNotIsHereTheQuestion($shot);
            gamePlay.userShots.push($shot);

            drawShots($strike, $shot, ctxBf, "user");
            // TODO: Check if ship is sunk
            // TODO: show overview of sunk ships
            bot().play(ctxTr);
        } else {
            $('.error.shot').addClass('active')
            .html('Already clicked. Choose another field.');
        }
    }

    /**
     * check if shot is a strike or not
     * @param coord
     * @returns {boolean}
     */
    function strikeOrNotIsHereTheQuestion(coord) {
        var arr = [];
        if(gamePlay.isUsersTurn) {
            arr = gamePlay.botOccs;
        } else {
            arr = gamePlay.usersOccs;
        }
        var $isStrike = $.inArray(coord, arr) > -1;
        return ($isStrike);
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

    return {
        detectShot:detectShot,
        strikeOrNotIsHereTheQuestion:strikeOrNotIsHereTheQuestion,
        drawShots:drawShots
    };
};
/**
 * Created by yannick on 16.10.15.
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
     *  get (and evaluate) user click on battlefield.
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
     *
     * @param coord
     * @returns {boolean}
     */
    function strikeOrNotIsHereTheQuestion(coord) {
        if(gamePlay.isUsersTurn) {
            var arr = gamePlay.botOccs;
            console.log('search in botOccs  ' + gamePlay.usersOccs);
        } else {
            console.log('serach in usersOccs  ' + gamePlay.botOccs);
            var arr = gamePlay.usersOccs;
        }
        console.log(coord);
        if($.inArray(coord, arr) > -1) {
            console.log(coord + ' found');
            return true;
        } else {
            console.log('not found');
            return false;
        }
    }

    /**
     *  highlight shots on the battlefield
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
            console.log('last shot: user; next shot: bot');
            gamePlay.isUsersTurn = false;
        } else if(player === "bot") {
            gamePlay.isUsersTurn = true;
            console.log('last shot: bot; next shot: user');
        }
    }

    // Interface
    return {
        detectShot:detectShot,
        strikeOrNotIsHereTheQuestion:strikeOrNotIsHereTheQuestion,
        drawShots:drawShots
    };
};
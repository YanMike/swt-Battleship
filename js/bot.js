/**
 * bot
 *  - prepare default setup
 *  - control bot's actions
 * @returns {{init: init, play: play}}
 */
var bot = function() {
    // TODO: make positioning is random
    var botShips = {
        'aircraftCarrier': {
            'length': 5,
            'start': [ "2", "B" ],
            'dir': 'hz',
            'occupied': [
                "2B", "2C", "2D", "2E", "2F"
            ],
            'strikes': []
        },
        'battleship': {
            'length': 4,
            'start': [ "5", "C" ],
            'dir': 'vt',
            'occupied': [
                "5C", "6C", "7C", "8C"
            ],
            'strikes': []
        },
        'submarine': {
            'length': 3,
            'start': [ "8", "F" ],
            'dir': 'hz',
            'occupied': [
                "8F", "8G", "8H"
            ],
            'strikes': []
        },
        'destroyer': {
            'length': 3,
            'start': [ "4", "I" ],
            'dir': 'vt',
            'occupied': [
                "4I", "5I", "6I"
            ],
            'strikes': []
        },
        'patrolBoat': {
            'length': 2,
            'start': [ "7", "A" ],
            'dir': 'vt',
            'occupied': [
                "7A", "8A"
            ],
            'strikes': []
        }
    };

    /**
     * initializing bot's ships
     * saving occupied field
     */
    function init() {
        var $tmp = [];
        for (var name in botShips) {
            if(botShips.hasOwnProperty(name)){
                $tmp.push(botShips[name].occupied);
            }
        }

        gamePlay.botOccs = $tmp[0].concat($tmp[1], $tmp[2], $tmp[3], $tmp[4]);
    }

    /**
     * control bot's turn
     * @param ctx
     */
    function play(ctx) {
        var $shot = huntMode();
        var $tmp = '' + $shot[0] + $shot[1];
        var $isStrike = gameLogic().strikeOrNotIsHereTheQuestion($tmp);

        gameLogic().drawShots($isStrike, $tmp, ctx, "bot");
    }

    /**
     * random shooting for easiest level of difficulty
     */
    function huntMode() {
        var $horizontal,
            $vertical,
            $tmp = '';

        do {
            $horizontal = Math.ceil(Math.random() * 10);
            if($horizontal === 0) {
                $horizontal = 1;
            }

            $vertical = Math.ceil(Math.random() * 10);
            if($vertical === 0) {
                $vertical = 1;
            }
            $vertical = helpers().transIntToChar($vertical);

            $tmp = '' + $horizontal + $vertical;
        } while($.inArray($tmp, gamePlay.botShots) > -1);


        gamePlay.botShots.push($tmp);
        gamePlay.botShots.sort();

        var $pos = [$horizontal, $vertical];
        return $pos;
    }

    /**
     * TODO: function targetMode() {}
     * shooting algorithm for 2nd level of difficulty

     *  strike == true  ? check4randomly : huntMode
     *  next round: strike ? save1stStrike, checkNext : check4randomly(4--)
     *  ... loop ...
     *  checkNext == false ? backTo1stStrike, checkNextOtherSide
     *  next round: strike ? checkNextOnThatSide : huntMode(ship sunk)

     */

    return {
        init:init,
        play:play
    };
};
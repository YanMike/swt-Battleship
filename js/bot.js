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
        var $hz,
            $vt,
            $tmp = '';

        do {
            $hz = Math.ceil(Math.random() * 10);
            if($hz == 0) {
                $hz = 1;
            }

            $vt = Math.ceil(Math.random() * 10);
            if($vt == 0) {
                $vt = 1;
            }
            $vt = helpers().transIntToChar($vt);

            $tmp = '' + $hz + $vt;
        } while($.inArray($tmp, gamePlay.botShots) > -1);


        gamePlay.botShots.push($tmp);
        gamePlay.botShots.sort();

        var $pos = [$hz, $vt];
        return $pos;
    }

    /**
     * status: DEVELOPMENT is IN PROGRESS. NOT WORKING YET
     * shooting algorithm for 2nd level of difficulty

     *  strike == true  ? check4randomly : huntMode
     *  next round: strike ? save1stStrike, checkNext : check4randomly(4--)
     *  ... loop ...
     *  checkNext == false ? backTo1stStrike, checkNextOtherSide
     *  next round: strike ? checkNextOnThatSide : huntMode(ship sunk)

     */
    function targetMode() {
        var $shot = huntMode();
    }

    /**
     * status: DEVELOPMENT is IN PROGRESS. NOT WORKING YET
     */
    function generateShipPositions() {
        var $tmp = [];

        // get random start and proof that position is inside grid
        for (var name in botShips) {
        console.log(' ####### ' + name);

        var $ship = botShips[name];
        do {
            var $dir = Math.ceil(Math.random() * 2);
        } while($dir == 0);

        $dir == 1 ? $dir = 'hz' : $dir = 'vt';

        console.log('dir: ' + $dir);

        do {
            var $hz = Math.ceil(Math.random() * 10);
            if($dir === 'hz') {
                var x = $hz + $ship.occupied;
            }
        } while ($hz == 0 || x > 10);

        console.log('hz: ' + $hz);

        do {
            var $vt = Math.ceil(Math.random() * 10);
            var $vtNo = $vt;
            $vt = helpers().transIntToChar($vt);
            if($dir === 'vt') {
                var char = $vt;
                for (var c = 0; c < ($ship.length - 1); c++) {
                    char = helpers().nextChar(char);
                }
            }
        } while ($vtNo == 0 || char > 'J');

        console.log('vt: ' + $vt);

        // get all occupied positions
        if($dir == 'hz') {
            for(var x = 0; x < ($ship.length); x++) {
                var n = x + $hz;
                $tmp.push(n + $vt);
            }
        } else {
            var c = $vt;
            for(var x = 0; x < ($ship.length-1); x++) {
                c = helpers().nextChar(c);
            }
                $tmp.push($hz + 'c');
            }
        }
        console.log($tmp);
    }

    // Interface
    return {
        init:init,
        play:play
    };
};




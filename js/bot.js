/**
 * Created by yannick on 16.10.15.
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
     *
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
     *
     */
    function play(ctx) {
        //console.log('botOccs: ' + gamePlay.botOccs);
        var $shot = randomShot();
        var $tmp = '' + $shot[0] + $shot[1];
        var $isStrike = gameLogic().strikeOrNotIsHereTheQuestion($tmp);
        //console.log('isStrike: ' + $isStrike);
        gameLogic().drawShots($isStrike, $tmp, ctx, "bot");
    }

    /**
     *
     */
    function randomShot() {
        var $hz,
            $vt;

        do {
            console.log($hz);
            $hz = Math.ceil(Math.random() * 10);
            if($hz == 0) {
                $hz = 1;
            }
            console.log('$vz in Array: ');
            console.log($.inArray($hz, gamePlay.botShots));
        } while($.inArray($hz, gamePlay.botShots) > -1);

        do {
            console.log($vt);
            $vt = Math.ceil(Math.random() * 10);
            if($vt == 0) {
                $vt = 1;
            }
            console.log('$vt in Array: ');
            console.log($.inArray($vt, gamePlay.botShots));
        } while($.inArray($vt, gamePlay.botShots) > -1);
        console.log('randomShot done');

        $vt = helpers().transIntToChar($vt);

        var $pos = [$hz, $vt];
        gamePlay.botShots.push('' + $hz + $vt);
        /*
        console.log('botShots: ' + gamePlay.botShots);
        gamePlay.botShots.sort();
         */

        return $pos;
    }



    // function generateShipPositions() {}

    /* TODO 2
     * bot shooting gets triggered from gameLogic().detectShot()
     // 1) strikeOrNotIsHereTheQuestion($hz, $vt);
     // 2) check if user's ship was sunk
     // 3) draw result
     // 4) trigger user to make next shot
     */

    // Interface
    return {
        init:init,
        play:play
    };
};




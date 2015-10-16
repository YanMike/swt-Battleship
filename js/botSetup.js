/**
 * Created by yannick on 16.10.15.
 */

var botSetup = function() {

    // TODO: make positioning is random
    var botShips = {
        'aircraftCarrier': {
            'length': 5,
            'start': [ "2", "B" ],
            'dir': 'hz',
            'occupied': [
                "2B", "2C", "2D", "2E", "2F"
            ]
        },
        'battleship': {
            'length': 4,
            'start': [ "5", "C" ],
            'dir': 'vt',
            'occupied': [
                "5C", "6C", "7C", "8C"
            ]
        },
        'submarine': {
            'length': 3,
            'start': [ "8", "F" ],
            'dir': 'hz',
            'occupied': [
                "8F", "8G", "8H"
            ]
        },
        'destroyer': {
            'length': 3,
            'start': [ "4", "I" ],
            'dir': 'vt',
            'occupied': [
                "4I", "5I", "6I"
            ]
        },
        'patrolBoat': {
            'length': 2,
            'start': [ "7", "A" ],
            'dir': 'vt',
            'occupied': [
                "7A", "8A"
            ]
        }
    };

    // function generateShipPositions() {}

    /* TODO 2
     * bot shooting gets triggered from gameLogic().detectShot()
     // 1) strikeOrNotIsHereTheQuestion($hz, $vt);
     // 2) check if user's ship was sunk
     // 3) draw result
     // 4) trigger user to make next shot
     */

};




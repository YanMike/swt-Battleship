/**
 * setupBattlefield
 *      - draw canvas grids
 *      - takes user's raw input
 *      - translate them to coordinates
 *      - draw user's ships to the canvas
 *      - calls bot initialization function
 */

var setupBattlefield = function (shipsObj) {
    var ships = shipsObj;

    // set canvas context
    var battlefield = document.getElementById('battlefield');
    var ctxBattlefield = battlefield.getContext('2d');
    drawGrid(ctxBattlefield, 550);

    var myTroups = document.getElementById('myTroups');
    var ctxTroups = myTroups.getContext('2d');
    drawGrid(ctxTroups, 550);

    setUserShipsPositions(ctxTroups);
    bot().init();

    $('.user-info').show();

    /**
     * EventListener to detect user's shots
     */
    battlefield.addEventListener('click', function (evt) {
        if(gamePlay.isUsersTurn) {
            gameLogic().detectShot(evt, ctxBattlefield, ctxTroups);
        } else {
            console.log("error, not user's turn");
        }
    });


    /**
     * convert user's input to coordinates, which can be drawn on canvas
     * @param context
     */
    function setUserShipsPositions(context) {
        for (var ship in ships) {
            if(ships.hasOwnProperty(ship)) {
                var $pos = [],
                    $length = 0,
                    $dir;

                switch (ship) {
                    case 'aircraftCarrier':
                        $pos.push(ships.aircraftCarrier.start[0]);
                        $pos.push(ships.aircraftCarrier.start[1]);
                        $dir = ships.aircraftCarrier.dir;
                        $length = ships.aircraftCarrier.length;
                        break;
                    case 'battleship':
                        $pos.push(ships.battleship.start[0]);
                        $pos.push(ships.battleship.start[1]);
                        $dir = ships.battleship.dir;
                        $length = ships.battleship.length;
                        break;
                    case 'submarine':
                        $pos.push(ships.submarine.start[0]);
                        $pos.push(ships.submarine.start[1]);
                        $dir = ships.submarine.dir;
                        $length = ships.submarine.length;
                        break;
                    case 'destroyer':
                        $pos.push(ships.destroyer.start[0]);
                        $pos.push(ships.destroyer.start[1]);
                        $dir = ships.destroyer.dir;
                        $length = ships.destroyer.length;
                        break;
                    case 'patrolBoat':
                        $pos.push(ships.patrolBoat.start[0]);
                        $pos.push(ships.patrolBoat.start[1]);
                        $dir = ships.patrolBoat.dir;
                        $length = ships.patrolBoat.length;
                        break;
                    default:
                        console.log('Error occured');
                        break;
                }

                drawUsersShips(context, $pos, $dir, $length);
            }
        }
    }


    /**
     * draw at canvas element
     * draws both grids - battlefield & user's troups
     * @param context
     * @param size
     */
    function drawGrid(context, size) {
        var x = 0,
            t = 0,
            y = 0;
        // grid generation
        for (x = 0; x < (size + 2); x += (size / 11)) {
            context.moveTo(x, 0);
            context.lineTo(x, size);
        }
        for (y = 0; y < (size + 2); y += (size / 11)) {
            context.moveTo(0, y);
            context.lineTo(size, y);
        }

        if (size == 550) {
            //var letterX = 0;
            var letterY = 85;
            var numberX = 50;
            var numberY = 38;
            var posx = 0;
            var adjust = 7;
            context.font = "30px Arial";
        }

        // text-align of text
        posx += (size / 11 / 2) - 10;

        // set A-J on canvas (column 1)
        var c = 'A';
        for (t = 0, x = posx, y = letterY; t < 10; t++, y += (size / 11)) {
            if (c != 'I') {
                context.fillText(c, x, y);
            } else {
                context.fillText(c, x + adjust, y);
            }
            c = helpers().nextChar(c);
        }

        // set 1-10 on canvas (row 1)
        for (t = 1, x = numberX, y = numberY; t <= 10; t++, x += (size / 11)) {
            if (t == 10) {
                context.fillText(t, posx + x - 7, y);
                break;
            }
            context.fillText(t, posx + x, y);
        }

        // draw
        context.strokeStyle = "#ddd";
        context.stroke();
    }


    /**
     * draw user's ships on canvas
     * @param context
     * @param pos
     * @param dir
     * @param length
     */
    function drawUsersShips(context, pos, dir, length) {
        pos[1] = helpers().transCharToInt(pos[1]);
        var start = helpers().translate(pos);

        context.fillStyle = 'black';

        if(dir == 'vt') {
            context.fillRect(start.x1, start.y1, 49, 49*length+length);
        } else {
            context.fillRect(start.x1, start.y1, 49*length+length, 49);
        }
    }
};

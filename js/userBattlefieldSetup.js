/**
 * Created by yannick on 09.10.15.
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

    setShips(ctxTroups);

    /*// "function shoot"
    battlefield.addEventListener('click', function (evt) {
        var field = battlefield.getBoundingClientRect();
        var $hz = evt.clientX - field.left;
        var $vt = evt.clientY - field.top;

        /!*$hz = translate($hz);
        $vt = translate($vt);*!/
    });*/


    /**
     *  convert user's input to positions showable on canvas
     */
    function setShips(context) {
        for (var ship in ships) {
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
            }

            drawShips(context, $pos, $dir, $length);
        }

    }


    /**
     *  draw at canvas element
     *  draws both grids - battlefield & user's troup
     */
    function drawGrid(context, size) {
        // grid generation
        for (var x = 0; x < (size + 2); x += (size / 11)) {
            context.moveTo(x, 0);
            context.lineTo(x, size);
        }
        for (var y = 0; y < (size + 2); y += (size / 11)) {
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
        //else if (size == 451) {
        //    var letterX = 1;
        //    var letterY = 67;
        //    var numberX = 40;
        //    var numberY = 26;
        //    var posx = 5;
        //    var adjust = 3;
        //    context.font = "15px Arial";
        //}

        // text-align of text
        posx += (size / 11 / 2) - 10;

        // set A-J on canvas (column 1)
        var c = 'A';
        for (var t = 0, x = posx, y = letterY; t < 10; t++, y += (size / 11)) {
            if (c != 'I') {
                context.fillText(c, x, y);
            } else {
                context.fillText(c, x + adjust, y);
            }
            c = nextChar(c);
        }

        // set 1-10 on canvas (row 1)
        for (var t = 1, x = numberX, y = numberY; t <= 10; t++, x += (size / 11)) {
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
     * draw ships on canvas
     * @param context
     * @param pos
     * @param dir
     * @param length
     */
    function drawShips(context, pos, dir, length) {
        pos[1] = transToString(pos[1]);
        var start = translate(pos);

        context.fillStyle = 'black';
        if(dir == 'vt') {
            context.fillRect(start.x1, start.y1, 49, 49*length+length);
        } else {
            context.fillRect(start.x1, start.y1, 49*length+length, 49);
        }
    }


    /* HELPERS  */

    /**
     *
     * @param param : 0-start horizontal, 1-start vertical, 2-end horizontal, 3-end vertical
     * @returns {{x1: number, x2: number, y1: number, y2: number}}
     */
    function translate(param) {
        return {
            'x1': param[0] * 50 + 1,
            'x2': param[0] * 50 + 49,
            'y1': param[1] * 50 + 1,
            'y2': param[1] * 50 + 49
        };
        /*old:
         var start = {
         'x1' : param[0]*50+1,
         'x2' : param[0]*50+49,
         'y1' : param[1]*50+1,
         'y2' : param[1]*50+49
         };

         return start;
        */

        /*
         *    |     1   |    2    |    3    |    4    |    5    |    6    |    7    |    8    |    9    |    10   |
         *  -------------------------------------------------------------------------------------------------------
         *  A |  51, 51 | 101, 51 | 151, 51 | 201, 51 | 251, 51 | 301, 51 | 351, 51 | 401, 51 | 451, 51 | 501, 51 |
         *    |  99, 99 | 149, 99 | 199, 99 | 249, 99 | 299, 99 | 349, 99 | 399, 99 | 449, 99 | 499, 99 | 549, 99 |
         *  -------------------------------------------------------------------------------------------------------
         *  B |  51,101 | 101,101 | 151,101 | 201,101 | 251,101 | 301,101 | 351,101 | 401,101 | 451,101 | 501,101 |
         *    |  99,149 | 149,149 | 199,149 | 249,149 | 299,149 | 349,149 | 399,149 | 449,149 | 499,149 | 549,149 |
         *  -------------------------------------------------------------------------------------------------------
         *  C |  51,151 | 101,151 | 151,151 | 201,151 | 251,151 | 301,151 | 351,151 | 401,151 | 451,151 | 501,151 |
         *    |  99,199 | 149,199 | 199,199 | 249,199 | 299,199 | 349,199 | 399,199 | 449,199 | 499,199 | 549,199 |
         *  -------------------------------------------------------------------------------------------------------
         *  D |  51,201 | 101,201 | 151,201 | 201,201 | 251,201 | 301,201 | 351,201 | 401,201 | 451,201 | 501,201 |
         *    |  99,249 | 149,249 | 199,249 | 249,249 | 299,249 | 349,249 | 399,249 | 449,249 | 499,249 | 549,249 |
         *  -------------------------------------------------------------------------------------------------------
         *  E |  51,249 | 101,249 | 151,249 | 201,249 | 251,249 | 301,249 | 351,249 | 401,249 | 451,249 | 501,249 |
         *    |  99,299 | 149,299 | 199,299 | 249,299 | 299,299 | 349,299 | 399,299 | 449,299 | 499,299 | 549,299 |
         *  -------------------------------------------------------------------------------------------------------
         *  F |  51,301 | 101,301 | 151,301 | 201,301 | 251,301 | 301,301 | 351,301 | 401,301 | 451,301 | 501,301 |
         *    |  99,349 | 149,349 | 199,349 | 249,349 | 299,349 | 349,349 | 399,349 | 449,349 | 499,349 | 549,349 |
         *  -------------------------------------------------------------------------------------------------------
         *  G |  51,351 | 101,351 | 151,351 | 201,351 | 251,351 | 301,351 | 351,351 | 401,351 | 451,351 | 501,351 |
         *    |  99,399 | 149,399 | 199,399 | 249,399 | 299,399 | 349,399 | 399,399 | 449,399 | 499,399 | 549,399 |
         *  -------------------------------------------------------------------------------------------------------
         *  H |  51,401 | 101,401 | 151,401 | 201,401 | 251,401 | 301,401 | 351,401 | 401,401 | 451,401 | 501,401 |
         *    |  99,449 | 149,449 | 199,449 | 249,449 | 299,449 | 349,449 | 399,449 | 449,449 | 499,449 | 549,449 |
         *  -------------------------------------------------------------------------------------------------------
         *  I |  51,451 | 101,451 | 151,451 | 201,451 | 251,451 | 301,451 | 351,451 | 401,451 | 451,451 | 501,451 |
         *    |  99,499 | 149,499 | 199,499 | 249,499 | 299,499 | 349,499 | 399,499 | 449,499 | 499,499 | 549,499 |
         *  -------------------------------------------------------------------------------------------------------
         *  J |  51,501 | 101,501 | 151,501 | 201,501 | 251,501 | 301,501 | 351,501 | 401,501 | 451,501 | 501,501 |
         *    |  99,549 | 149,549 | 199,549 | 249,549 | 299,549 | 349,549 | 399,549 | 449,549 | 499,549 | 549,549 |
         */

        /*// translate from px to 1-10
         if(val > 10) {
         pos = Math.floor(val / 50);
         console.log(pos);
         // TODO: define if x50/x00 is clicked
         }
         // translate from 1-10 to px
         else if(val <= 10) {
         }

         return pos;*/
    }


    /**
     * change from char to number
     * @param pos
     */
    function transToString(pos) {
        switch (pos) {
            case 'A':
                pos = "1";
                break;
            case 'B':
                pos = "2";
                break;
            case 'C':
                pos = "3";
                break;
            case 'D':
                pos = "4";
                break;
            case 'E':
                pos = "5";
                break;
            case 'F':
                pos = "6";
                break;
            case 'G':
                pos = "7";
                break;
            case 'H':
                pos = "8";
                break;
            case 'I':
                pos = "9";
                break;
            case 'J':
                pos = "10";
                break;
        }
        return pos;
    }
};

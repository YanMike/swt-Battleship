/**
 * Created by yannick on 09.10.15.
 */

var setupBattlefield = function(shipsObj) {
    var ships = shipsObj;

    // set canvas context
    var battlefield = document.getElementById('battlefield');
    var ctxBattlefield = battlefield.getContext('2d');
    var font = "30px Arial";

    drawGrid(ctxBattlefield, 600);

    var myTroups = document.getElementById('myTroups');
    var ctxTroups = myTroups.getContext('2d');
    var font = "20px Arial";
    drawGrid(ctxTroups, 450);

    setShips(ctxTroups);

    // "function shoot"
    battlefield.addEventListener('click', function(evt) {
        var field = battlefield.getBoundingClientRect();
        /*var $hz = 1 + (evt.clientX - field.left) - (evt.clientX - field.left)%61;
         var $vt = 1 + (evt.clientY - field.top) - (evt.clientY - field.top)%61;*/
        var $hz = evt.clientX - field.left;
        var $vt = evt.clientY - field.top
        console.log($hz + '  ' + $vt);
    });



    /**
     *  convert user's input to positions showable on canvas
     */
    function setShips(context) {
        var $gridMatrix
    }


    /**
     *  draw at canvas element
     *  draws both grids - battlefield & user's troup
     */
    function drawGrid(context, size) {
        // grid generation
        for (var x = 0; x < (size+2); x += (size/11)) {
            context.moveTo(x, 0);
            context.lineTo(x, size);
        }
        for (var y = 0; y < (size+2); y += (size/11)) {
            context.moveTo(0, y);
            context.lineTo(size, y);
        }

        if(size == 600) {
            letterX = 1;
            letterY = 93;
            numberX = 55;
            numberY = 41;
            posx = 0;

            context.font = "30px Arial";
        } else if(size == 450) {
            letterX = 1;
            letterY = 67;
            numberX = 40;
            numberY = 26;
            posx = 5;

            context.font = "15px Arial";
        }

        // text-align of text
        posx += (size / 11 / 2) -10;

        // set A-J on canvas (column 1)
        var c = 'A';
        for(var t = 0, x = posx, y = letterY; t < 10; t++, y +=(size/11)) {
            context.fillText(c, x, y);
            c = nextChar(c);
        }

        // set 1-10 on canvas (row 1)
        for(var t = 1, x = numberX, y = numberY; t <= 10; t++, x +=(size/11)) {
            if(t == 10) {
                context.fillText(t, posx + x-7, y);
                break;
            }
            context.fillText(t, posx + x, y);
        }

        // draw
        context.strokeStyle = "#ddd";
        context.stroke();
    }
}
/**
 * Created by yannick on 13.10.15.
 */

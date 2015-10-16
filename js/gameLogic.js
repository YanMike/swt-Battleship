/**
 * Created by yannick on 16.10.15.
 */

var gameLogic = function() {

    /**
     *  get (and evaluate) user click on battlefield.
     */
    function detectShot(evt) {
        var c = "@";
        var field = battlefield.getBoundingClientRect();
        var $hz = evt.clientX - field.left;
        var $vt = evt.clientY - field.top;

        $hz = helpers().translate($hz);
        $vt = helpers().translate($vt);
        for(var x = 0; x < $vt; x++) {
            c = helpers().nextChar(c);
        }
        $vt = c;

        /* TODO 1
         // 1) strikeOrNotIsHereTheQuestion($hz, $vt);
         // 2) check if ship was sunk
         // 3) draw result
         // 4) trigger bot shooting
         // ... bot
         // come back
         */


    }



    // Interface
    return {
        detectShot:detectShot
    };
};
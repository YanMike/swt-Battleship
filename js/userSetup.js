/**
 * Created by yannick on 13.10.15.
 */

var userSetup = function() {

    var ships = {
        'aircraftCarrier': {
            'length': 5,
            'legend': 'Aircraft Carrier',
            'start': [],
            'dir': '',
            'occupied': []
        },
        'battleship': {
            'length': 4,
            'legend': 'Battleship',
            'start': [],
            'dir': '',
            'occupied': []
        },
        'submarine': {
            'length': 3,
            'legend': 'Submarine',
            'start': [],
            'dir': '',
            'occupied': []
        },
        'destroyer': {
            'length': 3,
            'legend': 'Destroyer',
            'start': [],
            'dir': '',
            'occupied': []
        },
        'patrolBoat': {
            'length': 2,
            'legend': 'Patrol Boat',
            'start': [],
            'dir': '',
            'occupied': []
        }
    };


    /**
     *
     */
    function startSetup() {
        for(var ship in ships) {
            var c = 'A';

            // create HTML form
            var $fd  =  $('<fieldset class="' + ship + '">').appendTo('#setup_form');
                        $('<legend>').appendTo($fd);

            var $gr1 =  $('<div class="group_start">').appendTo('.' + ship);
                        $('<div>Start - Horizontal:</div>').appendTo($gr1);
            var $hz =   $('<select id="' + ship + '_hz">').appendTo($gr1).attr('name', 'start_hz');
                        $('<div>Start - Vertical:</div>').appendTo($gr1);
            var $vt =   $('<select id="' + ship + '_vt">').appendTo($gr1).attr('name', 'start_vt');

            var $gr2 =  $('<div class="group_dir">').appendTo('.' + ship);
                        $('<div>Direction:</div>').appendTo($gr2);
            var $dirhz = $('<label><input type="radio" name="direction_'+ ship +'" value="hz">').appendTo($gr2);
            var $dirvt = $('<label><input type="radio" name="direction_'+ ship +'" value="vt">').appendTo($gr2);

            // create the options 1-10 resp. A-J
            for(var x = 0; x <= 10; x++) {
                if(x == 0) {
                    //$hz.append($('<option disabled selected>').attr('value', '0').text(''));
                    //$vt.append($('<option disabled selected>').attr('value', '0').text(''));
                } else {
                    $hz.append($('<option>').attr('value', x).text(x));
                    $vt.append($('<option>').attr('value', c).text(c));
                    c = helpers().nextChar(c);
                }
            }

            // add html to legend
            switch(ship) {
                case 'aircraftCarrier':
                    $('.' + ship + ' legend').append(ships.aircraftCarrier.legend);
                    break;
                case 'battleship':
                    $('.' + ship + ' legend').append(ships.battleship.legend);
                    break;
                case 'submarine':
                    $('.' + ship + ' legend').append(ships.submarine.legend);
                    break;
                case 'destroyer':
                    $('.' + ship + ' legend').append(ships.destroyer.legend);
                    break;
                case 'patrolBoat':
                    $('.' + ship + ' legend').append(ships.patrolBoat.legend);
                    break;
            }

            // add html to radio buttons
            $dirhz.append('horizontal');
            $dirvt.append('vertical');
        }

        // after code generation, check value changes
        $('select, input[type="radio"]').change(function() {
            checkPositionRules($(this));
        });
    }


    /**
     *
     */
    function getPosition() {
        for(var ship in ships) {
            var $hzS = $('select#' + ship + '_hz').val();
            var $vtS = $('select#' + ship + '_vt').val();
            var $dir = $('input[type="radio"][name="direction_'+ ship +'"]:checked').val();

            ships[ship].start.push($hzS);
            ships[ship].start.push($vtS);
            ships[ship].dir = $dir;
        }
        setupBattlefield(ships);
    }


    /**
     * on the fly check, if user's input is compliant to rules
     * @param input
     */
    function checkPositionRules(input) {
        var $name = input.parents('fieldset').attr('class'),
            $ship = ships[$name],
            $occ  = $ship.occupied;

        if(input.is('input[type="radio"')) {
            $ship.dir = $('input[type="radio"][name="direction_'+ $name +'"]:checked').val();
        }

        if( $('select#' + $name + '_hz').val() != null) {
            $occ[0] = $('select#' + $name + '_hz').val();
        }
        if( $('select#' + $name + '_vt').val() != null ){
            $occ[1] = $('select#' + $name + '_vt').val();
        }

        if($ship.dir !== '' && $occ.length >= 2) {
            // get all fields, which are touched by the ship
            var result = calcOccupied($name);
            if(!result) {
                $('#' + $name + '_hz').prop('selectedIndex', 0);
                $('#' + $name + '_vt').prop('selectedIndex', 0);
                alert('This entry is not allowed. Ship is not inside the grid anymore!');
                return;
            } else {
                // compare, if any field is already touched by another ship
                result = compareOccupied();
                if( result == false ) {
                    $('#' + $name + '_hz').prop('selectedIndex', 0);
                    $('#' + $name + '_vt').prop('selectedIndex', 0);
                    ships[$name].occupied = [];
                    alert('This entry is not allowed. Ships are overlapping. Please check on your last input!');
                    result = true;
                } else if(result == "done") {
                    $('button#done').prop('disabled', false);
                }
            }
        }
    }


    /**
     *
     * @param $name : ship's name to get access to obj.ships
     */
    function calcOccupied($name) {
        var $ship = ships[$name],
            $occ = $ship.occupied,
            $tmp = [],
            n = 0;

        if($ship.dir == 'hz') {
            for(var x = 0; x < $ship.length; x++) {
                n = x + parseInt($occ[0]);
                if(n > 10) return false;
                $tmp.push(n + $occ[1]);
            }
        } else if($ship.dir == 'vt') {
            var c = $occ[1];
            $tmp.push($occ[0] + c);
            for(var x = 0; x < ($ship.length-1); x++) {
                c = helpers().nextChar(c);
                if(c > 'J') {
                    console.log('>J');
                    return false;
                }
                $tmp.push($occ[0] + c);
            }
        }
        $ship.occupied = [];
        for(var x = 0; x < $tmp.length; x++) {
            $ship.occupied.push($tmp[x]);
        }
        return true;
    }


    /**
     *
     */
    function compareOccupied() {
        var $tmp = [],
            r = true;
        for (var name in ships) {
            $tmp.push(ships[name].occupied)
        }

        var $con = $tmp[0].concat($tmp[1], $tmp[2], $tmp[3], $tmp[4]);


        var $sorted_con = $con.sort(); // You can define the comparing function here.
        // JS by default uses a crappy string compare.
        for (var i = 0; i < $con.length - 1; i++) {
            if ($sorted_con[i + 1] == $sorted_con[i]) {
                r = false;
                return r;
            }
        }
        /*for(var x = 0; x < $con.length; x++) {
         for(var i = 0; i < $con.length; i++) {
         if( ($con[x] == $con[i]) && (x != i) ) {
         r = false;
         return r;
         }
         }
         }*/

        if ($con.length == 17) {
            return r = "done";
        }
        return r;
    }

    // Interface
    return {
        startSetup:startSetup,
        getPosition:getPosition
    };
};
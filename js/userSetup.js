/**
 * userSetup:
 *  - sets html select input fields
 *  - checks user's input to be compliant to the rules
 */
var userSetup = function() {
    var ships = {
        'aircraftCarrier': {
            'length': 5,
            'legend': 'Aircraft Carrier',
            'start': [],
            "direction": '',
            'occupied': []
        },
        'battleship': {
            'length': 4,
            'legend': 'Battleship',
            'start': [],
            "direction": '',
            'occupied': []
        },
        'submarine': {
            'length': 3,
            'legend': 'Submarine',
            'start': [],
            "direction": '',
            'occupied': []
        },
        'destroyer': {
            'length': 3,
            'legend': 'Destroyer',
            'start': [],
            "direction": '',
            'occupied': []
        },
        'patrolBoat': {
            'length': 2,
            'legend': 'Patrol Boat',
            'start': [],
            "direction": '',
            'occupied': []
        }
    };


    /**
     * set html select input fields
     * detect changes made by the user
     */
    function startSetup() {
        for(var ship in ships) {
            if(ships.hasOwnProperty(ship)) {
                var character = 'A';

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
                $hz.append($('<option disabled selected>').attr('value', '0').text(''));
                $vt.append($('<option disabled selected>').attr('value', '0').text(''));
                for(var x = 1; x <= 10; x++) {
                    $hz.append($('<option>').attr('value', x).text(x));
                    $vt.append($('<option>').attr('value', character).text(character));
                    character = helpers().nextChar(character);
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
                    default:
                        $('.error.shot').addClass('active');
                        $('.error.shot').html('An error occurred. If you cannot play anymore, please refresh page. I\'m sorry!');
                        break;
                }

                // add html to radio buttons
                $dirhz.append('horizontal');
                $dirvt.append('vertical');
            }
        }

        // after code generation, check value changes
        $('select, input[type="radio"]').change(function() {
            $('.error').removeClass('active');
            checkPositionRules($(this));
        });
    }


    /**
     *  get user's input (raw format)
     */
    function getPosition() {
        for(var ship in ships) {
            if(ships.hasOwnProperty(ship)) {
                var $hzS = $('select#' + ship + '_hz').val();
                var $vtS = $('select#' + ship + '_vt').val();
                var $dir = $('input[type="radio"][name="direction_' + ship + '"]:checked').val();

                ships[ship].start.push($hzS);
                ships[ship].start.push($vtS);
                ships[ship].direction = $dir;
            }
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
            $ship.direction = $('input[type="radio"][name="direction_'+ $name +'"]:checked').val();
        }

        if( $('select#' + $name + '_hz').val() != null) {
            $occ[0] = $('select#' + $name + '_hz').val();
        }
        if( $('select#' + $name + '_vt').val() != null ){
            $occ[1] = $('select#' + $name + '_vt').val();
        }

        // TODO: make it recursive
        if($ship.direction !== '' && $occ.length >= 2) {
            // get all fields, which are touched by the ship
            var result = calcOccupied($name);
            if(!result) {
                $('#' + $name + '_hz').prop('selectedIndex', 0);
                $('#' + $name + '_vt').prop('selectedIndex', 0);
                $('.error.overlapping').addClass('active');
                $('.error.overlapping').html('This entry is not allowed!<br>Ship\'s position is outisde the grid!');
                return;
            } else {
                // compare, if any field is already touched by another ship
                result = compareOccupied();
                if( !result ) {
                    $('#' + $name + '_hz').prop('selectedIndex', 0);
                    $('#' + $name + '_vt').prop('selectedIndex', 0);
                    ships[$name].occupied = [];
                    $('.error.overlapping').addClass('active');
                    $('.error.overlapping').html('This entry is not allowed!<br>Ships are overlapping. Please check on your last input!');
                    result = true;
                } else if(result === "done") {
                    $('button#done').prop('disabled', false);
                }
            }
        }
    }

    /**
     * calc fields occupied by user's ships and save them
     * @param $name : ship's name to get access to obj.ships
     */
    function calcOccupied($name) {
        var $ship = ships[$name],
            $occ = $ship.occupied,
            $tmp = [],
            n = 0,
            x = 0;

        if($ship.direction === 'hz') {
            for(x = 0; x < $ship.length; x++) {
                n = x + parseInt($occ[0]);
                if(n > 10)
                    return false;
                $tmp.push(n + $occ[1]);
            }
        } else if($ship.direction === 'vt') {
            var character = $occ[1];
            $tmp.push($occ[0] + character);
            for(x = 0; x < ($ship.length-1); x++) {
                character = helpers().nextChar(character);
                if(character > 'J') {
                    return false;
                }
                $tmp.push($occ[0] + character);
            }
        }
        $ship.occupied = [];
        for(x = 0; x < $tmp.length; x++) {
            $ship.occupied.push($tmp[x]);
        }
        return true;
    }


    /**
     * compare saved fields from calcOccupied() to detect overlapping ships
     */
    function compareOccupied() {
        var $tmp = [],
            r = true;
        for (var name in ships) {
            if(ships.hasOwnProperty(name)){
                $tmp.push(ships[name].occupied);
            }
        }

        var $con = $tmp[0].concat($tmp[1], $tmp[2], $tmp[3], $tmp[4]);

        var $sorted_con = $con.sort();

        for (var i = 0; i < $con.length - 1; i++) {
            if ($sorted_con[i + 1] === $sorted_con[i]) {
                r = false;
                return r;
            }
        }

        if ($con.length === 17) {
            gamePlay.usersOccs = $tmp[0].concat($tmp[1], $tmp[2], $tmp[3], $tmp[4]);
            return r = "done";
        }
        return r;
    }

    return {
        startSetup:startSetup,
        getPosition:getPosition
    };
};
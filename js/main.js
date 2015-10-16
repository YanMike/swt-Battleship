/**
 * Created by yannick on 09.10.15.
 */
"use strict";

$(document).ready(function() {

    $('button#start_setup').click(function() {
        $('section.instruction').hide();
        $('section.setup').show();
        userSetup().startSetup();
    });


    $('button#done').click(function() {
        var ready = false;
        // proofe user input - everything there?
        $('select').each(function() {
            ready = $(this).find('option:selected').val() != '';
            //if( $(this).find('option:selected').val() == '') {
            //    ready = false;
            //} else {
            //    ready = true;
            //}
        });

        if(ready) {
            $('section.setup').hide();
            $('section.game').show();
            userSetup().getPosition();
        } else {
            alert('Please define a start position for any ship!');
        }

    });
});


/*
 *  helper function to increment letters
 */
function nextChar(c) {
    return String.fromCharCode(c.charCodeAt(0) + 1);
}


/*
 *  improvements: drag and drop for setup
 */
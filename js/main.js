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

        // check if user's input is completed
        $('select').each(function() {
            ready = $(this).find('option:selected').val() != '';
            ready = true;
        });

        if(ready) {
            $('section.setup').hide();
            $('section.game').show();
            userSetup().getPosition();
        } else {
            alert('Please define a start position for all ships!');
        }
    });
});




/*
 *  improvements: drag and drop for setup
 */
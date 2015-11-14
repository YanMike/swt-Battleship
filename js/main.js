"use strict";

/**
 * main.js contains document.ready() functions to let the user start the setup
 */
$(function() {
    $('button#start_setup').click(function() {
        $('section.instruction').hide();
        $('section.setup').show();
        userSetup().startSetup();
    });

    $('button#done').click(function() {
        $('section.setup').hide();
        $('section.game').show();
        userSetup().getPosition();
    });
});
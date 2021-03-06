/**
 * helpers, contains function which are used multiple times
 *  - parse from character to int and the other way round
 *  - de-/increment characters
 *  - translate to 'canvas understandable' coordinates
 */

var helpers = function() {

    /* grid to see the ranges at a glance
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


    /**
     * helper function to increment letters
     * @param c
     * @returns {string}
     */
    function nextChar(c) {
        return String.fromCharCode(c.charCodeAt(0) + 1);
    }

    /**
     * helper function to decrement letters
     * @param c
     * @returns {string}
     */
    function prevChar(c) {
        return String.fromCharCode(c.charCodeAt(0) - 1);
    }


    /**
     * 1-10 to px: param === Array -> 0-start horizontal, 1-start vertical, 2-end horizontal, 3-end vertical
     * px to 1-10: param === integer
     * @param param
     * @returns {*}
     */
    function translate(param) {
        if($.isArray(param)) {
            return {
                'x1': param[0] * 50 + 1,
                'x2': param[0] * 50 + 49,
                'y1': param[1] * 50 + 1,
                'y2': param[1] * 50 + 49
            };
        } else {
            return  Math.floor(param / 50);
        }
    }


    /**
     * change from char to number
     * @param pos
     */
    function transCharToInt(pos) {
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
            default:
                $('.error.shot').addClass('active');
                $('.error.shot').html('An error occurred. If you cannot play anymore, please refresh page. I\'m sorry!');
                break;
        }
        return pos;
    }

    /**
     * change from number to char
     * @param pos
     */
    function transIntToChar(pos) {
        switch (pos) {
            case 1:
                pos = "A";
                break;
            case 2:
                pos = "B";
                break;
            case 3:
                pos = "C";
                break;
            case 4:
                pos = "D";
                break;
            case 5:
                pos = "E";
                break;
            case 6:
                pos = "F";
                break;
            case 7:
                pos = "G";
                break;
            case 8:
                pos = "H";
                break;
            case 9:
                pos = "I";
                break;
            case 10:
                pos = "J";
                break;
            default:
                $('.error.shot').addClass('active');
                $('.error.shot').html('An error occurred while battlefield setup. If you cannot play anymore, please refresh page. I\'m sorry!');
                break;
        }
        return pos;
    }

    return {
        translate:translate,
        transCharToInt:transCharToInt,
        transIntToChar:transIntToChar,
        nextChar:nextChar,
        prevChar:prevChar
    };
};
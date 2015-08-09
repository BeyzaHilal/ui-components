/**
 * @copyright 2015 DecimaTech Development Team
 * @license MIT
 */
(function(name, definition) {
    if (typeof module != 'undefined') {
        module.exports = definition();
    } else if (typeof define == 'function' && typeof define.amd == 'object') {
        define(definition);
    } else {
        this[name] = definition();
    }
}('Countdown',
    /**
     * Countdown class
     */
    function() {
        "use strict";

        /**
         * Constructor
         *
         * @param object options
         *
         * @api
         */
        var Countdown = function(options) {
            var _onOutput,
                _fps,
                _numbers = '0123456789',
                _letters = 'abcdefghijklmnopqrstuvwxyz';

            /**
             * Render output
             *
             * @param integer i
             *
             * @api
             */
            this.render = function(i) {
                var s = i === 1 ? i + ' SECOND' : i + ' SECONDS';

                if (_fps < s.length) {
                    _fps = s.length;
                }

                _shuffle(s);
            };

            /**
             * Generate random integer [0..max)
             *
             * @param integer max
             * @return integer
             *
             * @internal
             */
            function _random(max) {
                return Math.floor(Math.random() * max);
            }

            /**
             * Text shuffle effect
             *
             * @param string s
             * @param integer pos
             *
             * @internal
             */
            function _shuffle(s, pos) {
                var pos = pos || 1,
                    i = pos,
                    text = s.substring(0, pos),
                    c;

                // append at most 3 shuffled characters
                while (i < s.length && i < pos + 3) {
                    c = s.charAt(i++);

                    if (c >= '0' && c <= '9') {
                        c = _numbers[_random(10)];
                    } else {
                        c = _letters[_random(26)];
                    }

                    text += c;
                }

                _onOutput(text);

                if (pos < s.length) {
                    setTimeout(
                        function () {
                            _shuffle(s, pos + 1);
                        },
                        800 / _fps
                    );
                }
            }

            /**
             * Initialize countdown
             *
             * @param object options
             *
             * @internal
             */
            function _init(options) {
                _onOutput = options.onOutput || function(i) { };
                _fps = options.fps || 25;
            }

            _init(options);
        };

        return Countdown;
    }
));

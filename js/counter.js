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
}('Counter',
    /**
     * Counter class
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
        var Counter = function(options) {
            var _onProgress,
                _onDone,
                _onHalt,
                _current,
                _delta,
                _terminal,
                _delay,
                _halt;

            /**
             * Start counter
             *
             * @api
             */
            this.execute = function() {
                count();
            };

            /**
             * Halt counter
             *
             * @api
             */
            this.halt = function() {
                _halt = true;
            };

            /**
             * Increment/decrement counter and invoke callbacks
             *
             * @internal
             */
            function count() {
                if (_halt) {
                    _onHalt(_current);
                } else if (_delta > 0 ? (_current < _terminal) : (_current > _terminal)) {
                    _onProgress(_current);

                    _current += _delta;

                    if (_delay) {
                        setTimeout(count, 1000);
                    }
                } else {
                    _onDone(_current);
                }
            }

            /**
             * Initialize counter using safe defaults
             *
             * @param object options
             *
             * @internal
             */
            function _init(options) {
                _onProgress = options.onProgress || function(i) { };
                _onDone = options.onDone || function(i) { };
                _onHalt = options.onHalt || function(i) { };
                _current = options.start || 0;
                _terminal = options.end || 0;
                _delta = options.delta || 1;
                _delay = options.delay || 0;

                if (_current < _terminal) {
                    _delta = Math.abs(_delta);
                }

                if (_current > _terminal) {
                    _delta = -Math.abs(_delta);
                }
            }

            _init(options);
        };

        return Counter;
    }
));

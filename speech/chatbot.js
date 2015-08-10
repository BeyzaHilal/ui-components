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
}('ChatBot',
    /**
     * ChatBot class
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
        var ChatBot = function(options) {
            var _onDone,
                _commands;

            /**
             * Start ...
             *
             * @api
             */
            this.execute = function() {
            };

            /**
             * Initialize chatbot
             *
             * @param object options
             *
             * @internal
             */
            function _init(options) {
                _commands = options.commands || ({});
                _onDone = options.onDone || function() { };
            }

            _init(options);
        };

        return ChatBot;
    }
));

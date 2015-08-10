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
}('TextScroller',
    /**
     * TextScroller class
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
        var TextScroller = function(options) {
            var _onOutput,
                _onDone,
                _delay,
                i,
                words;

            /**
             * Render output
             *
             * @param string s
             *
             * @api
             */
            this.render = function(s) {
                s = s.toUpperCase();

                if (s.slice(-3) === '...') {
                    words = ['', s];
                } else {
                    words = s.split(/[ ,]+/);
                    words.unshift('');
                }

                i = 0;

                _nextWord();
            };

            function _outputWord() {
                var s = words[i],
                    trailing;

                if (s.length > 3 && s.slice(-3) === '...') {
                    s = s.slice(0, -3);
                    trailing = '...';
                } else if (s.length > 1 && s.slice(-1) === '.') {
                    s = s.slice(0, -1);
                    trailing = '.';
                } else if (s.length > 1 && s.slice(-1) === '?') {
                    s = s.slice(0, -1);
                    trailing = '?';
                }

                var padding = s.length - 2,
                    filler = '';

                while (padding > 0) {
                    filler += '&nbsp;';
                    padding--;
                }

                if (i === 0) {
                    s = '<span class="output">&thinsp;</span>';
                } else if (i === 1 || trailing === '.') {
                    s = '<span class="pad">&thinsp;</span><span class="output">' + s + '</span><span class="pad">&thinsp;</span>';
                } else {
                    s = '<span class="filler">' + filler + '</span><span class="pad">&thinsp;</span><span class="output">' + s + '</span><span class="pad">&thinsp;</span>';
                }

                _onOutput(s);

                return trailing;
            }

            function _nextWord() {
                var trailing = _outputWord();

                if (trailing === '?') {
                    words.push('?');
                }

                i++;

                if (i < words.length) {
                    setTimeout(_nextWord, _delay);
                } else {
                    _onDone(trailing);

                }
            }

            /**
             * Initialize text scroller
             *
             * @param object options
             *
             * @internal
             */
            function _init(options) {
                _onOutput = options.onOutput || function(s) { };
                _onDone = options.onDone || function(s) { };
                _delay = options.delay || 600;
            }

            _init(options);
        };

        return TextScroller;
    }
));

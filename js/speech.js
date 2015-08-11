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
}('Speech',
    /**
     * Speech class
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
        var Speech = function(options) {
            var _onDone,
                _queue,
                _voices,
                _preference,
                _lang,
                _rate,
                _volume,
                _mode;

            /**
             * Speech recognition
             *
             * @api
             */
            this.listen = function() {
            };

            /**
             * Speech synthesis
             *
             * @api
             */
            this.say = function(s) {
                // feature detection
                if (! ('speechSynthesis' in window)) {
                    return;
                }

                if (s) {
                    _queue.push(s);
                }

                _speak();
            };

            function _speak() {
                // workaround Chrome 44 bug where this isn't initialized yet
                if (speechSynthesis.getVoices().length === 0) {
                    setTimeout(_speak, 1);

                    return;
                }

                var u = new SpeechSynthesisUtterance(),
                    voices = speechSynthesis.getVoices(),
                    voice,
                    name,
                    i;

                if (typeof _preference === 'undefined') {
                    _preference = false;

                    for (i = 0; i < voices.length; i++) {
                        name = voices[i].name;

                        if (_voices[name]) {
                            if (typeof voice === 'undefined' ||
                                _voices[name] < _voices[voice.name]
                            ) {
                                voice = voices[i];
                            }
                        }
                    }

                    if (typeof voice !== 'undefined') {
                        _preference = voice;
                    }
                }

                if (_preference) {
                    u.voice = _preference;
                }

                u.text = _queue.shift();
                u.lang = _lang;
                u.rate = _rate;
                u.volume = _volume;
                u.onend = function(event) {
                    _onDone(event);

                    if (_queue.length) {
                        _speak();
                    }
                };

                speechSynthesis.speak(u);
            };

            /**
             * Initialize speech
             *
             * @param object options
             *
             * @internal
             */
            function _init(options) {
                _onDone = options.onDone || function(i) { };
                _queue = [];
                _voices = options.voices || ({});
                _lang = options.lang || 'en-US';
                _rate = options.rate || 1;
                _volume = options.volume || 1;

                _mode = options.mode || 'normal'; // continuous, normal, quick?
            }

            _init(options);
        };

        return Speech;
    }
));

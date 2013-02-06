/*
Leaky v0.0.1 - Show variables in global scope
Based on Remy Sharps idea of creating iframe then comparing contents
See http://remysharp.com/2007/11/01/detect-global-variables/
Alex Mackey
simpleisbest.co.uk
*/

var leaky =

(function () {

    "use strict";

    var getGlobals = function(options) {
    
		options=options || {filterEntries:false}
		options.allowedObjs = options.allowedObjs || [];
		options.allowedRegex = options.allowedRegex || [];
			
        var windowObjs = {},
            iframe = document.createElement('iframe'),
            globalObj;

        iframe.style.display = 'none';
        document.body.appendChild(iframe);
        iframe.src = 'about:blank';
        iframe = iframe.contentWindow || iframe.contentDocument;

        function isKnownGlobal(value) {

            var matchFound = false;

            if (options.allowedObjs.indexOf(value) != -1) {
                return true;
            }

            options.allowedRegex.some(function(expression) {

                var regex = new RegExp(expression);

                if (value.match(regex)) {
                    matchFound = true;
                    return;
                }

            });

            return matchFound;
        }

        for (globalObj in window) {
			if (typeof iframe[globalObj] === "undefined") {

                if (isKnownGlobal(globalObj.toString()) === false || options.filterEntries === false ) {
                    windowObjs[globalObj] = {
                        'Type': typeof window[globalObj],
                        'Value': window[globalObj]
                    };
                }
            }
        }

        return windowObjs;
    };

    return {
        getGlobals: getGlobals
    };

})();

'use strict';
(function (global, factories) {
    var object = factories();

    Object.keys(object).map(function(key, index) {
        global[key] = object[key];
    });
})(typeof window !== 'undefined' ? window : this, function () {
    var pageCached = function (doCached, afterCached) {
        if (typeof ArrTree == 'undefined') {
            console.error('ArrTree undefined');

            return false;
        }

        if (typeof Cookies == 'undefined') {
            console.error('Cookies undefined');

            return false;
        }

        var element = document.querySelector('meta[name="site:cache-page-time"]');

        if (null == element || element == undefined) {
            console.error('meta[name="site:cache-page-time"] not found');

            return false;
        }

        var isCached = false;

        var content = element && element.getAttribute('content');
        var cacheTime, currentUTC;

        var date = new Date();
        var utc = Date.UTC(date.getFullYear(),date.getMonth(), date.getDate() ,
            date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds());

        currentUTC = Math.floor(utc / 1000);
        cacheTime = parseInt(content);

        isCached = (currentUTC > cacheTime);

        if (isCached) {
            var path = window.location.pathname.split('/').filter(function (val) {
                return val.trim().length > 0;
            });

            path = path.join('.');

            var currentPaths = Cookies.getJSON('cached-path');

            if (currentPaths == undefined) {
                currentPaths = {};

                Cookies.set('cached-path', currentPaths);
            }

            if (!ArrTree.has(currentPaths, path)) {
                ArrTree.set(currentPaths, path, {});
                Cookies.set('cached-path', currentPaths);

                isCached = false;
            }
        }

        if (!isCached) {
            doCached();
        } else {
            afterCached();
        }

        return true;
    };

    return {
        'pageCached': pageCached
    };
});
;
(function (angular, $, _, console) {
    angular.module('quicksilver', ['ngRoute', 'quicksilver.controller', 'quicksilver.service']);
    angular.module('quicksilver.controller' , ['summernote', 'ng-context-menu', 'quicksilver.service']);
    angular.module('quicksilver.service' , []);

    angular.module('quicksilver')
        .config([
            '$routeProvider', '$httpProvider', '$filterProvider',
            function ($routeProvider, $httpProvider, $filterProvider) {
                console.debug("config");
                $httpProvider.defaults.xsrfCookieName = 'csrftoken';
                $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';

                $filterProvider.register('shortcut', function () {
                    return function (text, len) {
                        if ( text.length > len ) {
                            var head = (len / 2) + (len%2);
                            var tail = len - head;
                            return text.substr(0, head) + " ... " + text.substr(-tail);
                        }
                        return text;
                    };
                });

                $routeProvider
                    .when("/note", {templateUrl: 'quicksilver/tpl/note', controller: 'noteCtrl'});
            }])
        .run(function() {
            location.href = "#/note";
        });
})(angular, jQuery, _, window.console&&window.console||{
    log: function() {},
    debug: function() {},
    info: function() {},
    warning: function() {},
    error: function() {}
});

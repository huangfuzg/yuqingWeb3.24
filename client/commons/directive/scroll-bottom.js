"use strict";
angular.module('scrollBottom',[])
    .directive('scrolly', function () {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                var raw = element[0];
                //console.log('loading directive');
                element.bind('scroll', function () {
                   // console.log('in scroll');
                    //console.log(raw.scrollTop + raw.offsetHeight);
                    //console.log(attrs.scrolly);
                    if (raw.scrollTop + raw.offsetHeight >= raw.scrollHeight) {
                        scope.$apply(attrs.scrolly);
                    }
                });
            }
        };
});

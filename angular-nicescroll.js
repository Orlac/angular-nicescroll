(function () {
    'use strict';

    angular
        .module('angular-nicescroll', [])
        .directive('ngNicescroll', ngNicescroll);

    ngNicescroll.$inject = ['$rootScope','$parse', '$timeout'];

    /* @ngInject */
    function ngNicescroll($rootScope,$parse, $timeout) {
        // Usage:
        //
        // Creates:
        //
        var directive = {
            scope: {
                ngModel: '='
            },
            link: link
        };
        return directive;

        function link(scope, element, attrs, controller) {



            var niceOption = scope.$eval(attrs.niceOption)

            var niceScroll = $(element).niceScroll(niceOption);
            var nice = $(element).getNiceScroll();
          
            if (attrs.niceScrollObject)  $parse(attrs.niceScrollObject).assign(scope, nice);
       
            // on scroll end
            niceScroll.onscrollend = function (data) {
                if (this.newscrolly >= this.page.maxh) {
                    if (attrs.niceScrollEnd) scope.$evalAsync(attrs.niceScrollEnd);

                }
                if (data.end.y <= 0) {
                    // at top
                    if (attrs.niceScrollTopEnd) scope.$evalAsync(attrs.niceScrollTopEnd);
                }
            };


            scope.$on('$destroy', function () {
                if (angular.isDefined(niceScroll.version)) {
                    niceScroll.remove();
                }
            })

            if(scope.ngModel){
                scope.$watch('ngModel', function(newValue, oldValue, scope) {
                    if(!angular.equals(newValue, oldValue)){
                        if (angular.isDefined(niceScroll.version)) {
                            niceScroll.remove();
                        }
                        $timeout(function(){
                            niceScroll = $(element).niceScroll(niceOption);
                            nice = $(element).getNiceScroll();                  
                        });
                    }
                }, true);
            }

        }
    }


})();

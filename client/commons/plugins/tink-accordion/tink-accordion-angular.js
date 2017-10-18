'use strict';
(function(module) {
  try {
    module = angular.module('tink.accordion');
  } catch (e) {
    module = angular.module('tink.accordion', ['tink.tinkApi']);
  }
  module.controller('TinkAccordionController', [function () {
    var self = this;

    this.groups = {};

    this.init = function(accordion,element,opts){
     self.$accordion = accordion;
     self.$options = opts;
     self.$accordion.init(element);
   };

   var currentOpen;
   this.addGroup = function(scope,elem){
    self.$accordion.addGroup(elem);
    if(self.$options.startOpen && scope.isCollapsed !== true){
      scope.open();
    }else if(scope.isCollapsed === false){
      scope.open();
    }
  };

  this.addLoader = function(elem){
    currentOpen = elem;
    self.$accordion.addLoader(elem);
  };

  this.openGroup = function(elem,scope){
    if(self.$options.oneAtATime && currentOpen && currentOpen !== scope){
      currentOpen.toggleOpen();
    }
    currentOpen = scope;
    self.$accordion.openGroup(elem);
  };

  this.closeGroup = function(elem){
    self.$accordion.closeGroup(elem);
    currentOpen = null;
  };

  }]);
})();;'use strict';
(function(module) {
  try {
    module = angular.module('tink.accordion');
  } catch (e) {
    module = angular.module('tink.accordion', ['tink.tinkApi']);
  }
  module.directive('tinkAccordion',['tinkApi',function (tinkApi) {
    return {
      restrict:'EA',
      controller:'TinkAccordionController',
      transclude: true,
      replace: false,
      scope:{
        startOpen:'=',
        oneAtATime:'='
      },
      template: '<div class="accordion" ng-transclude></div>',
      compile: function compile() {
        return {
          pre: function preLink(scope,element, attrs, accordionCtrl) {
            var options = {};
            angular.forEach(['oneAtATime','startOpen'], function(key) {
              if(angular.isDefined(attrs[key])) {
                if(typeof scope[key] === 'boolean'){
                  options[key] = scope[key];
                }else{
                  options[key] = attrs[key] === 'true';
                }
              }
            });
            var accordionElem = tinkApi.accordion(element);
            accordionCtrl.init(accordionElem,element,options);
          }
        };
      }
    };
  }])
  .directive('tinkAccordionPanel', function() {
    return {
      restrict:'EA',
      priority: 1500.1,
      compile:function(){
        //var header = tElement.find('data-header');
        //var content = tElement.find('data-content');
      }
    };
  })
  .directive('tinkAccordionPanel', function($compile,$timeout) {
    return {
      require:'^tinkAccordion',         // We need this directive to be inside an accordion group
      restrict:'EA',
      priority: 1500,
      transclude:true,              // It transcludes the contents of the directive into the template
      replace: true,                // The element containing the directive will be replaced with the template
      templateUrl:'templates/tinkAccordionPanel.html',
      scope: {             
        onclick:'=?',
        isCollapsed:'=',
        hasPadding:'@',
        heading:'@'
      },
      compile:function(){
        return {
          pre: function preLink(scope, element, attrs, accordionCtrl,transclude) {

            transclude(function(clone,innerscope){
              var header = $(clone).filter('data-header');
              if(typeof scope.heading !== 'string'){
                element.find('.panel-title').append(header);
              }else{
                element.find('.panel-title').html('{{heading}}');
                $compile(element.find('.panel-title'))(scope);
              }           
            },scope);

            var insertContent = function(){
              transclude(function(clone,innerscope){
                var content = $(clone).filter('data-content');
                if(typeof scope.heading !== 'string'){
                  element.find('.accordion-loaded-content').append(content);
                }else{
                  element.find('.accordion-loaded-content').append(clone);
                }
              });
            }

            var removeContent = function(){
              element.find('.accordion-loaded-content').empty();
            }

           var states = {closed:1,open:2,loading:0};
            var state = states.closed;
            var trackToggle;
            var onFunc = typeof scope.onclick === 'function';
            if(!onFunc){
              element.addClass('no-call-back');
            }

            // The panel has padding or not?
            scope.hasPadding = scope.hasPadding !== 'false';

            scope.toggleOpen = function(){
              if(state === states.closed){
                if(onFunc){
                  scope.loading();
                }else{
                  scope.open();
                }
              }else if(state === states.open){
                scope.close();
              }else if(state === states.loading){
                scope.cancel();
              }
            };


            if(attrs.isCollapsed){
              if(attrs.isCollapsed === 'true' || attrs.isCollapsed === 'false'){
                trackToggle = false;
              }else{
                trackToggle = true;
              }
            }

            if(trackToggle){
              scope.$watch('isCollapsed',function(newVar){
                if(newVar === true){
                  stateClose();
                }else if(newVar === false){
                  stateOpen();
                }
              });
            }

            scope.open = function(){
              if(trackToggle){
                scope.isCollapsed = false;
              }else{
                stateOpen();
              }
            };

            scope.close = function(){
              if(trackToggle){
                scope.isCollapsed = true;
              }else{
                stateClose();
              }              
            };

            scope.loading = function(){
              if(trackToggle){
                scope.isCollapsed = false;
              }else{
                stateLoad();
              }
            };

            scope.cancel = function(){
              if(trackToggle){
                scope.isCollapsed = true;
              }else{
                cancelTrans();
              }
            };

            var stateLoad = function(){
              state = states.loading;
              callback('loading',function(){
                if(state === states.loading){
                  stateOpen();
                }
              });
              accordionCtrl.openGroup(element,scope);
            };

            var stateOpen = function(){
              insertContent();
              if((!onFunc && state === states.closed)||(onFunc && state === states.loading)){
                state = states.open;
                accordionCtrl.openGroup(element,scope);
                callback('open');
              }else if(onFunc && state === states.closed){
                stateLoad();
              }
            };

            var stateClose = function(){
              if(state === states.open){
                state = states.closed;
                accordionCtrl.closeGroup(element);
                callback('closed');
              }else if(state === states.canceld){
                cancelTrans();
              }
              $timeout(function(){
                removeContent();
              },1);
            };

            var cancelTrans = function(){
              state = states.closed;
              accordionCtrl.closeGroup(element);
               callback('canceld');
            };

            var callback = function(type,fn){
              if(onFunc){
                scope.onclick(type,fn);
              }
            };
            accordionCtrl.addGroup(scope,element);
          }
        };
      },
    };
  });
})();;angular.module('tink.accordion').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('templates/tinkAccordionPanel.html',
    "<section class=accordion-panel> <a href class=accordion-toggle ng-click=toggleOpen()> <div class=accordion-panel-heading> <span class=panel-title></span> </div> </a> <div class=accordion-panel-body data-ng-class=\"{'has-no-padding': hasPadding === 'false'}\"> <div class=accordion-loaded-content> </div> </div> </section>"
  );

}]);

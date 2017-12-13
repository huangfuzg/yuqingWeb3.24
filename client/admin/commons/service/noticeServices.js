"use strict";
angular.module('Notice',[])
    .factory('notice',function() {
        var factories = {};
        factories.notify_dlg = function(title, text, img, sticky, time, class_name) {
            var info = { 
                title: title,
                text: text,
                image: img,
                sticky: sticky,
                time: time,
                class_name: class_name
             };
            $.gritter.add(info);
        };
        factories.notify_info = function(title, text, img, sticky, time, class_name){
            class_name = "btn-info";
            factories.notify_dlg(title, text, img, sticky, time, class_name);
        };
        return factories;
    });
;'use strict';
(function(){
	var root = this;

	var tinkApi;
	if (typeof exports !== 'undefined') {
		tinkApi = exports;
	} else {
		tinkApi = {};
	}

	tinkApi.VERSION = '1.0.1';

	tinkApi.util = {
		getCurrentURL: function () {
			return window.location.href;
		}
	};

	tinkApi.topNavigation = function(element){
		var defaults = {
			menuStr:element
		};

		var calculateHeight = function(){
			if($(defaults.menuStr).length === 1){
				setTimeout(function(){
					var height = $(defaults.menuStr)[0].getBoundingClientRect().height;
					$($(document)[0].body).css('padding-top',height+'px');
				}, 150);
			}
		};

		var startLisener = function(){
			$(window).bind('resize',calculateHeight);
		};

		return {
			init:function(){
				calculateHeight();
				startLisener();
			}
		};
	};

	tinkApi.accordion = function(){
		var defaults = {
			speed:200,
			loadingCallback:true,
			oneAtTime:true,
			openGroupCss:'group-open',
			groupLoadingCss:'group-loading',
			contentCss:'accordion-panel-body',
			loadingCss:'accordion-spinner',
			startOpen:false,
			accordionLoadedContent:'accordion-loaded-content',
			noCallBack:'no-call-back'
		};

		var accordion = null;

		var init = function(element,opts){
			accordion = element;
			if(opts){
				Object.extend(defaults, opts);
			}
		};

		var groups=[];

		var addGroup = function(elem){
			if(!accordion){
				return;
			}
			groups.push(elem.get(0));

			if(elem.hasClass(defaults.noCallBack)){
				findEl(elem,defaults.loadingCss).css('opacity',0);
				findEl(elem,defaults.contentCss).css('height','auto');
			}
				findEl(elem,defaults.contentCss).css('display','none');
		};

		var getGroupAt = function(index){
			return $(groups[index]);
		};

		var findEl = function(elem,classStr){
			return $(elem.find('.'+classStr)[0]);
		};


		var openGroup = function(elem){
			if(!accordion){
				return;
			}
			var index = groups.indexOf(elem.get(0));
			if(index >= 0){
				elem = getGroupAt(index);
				//If collapse is loading, we have to stop the visual and open de div
				if(elem.hasClass(defaults.groupLoadingCss)){
						findEl(elem,defaults.contentCss).slideDown(defaults.speed);
						elem.removeClass(defaults.groupLoadingCss);
						elem.addClass(defaults.openGroupCss);
				//If accordion is not open and doesnt have loading
				}else if(!elem.hasClass(defaults.openGroupCss)){
					/*If the collapse has a callback and its not loading
					* If the collapse is loading we add loading visual.
					*/
					if(!elem.hasClass(defaults.noCallBack) && !elem.hasClass(defaults.groupLoadingCss)){
						findEl(elem,defaults.loadingCss).css('opacity',1);
						elem.addClass(defaults.groupLoadingCss);
						//In al other cases we just want to open the collapse.
					}else{
						findEl(elem,defaults.contentCss).css('height','auto');
						findEl(elem,defaults.contentCss).slideDown(defaults.speed);
						elem.removeClass(defaults.groupLoadingCss);
						elem.addClass(defaults.openGroupCss);
					}
				}
			}
		};

		var closeGroup = function(elem){
			if(!accordion){
				return;
			}
			var index = groups.indexOf(elem.get(0));
			if(index >= 0){
				elem = getGroupAt(index);
				if(elem.hasClass(defaults.openGroupCss) || elem.hasClass(defaults.groupLoadingCss)){
					elem.find('.'+defaults.contentCss).slideUp(defaults.speed);
					elem.removeClass(defaults.openGroupCss);
					elem.removeClass(defaults.groupLoadingCss);
				}
			}
		};

		return{
			init:function(element,opts){
				init(element,opts);
			},
			addGroup:function(element){
				addGroup(element);
			},
			openGroup:function(element){
				openGroup(element);
			},
			closeGroup:function(element){
				closeGroup(element);
			}
		};

	};

	tinkApi.sideNavigation = function(element){

		var defaults = {
			toggleClass :'nav-left-open',
			toggleMenu: 'html',
			mobileAutoClose:true,
			menuStr:'aside[data-tink-nav-aside]',
			activeCss:'active',
			topNav:'nav.nav-top',
			subActive:'has-active-item',
			openCss:'open',
			accordion:true,
			gotoPage:true,
			speed:200,
            extraTop: 0
		};

		var options;
		var clickCheck = 0;
		var registerClick = function(){
			$( '.nav-aside-section li a' ).each(function() {
				$(this).unbind('click.menu');
			});
			$( '.nav-aside-section li a' ).each(function() {
				$(this).on('click.menu',function(){
					subUrl = false;
					setActiveElemnt($(this).parent());
					clickCheck = 1;
				});
			});
		};

		function getRotationDegrees(obj) {
				var angle;
		    var matrix = obj.css('-webkit-transform') ||
		    obj.css('-moz-transform')    ||
		    obj.css('-ms-transform')     ||
		    obj.css('-o-transform')      ||
		    obj.css('transform');
		    if(matrix !== 'none') {
		        var values = matrix.split('(')[1].split(')')[0].split(',');
		        var a = values[3];
		        var b = values[4];
		        angle = Math.round(Math.atan2(b, a) * (180/Math.PI));
		    }else {
		    	angle = 0;
		    }
		    return (angle < 0) ? angle +=360 : angle;
		}

		function whichTransitionEvent(){
		    var t;
		    var el = document.createElement('fakeelement');
		    var transitions = {
		      'transition':'transitionend',
		      'OTransition':'oTransitionEnd',
		      'MozTransition':'transitionend',
		      'WebkitTransition':'webkitTransitionEnd'
		    };

		    for(t in transitions){
		        if( el.style[t] !== undefined ){
		            return transitions[t];
		        }
		    }
		}

		function checkTabIndex() {
			var open = getRotationDegrees(element) === 270 ? 1 : 0;
			if(!fallback && open){
				element.find('a').attr('tabIndex','-1');
				fallback = 1;
			}else if(fallback && !open){
				element.find('a').removeAttr('tabIndex');
				fallback = 0;
			}
		}

		var fallback=-1;
		var transitionEvent = whichTransitionEvent();
		if(transitionEvent){
			element[0].addEventListener(transitionEvent,checkTabIndex);
		}

		var calculateHeight = function(){

			$( '.nav-aside-section ul > li' ).each(function() {
				var ulHelper = $(this).find('ul');
				if(ulHelper.length){
					$(this).addClass('can-open');
					if(options.accordion){
						$(this).find('a')[0].href ='javascript:void(0);';
					}
				}

			});
		};

		$(window).bind('hashchange', function() {
			if(!clickCheck){
				//currentTogggleElem = null;
				subUrl = false;
				setActiveElemnt();
			}
			clickCheck = 0;
		});

		var currentTogggleElem = null;

		var openAccordion = function(el){
			el.find('ul').slideDown(options.speed, function() {});
			el.addClass(options.openCss);
			currentTogggleElem = el;
		};

		var closeAccordion = function(el){
			el.find('ul').slideUp(options.speed, function() {});
			el.removeClass(options.openCss);
			currentTogggleElem = null;
		};

		function isElementInViewport (el) {
		    //special bonus for those using jQuery
		    if (typeof jQuery === "function" && el instanceof jQuery) {
		        el = el[0];
		    }

		    var rect = el.getBoundingClientRect();

		    return (
		        rect.top >= 0 &&
		        rect.left >= 0 &&
		        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && /*or $(window).height() */
		        rect.right <= (window.innerWidth || document.documentElement.clientWidth) /*or $(window).width() */
		    );
		}

		var toggleAccordion = function(el,force){
			if(currentTogggleElem !== null){
				currentTogggleElem.removeClass(options.openCss);
			}

			if(el !== null){

				if(currentTogggleElem && el[0] === currentTogggleElem[0]){
					closeAccordion(el);
				}else{
					if(currentTogggleElem !== null){
						if(!isElementInViewport(currentTogggleElem.find('a:first'))){
							$(element).find('aside').animate({
								scrollTop: currentTogggleElem.offset().top
							}, 1);
						}
						closeAccordion(currentTogggleElem);
					}
					openAccordion(el);

					if(options.gotoPage){
						if(force !== false){
							var firstA = el.find('ul a:first');
							if(!subUrl){
								document.location.href = firstA[0].href;
								subUrl = false;
							}
							
							setActiveElemnt(el.find('ul li:first'));
						}
					}

				}

			}else{
				currentTogggleElem = null;
			}


		};


		var urlDomMap = {};


		var currentActiveElement = null;
		var subUrl = false;
		var findElUrl = function(url){
			var element = undefined;
			var keys = Object.keys(urlDomMap);
			keys.sort();
			for (var i=keys.length-1; i>=0; i--) {
			   	var key = keys[i]
				if(url.indexOf(key) > -1){
					element = $(urlDomMap[key]);
					if(key !== url){
						subUrl = true;
					}
					break;
				}
				
			}
			return element;
		}

		var setActiveElemnt = function(el){
			var activeElem;
			if(el){
				activeElem = el;
			}else{
				var lookup = findElUrl(tinkApi.util.getCurrentURL());
				if(lookup === undefined || lookup === null){
					activeElem = $();
				}else{
					activeElem = lookup.parent();
				}
				
			}
			if(activeElem && activeElem.hasClass('can-open')){
				toggleAccordion(activeElem);

			}else if(activeElem.parent().parent().hasClass('can-open')){
				if(currentTogggleElem === null || activeElem.parent().parent()[0] !== currentTogggleElem[0]){
					toggleAccordion(activeElem.parent().parent(),false);
				}
				activeElem.parent().parent().addClass(options.subActive);
			}else if(currentTogggleElem){
				toggleAccordion(currentTogggleElem);
			}

			if(!(options.accordion && activeElem.hasClass('can-open') )){
				if(currentActiveElement !== null){
					if(currentActiveElement.parent().parent()){
						if(currentActiveElement.parent().parent().get(0) !== activeElem.parent().parent().get(0)){
							currentActiveElement.parent().parent().removeClass(options.subActive);
							//toggleAccordion(currentTogggleElem);
						}
					}
					currentActiveElement.removeClass(options.activeCss);
				}
				activeElem.addClass(options.activeCss);
				currentActiveElement = activeElem;
			}

		};
		var openMenu = function(){
			$(options.toggleMenu).addClass(options.toggleClass);
		};

		var closeMenu = function(){
			$(options.toggleMenu).removeClass(options.toggleClass);
		};

		var calculateTop = function(){
			if($(options.topNav).length === 1){
				$(options.menuStr).css('top',$(options.topNav)[0].getBoundingClientRect().height+options.extraTop);
			}

		};


		var watchForPadding = function(){
			window.addEventListener('resize', function(){
				setTimeout(calculateTop, 155);
			});
		};

		var init = function(opts){
			options = $.extend( {}, defaults, opts );

			options.menuStr = $(element);

			if(options.autoSelect){
				options.gotoPage = true;
			}else{
				options.gotoPage = false;
			}

			if(options.menuStr.hasClass('nav-right')){
				options.toggleClass = 'nav-right-open';
			}


			// map urls with elements
			(function mapUrls(){
				var aMap = options.menuStr.find('li a[href]');
				[].forEach.call(aMap,function (el) {
					urlDomMap[el.href] = el;
				}
				);
			})();

			calculateHeight();
			setActiveElemnt();
			registerClick();
			watchForPadding();
			calculateTop();
			//to check tabindex at startup
			checkTabIndex();
			fallback = !(getRotationDegrees(element) === 270 ? 1 : 0);
		};


		return {
			openMenu:function(){
				openMenu();
			},
			closeMenu : function(){
				closeMenu();
			},
			toggleMenu:function(){
				if($(options.toggleMenu).hasClass(options.toggleClass)){
					closeMenu();
				}else{
					openMenu();
				}
			},
			init:function(opts){
				init(opts);
			},
			reloadActive:function(){
				setActiveElemnt();
			},
			recalculate:function(){
				calculateTop();
			},
			reload:function(){
				registerClick();
			}
		};
	};


	root.tinkApi = tinkApi;
}).call(window);

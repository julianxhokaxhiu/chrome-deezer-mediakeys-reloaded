var CFG = {
	'PLAY':'DZMK_PLAY',
	'PREV':'DZMK_PREV',
	'NEXT':'DZMK_NEXT'
};
var MKVAL = {
	'NEXT':176,
	'PREV':177,
	'STOP':178,
	'PLAY':179
}
var DEFEVENTS = {
	'PLAY':{ctrlKey:true,altKey:true,shiftKey:false,keyCode:67},
	'PREV':{ctrlKey:true,altKey:true,shiftKey:false,keyCode:88},
	'NEXT':{ctrlKey:true,altKey:true,shiftKey:false,keyCode:66}
}
var init = function(){
	if(!window.localStorage.getItem(CFG.PLAY))window.localStorage.setItem(CFG.PLAY,JSON.stringify(DEFEVENTS.PLAY));
	if(!window.localStorage.getItem(CFG.PREV))window.localStorage.setItem(CFG.PREV,JSON.stringify(DEFEVENTS.PREV));
	if(!window.localStorage.getItem(CFG.NEXT))window.localStorage.setItem(CFG.NEXT,JSON.stringify(DEFEVENTS.NEXT));
}
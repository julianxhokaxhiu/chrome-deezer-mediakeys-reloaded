var mkListener = function(e){
	chrome.extension.sendRequest({ctrlKey:e.ctrlKey,altKey:e.altKey,shiftKey:e.shiftKey,keyCode:e.keyCode},function(r){
		switch(r.keyCode){
			case 176:
				//NEXT_MK
				chrome.extension.sendRequest({type:"tabid"},function(j){
					if(j.isdz)$('#nextsong').click();
					else chrome.extension.sendRequest({cmd:"next"});
				});
				break;
			case 177:
				//PREV_MK
				chrome.extension.sendRequest({type:"tabid"},function(j){
					if(j.isdz)$('#prevsong').click();
					else chrome.extension.sendRequest({cmd:"prev"});
				});
				break;
			case 178:
				//STOP_MK
				break;
			case 179:
				//PLAY_MK
				chrome.extension.sendRequest({type:"tabid"},function(j){
					if(j.isdz){
						if($('#play').is(':visible'))$('#play').click();
						else $('#pause').click();
					}
					else chrome.extension.sendRequest({cmd:"play_pause"});
				});
				break;
		}
	})
}
$(window).keyup(function(e){mkListener(e)});
chrome.extension.onRequest.addListener(function(request,sender,sendResponse){
	switch(request){
		case 'next':$('#nextsong').click();
		break;
		case 'prev':$('#prevsong').click();
		break;
		case 'play_pause':{
			if($('#play').is(':visible'))$('#play').click();
			else $('#pause').click();
		}
		break;
		default:;
	}
});
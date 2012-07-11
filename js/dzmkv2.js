var mkListener = function(e){
	chrome.extension.sendMessage({ctrlKey:e.ctrlKey,altKey:e.altKey,shiftKey:e.shiftKey,keyCode:e.keyCode},function(r){
		switch(r.keyCode){
			case 176:
				//NEXT_MK
				chrome.extension.sendMessage({type:"tabid"},function(j){
					if(j.isdz)$('#h_next a').click();
					else chrome.extension.sendMessage({cmd:"next"});
				});
				break;
			case 177:
				//PREV_MK
				chrome.extension.sendMessage({type:"tabid"},function(j){
					if(j.isdz)$('#h_previous a').click();
					else chrome.extension.sendMessage({cmd:"prev"});
				});
				break;
			case 178:
				//STOP_MK
				break;
			case 179:
				//PLAY_MK
				chrome.extension.sendMessage({type:"tabid"},function(j){
					if(j.isdz){
						if($('#h_play a').is(':visible'))$('#h_play a').click();
						else $('#h_pause a').click();
					}
					else chrome.extension.sendMessage({cmd:"play_pause"});
				});
				break;
		}
	})
}
$(window).keyup(function(e){mkListener(e)});
chrome.extension.onMessage.addListener(function(request,sender,sendResponse){
	switch(request){
		case 'next':$('#h_next a').click();
		break;
		case 'prev':$('#h_previous a').click();
		break;
		case 'play_pause':{
			if($('#h_play a').is(':visible'))$('#h_play a').click();
			else $('#h_pause a').click();
		}
		break;
		default:;
	}
});
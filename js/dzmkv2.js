var mkListener = function(e){
	chrome.extension.sendMessage({ctrlKey:e.ctrlKey,altKey:e.altKey,shiftKey:e.shiftKey,keyCode:e.keyCode},function(r){
		switch(r.keyCode){
			case 176:
				//NEXT_MK
				chrome.extension.sendMessage({type:"tabid"},function(j){
					if(j.isdz)$('#player_control_next').click();
					else chrome.extension.sendMessage({cmd:"next"});
				});
				break;
			case 177:
				//PREV_MK
				chrome.extension.sendMessage({type:"tabid"},function(j){
					if(j.isdz)$('#player_control_prev').click();
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
						if($('#player_control_play').is(':visible'))$('#player_control_play').click();
						else $('#player_control_pause').click();
					}
					else chrome.extension.sendMessage({cmd:"play_pause"});
				});
				break;
		}
	})
}
$(window).on('keyup', function(e){mkListener(e)});
chrome.extension.onMessage.addListener(function(request,sender,sendResponse){
	switch(request){
		case 'next':$('#player_control_next').click();
		break;
		case 'prev':$('#player_control_prev').click();
		break;
		case 'play_pause':{
			if($('#player_control_play').is(':visible'))$('#player_control_play').click();
			else $('#player_control_pause').click();
		}
		break;
		default:;
	}
});
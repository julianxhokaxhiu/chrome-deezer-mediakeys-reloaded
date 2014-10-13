chrome.runtime.onMessage.addListener( function(request, sender, sendResponse){
	switch(request.action){
		case 'NEXT-MK':
			//NEXT_MK
			$('#player_control_next,button.control-next').click();
			break;
		case 'PREV-MK':
			//PREV_MK
			$('#player_control_prev,button.control-prev').click();
			break;
		case 'PLAY-PAUSE-MK':
			//PLAY_MK
			if ( $('#player_control_play,button.control-play').is(':visible') )
				$('#player_control_play,button.control-play').click();
			else
				$('#player_control_pause,button.control-pause').click();
			break;
		case 'STOP-MK':
			//STOP_MK
			$('#player_control_pause,button.control-pause').click();
			break;			
	}
});
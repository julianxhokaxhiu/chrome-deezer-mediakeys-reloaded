chrome.runtime.onMessage.addListener( function(request, sender, sendResponse){
	switch(request.action){
		case 'NEXT-MK':
			//NEXT_MK
			$('#player_control_next').click();
			break;
		case 'PREV-MK':
			//PREV_MK
			$('#player_control_prev').click();
			break;
		case 'PLAY-PAUSE-MK':
			//PLAY_MK
			if ( $('#player_control_play').is(':visible') )
				$('#player_control_play').click();
			else
				$('#player_control_pause').click();
			break;
	}
});
chrome.runtime.onMessage.addListener( function(request, sender, sendResponse){
    var click_event = new MouseEvent('click', {
        'view': window,
        'bubbles': true,
        'cancelable': true
    });
    switch(request.action){
        case 'NEXT-MK':
            document.getElementsByClassName('control-next')[0].dispatchEvent(click_event);
            break;
        case 'PREV-MK':
            document.getElementsByClassName('control-prev')[0].dispatchEvent(click_event);
            break;
        case 'STOP-MK':
            if ( document.getElementsByClassName('control-pause').length > 0 )
                document.getElementsByClassName('control-pause')[0].dispatchEvent(click_event);
            break;
        case 'PLAY-PAUSE-MK':
            if ( document.getElementsByClassName('control-play').length > 0 )
                document.getElementsByClassName('control-play')[0].dispatchEvent(click_event);
            else
                document.getElementsByClassName('control-pause')[0].dispatchEvent(click_event);
            break;
    }
});
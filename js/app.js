window.addEventListener('load', function() {
    var currentSong = document.querySelector('.player-track-title').textContent,
        song, artist, cover;

    function notify() {
      song = document.querySelector('.player-track-title').textContent;

      if (song !== currentSong) {
        artist = document.querySelector('.player-track-artist').textContent;
        artist = artist.replace('by ', '');
        cover  = document.querySelector('#player-cover img').getAttribute('src');

        chrome.runtime.sendMessage({artist: artist, song: song, cover: cover});
        currentSong = song;
      }
    }

    setInterval(function() { notify(); }, 1000);
});

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
            document.getElementsByClassName('control-play')[0].dispatchEvent(click_event);
            break;
    }
});
